import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
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
        ],
    },
]);

export default router;
