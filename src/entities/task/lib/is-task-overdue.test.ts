import { isTaskOverdue } from './is-task-overdue';

describe('isTaskOverdue', () => {
    it('returns true when deadline is in the past and task is not done', () => {
        expect(
            isTaskOverdue({
                deadline: '2026-04-10',
                status: 'inProgress',
            }),
        ).toBe(true);
    });

    it('returns false when task status is done even if deadline is in the past', () => {
        expect(
            isTaskOverdue({
                deadline: '2026-04-10',
                status: 'done',
            }),
        ).toBe(false);
    });

    it('returns false when deadline is today or in the future', () => {
        expect(
            isTaskOverdue({
                deadline: '2099-12-31',
                status: 'todo',
            }),
        ).toBe(false);
    });
});
