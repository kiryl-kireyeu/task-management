import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { useCreateTaskMutation } from '@/entities/api/api';
import { mapFormValuesToCreateTaskPayload } from '@/features/task-form/model/helpers';
import type { TaskFormValues } from '@/features/task-form/model/types';
import TaskForm from '@/features/task-form/ui/task-form';
import PageShell from '@/shared/ui/page-shell';

const CreateTaskPage = () => {
    const navigate = useNavigate();
    const [createTask, { isError, isLoading }] = useCreateTaskMutation();

    const handleSubmit = async (values: TaskFormValues) => {
        const payload = mapFormValuesToCreateTaskPayload(values);
        const result = await createTask(payload);

        if ('data' in result) {
            navigate('/');
        }
    };

    return (
        <PageShell maxWidth="sm" onBack={() => navigate(-1)} title="Создать задачу">
            <TaskForm isSubmitting={isLoading} submitButtonText="Создать" onSubmit={handleSubmit} />
            {isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Не удалось создать задачу.
                </Alert>
            )}
        </PageShell>
    );
};

export default CreateTaskPage;
