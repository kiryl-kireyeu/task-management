import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface TaskDeleteDialogProps {
    onClose: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
}

const TaskDeleteDialog = ({ onClose, onConfirm, open, title }: TaskDeleteDialogProps) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Удалить задачу?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены, что хотите удалить задачу «{title}»? Это действие необратимо.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button color="error" onClick={onConfirm} variant="contained">
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDeleteDialog;
