import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Allow connections from network (needed for Codespaces port forwarding)
    host: '0.0.0.0', // Changed from '::' for broader compatibility
    port: 8080, // Or your preferred port
  },
  plugins: [
    react(),
    // Removed: lovable-tagger plugin usage
  ].filter(Boolean), // Keep filter(Boolean) in case other conditional plugins are added later
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
