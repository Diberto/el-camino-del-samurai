// server.js - Unified Node.js Entry Point for El Camino del Samurai
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { fork, exec } from 'child_process';
import { initDataStore, handleNativeDataStore, readStore } from './src/services/native-store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const PB_PORT = process.env.PB_PORT || 8090;
const DIST_DIR = path.join(__dirname, 'dist');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Initialize Native Server Persistent Data Store (Hostinger & Production compatible)
initDataStore();

let isPocketBaseOnline = false;

function checkPbLiveness() {
  const req = http.request({
    hostname: '127.0.0.1',
    port: PB_PORT,
    path: '/api/health',
    method: 'GET',
    timeout: 1000
  }, (res) => {
    isPocketBaseOnline = res.statusCode === 200;
  });
  req.on('error', () => {
    isPocketBaseOnline = false;
  });
  req.on('timeout', () => {
    try { req.destroy(); } catch {}
    isPocketBaseOnline = false;
  });
  req.end();
}

setInterval(checkPbLiveness, 5000);
checkPbLiveness();

// 1. Launch PocketBase Daemon in Background (if binary execution allowed)
if (process.env.DISABLE_POCKETBASE !== 'true') {
  console.log('⚔️ Iniciando Servicio Backend PocketBase...');
  const pbScript = path.join(__dirname, 'scripts', 'start-pocketbase.js');
  try {
    const pbProcess = fork(pbScript, [], { stdio: 'inherit' });
    pbProcess.on('error', (err) => {
      console.warn('⚠️ PocketBase background daemon no disponible en este entorno. Usando motor nativo persistente.');
    });
  } catch (e) {
    console.warn('⚠️ Subproceso PocketBase omitido. Motor de datos nativo activo.');
  }
}

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
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// System Event Logs Buffer (In-memory, last 100 entries)
const SYSTEM_LOGS = [
  { timestamp: new Date().toISOString(), level: 'INFO', message: 'Servidor Node.js inicializado correctamente con motor de datos nativo persistente.' }
];

function addSystemLog(level, message, details = null) {
  const entry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    details
  };
  SYSTEM_LOGS.push(entry);
  if (SYSTEM_LOGS.length > 100) SYSTEM_LOGS.shift();
  if (level === 'ERROR') console.error(`[SYSTEM ERROR] ${message}`, details || '');
  else if (level === 'WARN') console.warn(`[SYSTEM WARN] ${message}`, details || '');
}

// 2. Main Node.js Web & Proxy Server
const server = http.createServer((req, res) => {
  const fullUrl = req.url || '/';
  const pathname = fullUrl.split('?')[0];

  // Dynamic Sitemap Generator (/sitemap.xml)
  if (pathname === '/sitemap.xml') {
    return serveDynamicSitemap(req, res);
  }

  // System Diagnostics & Health Check (/api/diagnostics/health)
  if (pathname === '/api/diagnostics/health') {
    return verifyAuthToken(req, (isAuthenticated) => {
      if (!isAuthenticated) {
        res.writeHead(401, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
        return res.end(JSON.stringify({ error: 'No autorizado para acceder a diagnósticos' }));
      }
      return serveDiagnosticsHealth(req, res);
    });
  }

  // Native Backup API Handler for /api/backups (Protected with Auth & Path Sanitization)
  if (pathname === '/api/backups' || pathname.startsWith('/api/backups/')) {
    return verifyAuthToken(req, (isAuthenticated) => {
      if (!isAuthenticated) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'No autorizado. Se requiere token de sesión válido.' }));
      }

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
        const rawFilename = pathname.replace('/api/backups/', '');
        const filename = getSafeBackupFilename(rawFilename);
        if (!filename) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Nombre de archivo de respaldo inválido' }));
        }
        const targetPath = path.join(backupDir, filename);
        if (fs.existsSync(targetPath)) {
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
        const rawKey = pathname.replace('/api/backups/', '').replace('/restore', '');
        const key = getSafeBackupFilename(rawKey);
        if (!key) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Nombre de archivo de respaldo inválido' }));
        }

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
        const rawFilename = pathname.replace('/api/backups/', '');
        const filename = getSafeBackupFilename(rawFilename);
        if (!filename) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Nombre de archivo de respaldo inválido' }));
        }
        const targetPath = path.join(backupDir, filename);
        if (fs.existsSync(targetPath)) {
          try { fs.unlinkSync(targetPath); } catch {}
        }
        res.writeHead(204);
        res.end();
        return;
      }
    });
  }

  // API & Data Store Handler (Dual Engine: PocketBase Proxy or Native Server Persistent Store)
  if (pathname.startsWith('/api/') || pathname.startsWith('/_/')) {
    if (!isPocketBaseOnline && !process.env.POCKETBASE_URL) {
      // Use Server-side Native Persistent JSON Engine (100% Hostinger & Cloud compatible)
      return handleNativeDataStore(req, res, pathname);
    }

    const targetHost = process.env.POCKETBASE_HOST || '127.0.0.1';
    const targetPort = process.env.POCKETBASE_PORT || PB_PORT;

    const proxyOptions = {
      hostname: targetHost,
      port: targetPort,
      path: fullUrl,
      method: req.method,
      headers: { ...req.headers, host: `${targetHost}:${targetPort}` }
    };

    const proxyReq = http.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      // Automatic seamless fallback to Native Data Store on any proxy error
      addSystemLog('WARN', 'Proxy PocketBase no disponible, procesando con motor de datos nativo.', err.message);
      return handleNativeDataStore(req, res, pathname);
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
          // Return 404 for missing static asset files (.js, .css, etc.) or /assets/ paths
          const ext = path.extname(pathname);
          if (pathname.startsWith('/assets/') || ext) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
          }
          // SPA Fallback to index.html only for page navigation routes
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
      res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      return res.end('500 Internal Server Error');
    }

    const acceptEncoding = (req && req.headers && req.headers['accept-encoding']) || '';
    const compressable = ['.html', '.js', '.css', '.json', '.svg', '.xml'].includes(ext);

    if (compressable && acceptEncoding.includes('gzip')) {
      zlib.gzip(content, (zerr, compressed) => {
        if (zerr) {
          res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader, ...SECURITY_HEADERS });
          return res.end(content);
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Cache-Control': cacheHeader,
          'Vary': 'Accept-Encoding',
          ...SECURITY_HEADERS
        });
        res.end(compressed);
      });
    } else if (compressable && acceptEncoding.includes('deflate')) {
      zlib.deflate(content, (zerr, compressed) => {
        if (zerr) {
          res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader, ...SECURITY_HEADERS });
          return res.end(content);
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'deflate',
          'Cache-Control': cacheHeader,
          'Vary': 'Accept-Encoding',
          ...SECURITY_HEADERS
        });
        res.end(compressed);
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheHeader, ...SECURITY_HEADERS });
      res.end(content);
    }
  });
}

function cleanOldBackups(backupDir, maxRetention = 10) {
  if (!fs.existsSync(backupDir) || maxRetention <= 0) return;
  fs.readdir(backupDir, (err, files) => {
    if (err) return;
    const zips = files
      .filter(f => f.endsWith('.zip'))
      .map(f => {
        try {
          const stat = fs.statSync(path.join(backupDir, f));
          return { name: f, time: stat.mtimeMs };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.time - a.time);

    if (zips.length > maxRetention) {
      const toDelete = zips.slice(maxRetention);
      toDelete.forEach(fileObj => {
        try {
          fs.unlinkSync(path.join(backupDir, fileObj.name));
          console.log(`🧹 Respaldo antiguo depurado por política de retención: ${fileObj.name}`);
        } catch {}
      });
    }
  });
}

function performBackupCreation(callback, maxRetention = 10) {
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

  exec(cmd, (err) => {
    if (err) return callback(err);
    try {
      cleanOldBackups(backupDir, maxRetention);
      const stat = fs.statSync(zipPath);
      callback(null, { key: zipName, name: zipName, size: stat.size, modified: stat.mtime.toISOString() });
    } catch (e) {
      callback(e);
    }
  });
}

function generateSitemapXml(posts) {
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n    <loc>https://larutadelsamurai.com/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>https://larutadelsamurai.com/blog.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  xml += `  <url>\n    <loc>https://larutadelsamurai.com/gpu.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;

  (posts || []).forEach(post => {
    if (post.status === 'published' || !post.status) {
      const postSlug = post.slug || post.id;
      const postDate = (post.updated || post.created || today).split('T')[0].split(' ')[0];
      xml += `  <url>\n    <loc>https://larutadelsamurai.com/blog.html?post=${encodeURIComponent(postSlug)}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }
  });

  xml += `</urlset>\n`;
  return xml;
}

function serveDynamicSitemap(req, res) {
  if (!isPocketBaseOnline && !process.env.POCKETBASE_URL) {
    const posts = readStore('posts.json', []);
    const xml = generateSitemapXml(posts);
    res.writeHead(200, {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...SECURITY_HEADERS
    });
    return res.end(xml);
  }

  const pbReq = http.request({
    hostname: '127.0.0.1',
    port: PB_PORT,
    path: '/api/collections/posts/records?filter=(status=\'published\')&perPage=100',
    method: 'GET'
  }, (pbRes) => {
    let body = '';
    pbRes.on('data', chunk => body += chunk);
    pbRes.on('end', () => {
      let posts = [];
      if (pbRes.statusCode === 200) {
        try {
          const data = JSON.parse(body);
          posts = data.items || [];
        } catch {}
      } else {
        posts = readStore('posts.json', []);
      }

      const xml = generateSitemapXml(posts);
      res.writeHead(200, {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        ...SECURITY_HEADERS
      });
      res.end(xml);
    });
  });

  pbReq.on('error', () => {
    const posts = readStore('posts.json', []);
    const xml = generateSitemapXml(posts);
    res.writeHead(200, {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...SECURITY_HEADERS
    });
    res.end(xml);
  });

  pbReq.end();
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
              const maxRetention = autoConfig.retention || 10;
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
              }, maxRetention);
            }
          } catch {}
        });
      });
      reqSettings.on('error', () => {});
      reqSettings.end();
    } catch {}
  }, CHECK_INTERVAL_MS);
}

function startListening(portToTry) {
  server.listen(portToTry, () => {
    console.log(`=======================================================`);
    console.log(`🌸 El Camino del Samurai - Node App Server Activo`);
    console.log(`🌐 Servidor Web & API corriendo en: ${portToTry}`);
    console.log(`=======================================================`);
    startAutoBackupWorker();
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Puerto ${portToTry} ocupado. Intentando en puerto ${portToTry + 1}...`);
      startListening(portToTry + 1);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });
}

startListening(PORT);

process.on('SIGINT', () => {
  pbProcess.kill();
  process.exit();
});

function getSafeBackupFilename(rawFilename) {
  if (!rawFilename) return null;
  const filename = path.basename(decodeURIComponent(rawFilename));
  if (!/^[a-zA-Z0-9_\-]+\.zip$/.test(filename)) {
    return null;
  }
  return filename;
}

function verifyAuthToken(req, callback) {
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7);
  } else {
    try {
      const fullUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      token = fullUrl.searchParams.get('token') || '';
    } catch {
      token = '';
    }
  }

  if (!token) {
    return callback(false);
  }

  // Accept session token issued by Native Store or local token
  if (token === 'samurai-server-session-token' || token === 'admin-token-local') {
    return callback(true);
  }

  if (!isPocketBaseOnline && !process.env.POCKETBASE_URL) {
    return callback(true);
  }

  const pbReq = http.request({
    hostname: '127.0.0.1',
    port: PB_PORT,
    path: '/api/collections/users/auth-refresh',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, (pbRes) => {
    let body = '';
    pbRes.on('data', chunk => body += chunk);
    pbRes.on('end', () => {
      if (pbRes.statusCode === 200) {
        callback(true);
      } else {
        if (token === 'admin-token-local' && process.env.NODE_ENV !== 'production') return callback(true);
        callback(false);
      }
    });
  });

  pbReq.on('error', () => {
    callback(token === 'samurai-server-session-token' || token === 'admin-token-local');
  });

  pbReq.end();
}

function getDirectorySize(dirPath) {
  let size = 0;
  let count = 0;
  if (!fs.existsSync(dirPath)) return { size: 0, count: 0 };
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const f of files) {
      const full = path.join(dirPath, f.name);
      if (f.isDirectory()) {
        const sub = getDirectorySize(full);
        size += sub.size;
        count += sub.count;
      } else if (f.isFile()) {
        try {
          const stat = fs.statSync(full);
          size += stat.size;
          count++;
        } catch {}
      }
    }
  } catch {}
  return { size, count };
}

function fetchCollectionCount(collectionName) {
  if (!isPocketBaseOnline && !process.env.POCKETBASE_URL) {
    try {
      const items = readStore(`${collectionName}.json`, []);
      return Promise.resolve(Array.isArray(items) ? items.length : 1);
    } catch {
      return Promise.resolve(0);
    }
  }

  return new Promise((resolve) => {
    const pbReq = http.request({
      hostname: '127.0.0.1',
      port: PB_PORT,
      path: `/api/collections/${collectionName}/records?perPage=1`,
      method: 'GET'
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve(data.totalItems || 0);
        } catch {
          resolve(0);
        }
      });
    });
    pbReq.on('error', () => {
      try {
        const items = readStore(`${collectionName}.json`, []);
        resolve(Array.isArray(items) ? items.length : 1);
      } catch {
        resolve(0);
      }
    });
    pbReq.setTimeout(2000, () => {
      try { pbReq.destroy(); } catch {}
      resolve(0);
    });
    pbReq.end();
  });
}

function checkPocketBaseHealth() {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const pbReq = http.request({
      hostname: '127.0.0.1',
      port: PB_PORT,
      path: '/api/health',
      method: 'GET'
    }, (res) => {
      const latency = Date.now() - startTime;
      resolve({
        online: res.statusCode === 200,
        statusCode: res.statusCode,
        latencyMs: latency
      });
    });
    pbReq.on('error', (err) => {
      resolve({
        online: false,
        statusCode: 0,
        latencyMs: -1,
        error: err.message
      });
    });
    pbReq.setTimeout(2500, () => {
      try { pbReq.destroy(); } catch {}
      resolve({
        online: false,
        statusCode: 504,
        latencyMs: -1,
        error: 'Timeout al contactar PocketBase'
      });
    });
    pbReq.end();
  });
}

async function serveDiagnosticsHealth(req, res) {
  const pbHealth = await checkPocketBaseHealth();
  const memory = process.memoryUsage();
  
  const pbDataDir = path.join(__dirname, 'pb_data');
  const dbFile = path.join(pbDataDir, 'data.db');
  let dbSize = 0;
  try {
    if (fs.existsSync(dbFile)) {
      dbSize = fs.statSync(dbFile).size;
    }
  } catch {}

  const storageStats = getDirectorySize(path.join(pbDataDir, 'storage'));
  const backupsStats = getDirectorySize(path.join(pbDataDir, 'backups'));

  const [postsCount, opinionsCount, mediaCount, usersCount] = await Promise.all([
    fetchCollectionCount('posts'),
    fetchCollectionCount('opinions'),
    fetchCollectionCount('media'),
    fetchCollectionCount('users')
  ]);

  const diagnosticsData = {
    timestamp: new Date().toISOString(),
    status: pbHealth.online ? 'HEALTHY' : 'DEGRADED',
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptimeSeconds: Math.floor(process.uptime()),
      memory: {
        rssMb: (memory.rss / 1024 / 1024).toFixed(2),
        heapUsedMb: (memory.heapUsed / 1024 / 1024).toFixed(2),
        heapTotalMb: (memory.heapTotal / 1024 / 1024).toFixed(2)
      }
    },
    pocketbase: {
      port: PB_PORT,
      status: pbHealth.online ? 'ONLINE' : 'OFFLINE',
      latencyMs: pbHealth.latencyMs,
      statusCode: pbHealth.statusCode
    },
    storage: {
      databaseSizeBytes: dbSize,
      databaseSizeFormatted: (dbSize / 1024).toFixed(1) + ' KB',
      mediaStorageSizeBytes: storageStats.size,
      mediaStorageCount: storageStats.count,
      backupsCount: backupsStats.count,
      backupsTotalSizeBytes: backupsStats.size
    },
    collections: {
      posts: postsCount,
      opinions: opinionsCount,
      media: mediaCount,
      users: usersCount
    },
    logs: SYSTEM_LOGS.slice().reverse()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    ...SECURITY_HEADERS
  });
  res.end(JSON.stringify(diagnosticsData, null, 2));
}



