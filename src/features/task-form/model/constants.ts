import type { TaskPriority, TaskStatus } from '@entities/task/model/types';

export const TASK_FORM_STATUS_OPTIONS: TaskStatus[] = ['todo', 'inProgress', 'done'];

export const TASK_FORM_PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high'];
