import type { TaskPriority, TaskStatus } from '@entities/task/model/types';

import type { TaskFormValues } from './types';

export const TASK_FORM_STATUS_OPTIONS: TaskStatus[] = ['todo', 'inProgress', 'done'];

export const TASK_FORM_PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high'];

export const TASK_FORM_DEFAULT_VALUES: TaskFormValues = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    deadline: '',
    tags: [],
};
