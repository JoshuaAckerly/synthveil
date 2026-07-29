import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    let server;
    if (env.VITE_SERVER_ENV === 'production') {
        server = {
            port: 443,
            host: '0.0.0.0',
            origin: 'https://synthveil.graveyardjokes.com',
            allowedHosts: ['synthveil.graveyardjokes.com'],
        };
    } else if (env.VITE_SERVER_ENV === 'test' || env.VITE_SERVER_ENV === 'testing') {
        server = {
            port: 8085,
            host: '127.0.0.1',
            origin: 'http://synthveil.graveyardjokes.testing:8085',
            allowedHosts: ['synthveil.graveyardjokes.testing'],
        };
    } else {
        // default: local/development
        server = {
            port: 8085,
            host: '0.0.0.0',
            origin: 'http://synthveil.graveyardjokes.local:8085',
            cors: {
                origin: [
                    'http://synthveil.graveyardjokes.local',
                    'http://synthveil.graveyardjokes.local:8004',
                    'http://localhost:8004',
                ],
                credentials: true
            },
            allowedHosts: ['synthveil.graveyardjokes.local'],
        };
    }

    return {
        server,
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'resources/js'),
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
                'react': resolve(__dirname, 'node_modules/react'),
                'react-dom': resolve(__dirname, 'node_modules/react-dom'),
                '@gj/env': resolve(__dirname, '../packages/env/src/index.ts'),
                '@gj/utils': resolve(__dirname, '../packages/utils/src/index.ts'),
                '@gj/hooks': resolve(__dirname, '../packages/hooks/src/index.ts'),
            },
            dedupe: ['react', 'react-dom', 'clsx', 'tailwind-merge'],
        },
        ssr: {
            noExternal: ['react', 'react-dom', '@inertiajs/react', '@inertiajs/core', '@headlessui/react'],
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        inertia: ['@inertiajs/react', '@inertiajs/core'],
                        sentry: ['@sentry/react'],
                    },
                },
            },
        },
    };
});
