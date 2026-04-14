import type { Control, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { taskSchema } from './schema';

export type TaskFormValues = z.infer<typeof taskSchema>;

export interface TaskFormProps {
    defaultValues?: Partial<TaskFormValues>;
    isSubmitting?: boolean;
    submitButtonText: string;
    onSubmit: (values: TaskFormValues) => void | Promise<void>;
}

export interface TaskFormFieldsProps {
    control: Control<TaskFormValues>;
    errors: FieldErrors<TaskFormValues>;
}
