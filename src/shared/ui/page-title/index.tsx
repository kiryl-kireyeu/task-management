import Typography from '@mui/material/Typography';
import type { PropsWithChildren } from 'react';

const PageTitle = ({ children }: PropsWithChildren) => {
    return (
        <Typography component="h1" gutterBottom variant="h4">
            {children}
        </Typography>
    );
};

export default PageTitle;
