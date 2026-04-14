import { useCreateTagMutation, useSearchTagsQuery } from '@entities/api/api';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDeferredValue, useMemo, useState } from 'react';

const CREATE_PREFIX = 'Создать: ';
const filter = createFilterOptions<string>();

interface TaskTagsAutocompleteProps {
    error?: boolean;
    helperText?: string;
    value: string[];
    onChange: (value: string[]) => void;
}

const TaskTagsAutocomplete = ({
    error = false,
    helperText,
    value,
    onChange,
}: TaskTagsAutocompleteProps) => {
    const [inputValue, setInputValue] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const deferredInputValue = useDeferredValue(inputValue.trim());
    const [createTag] = useCreateTagMutation();

    const shouldSearch = deferredInputValue.length >= 2;
    const {
        data: tags = [],
        isError: isSearchError,
        isFetching,
    } = useSearchTagsQuery(shouldSearch ? deferredInputValue : skipToken);

    const options = useMemo(() => tags.map((tag) => tag.name), [tags]);

    const handleChange = async (_event: unknown, newValue: string[]) => {
        const lastValue = newValue.at(-1);

        if (lastValue?.startsWith(CREATE_PREFIX)) {
            const tagName = lastValue.replace(CREATE_PREFIX, '').trim();

            if (!tagName) {
                return;
            }

            try {
                setLocalError(null);
                await createTag({ name: tagName }).unwrap();
            } catch {
                setLocalError('Не удалось создать тег.');
                return;
            }

            onChange(newValue.map((item) => (item === lastValue ? tagName : item)).filter(Boolean));
            setLocalError(null);
            setInputValue('');

            return;
        }

        setLocalError(null);
        onChange(newValue);
    };

    const resolvedHelperText =
        helperText || localError || (isSearchError ? 'Не удалось загрузить теги.' : undefined);

    return (
        <Autocomplete<string, true, false, true>
            multiple
            freeSolo
            filterSelectedOptions
            inputValue={inputValue}
            loading={isFetching}
            options={options}
            value={value}
            onChange={(event, newValue) => {
                void handleChange(event, newValue);
            }}
            onInputChange={(_event, newInputValue) => {
                setLocalError(null);
                setInputValue(newInputValue);
            }}
            filterOptions={(availableOptions, params) => {
                const filtered = filter(availableOptions, params);
                const normalizedInputValue = params.inputValue.trim().toLowerCase();

                if (
                    normalizedInputValue &&
                    !availableOptions.some(
                        (option) => option.toLowerCase() === normalizedInputValue,
                    )
                ) {
                    filtered.push(`${CREATE_PREFIX}${params.inputValue.trim()}`);
                }

                return filtered;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error || !!localError || isSearchError}
                    helperText={resolvedHelperText}
                    label="Теги"
                    slotProps={{
                        htmlInput: params.slotProps.htmlInput,
                        inputLabel: params.slotProps.inputLabel,
                        input: {
                            ...params.slotProps.input,
                            endAdornment: (
                                <>
                                    {isFetching ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.slotProps.input.endAdornment}
                                </>
                            ),
                        },
                    }}
                />
            )}
            slotProps={{
                chip: { variant: 'outlined' },
            }}
        />
    );
};

export default TaskTagsAutocomplete;
