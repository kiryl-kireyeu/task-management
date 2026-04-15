import { expect, test, type APIRequestContext } from '@playwright/test';

const API_URL = 'http://127.0.0.1:3001';
const TEST_PREFIX = 'PW-E2E';

type TaskDto = {
    id: string;
    title: string;
    status: 'todo' | 'inProgress' | 'done';
    priority: 'low' | 'medium' | 'high';
    deadline: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
    description?: string;
};

const createTask = async (
    request: APIRequestContext,
    overrides: Partial<Omit<TaskDto, 'id'>> = {},
): Promise<TaskDto> => {
    const now = new Date().toISOString();
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const response = await request.post(`${API_URL}/tasks`, {
        data: {
            title: `${TEST_PREFIX}-${uniqueSuffix}`,
            status: 'todo',
            priority: 'medium',
            deadline: '2026-04-30',
            tags: 'React',
            createdAt: now,
            updatedAt: now,
            ...overrides,
        },
    });

    expect(response.ok()).toBeTruthy();
    return (await response.json()) as TaskDto;
};

const cleanupTestTasks = async (request: APIRequestContext) => {
    const response = await request.get(`${API_URL}/tasks`);
    expect(response.ok()).toBeTruthy();

    const tasks = (await response.json()) as TaskDto[];
    const createdTasks = tasks.filter((task) => task.title.startsWith(TEST_PREFIX));

    for (const task of createdTasks) {
        const deleteResponse = await request.delete(`${API_URL}/tasks/${task.id}`);
        expect(deleteResponse.ok()).toBeTruthy();
    }
};

test.describe.configure({ mode: 'serial' });

test.afterEach(async ({ request }) => {
    await cleanupTestTasks(request);
});

test('loads and shows task cards list', async ({ page, request }) => {
    const firstTask = await createTask(request, { title: `${TEST_PREFIX}-list-first` });
    const secondTask = await createTask(request, { title: `${TEST_PREFIX}-list-second` });

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Список задач' })).toBeVisible();
    await expect(page.getByText(firstTask.title)).toBeVisible();
    await expect(page.getByText(secondTask.title)).toBeVisible();
});

test('creates a new task and shows it in the list', async ({ page }) => {
    const title = `${TEST_PREFIX}-create-${Date.now()}`;

    await page.goto('/create');

    await page.getByLabel('Заголовок').fill(title);
    await page.getByLabel('Описание').fill('Тестовая задача для e2e сценария.');
    await page.getByLabel('Дедлайн').fill('2026-04-30');

    await page.getByLabel('Теги').fill('Re');
    await page.getByRole('option', { name: 'React' }).click();

    await page.getByRole('button', { name: 'Создать' }).click();

    await expect(page).toHaveURL(/\/(\?sortBy=createdAt&sortOrder=desc)?$/);
    await expect(page.getByText(title)).toBeVisible();
});

test('updates task data and shows updated card in the list', async ({ page, request }) => {
    const task = await createTask(request, {
        title: `${TEST_PREFIX}-edit-old`,
        description: 'Старое описание',
    });
    const updatedTitle = `${TEST_PREFIX}-edit-new-${Date.now()}`;

    await page.goto(`/edit/${task.id}`);

    await page.getByLabel('Заголовок').fill(updatedTitle);
    await page.getByLabel('Описание').fill('Обновленное описание для e2e теста.');
    await page.getByRole('button', { name: 'Обновить задачу' }).click();

    await expect(page).toHaveURL(`/task/${task.id}`);

    await page.goto('/');

    await expect(page.getByText(updatedTitle)).toBeVisible();
    await expect(page.getByText(task.title)).not.toBeVisible();
});
