import { PRIORITY_LABELS, STATUS_LABELS } from '@entities/task/model/constants';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Select from '@shared/ui/select';
import { Controller } from 'react-hook-form';

import TaskTagsAutocomplete from './task-tags-autocomplete';
import { TASK_FORM_PRIORITY_OPTIONS, TASK_FORM_STATUS_OPTIONS } from '../model/constants';
import type { TaskFormFieldsProps } from '../model/types';

const TaskFormFields = ({ control, errors, isSubmitting }: TaskFormFieldsProps) => {
    return (
        <>
            <Controller
                name="title"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        label="Заголовок"
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={
                            errors.description?.message || `${(field.value ?? '').length}/500`
                        }
                        label="Описание"
                    />
                )}
            />

            <Controller
                name="status"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <Select
                        disabled={field.disabled}
                        error={!!errors.status}
                        fullWidth
                        helperText={errors.status?.message}
                        label="Статус"
                        name={field.name}
                        onChange={field.onChange}
                        options={TASK_FORM_STATUS_OPTIONS.map((status) => ({
                            label: STATUS_LABELS[status],
                            value: status,
                        }))}
                        value={field.value}
                    />
                )}
            />

            <Controller
                name="priority"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <FormControl error={!!errors.priority}>
                        <FormLabel id="task-priority-label">Приоритет</FormLabel>
                        <RadioGroup aria-labelledby="task-priority-label" row {...field}>
                            {TASK_FORM_PRIORITY_OPTIONS.map((priority) => (
                                <FormControlLabel
                                    key={priority}
                                    value={priority}
                                    control={<Radio />}
                                    label={PRIORITY_LABELS[priority]}
                                />
                            ))}
                        </RadioGroup>
                        <FormHelperText>{errors.priority?.message}</FormHelperText>
                    </FormControl>
                )}
            />

            <Controller
                name="deadline"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        type="date"
                        error={!!errors.deadline}
                        helperText={errors.deadline?.message}
                        label="Дедлайн"
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                )}
            />

            <Controller
                name="tags"
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                    <TaskTagsAutocomplete
                        error={!!errors.tags}
                        value={field.value}
                        disabled={field.disabled}
                        helperText={errors.tags?.message}
                        onChange={field.onChange}
                    />
                )}
            />
        </>
    );
};

export default TaskFormFields;
