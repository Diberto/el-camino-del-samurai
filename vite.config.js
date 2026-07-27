import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gpu: resolve(__dirname, 'gpu.html'),
        admin: resolve(__dirname, 'admin.html'),
        blog: resolve(__dirname, 'blog.html'),
      },
    },
  },
});
