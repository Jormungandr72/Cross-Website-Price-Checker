import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(() => {
    const envDir = path.resolve(__dirname, '../shared-config/.env');
    const envConfig = dotenv.config({ path: envDir });

    return {
        plugins: [react()],
        base: './',
        build: {
            outDir: 'dist'
        },
        define: {
            'import.meta.env': JSON.stringify(envConfig.parsed)
        }
    }
})
