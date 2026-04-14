import type { CreateTaskPayload, Task } from '@entities/task/model/types';

import type { TaskFormValues } from './types';

export const mapTaskToFormValues = (task: Task): TaskFormValues => ({
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    tags: task.tags,
});

export const mapFormValuesToCreateTaskPayload = (values: TaskFormValues): CreateTaskPayload => ({
    title: values.title.trim(),
    description: values.description?.trim() || undefined,
    status: values.status,
    priority: values.priority,
    deadline: values.deadline,
    tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
});
