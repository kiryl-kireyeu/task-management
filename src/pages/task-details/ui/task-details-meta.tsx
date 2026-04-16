import type { Task } from '@entities/task/model/types';
import TaskDeadline from '@entities/task/ui/task-deadline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface TaskDetailsMetaProps {
    isOverdue: boolean;
    task: Task;
}

const TaskDetailsMeta = ({ isOverdue, task }: TaskDetailsMetaProps) => {
    return (
        <>
            <TaskDeadline
                deadline={task.deadline}
                isOverdue={isOverdue}
                sx={{ mb: 2 }}
                variant="body2"
            />

            <Stack spacing={1} sx={{ mb: 3 }}>
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
