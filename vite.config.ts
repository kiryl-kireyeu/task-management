import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) {
                        return;
                    }

                    if (id.includes('@mui')) {
                        return 'mui';
                    }

                    if (id.includes('@reduxjs/toolkit')) {
                        return 'rtk';
                    }

                    if (
                        id.includes('react-router-dom') ||
                        id.includes('react-dom') ||
                        id.includes('/react/')
                    ) {
                        return 'react-vendor';
                    }

                    if (id.includes('dayjs')) {
                        return 'dayjs';
                    }

                    return 'vendor';
                },
            },
        },
    },
});
