import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    CreateTagPayload,
    CreateTaskPayload,
    GetTasksParams,
    Tag,
    Task,
    UpdateTaskPayload,
} from './types';

export const entitiesApi = createApi({
    reducerPath: 'entitiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Task', 'Tag'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], GetTasksParams | void>({
            query: (queryParams) => {
                const params: Record<string, string> = {};

                if (queryParams?.status) {
                    params.status = queryParams.status;
                }

                if (queryParams?.priority) {
                    params.priority = queryParams.priority;
                }

                if (queryParams?.tag) {
                    params.tags_like = queryParams.tag;
                }

                if (queryParams?.search) {
                    params.q = queryParams.search;
                }

                if (queryParams?.sortBy) {
                    params._sort = queryParams.sortBy;
                }

                if (queryParams?.sortOrder) {
                    params._order = queryParams.sortOrder;
                }

                return { url: '/tasks', params };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((task) => ({ type: 'Task' as const, id: task.id })),
                          { type: 'Task' as const, id: 'LIST' },
                      ]
                    : [{ type: 'Task' as const, id: 'LIST' }],
        }),
        getTaskById: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Task', id }],
        }),
        createTask: builder.mutation<Task, CreateTaskPayload>({
            query: (body) => ({ url: '/tasks', method: 'POST', body }),
            invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        }),
        updateTask: builder.mutation<Task, { id: string; data: UpdateTaskPayload }>({
            query: ({ id, data }) => ({ url: `/tasks/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Task', id }],
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({ url: `/tasks/${id}`, method: 'DELETE' }),
            invalidatesTags: (_result, _error, id) => [
                { type: 'Task', id },
                { type: 'Task', id: 'LIST' },
            ],
        }),
        updateTaskStatus: builder.mutation<Task, { id: string; status: Task['status'] }>({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: { status },
            }),
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
                                    const task = draft.find((item) => item.id === id);

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
    useCreateTagMutation,
} = entitiesApi;
