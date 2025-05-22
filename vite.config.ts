import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use base URL for GitHub Pages deployment
  // In development, this will be '/'
  // In GitHub Actions, this will be set dynamically using the repository name
  base: process.env.BASE_URL ? `/${process.env.BASE_URL}/` : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Removed lucide-react from exclude to fix module resolution issues
  },
  build: {
    sourcemap: true,
  }
});