export type TaskStatus = 'todo' | 'inProgress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export type TasksSortBy = 'createdAt' | 'deadline';

export type SortOrder = 'asc' | 'desc';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export type CreateTaskPayload = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

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
