import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().trim().min(1, 'Введите заголовок').min(5, 'Минимум 5 символов'),
    description: z.string().max(500, 'Максимум 500 символов').optional().or(z.literal('')),
    status: z.union([z.literal('todo'), z.literal('inProgress'), z.literal('done')]),
    priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
    deadline: z.string().min(1, 'Выберите дедлайн'),
    tags: z.array(z.string()).min(1, 'Выберите хотя бы 1 тег'),
});
