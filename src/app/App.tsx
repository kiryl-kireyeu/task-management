import AppRouter from './router';
import { StoreProvider } from './store';
import { AppThemeProvider } from './theme';

const App = () => {
    return (
        <StoreProvider>
            <AppThemeProvider>
                <AppRouter />
            </AppThemeProvider>
        </StoreProvider>
    );
};

export default App;
