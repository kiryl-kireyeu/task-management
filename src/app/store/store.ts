import { entitiesApi } from '@entities/api/api';
import { configureStore } from '@reduxjs/toolkit';

// Store is kept minimal and will host RTK Query state later.
export const store = configureStore({
    reducer: {
        [entitiesApi.reducerPath]: entitiesApi.reducer,
    },
    middleware: (gDM) => gDM().concat(entitiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
