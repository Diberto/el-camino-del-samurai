import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true
      },
      '/_/': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true
      }
    }
  },
  plugins: [
    {
      name: 'html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            req.url = '/admin.html';
          } else if (req.url === '/blog' || req.url === '/blog/') {
            req.url = '/blog.html';
          } else if (req.url === '/gpu' || req.url === '/gpu/') {
            req.url = '/gpu.html';
          }
          next();
        });
      }
    }
  ],
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
