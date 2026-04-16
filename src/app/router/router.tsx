import ErrorPage from '@pages/error';
import PageNotFound from '@pages/page-not-found';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Component } = await import('@pages/tasks');

                    return { Component };
                },
            },
            {
                path: 'task/:id',
                lazy: async () => {
                    const { default: Component } = await import('@pages/task-details');

                    return { Component };
                },
            },
            {
                path: 'create',
                lazy: async () => {
                    const { default: Component } = await import('@pages/create-task');

                    return { Component };
                },
            },
            {
                path: 'edit/:id',
                lazy: async () => {
                    const { default: Component } = await import('@pages/edit-task');

                    return { Component };
                },
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
]);

export default router;
