import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TaskPageControlsForm, { type TaskPageControlsProps } from './task-page-controls-form';

const TaskPageControls = (props: TaskPageControlsProps) => {
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Accordion disableGutters elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1">Фильтры и сортировка</Typography>
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
