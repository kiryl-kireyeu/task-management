import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import {
    PRIORITY_COLORS,
    PRIORITY_LABELS,
    STATUS_COLORS,
    STATUS_LABELS,
} from '../../../entities/task/model/constants';
import type { Task } from '../../../entities/task/model/types';

interface TaskDetailsMetaProps {
    isOverdue: boolean;
    task: Task;
}

const TaskDetailsMeta = ({ isOverdue, task }: TaskDetailsMetaProps) => {
    return (
        <>
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip color={STATUS_COLORS[task.status]} label={STATUS_LABELS[task.status]} />
                <Chip
                    color={PRIORITY_COLORS[task.priority]}
                    label={PRIORITY_LABELS[task.priority]}
                />
                {isOverdue ? <Chip color="error" label="Просрочено" variant="outlined" /> : null}
            </Stack>

            <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography color="text.secondary" variant="body2">
                    <strong>Дедлайн:</strong> {dayjs(task.deadline).format('DD.MM.YYYY')}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    <strong>Создано:</strong> {dayjs(task.createdAt).format('DD.MM.YYYY HH:mm')}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    <strong>Обновлено:</strong> {dayjs(task.updatedAt).format('DD.MM.YYYY HH:mm')}
                </Typography>
            </Stack>
        </>
    );
};

export default TaskDetailsMeta;
