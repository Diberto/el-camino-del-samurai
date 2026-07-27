// server.js - Unified Node.js Entry Point for El Camino del Samurai
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const PB_PORT = 8090;
const DIST_DIR = path.join(__dirname, 'dist');
const PUBLIC_DIR = path.join(__dirname, 'public');

// 1. Launch PocketBase Daemon in Background
console.log('⚔️ Iniciando Servicio Backend PocketBase...');
const pbScript = path.join(__dirname, 'scripts', 'start-pocketbase.js');
const pbProcess = fork(pbScript, [], { stdio: 'inherit' });

pbProcess.on('error', (err) => {
  console.error('❌ Error al arrancar el proceso PocketBase:', err);
});

// MIME Type Mapper
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

// 2. Main Node.js Web & Proxy Server
const server = http.createServer((req, res) => {
  const reqUrl = req.url || '/';

  // Reverse Proxy for PocketBase API & Admin UI (/_/ and /api/)
  if (reqUrl.startsWith('/api/') || reqUrl.startsWith('/_/')) {
    const proxyOptions = {
      hostname: '127.0.0.1',
      port: PB_PORT,
      path: reqUrl,
      method: req.method,
      headers: { ...req.headers, host: `127.0.0.1:${PB_PORT}` }
    };

    const proxyReq = http.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'PocketBase proxy unavailable', details: err.message }));
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  // Static File Resolver
  let filePath = path.join(DIST_DIR, reqUrl);
  if (reqUrl === '/' || reqUrl === '') {
    filePath = path.join(DIST_DIR, 'index.html');
  } else if (reqUrl === '/admin' || reqUrl === '/admin/') {
    filePath = path.join(DIST_DIR, 'admin.html');
  } else if (reqUrl === '/blog' || reqUrl === '/blog/') {
    filePath = path.join(DIST_DIR, 'blog.html');
  } else if (reqUrl === '/gpu' || reqUrl === '/gpu/') {
    filePath = path.join(DIST_DIR, 'gpu.html');
  }

  // Check if file exists in dist, fallback to public or index.html
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try public dir
      const publicPath = path.join(PUBLIC_DIR, reqUrl);
      fs.stat(publicPath, (errPub, statsPub) => {
        if (!errPub && statsPub.isFile()) {
          serveStaticFile(publicPath, res);
        } else {
          // SPA Fallback to index.html
          const fallbackPath = path.join(DIST_DIR, 'index.html');
          fs.stat(fallbackPath, (errFb) => {
            if (!errFb) serveStaticFile(fallbackPath, res);
            else {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            }
          });
        }
      });
    } else {
      serveStaticFile(filePath, res);
    }
  });
});

function serveStaticFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600' });
      res.end(content);
    }
  });
}

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌸 El Camino del Samurai - Node App Server Activo`);
  console.log(`🌐 Servidor Web & API corriendo en: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

process.on('SIGINT', () => {
  pbProcess.kill();
  process.exit();
});
