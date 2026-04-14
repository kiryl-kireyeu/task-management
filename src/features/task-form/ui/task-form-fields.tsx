import { PRIORITY_LABELS, STATUS_LABELS } from '@entities/task/model/constants';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import TaskTagsAutocomplete from './task-tags-autocomplete';
import { TASK_FORM_PRIORITY_OPTIONS, TASK_FORM_STATUS_OPTIONS } from '../model/constants';
import type { TaskFormFieldsProps } from '../model/types';

const TaskFormFields = ({ control, errors }: TaskFormFieldsProps) => {
    return (
        <>
            <Controller
                name="title"
                control={control}
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
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                        <InputLabel id="task-status-label">Статус</InputLabel>
                        <Select {...field} label="Статус" labelId="task-status-label">
                            {TASK_FORM_STATUS_OPTIONS.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {STATUS_LABELS[status]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.status?.message}</FormHelperText>
                    </FormControl>
                )}
            />

            <Controller
                name="priority"
                control={control}
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
                render={({ field }) => (
                    <TaskTagsAutocomplete
                        error={!!errors.tags}
                        helperText={errors.tags?.message}
                        onChange={field.onChange}
                        value={field.value}
                    />
                )}
            />
        </>
    );
};

export default TaskFormFields;
