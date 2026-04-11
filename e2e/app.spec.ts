import { expect, test } from '@playwright/test';

test('shows root page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Test')).toBeVisible();
});
