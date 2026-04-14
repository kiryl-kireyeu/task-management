import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import PageTitle from '@shared/ui/page-title';
import type { ReactNode } from 'react';

interface PageShellProps {
    title: string;
    actions?: ReactNode;
    paperSx?: SxProps<Theme>;
    maxWidth?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    backButtonText?: string;
    onBack: () => void;
}

const PageShell = ({
    title,
    actions,
    paperSx,
    children,
    maxWidth = 'md',
    backButtonText = 'Назад',
    onBack,
}: PageShellProps) => {
    return (
        <Container maxWidth={maxWidth} sx={{ py: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
                {backButtonText}
            </Button>

            <Stack
                direction="row"
                sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}
            >
                <PageTitle title={title} />
                {actions}
            </Stack>

            <Paper sx={{ p: 4, ...paperSx }}>{children}</Paper>
        </Container>
    );
};

export default PageShell;
