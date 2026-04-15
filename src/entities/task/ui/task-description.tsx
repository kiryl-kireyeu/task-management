import Typography from '@mui/material/Typography';
import type { TypographyOwnProps } from '@mui/material/Typography';

interface TaskDescriptionProps {
    color?: TypographyOwnProps['color'];
    description?: string;
    mode?: 'clamped' | 'full';
    placeholder?: string;
    variant?: TypographyOwnProps['variant'];
}

const multipleLineClampSx = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
};

const TaskDescription = ({
    mode = 'full',
    color,
    variant = 'body2',
    placeholder = 'Описания нет...',
    description,
}: TaskDescriptionProps) => {
    if (!description) {
        return (
            <Typography sx={{ color: 'grey.500', fontStyle: 'italic', mb: 2 }} variant={variant}>
                {placeholder}
            </Typography>
        );
    }

    return (
        <Typography
            sx={{ whiteSpace: 'pre-wrap', mb: 2, ...(mode === 'clamped' && multipleLineClampSx) }}
            color={color}
            variant={variant}
        >
            {description}
        </Typography>
    );
};

export default TaskDescription;
