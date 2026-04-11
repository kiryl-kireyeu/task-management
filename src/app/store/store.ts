import { configureStore } from '@reduxjs/toolkit';

// Store is kept minimal and will host RTK Query state later.
export const store = configureStore({
    reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
