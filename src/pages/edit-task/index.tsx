import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import PageShell from '@/shared/ui/page-shell';

const EditTaskPage = () => {
    const navigate = useNavigate();

    return (
        <PageShell maxWidth="sm" onBack={() => navigate(-1)} title="Редактировать задачу">
            <Typography color="text.secondary">Edit Task</Typography>
        </PageShell>
    );
};

export default EditTaskPage;
