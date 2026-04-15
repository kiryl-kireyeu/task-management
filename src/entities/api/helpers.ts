import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@entities/task/model/types';

import type { GetTasksParams, PaginatedTaskDtoResponse, PaginatedResponse, TaskDto } from './types';

const parseTags = (tags: string): Task['tags'] =>
    tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

export const buildGetTasksQueryParams = (queryParams?: GetTasksParams | void) => {
    const params: Record<string, string> = {};

    if (queryParams?.page) {
        params._page = String(queryParams.page);
    }

    if (queryParams?.perPage) {
        params._per_page = String(queryParams.perPage);
    }

    if (queryParams?.status) {
        params.status = queryParams.status;
    }

    if (queryParams?.priority) {
        params.priority = queryParams.priority;
    }

    if (queryParams?.tag) {
        params['tags:contains'] = queryParams.tag;
    }

    if (queryParams?.search) {
        params['title:contains'] = queryParams.search;
    }

    if (queryParams?.sortBy) {
        params._sort =
            queryParams.sortOrder === 'desc' ? `-${queryParams.sortBy}` : queryParams.sortBy;
    }

    return params;
};

export const mapTaskDtoToTask = (taskDto: TaskDto): Task => ({
    ...taskDto,
    tags: parseTags(taskDto.tags),
});

export const mapPaginatedTaskDtoResponse = (
    response: PaginatedTaskDtoResponse,
): PaginatedResponse<Task> => ({
    ...response,
    data: response.data.map(mapTaskDtoToTask),
});

export const mapCreateTaskPayloadToTaskDto = (payload: CreateTaskPayload) => ({
    ...payload,
    tags: payload.tags.join(','),
});

export const mapUpdateTaskPayloadToTaskDto = (payload: UpdateTaskPayload) => ({
    ...payload,
    tags: payload.tags ? payload.tags.join(',') : undefined,
});
