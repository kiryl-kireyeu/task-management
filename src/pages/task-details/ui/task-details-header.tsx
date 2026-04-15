import {
    PRIORITY_COLORS,
    PRIORITY_LABELS,
    STATUS_COLORS,
    STATUS_LABELS,
} from '@entities/task/model/constants';
import type { TaskPriority, TaskStatus } from '@entities/task/model/types';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface TaskDetailsHeaderProps {
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
}

const TaskDetailsHeader = ({ priority, status, title }: TaskDetailsHeaderProps) => {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}
        >
            <Stack spacing={1} sx={{ flex: 1, mr: 2 }}>
                <Typography sx={{ fontWeight: 700 }} variant="h4">
                    {title}
                </Typography>

                <Stack>
                    <Chip
                        color={STATUS_COLORS[status]}
                        label={STATUS_LABELS[status]}
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                    />
                </Stack>
            </Stack>

            <Chip
                color={PRIORITY_COLORS[priority]}
                label={PRIORITY_LABELS[priority]}
                size="small"
                variant="outlined"
            />
        </Stack>
    );
};

export default TaskDetailsHeader;
