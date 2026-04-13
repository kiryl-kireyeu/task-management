import type { TaskPriority, TaskStatus } from './types';

export const STATUS_LABELS: Record<TaskStatus, string> = {
    todo: 'К выполнению',
    inProgress: 'В процессе',
    done: 'Готово',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
};

export const STATUS_COLORS: Record<TaskStatus, 'default' | 'warning' | 'success'> = {
    todo: 'default',
    inProgress: 'warning',
    done: 'success',
};

export const PRIORITY_COLORS: Record<TaskPriority, 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
};
