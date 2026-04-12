import { configureStore } from '@reduxjs/toolkit';

import { taskApi } from '../../entities/task/api/api';

// Store is kept minimal and will host RTK Query state later.
export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (gDM) => gDM().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
