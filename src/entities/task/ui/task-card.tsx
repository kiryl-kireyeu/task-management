import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import type { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import type { MouseEvent } from 'react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskCardActions from './task-card-actions';
import TaskCardDescription from './task-card-description';
import TaskCardHeader from './task-card-header';
import TaskTags from './task-tags';
import { useUpdateTaskStatusMutation } from '../../api/api';
import { isTaskOverdue } from '../lib/is-task-overdue';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../model/constants';
import type { Task, TaskStatus } from '../model/types';

export interface TaskCardProps {
    task: Task;
    onTagClick: (tag: string) => void;
}

const TaskCard = ({ task, onTagClick }: TaskCardProps) => {
    const navigate = useNavigate();
    const [updateStatus] = useUpdateTaskStatusMutation();
    const isOverdue = isTaskOverdue(task);

    const handleStatusChange = useCallback(
        (event: SelectChangeEvent<TaskStatus>) => {
            event.stopPropagation();
            void updateStatus({ id: task.id, status: event.target.value as TaskStatus });
        },
        [task.id, updateStatus],
    );

    const handleCardClick = useCallback(() => {
        void navigate(`/task/${task.id}`);
    }, [navigate, task.id]);

    const handleTagClick = useCallback(
        (event: MouseEvent<HTMLDivElement>, tag: string) => {
            event.stopPropagation();
            onTagClick(tag);
        },
        [onTagClick],
    );

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                cursor: 'pointer',
                borderLeft: 4,
                borderColor: isOverdue ? 'error.main' : 'primary.main',
                bgcolor: isOverdue ? 'error.50' : 'background.paper',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
            }}
        >
            <CardContent>
                <TaskCardHeader
                    color={PRIORITY_COLORS[task.priority]}
                    label={PRIORITY_LABELS[task.priority]}
                    title={task.title}
                />
                <TaskCardDescription description={task.description} />

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    <Typography
                        color={isOverdue ? 'error.main' : 'text.secondary'}
                        variant="caption"
                    >
                        Дедлайн: {dayjs(task.deadline).format('DD.MM.YYYY')}
                    </Typography>
                    {isOverdue ? (
                        <Chip color="error" label="Просрочено" size="small" variant="outlined" />
                    ) : null}
                </Stack>

                <TaskTags onTagClick={handleTagClick} tags={task.tags} />
            </CardContent>
            <TaskCardActions onStatusChange={handleStatusChange} status={task.status} />
        </Card>
    );
};

export default memo(TaskCard);
