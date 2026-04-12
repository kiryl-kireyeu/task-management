import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetTasksQuery } from '../../entities/api/api';
import Loader from '../../shared/ui/loader';
import PageTitle from '../../shared/ui/page-title';

const TasksPage = () => {
    const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Alert severity="error">Failed to load tasks.</Alert>;
    }

    if (tasks.length === 0) {
        return (
            <Stack spacing={2}>
                <PageTitle>Tasks</PageTitle>
                <Alert severity="info">No tasks yet. Create the first task to get started.</Alert>
            </Stack>
        );
    }

    return (
        <Stack spacing={3}>
            <PageTitle>Tasks</PageTitle>

            <Stack spacing={2}>
                {tasks.map((task) => (
                    <Card key={task.id} variant="outlined">
                        <CardContent>
                            <Stack spacing={1.5}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                                >
                                    <Typography component="h2" variant="h6">
                                        {task.title}
                                    </Typography>

                                    <Stack direction="row" spacing={1}>
                                        <Chip label={task.status} size="small" />
                                        <Chip
                                            label={task.priority}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Stack>
                                </Stack>

                                {task.description ? (
                                    <Typography color="text.secondary">
                                        {task.description}
                                    </Typography>
                                ) : null}

                                <Typography color="text.secondary" variant="body2">
                                    Deadline: {task.deadline}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    sx={{ flexWrap: 'wrap' }}
                                >
                                    {task.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
};

export default TasksPage;
