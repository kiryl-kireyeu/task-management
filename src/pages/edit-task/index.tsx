import Alert from '@mui/material/Alert';
import { skipToken } from '@reduxjs/toolkit/query';
import Loader from '@shared/ui/loader';
import PageError from '@shared/ui/page-error';
import PageShell from '@shared/ui/page-shell';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetTaskByIdQuery, useUpdateTaskMutation } from '@/entities/api/api';
import {
    mapTaskToFormValues,
    mapFormValuesToCreateTaskPayload,
} from '@/features/task-form/model/helpers';
import type { TaskFormValues } from '@/features/task-form/model/types';
import TaskForm from '@/features/task-form/ui/task-form';

const EditTaskPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        data: defaultTaskValues,
        isError: isTaskError,
        isLoading: isTaskLoading,
    } = useGetTaskByIdQuery(id ?? skipToken);

    const [updateTask, { isLoading: isMutateLoading, isError: isMutateError }] =
        useUpdateTaskMutation();

    const handleSubmit = async (values: TaskFormValues) => {
        if (!id) {
            return;
        }

        const result = await updateTask({
            id,
            data: mapFormValuesToCreateTaskPayload(values),
        });

        if ('data' in result) {
            navigate(`/task/${id}`);
        }
    };

    if (isTaskLoading) {
        return (
            <PageShell maxWidth="sm" onBack={() => navigate(-1)} title="Редактировать задачу">
                <Loader />
            </PageShell>
        );
    }

    if (isTaskError || !defaultTaskValues) {
        return (
            <PageError
                actionLabel="К списку задач"
                message="Задача не найдена."
                onAction={() => navigate('/')}
            />
        );
    }

    return (
        <PageShell maxWidth="sm" onBack={() => navigate(-1)} title="Редактировать задачу">
            {isMutateError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Не удалось обновить задачу.
                </Alert>
            )}
            <TaskForm
                isSubmitting={isMutateLoading}
                defaultValues={mapTaskToFormValues(defaultTaskValues)}
                submitButtonText="Обновить задачу"
                onSubmit={handleSubmit}
            />
        </PageShell>
    );
};

export default EditTaskPage;
