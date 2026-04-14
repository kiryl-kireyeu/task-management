import type { CreateTaskPayload, Task } from '@entities/task/model/types';
import type { Control, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { taskSchema } from './schema';

export type TaskFormValues = z.infer<typeof taskSchema>;

export interface TaskFormProps {
    defaultValues?: Partial<TaskFormValues>;
    isSubmitting?: boolean;
    submitButtonText: string;
    tagOptions: string[];
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
}

export interface TaskFormFieldsProps {
    control: Control<TaskFormValues>;
    errors: FieldErrors<TaskFormValues>;
    tagOptions: string[];
}

export const TASK_FORM_DEFAULT_VALUES: TaskFormValues = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    deadline: '',
    tags: [],
};

export const mapTaskToFormValues = (task: Task): TaskFormValues => ({
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    tags: task.tags,
});

export const mapFormValuesToCreateTaskPayload = (values: TaskFormValues): CreateTaskPayload => ({
    title: values.title.trim(),
    description: values.description?.trim() || undefined,
    status: values.status,
    priority: values.priority,
    deadline: values.deadline,
    tags: values.tags.map((tag) => tag.trim()).filter(Boolean),
});
