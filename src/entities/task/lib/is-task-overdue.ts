import dayjs from 'dayjs';

import type { Task, TaskStatus } from '../model/types';

interface OverdueTaskLike {
    deadline: string;
    status: TaskStatus;
}

export const isTaskOverdue = (task: OverdueTaskLike | Task) =>
    dayjs(task.deadline).isBefore(dayjs(), 'day') && task.status !== 'done';
