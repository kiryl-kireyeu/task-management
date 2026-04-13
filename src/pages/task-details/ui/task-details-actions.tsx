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
        <Stack direction="row" spacing={1}>
            <Button onClick={onEditClick} startIcon={<EditIcon />} variant="outlined">
                Редактировать
            </Button>
            <Button
                color="error"
                onClick={onDeleteClick}
                startIcon={<DeleteIcon />}
                variant="outlined"
            >
                Удалить
            </Button>
        </Stack>
    );
};

export default TaskDetailsActions;
