import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack spacing={2} sx={{ py: 8, textAlign: 'center' }}>
            <Typography component="h1" variant="h4">
                Страница не найдена
            </Typography>

            <Typography color="text.secondary">
                Проверьте адрес страницы или вернитесь к списку задач.
            </Typography>

            <Box>
                <Button onClick={() => navigate('/')} variant="contained">
                    К списку задач
                </Button>
            </Box>
        </Stack>
    );
};

export default PageNotFound;
