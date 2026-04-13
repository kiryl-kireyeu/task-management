import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { TASKS_PER_PAGE, useTasksSearchParams } from './model/use-tasks-search-params';
import TaskPageControls from './ui/task-page-controls';
import TaskPageHeader from './ui/task-page-header';
import TaskPageList from './ui/task-page-list';
import TaskPagePagination from './ui/task-page-pagination';
import { useGetTasksQuery } from '../../entities/api/api';
import Loader from '../../shared/ui/loader';

const TasksPage = () => {
    const {
        filters,
        page,
        sortValue,
        updateParam,
        handlePageChange,
        handleSortChange,
        handleTagClick,
    } = useTasksSearchParams();

    const {
        data: tasksResponse,
        isLoading,
        isError,
    } = useGetTasksQuery({
        ...filters,
        page,
        perPage: TASKS_PER_PAGE,
    });

    const totalPages = Math.max(1, tasksResponse?.pages ?? 1);
    const safePage = Math.min(page, totalPages);
    const tasks = tasksResponse?.data ?? [];

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Alert severity="error">Failed to load tasks.</Alert>;
    }

    return (
        <Stack spacing={4}>
            <TaskPageHeader />
            <TaskPageControls
                filters={filters}
                onPriorityChange={(priority) => updateParam('priority', priority)}
                onSearchChange={(search) => updateParam('search', search)}
                onSortChange={handleSortChange}
                onStatusChange={(status) => updateParam('status', status)}
                onTagChange={(tag) => updateParam('tag', tag)}
                sortValue={sortValue}
            />

            <TaskPageList onTagClick={handleTagClick} tasks={tasks} />

            <TaskPagePagination count={totalPages} onChange={handlePageChange} page={safePage} />
        </Stack>
    );
};

export default TasksPage;
