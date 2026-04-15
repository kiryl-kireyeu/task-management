import type { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import type { MouseEvent } from 'react';

import TaskCardActions from './task-card-actions';
import TaskTags from './task-tags';
import type { TaskStatus } from '../model/types';

interface TaskCardFooterProps {
    onStatusChange: (event: SelectChangeEvent<TaskStatus>) => void;
    onTagClick: (event: MouseEvent<HTMLDivElement>, tag: string) => void;
    status: TaskStatus;
    tags: string[];
}

const TaskCardFooter = ({ onStatusChange, onTagClick, status, tags }: TaskCardFooterProps) => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' }, mt: 2 }}
        >
            <Stack sx={{ flex: 1 }}>
                <TaskTags onTagClick={onTagClick} tags={tags} />
            </Stack>

            <Stack sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' } }}>
                <TaskCardActions onStatusChange={onStatusChange} status={status} />
            </Stack>
        </Stack>
    );
};

export default TaskCardFooter;
