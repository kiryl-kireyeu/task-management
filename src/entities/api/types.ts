import type { TaskPriority, TaskStatus } from '../task/model/types';

export type TasksSortBy = 'createdAt' | 'deadline';

export type SortOrder = 'asc' | 'desc';

export interface GetTasksParams {
    status?: TaskStatus;
    priority?: TaskPriority;
    tag?: string;
    search?: string;
    sortBy?: TasksSortBy;
    sortOrder?: SortOrder;
}

export interface Tag {
    id: string;
    name: string;
}

export type CreateTagPayload = Omit<Tag, 'id'>;
