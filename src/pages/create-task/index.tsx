import { useNavigate } from 'react-router-dom';

import TaskForm from '@/features/task-form/ui/task-form';
import PageShell from '@/shared/ui/page-shell';

const CreateTaskPage = () => {
    const navigate = useNavigate();

    return (
        <PageShell maxWidth="sm" onBack={() => navigate(-1)} title="Создать задачу">
            <TaskForm onSubmit={() => {}} submitButtonText="Создать" />
        </PageShell>
    );
};

export default CreateTaskPage;
