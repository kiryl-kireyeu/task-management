import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface TaskCardDeadlineProps {
    deadline: string;
    isOverdue: boolean;
}

const TaskCardDeadline = ({ deadline, isOverdue }: TaskCardDeadlineProps) => {
    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
            <Typography
                color="text.secondary"
                sx={{ textDecoration: isOverdue ? 'line-through' : 'none' }}
                variant="caption"
            >
                Дедлайн: {dayjs(deadline).format('DD.MM.YYYY')}
            </Typography>
            {isOverdue ? (
                <Chip color="error" label="Просрочено" size="small" variant="outlined" />
            ) : null}
        </Stack>
    );
};

export default TaskCardDeadline;
