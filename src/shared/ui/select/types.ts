import type { SelectProps as MuiSelectProps } from '@mui/material/Select';

export interface SelectOption<T extends string = string> {
    label: string;
    value: T;
}

export interface ISelectProps<T extends string = string> extends Omit<
    MuiSelectProps<T | ''>,
    'children' | 'label' | 'multiple' | 'native' | 'onChange' | 'value'
> {
    label: string;
    name?: string;
    error?: boolean;
    options: SelectOption<T>[];
    value: T | '';
    helperText?: string;
    emptyOptionLabel?: string;
    onChange: (value: T | '') => void;
}
