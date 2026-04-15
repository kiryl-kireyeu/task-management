import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface TaskDeadlineProps {
    deadline: string;
    isOverdue: boolean;
    sx?: SxProps<Theme>;
    variant?: 'body2' | 'caption';
}

const TaskDeadline = ({ deadline, isOverdue, sx, variant = 'caption' }: TaskDeadlineProps) => {
    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', ...sx }}>
            <Typography
                color="text.secondary"
                sx={{ textDecoration: isOverdue ? 'line-through' : 'none' }}
                variant={variant}
            >
                <strong>Дедлайн:</strong> {dayjs(deadline).format('DD.MM.YYYY')}
            </Typography>
            {isOverdue ? (
                <Chip color="error" label="Просрочено" size="small" variant="outlined" />
            ) : null}
        </Stack>
    );
};

export default TaskDeadline;
