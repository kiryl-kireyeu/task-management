import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Task } from '../model/types';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
            query: () => ({ url: '/tasks' }),
            providesTags: ['Task'],
        }),
        getTaskById: builder.query<Task, number>({
            query: (id) => `/tasks/${id}`,
            providesTags: ['Task'],
        }),
        createTask: builder.mutation<Task, Partial<Task>>({
            query: (body) => ({ url: '/tasks', method: 'POST', body }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation<Task, { id: number; data: Partial<Task> }>({
            query: ({ id, data }) => ({ url: `/tasks/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<void, number>({
            query: (id) => ({ url: `/tasks/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Task'],
        }),
        updateTaskStatus: builder.mutation<Task, { id: number; status: Task['status'] }>({
            query: ({ id, status }) => ({
                url: `/tasks/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Task'],
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
} = taskApi;
