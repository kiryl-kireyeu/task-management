import PageError from '@shared/ui/page-error';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <PageError
                actionLabel="На главную"
                maxWidth="sm"
                message="Страница не найдена."
                onAction={() => {
                    window.location.assign('/');
                }}
            />
        );
    }

    return (
        <PageError
            actionLabel="Обновить страницу"
            maxWidth="sm"
            message="Не удалось загрузить страницу. Проверьте подключение к интернету и попробуйте снова."
            onAction={() => {
                window.location.reload();
            }}
        />
    );
};

export default ErrorPage;
