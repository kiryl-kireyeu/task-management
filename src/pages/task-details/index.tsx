import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TaskDeleteDialog from './ui/task-delete-dialog';
import TaskDetailsActions from './ui/task-details-actions';
import TaskDetailsMeta from './ui/task-details-meta';
import { useDeleteTaskMutation, useGetTaskByIdQuery } from '../../entities/api/api';
import { isTaskOverdue } from '../../entities/task/lib/is-task-overdue';
import TaskTags from '../../entities/task/ui/task-tags';
import Loader from '../../shared/ui/loader';
import PageError from '../../shared/ui/page-error';

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
        setDeleteOpen(false);
        navigate('/');
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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
                К списку задач
            </Button>
            <Paper
                sx={{ p: 4, borderLeft: 4, borderColor: isOverdue ? 'error.main' : 'primary.main' }}
            >
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {task.title}
                    </Typography>
                    <TaskDetailsActions
                        onDeleteClick={() => setDeleteOpen(true)}
                        onEditClick={() => navigate(`/edit/${task.id}`)}
                    />
                </Stack>

                <TaskDetailsMeta isOverdue={isOverdue} task={task} />

                {task.description && (
                    <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                        {task.description}
                    </Typography>
                )}
                <TaskTags tags={task.tags} />
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
