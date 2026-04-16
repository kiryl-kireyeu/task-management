import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 6 }}>
                <Outlet />
            </Box>
        </Container>
    );
};

export default RootLayout;
