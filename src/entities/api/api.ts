import type { CreateTaskPayload, Task, UpdateTaskPayload } from '@entities/task/model/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getNowIso } from '@shared/lib/date/get-now-iso';

import {
    buildGetTasksQueryParams,
    mapCreateTaskPayloadToTaskDto,
    mapPaginatedTaskDtoResponse,
    mapTaskDtoToTask,
    mapUpdateTaskPayloadToTaskDto,
} from './helpers';
import type {
    CreateTagPayload,
    GetTasksParams,
    PaginatedResponse,
    PaginatedTaskDtoResponse,
    Tag,
    TaskDto,
} from './types';

export const entitiesApi = createApi({
    reducerPath: 'entitiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Task', 'Tag'],
    endpoints: (builder) => ({
        getTasks: builder.query<PaginatedResponse<Task>, GetTasksParams | void>({
            query: (queryParams) => ({
                url: '/tasks',
                params: buildGetTasksQueryParams(queryParams),
            }),
            transformResponse: (response: PaginatedTaskDtoResponse) =>
                mapPaginatedTaskDtoResponse(response),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map((task) => ({ type: 'Task' as const, id: task.id })),
                          { type: 'Task' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Task' as const, id: 'LIST' }],
        }),
        getTaskById: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            transformResponse: (response: TaskDto) => mapTaskDtoToTask(response),
            providesTags: (_result, _error, id) => [{ type: 'Task', id }],
        }),
        createTask: builder.mutation<Task, CreateTaskPayload>({
            query: (payload) => {
                const now = getNowIso();
                const body = {
                    ...mapCreateTaskPayloadToTaskDto(payload),
                    createdAt: now,
                    updatedAt: now,
                };

                return { url: '/tasks', method: 'POST', body };
            },
            transformResponse: (response: TaskDto) => mapTaskDtoToTask(response),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        updateTask: builder.mutation<Task, { id: string; data: UpdateTaskPayload }>({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: {
                    ...mapUpdateTaskPayloadToTaskDto(data),
                    updatedAt: getNowIso(),
                },
            }),
            transformResponse: (response: TaskDto) => mapTaskDtoToTask(response),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Task', id }],
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({ url: `/tasks/${id}`, method: 'DELETE' }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        updateTaskStatus: builder.mutation<Task, { id: string; status: Task['status'] }>({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            transformResponse: (response: TaskDto) => mapTaskDtoToTask(response),
            async onQueryStarted({ id, status }, { dispatch, getState, queryFulfilled }) {
                const taskDetailsPatch = dispatch(
                    entitiesApi.util.updateQueryData('getTaskById', id, (draft) => {
                        draft.status = status;
                    }),
                );

                const taskListPatches = entitiesApi.util
                    .selectInvalidatedBy(getState(), [{ type: 'Task', id }])
                    .filter((entry) => entry.endpointName === 'getTasks')
                    .map((entry) =>
                        dispatch(
                            entitiesApi.util.updateQueryData(
                                'getTasks',
                                entry.originalArgs,
                                (draft) => {
                                    const task = draft.data.find((item) => item.id === id);

                                    if (task) {
                                        task.status = status;
                                    }
                                },
                            ),
                        ),
                    );

                try {
                    await queryFulfilled;
                } catch {
                    taskDetailsPatch.undo();
                    taskListPatches.forEach((patch) => patch.undo());
                }
            },
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Task', id }],
        }),
        getTags: builder.query<Tag[], void>({
            query: () => ({ url: '/tags' }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((tag) => ({ type: 'Tag' as const, id: tag.id })),
                          { type: 'Tag' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Tag' as const, id: 'LIST' }],
        }),
        searchTags: builder.query<Tag[], string>({
            query: (search) => ({
                url: '/tags',
                params: {
                    'name:contains': search,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((tag) => ({ type: 'Tag' as const, id: tag.id })),
                          { type: 'Tag' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Tag' as const, id: 'LIST' }],
        }),
        createTag: builder.mutation<Tag, CreateTagPayload>({
            query: (body) => ({ url: '/tags', method: 'POST', body }),
            invalidatesTags: [{ type: 'Tag', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskStatusMutation,
    useGetTagsQuery,
    useSearchTagsQuery,
    useCreateTagMutation,
} = entitiesApi;
