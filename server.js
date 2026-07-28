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
  const fullUrl = req.url || '/';
  const pathname = fullUrl.split('?')[0];

  // Reverse Proxy for PocketBase API & Admin UI (/_/ and /api/)
  if (pathname.startsWith('/api/') || pathname.startsWith('/_/')) {
    const proxyOptions = {
      hostname: '127.0.0.1',
      port: PB_PORT,
      path: fullUrl,
      method: req.method,
      headers: { ...req.headers, host: `127.0.0.1:${PB_PORT}` }
    };

    const proxyReq = http.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      if (req.method === 'GET' && pathname.includes('/records')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ page: 1, perPage: 30, totalItems: 0, totalPages: 0, items: [] }));
      } else {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'PocketBase proxy initializing', details: err.message }));
      }
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  // Static File Resolver using clean pathname
  let filePath = path.join(DIST_DIR, pathname);
  if (pathname === '/' || pathname === '') {
    filePath = path.join(DIST_DIR, 'index.html');
  } else if (pathname === '/admin' || pathname === '/admin/' || pathname === '/admin.html') {
    filePath = path.join(DIST_DIR, 'admin.html');
  } else if (pathname === '/blog' || pathname === '/blog/' || pathname === '/blog.html') {
    filePath = path.join(DIST_DIR, 'blog.html');
  } else if (pathname === '/gpu' || pathname === '/gpu/' || pathname === '/gpu.html') {
    filePath = path.join(DIST_DIR, 'gpu.html');
  }

  // Check if file exists in dist, fallback to public or index.html
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try public dir
      const publicPath = path.join(PUBLIC_DIR, pathname);
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

function startAutoBackupWorker() {
  const CHECK_INTERVAL_MS = 60 * 60 * 1000; // Revisar cada hora
  setInterval(async () => {
    try {
      const reqSettings = http.request({
        hostname: '127.0.0.1',
        port: PB_PORT,
        path: '/api/collections/settings/records',
        method: 'GET'
      }, (resSettings) => {
        let body = '';
        resSettings.on('data', chunk => body += chunk);
        resSettings.on('end', () => {
          if (resSettings.statusCode !== 200) return;
          try {
            const data = JSON.parse(body);
            if (!data.items || data.items.length === 0) return;
            const settingsRecord = data.items[0];
            let parsedData = typeof settingsRecord.settings_data === 'string' ? JSON.parse(settingsRecord.settings_data) : settingsRecord.settings_data;
            const autoConfig = parsedData.backup_schedule || { frequency: 'disabled', retention: 10, last_backup_at: 0 };
            
            if (!autoConfig.frequency || autoConfig.frequency === 'disabled') return;

            const now = Date.now();
            const lastRun = autoConfig.last_backup_at || 0;
            let intervalMs = 24 * 60 * 60 * 1000; // Daily
            if (autoConfig.frequency === 'weekly') intervalMs = 7 * 24 * 60 * 60 * 1000;
            if (autoConfig.frequency === 'monthly') intervalMs = 30 * 24 * 60 * 60 * 1000;

            if (now - lastRun >= intervalMs) {
              console.log(`⏰ Ejecutando respaldo automático programado (${autoConfig.frequency})...`);
              const createReq = http.request({
                hostname: '127.0.0.1',
                port: PB_PORT,
                path: '/api/backups',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
              }, (createRes) => {
                if (createRes.statusCode === 200 || createRes.statusCode === 204) {
                  console.log('✅ Respaldo automático completado con éxito.');
                  autoConfig.last_backup_at = now;
                  parsedData.backup_schedule = autoConfig;
                  
                  // Update settings record
                  const updateReq = http.request({
                    hostname: '127.0.0.1',
                    port: PB_PORT,
                    path: `/api/collections/settings/records/${settingsRecord.id}`,
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' }
                  });
                  updateReq.write(JSON.stringify({ settings_data: JSON.stringify(parsedData) }));
                  updateReq.end();
                }
              });
              createReq.write(JSON.stringify({ name: `auto_${autoConfig.frequency}_${Date.now()}` }));
              createReq.end();
            }
          } catch {}
        });
      });
      reqSettings.on('error', () => {});
      reqSettings.end();
    } catch {}
  }, CHECK_INTERVAL_MS);
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🌸 El Camino del Samurai - Node App Server Activo`);
  console.log(`🌐 Servidor Web & API corriendo en el puerto: ${PORT}`);
  console.log(`=======================================================`);
  startAutoBackupWorker();
});

process.on('SIGINT', () => {
  pbProcess.kill();
  process.exit();
});

