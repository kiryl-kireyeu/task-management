import { useUpdateTaskStatusMutation } from '@entities/api/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { SelectChangeEvent } from '@mui/material/Select';
import { alpha } from '@mui/material/styles';
import type { MouseEvent } from 'react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskCardFooter from './task-card-footer';
import TaskCardHeader from './task-card-header';
import TaskDeadline from './task-deadline';
import TaskDescription from './task-description';
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
            sx={(theme) => ({
                cursor: 'pointer',
                borderLeft: 4,
                borderColor: isOverdue ? 'error.main' : 'primary.main',
                bgcolor: isOverdue ? alpha(theme.palette.error.main, 0.06) : 'background.paper',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
            })}
        >
            <CardContent>
                <TaskCardHeader
                    color={PRIORITY_COLORS[task.priority]}
                    label={PRIORITY_LABELS[task.priority]}
                    title={task.title}
                />
                <TaskDescription description={task.description} mode="clamped" />
                <TaskDeadline deadline={task.deadline} isOverdue={isOverdue} sx={{ mb: 1 }} />
                <TaskCardFooter
                    onStatusChange={handleStatusChange}
                    onTagClick={handleTagClick}
                    status={task.status}
                    tags={task.tags}
                />
            </CardContent>
        </Card>
    );
};

export default memo(TaskCard);
