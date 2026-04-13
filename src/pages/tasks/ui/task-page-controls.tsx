import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useGetTagsQuery } from '../../../entities/api/api';
import type { GetTasksParams } from '../../../entities/api/types';

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
            <FormControl fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                    label="Status"
                    labelId="status-filter-label"
                    onChange={(event) => onStatusChange(event.target.value)}
                    value={filters.status ?? ''}
                >
                    <MenuItem value="">All statuses</MenuItem>
                    <MenuItem value="todo">To do</MenuItem>
                    <MenuItem value="inProgress">In progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="priority-filter-label">Priority</InputLabel>
                <Select
                    label="Priority"
                    labelId="priority-filter-label"
                    onChange={(event) => onPriorityChange(event.target.value)}
                    value={filters.priority ?? ''}
                >
                    <MenuItem value="">All priorities</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="tag-filter-label">Tag</InputLabel>
                <Select
                    label="Tag"
                    labelId="tag-filter-label"
                    onChange={(event) => onTagChange(event.target.value)}
                    value={filters.tag ?? ''}
                >
                    <MenuItem value="">All tags</MenuItem>
                    {tags.map((tag) => (
                        <MenuItem key={tag.id} value={tag.name}>
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Search task"
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by title"
                value={filters.search ?? ''}
            />

            <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                    label="Sort by"
                    labelId="sort-by-label"
                    onChange={(event) => onSortChange(event.target.value)}
                    value={sortValue}
                >
                    <MenuItem value="createdAt-desc">Created date: newest first</MenuItem>
                    <MenuItem value="createdAt-asc">Created date: oldest first</MenuItem>
                    <MenuItem value="deadline-asc">Deadline: nearest first</MenuItem>
                    <MenuItem value="deadline-desc">Deadline: latest first</MenuItem>
                </Select>
            </FormControl>
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
