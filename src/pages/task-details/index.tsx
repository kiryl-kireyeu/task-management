import { useDeleteTaskMutation, useGetTaskByIdQuery } from '@entities/api/api';
import { isTaskOverdue } from '@entities/task/lib/is-task-overdue';
import TaskDescription from '@entities/task/ui/task-description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from '@shared/ui/loader';
import PageError from '@shared/ui/page-error';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TaskDeleteDialog from './ui/task-delete-dialog';
import TaskDetailsFooter from './ui/task-details-footer';
import TaskDetailsHeader from './ui/task-details-header';
import TaskDetailsMeta from './ui/task-details-meta';

const TaskDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: task, isLoading, isError } = useGetTaskByIdQuery(id ?? skipToken);
    const [deleteTask] = useDeleteTaskMutation();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = async () => {
        if (!id) {
            return;
        }

        await deleteTask(id).unwrap();
        navigate('/');
        setDeleteOpen(false);
    };

    if (!id) {
        return (
            <PageError
                actionLabel="К списку задач"
                message="Некорректный идентификатор задачи."
                onAction={() => navigate('/')}
            />
        );
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !task) {
        return (
            <PageError
                actionLabel="К списку задач"
                message="Задача не найдена."
                onAction={() => navigate('/')}
            />
        );
    }

    const isOverdue = isTaskOverdue(task);

    return (
        <Container maxWidth="md" sx={{ pb: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
                К списку задач
            </Button>
            <Paper
                sx={(theme) => ({
                    p: 4,
                    borderLeft: 4,
                    borderColor: isOverdue ? 'error.main' : 'primary.main',
                    bgcolor: isOverdue ? alpha(theme.palette.error.main, 0.06) : 'background.paper',
                })}
            >
                <TaskDetailsHeader
                    priority={task.priority}
                    status={task.status}
                    title={task.title}
                />
                <TaskDetailsMeta isOverdue={isOverdue} task={task} />
                <TaskDescription description={task.description} mode="full" variant="body1" />

                <TaskDetailsFooter
                    onDeleteClick={() => setDeleteOpen(true)}
                    onEditClick={() => navigate(`/edit/${task.id}`)}
                    tags={task.tags}
                />
            </Paper>
            <TaskDeleteDialog
                open={deleteOpen}
                title={task.title}
                onConfirm={handleDelete}
                onClose={() => setDeleteOpen(false)}
            />
        </Container>
    );
};

export default TaskDetailsPage;
