import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useId } from 'react';

import type { ISelectProps } from './types';

const Select = <T extends string = string>({
    size = 'medium',
    value,
    label,
    name,
    error = false,
    options,
    disabled = false,
    fullWidth = false,
    helperText,
    emptyOptionLabel,
    onChange,
}: ISelectProps<T>) => {
    const labelId = useId();

    const handleChange = (event: SelectChangeEvent<T | ''>) => {
        onChange(event.target.value as T | '');
    };

    const renderValue = (selected: string) => {
        if (selected === '' && emptyOptionLabel) {
            return emptyOptionLabel;
        }

        return options.find((option) => option.value === selected)?.label ?? selected;
    };

    return (
        <FormControl disabled={disabled} error={error} fullWidth={fullWidth} size={size}>
            <InputLabel id={labelId} shrink={value === '' ? true : undefined}>
                {label}
            </InputLabel>
            <MuiSelect<T | ''>
                displayEmpty={!!emptyOptionLabel}
                label={label}
                labelId={labelId}
                name={name}
                onChange={handleChange}
                renderValue={(selected) => renderValue(selected)}
                value={value}
            >
                {emptyOptionLabel ? <MenuItem value="">{emptyOptionLabel}</MenuItem> : null}
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
    );
};

export default Select;
