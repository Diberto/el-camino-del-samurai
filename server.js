// server.js - Unified Node.js Entry Point for El Camino del Samurai
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
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

  // Native Backup API Handler for /api/backups (bypasses 401 auth requirement)
  if (pathname === '/api/backups' || pathname.startsWith('/api/backups/')) {
    const backupDir = path.join(__dirname, 'pb_data', 'backups');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    // 1. GET /api/backups -> List Backups
    if (req.method === 'GET' && (pathname === '/api/backups' || pathname === '/api/backups/')) {
      fs.readdir(backupDir, (err, files) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify([]));
        }
        const list = files
          .filter(f => f.endsWith('.zip'))
          .map(f => {
            const stat = fs.statSync(path.join(backupDir, f));
            return { key: f, name: f, size: stat.size, modified: stat.mtime.toISOString() };
          })
          .sort((a, b) => new Date(b.modified) - new Date(a.modified));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(list));
      });
      return;
    }

    // 2. GET /api/backups/:key -> Download Backup Zip
    if (req.method === 'GET' && pathname.startsWith('/api/backups/')) {
      const filename = path.basename(pathname);
      const targetPath = path.join(backupDir, filename);
      if (fs.existsSync(targetPath) && filename.endsWith('.zip')) {
        res.writeHead(200, {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${filename}"`
        });
        fs.createReadStream(targetPath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Respaldo no encontrado' }));
      }
      return;
    }

    // 3. POST /api/backups -> Create Backup
    if (req.method === 'POST' && (pathname === '/api/backups' || pathname === '/api/backups/')) {
      performBackupCreation((err, result) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al crear el zip de respaldo', details: err.message }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }
      });
      return;
    }

    // 4. POST /api/backups/upload -> Upload Backup Zip
    if (req.method === 'POST' && pathname === '/api/backups/upload') {
      const filename = `uploaded_backup_${Date.now()}.zip`;
      const targetPath = path.join(backupDir, filename);
      const writeStream = fs.createWriteStream(targetPath);
      req.pipe(writeStream);
      writeStream.on('finish', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, key: filename }));
      });
      writeStream.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });
      return;
    }

    // 5. POST /api/backups/:key/restore -> Restore Backup Zip
    if (req.method === 'POST' && pathname.includes('/restore')) {
      const parts = pathname.split('/');
      const key = parts[3];
      const zipPath = path.join(backupDir, key);
      const pbDataDir = path.join(__dirname, 'pb_data');

      if (!fs.existsSync(zipPath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Archivo de respaldo no encontrado' }));
      }

      const isWin = process.platform === 'win32';
      const cmd = isWin
        ? `powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${pbDataDir}' -Force"`
        : `unzip -o "${zipPath}" -d "${pbDataDir}"`;

      const { exec } = await import('child_process');
      exec(cmd, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al extraer la copia de seguridad', details: err.message }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Restauración completada' }));
        }
      });
      return;
    }

    // 6. DELETE /api/backups/:key -> Delete Backup Zip
    if (req.method === 'DELETE' && pathname.startsWith('/api/backups/')) {
      const filename = path.basename(pathname);
      const targetPath = path.join(backupDir, filename);
      if (fs.existsSync(targetPath)) {
        try { fs.unlinkSync(targetPath); } catch {}
      }
      res.writeHead(204);
      res.end();
      return;
    }
  }

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
          serveStaticFile(publicPath, req, res);
        } else {
          // SPA Fallback to index.html
          const fallbackPath = path.join(DIST_DIR, 'index.html');
          fs.stat(fallbackPath, (errFb) => {
            if (!errFb) serveStaticFile(fallbackPath, req, res);
            else {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            }
          });
        }
      });
    } else {
      serveStaticFile(filePath, req, res);
    }
  });
});

function serveStaticFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const isAsset = filePath.includes(path.join('dist', 'assets'));
  const cacheHeader = isAsset ? 'public, max-age=31536000, immutable' : 'public, max-age=3600';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }

    const acceptEncoding = (req && req.headers && req.headers['accept-encoding']) || '';
    const compressable = ['.html', '.js', '.css', '.json', '.svg', '.xml'].includes(ext);

    if (compressable && acceptEncoding.includes('gzip')) {
      zlib.gzip(content, (zerr, compressed) => {
        if (zerr) {
          res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader });
          return res.end(content);
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Cache-Control': cacheHeader,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      });
    } else if (compressable && acceptEncoding.includes('deflate')) {
      zlib.deflate(content, (zerr, compressed) => {
        if (zerr) {
          res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader });
          return res.end(content);
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'deflate',
          'Cache-Control': cacheHeader,
          'Vary': 'Accept-Encoding'
        });
        res.end(compressed);
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader });
      res.end(content);
    }
  });
}

function performBackupCreation(callback) {
  const backupDir = path.join(__dirname, 'pb_data', 'backups');
  const dbPath = path.join(__dirname, 'pb_data', 'data.db');
  const storagePath = path.join(__dirname, 'pb_data', 'storage');

  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const zipName = `pb_backup_${timestamp}.zip`;
  const zipPath = path.join(backupDir, zipName);

  const isWin = process.platform === 'win32';
  const cmd = isWin
    ? `powershell -Command "Compress-Archive -Path '${dbPath}','${storagePath}' -DestinationPath '${zipPath}' -Force"`
    : `zip -r "${zipPath}" "${dbPath}" "${storagePath}"`;

  import('child_process').then(({ exec }) => {
    exec(cmd, (err) => {
      if (err) return callback(err);
      try {
        const stat = fs.statSync(zipPath);
        callback(null, { key: zipName, name: zipName, size: stat.size, modified: stat.mtime.toISOString() });
      } catch (e) {
        callback(e);
      }
    });
  }).catch(callback);
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
              performBackupCreation((err, result) => {
                if (!err && result) {
                  console.log(`✅ Respaldo automático completado con éxito: ${result.key}`);
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

