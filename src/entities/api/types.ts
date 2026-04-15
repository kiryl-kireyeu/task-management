import type { Task, TaskPriority, TaskStatus } from '../task/model/types';

export type TasksSortBy = 'createdAt' | 'deadline';

export type SortOrder = 'asc' | 'desc';

export interface PaginatedResponse<T> {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: T[];
}

export interface GetTasksParams {
    page?: number;
    perPage?: number;
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

export interface TaskDto extends Omit<Task, 'tags'> {
    tags: string;
}

export interface PaginatedTaskDtoResponse extends Omit<PaginatedResponse<TaskDto>, 'data'> {
    data: TaskDto[];
}
