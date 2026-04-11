import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout';
import CreateTaskPage from '../../pages/create-task';
import EditTaskPage from '../../pages/edit-task';
import TaskDetailsPage from '../../pages/task-details';
import TasksPage from '../../pages/tasks';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <TasksPage />,
            },
            {
                path: 'task/:id',
                element: <TaskDetailsPage />,
            },
            {
                path: 'create',
                element: <CreateTaskPage />,
            },
            {
                path: 'edit/:id',
                element: <EditTaskPage />,
            },
        ],
    },
]);

export default router;
