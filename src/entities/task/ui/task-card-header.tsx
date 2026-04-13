import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface TaskCardHeaderProps {
    title: string;
    label: string;
    color: 'success' | 'warning' | 'error';
}

const TaskCardHeader = ({ title, label, color }: TaskCardHeaderProps) => {
    return (
        <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}
        >
            <Typography component="div" sx={{ fontWeight: 600, flex: 1, mr: 1 }} variant="h6">
                {title}
            </Typography>
            <Chip color={color} label={label} size="small" />
        </Stack>
    );
};

export default TaskCardHeader;
