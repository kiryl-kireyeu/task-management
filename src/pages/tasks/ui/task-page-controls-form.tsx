import { useGetTagsQuery } from '@entities/api/api';
import type { GetTasksParams } from '@entities/api/types';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@shared/ui/select';

import {
    TASK_PRIORITY_FILTER_OPTIONS,
    TASK_SORT_OPTIONS,
    TASK_STATUS_FILTER_OPTIONS,
} from '../model/constant';

export interface TaskPageControlsProps {
    filters: GetTasksParams;
    onPriorityChange: (priority: string) => void;
    onSearchChange: (search: string) => void;
    onSortChange: (sortValue: string) => void;
    onStatusChange: (status: string) => void;
    onTagChange: (tag: string) => void;
    sortValue: string;
}

const TaskPageControlsForm = ({
    filters,
    onPriorityChange,
    onSearchChange,
    onSortChange,
    onStatusChange,
    onTagChange,
    sortValue,
}: TaskPageControlsProps) => {
    const { data: tags = [] } = useGetTagsQuery();

    return (
        <Grid container columns={{ xs: 1, sm: 2, lg: 5 }} spacing={2} sx={{ alignItems: 'end' }}>
            <Grid size={1}>
                <Select
                    fullWidth
                    label="Статус"
                    emptyOptionLabel="Все статусы"
                    name="status"
                    onChange={onStatusChange}
                    options={TASK_STATUS_FILTER_OPTIONS}
                    value={filters.status ?? ''}
                />
            </Grid>

            <Grid size={1}>
                <Select
                    fullWidth
                    label="Приоритет"
                    emptyOptionLabel="Все приоритеты"
                    name="priority"
                    onChange={onPriorityChange}
                    options={TASK_PRIORITY_FILTER_OPTIONS}
                    value={filters.priority ?? ''}
                />
            </Grid>

            <Grid size={1}>
                <Select
                    fullWidth
                    label="Тег"
                    emptyOptionLabel="Все теги"
                    name="tag"
                    onChange={onTagChange}
                    options={tags.map((tag) => ({
                        label: tag.name,
                        value: tag.name,
                    }))}
                    value={filters.tag ?? ''}
                />
            </Grid>

            <Grid size={1}>
                <TextField
                    fullWidth
                    label="Поиск задачи"
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Поиск по названию"
                    value={filters.search ?? ''}
                />
            </Grid>

            <Grid size={1}>
                <Select
                    fullWidth
                    label="Сортировка"
                    name="sort"
                    onChange={onSortChange}
                    options={TASK_SORT_OPTIONS}
                    value={sortValue}
                />
            </Grid>
        </Grid>
    );
};

export default TaskPageControlsForm;
