import { useGetTagsQuery } from '@entities/api/api';
import type { GetTasksParams } from '@entities/api/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@shared/ui/select';

interface TaskPageControlsProps {
    filters: GetTasksParams;
    onPriorityChange: (priority: string) => void;
    onSearchChange: (search: string) => void;
    onSortChange: (sortValue: string) => void;
    onStatusChange: (status: string) => void;
    onTagChange: (tag: string) => void;
    sortValue: string;
}

const TaskPageControlsForm = ({
    filters,
    onPriorityChange,
    onSearchChange,
    onSortChange,
    onStatusChange,
    onTagChange,
    sortValue,
}: TaskPageControlsProps) => {
    const { data: tags = [] } = useGetTagsQuery();

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    lg: 'repeat(4, minmax(0, 1fr)) auto',
                },
                gap: 2,
                alignItems: 'end',
            }}
        >
            <Select
                fullWidth
                label="Status"
                emptyOptionLabel="All statuses"
                name="status"
                onChange={onStatusChange}
                options={[
                    { label: 'To do', value: 'todo' },
                    { label: 'In progress', value: 'inProgress' },
                    { label: 'Done', value: 'done' },
                ]}
                value={filters.status ?? ''}
            />

            <Select
                fullWidth
                label="Priority"
                emptyOptionLabel="All priorities"
                name="priority"
                onChange={onPriorityChange}
                options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                ]}
                value={filters.priority ?? ''}
            />

            <Select
                fullWidth
                label="Tag"
                emptyOptionLabel="All tags"
                name="tag"
                onChange={onTagChange}
                options={tags.map((tag) => ({
                    label: tag.name,
                    value: tag.name,
                }))}
                value={filters.tag ?? ''}
            />

            <TextField
                fullWidth
                label="Search task"
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by title"
                value={filters.search ?? ''}
            />

            <Select
                fullWidth
                label="Sort by"
                name="sort"
                onChange={onSortChange}
                options={[
                    { label: 'Created date: newest first', value: 'createdAt-desc' },
                    { label: 'Created date: oldest first', value: 'createdAt-asc' },
                    { label: 'Deadline: nearest first', value: 'deadline-asc' },
                    { label: 'Deadline: latest first', value: 'deadline-desc' },
                ]}
                value={sortValue}
            />
        </Box>
    );
};

const TaskPageControls = (props: TaskPageControlsProps) => {
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Accordion disableGutters elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Filters and sort</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TaskPageControlsForm {...props} />
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <TaskPageControlsForm {...props} />
            </Box>
        </>
    );
};

export default TaskPageControls;
