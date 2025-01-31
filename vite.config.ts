import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
            { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
            { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
            { find: '@store', replacement: path.resolve(__dirname, 'src/store') }
        ]
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true
    }
});