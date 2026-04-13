import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import type { Task } from '../../../entities/task/model/types';
import TaskCard from '../../../entities/task/ui/task-card';

interface TaskPageListProps {
    tasks: Task[];
    onTagClick: (tag: string) => void;
}

const TaskPageList = ({ tasks, onTagClick }: TaskPageListProps) => {
    if (tasks.length === 0) {
        return (
            <Stack spacing={2}>
                <Alert severity="info">No tasks yet. Create the first task to get started.</Alert>
            </Stack>
        );
    }
    return (
        <Stack spacing={2}>
            {tasks.map((task) => (
                <TaskCard key={task.id} onTagClick={onTagClick} task={task} />
            ))}
        </Stack>
    );
};

export default TaskPageList;
