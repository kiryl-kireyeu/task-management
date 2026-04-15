import type { TaskPriority, TaskStatus } from '@entities/task/model/types';
import type { SelectOption } from '@shared/ui/select/types';

export const TASK_STATUS_FILTER_OPTIONS: SelectOption<TaskStatus>[] = [
    { label: 'К выполнению', value: 'todo' },
    { label: 'В процессе', value: 'inProgress' },
    { label: 'Готово', value: 'done' },
];

export const TASK_PRIORITY_FILTER_OPTIONS: SelectOption<TaskPriority>[] = [
    { label: 'Низкий', value: 'low' },
    { label: 'Средний', value: 'medium' },
    { label: 'Высокий', value: 'high' },
];

export const TASK_SORT_OPTIONS: SelectOption<string>[] = [
    { label: 'Сначала новые', value: 'createdAt-desc' },
    { label: 'Сначала старые', value: 'createdAt-asc' },
    { label: 'Ближайший дедлайн', value: 'deadline-asc' },
    { label: 'Самый поздний дедлайн', value: 'deadline-desc' },
];
