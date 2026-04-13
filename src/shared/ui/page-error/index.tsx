import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';

interface PageErrorProps {
    actionLabel?: string;
    maxWidth?: ContainerProps['maxWidth'];
    message: string;
    onAction?: () => void;
}

const PageError = ({ actionLabel, maxWidth = 'md', message, onAction }: PageErrorProps) => {
    return (
        <Container maxWidth={maxWidth} sx={{ py: 4 }}>
            <Alert severity="error">{message}</Alert>
            {actionLabel && onAction ? (
                <Box sx={{ mt: 2 }}>
                    <Button onClick={onAction}>{actionLabel}</Button>
                </Box>
            ) : null}
        </Container>
    );
};

export default PageError;
