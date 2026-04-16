import Add from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import PageTitle from '@shared/ui/page-title';
import { Link as RouterLink } from 'react-router-dom';

const TaskPageHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: 2,
            }}
        >
            <PageTitle title="Список задач" />

            <Button
                sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
                to="/create"
                size="medium"
                variant="contained"
                startIcon={<Add />}
                component={RouterLink}
            >
                Создать задачу
            </Button>
        </Box>
    );
};

export default TaskPageHeader;
