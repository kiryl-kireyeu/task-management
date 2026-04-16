import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    use: {
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry',
    },
    webServer: [
        {
            command: 'npm run server',
            url: 'http://127.0.0.1:3001',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
        {
            command: 'npm run dev -- --host 127.0.0.1 --port 4173',
            url: 'http://127.0.0.1:4173',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
    ],
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
