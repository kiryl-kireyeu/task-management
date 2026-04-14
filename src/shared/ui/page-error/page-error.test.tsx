import { fireEvent, render, screen } from '@testing-library/react';

import PageError from '.';

describe('PageError', () => {
    it('renders the error message', () => {
        render(<PageError message="Something went wrong" />);

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders action button and calls handler on click', () => {
        const handleAction = vi.fn();

        render(
            <PageError
                actionLabel="Back to list"
                message="Something went wrong"
                onAction={handleAction}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Back to list' }));

        expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('does not render action button when action props are missing', () => {
        render(<PageError message="Something went wrong" />);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
