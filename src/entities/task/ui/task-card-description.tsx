import Typography from '@mui/material/Typography';

interface TaskCardDescriptionProps {
    description?: string;
}

const TaskCardDescription = ({ description }: TaskCardDescriptionProps) => {
    if (!description) {
        return null;
    }

    return (
        <Typography
            color="text.secondary"
            sx={{
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
            }}
            variant="body2"
        >
            {description}
        </Typography>
    );
};

export default TaskCardDescription;
