import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import TaskFormFields from './task-form-fields';
import { TASK_FORM_DEFAULT_VALUES } from '../model/constants';
import { taskSchema } from '../model/schema';
import type { TaskFormProps, TaskFormValues } from '../model/types';

const TaskForm = ({
    defaultValues,
    isSubmitting = false,
    submitButtonText = 'Сохранить',
    onSubmit,
}: TaskFormProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormValues>({
        defaultValues: {
            ...TASK_FORM_DEFAULT_VALUES,
            ...defaultValues,
        },
        resolver: zodResolver(taskSchema),
    });

    useEffect(() => {
        reset({
            ...TASK_FORM_DEFAULT_VALUES,
            ...defaultValues,
        });
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <TaskFormFields control={control} errors={errors} />

                <Button
                    fullWidth
                    loading={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    {submitButtonText}
                </Button>
            </Stack>
        </form>
    );
};

export default TaskForm;
