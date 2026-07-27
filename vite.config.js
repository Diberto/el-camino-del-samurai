import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
