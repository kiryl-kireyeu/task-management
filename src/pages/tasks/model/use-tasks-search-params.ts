import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { GetTasksParams, SortOrder, TasksSortBy } from '../../../entities/api/types';

export const TASKS_PER_PAGE = 10;

export const useTasksSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: GetTasksParams = {
        status: (searchParams.get('status') as GetTasksParams['status']) || undefined,
        priority: (searchParams.get('priority') as GetTasksParams['priority']) || undefined,
        tag: searchParams.get('tag') || undefined,
        search: searchParams.get('search') || undefined,
        sortBy: (searchParams.get('sortBy') as TasksSortBy) || undefined,
        sortOrder: (searchParams.get('sortOrder') as SortOrder) || undefined,
    };

    const pageParam = Number(searchParams.get('page') || '1');
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const sortValue = `${filters.sortBy ?? 'createdAt'}-${filters.sortOrder ?? 'desc'}`;

    const updateParam = useCallback(
        (key: string, value?: string) => {
            const nextParams = new URLSearchParams(searchParams);

            if (value) {
                nextParams.set(key, value);
            } else {
                nextParams.delete(key);
            }

            nextParams.set('page', '1');
            setSearchParams(nextParams);
        },
        [searchParams, setSearchParams],
    );

    const handlePageChange = useCallback(
        (nextPage: number) => {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('page', String(nextPage));
            setSearchParams(nextParams);
        },
        [searchParams, setSearchParams],
    );

    const handleSortChange = useCallback(
        (value: string) => {
            const [sortBy, sortOrder] = value.split('-') as [TasksSortBy, SortOrder];
            const nextParams = new URLSearchParams(searchParams);

            nextParams.set('sortBy', sortBy);
            nextParams.set('sortOrder', sortOrder);
            nextParams.set('page', '1');

            setSearchParams(nextParams);
        },
        [searchParams, setSearchParams],
    );

    const handleTagClick = useCallback(
        (tag: string) => {
            updateParam('tag', tag);
        },
        [updateParam],
    );

    return {
        filters,
        page,
        sortValue,
        updateParam,
        handlePageChange,
        handleSortChange,
        handleTagClick,
    };
};
