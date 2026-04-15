import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    cssVariables: true,
    palette: {
        mode: 'dark',
        primary: {
            main: '#3b82f6',
        },
        secondary: {
            main: '#262626',
        },
    },
});
