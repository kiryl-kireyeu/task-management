import TaskTags from '@entities/task/ui/task-tags';
import Stack from '@mui/material/Stack';

import TaskDetailsActions from './task-details-actions';

interface TaskDetailsFooterProps {
    onDeleteClick: () => void;
    onEditClick: () => void;
    tags: string[];
}

const TaskDetailsFooter = ({ onDeleteClick, onEditClick, tags }: TaskDetailsFooterProps) => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' }, mt: 3 }}
        >
            <Stack sx={{ flex: 1 }}>
                <TaskTags tags={tags} />
            </Stack>

            <Stack sx={{ alignItems: { xs: 'stretch', sm: 'flex-end' } }}>
                <TaskDetailsActions onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
            </Stack>
        </Stack>
    );
};

export default TaskDetailsFooter;
