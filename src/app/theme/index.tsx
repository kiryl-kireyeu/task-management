import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';

import { appTheme } from './theme';

export function AppThemeProvider({ children }: PropsWithChildren) {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
