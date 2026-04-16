import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface TaskDetailsActionsProps {
    onDeleteClick: () => void;
    onEditClick: () => void;
}

const TaskDetailsActions = ({ onDeleteClick, onEditClick }: TaskDetailsActionsProps) => {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ justifyContent: 'flex-end', mt: 3 }}
        >
            <Button
                onClick={onEditClick}
                startIcon={<EditIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                variant="outlined"
            >
                Редактировать
            </Button>
            <Button
                color="error"
                onClick={onDeleteClick}
                startIcon={<DeleteIcon />}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                variant="outlined"
            >
                Удалить
            </Button>
        </Stack>
    );
};

export default TaskDetailsActions;
