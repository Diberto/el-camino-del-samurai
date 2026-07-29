// scripts/start-pocketbase.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, execSync } from 'child_process';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const binDir = path.join(rootDir, 'bin', 'pocketbase');
const dataDir = path.join(rootDir, 'pb_data');
const migrationsDir = path.join(binDir, 'pb_migrations');
const isWin = process.platform === 'win32';
const exeName = isWin ? 'pocketbase.exe' : 'pocketbase';
const binPath = path.join(binDir, exeName);

const VERSION = '0.22.14';

function getDownloadUrl() {
  const platform = process.platform;
  const arch = process.arch;

  let osName = 'linux';
  let archName = 'amd64';

  if (platform === 'win32') osName = 'windows';
  else if (platform === 'darwin') osName = 'darwin';
  else osName = 'linux';

  if (arch === 'arm64') archName = 'arm64';
  else archName = 'amd64';

  return `https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${osName}_${archName}.zip`;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Descargando PocketBase desde: ${url}...`);
    const file = fs.createWriteStream(dest);

    function get(currentUrl) {
      https.get(currentUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Error en la descarga: HTTP ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    get(url);
  });
}

async function ensureBinary() {
  if (fs.existsSync(binPath)) {
    console.log(`✅ Binario de PocketBase detectado en: ${binPath}`);
    if (!isWin) {
      try { fs.chmodSync(binPath, 0o755); } catch {}
    }
    return;
  }

  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }

  const zipPath = path.join(binDir, 'pocketbase.zip');
  const url = getDownloadUrl();

  await downloadFile(url, zipPath);

  console.log('📦 Extrayendo binario de PocketBase...');
  if (isWin) {
    try {
      execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${binDir}' -Force"`, { stdio: 'ignore' });
    } catch {
      execSync(`tar -xf "${zipPath}" -C "${binDir}"`, { stdio: 'ignore' });
    }
  } else {
    try {
      execSync(`unzip -q -o "${zipPath}" -d "${binDir}"`, { stdio: 'ignore' });
    } catch {
      try {
        execSync(`python3 -m zipfile -e "${zipPath}" "${binDir}"`, { stdio: 'ignore' });
      } catch {
        execSync(`tar -xf "${zipPath}" -C "${binDir}"`, { stdio: 'ignore' });
      }
    }
    try {
      fs.chmodSync(binPath, 0o755);
    } catch {}
  }

  if (fs.existsSync(zipPath)) {
    try { fs.unlinkSync(zipPath); } catch {}
  }

  console.log('✨ PocketBase instalado correctamente.');
}

async function main() {
  try {
    await ensureBinary();

    if (!isWin && fs.existsSync(binPath)) {
      try { fs.chmodSync(binPath, 0o755); } catch {}
    }

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir, { recursive: true });

    // Sync root pb_migrations to bin/pocketbase/pb_migrations
    const rootMigrations = path.join(rootDir, 'pb_migrations');
    if (fs.existsSync(rootMigrations)) {
      const files = fs.readdirSync(rootMigrations);
      for (const file of files) {
        fs.copyFileSync(path.join(rootMigrations, file), path.join(migrationsDir, file));
      }
    }
    const dbPath = path.join(dataDir, 'data.db');
    if (fs.existsSync(dbPath)) {
      try {
        const { DatabaseSync } = await import('node:sqlite');
        const db = new DatabaseSync(dbPath);
        db.exec("UPDATE _collections SET listRule=NULL, viewRule=NULL, createRule=NULL, updateRule=NULL, deleteRule=NULL WHERE name IN ('settings', 'posts', 'media');");
        db.close();
        console.log('🔓 Colecciones de PocketBase desbloqueadas correctamente vía node:sqlite.');
      } catch (errNodeSqlite) {
        try {
          execSync(`python3 -c "import sqlite3; conn = sqlite3.connect('${dbPath}'); c = conn.cursor(); c.execute(\\\"UPDATE _collections SET listRule=NULL, viewRule=NULL, createRule=NULL, updateRule=NULL, deleteRule=NULL WHERE name IN ('settings', 'posts', 'media')\\\"); conn.commit()"`, { stdio: 'ignore' });
        } catch (_) {}
      }
    }

    const pbPort = process.env.PB_PORT || '8090';
    console.log(`🚀 Iniciando PocketBase Backend en http://127.0.0.1:${pbPort}...`);
    const pbProcess = spawn(binPath, [
      'serve',
      `--http=127.0.0.1:${pbPort}`,
      `--dir=${dataDir}`,
      `--migrationsDir=${migrationsDir}`
    ], {
      cwd: rootDir,
      stdio: 'inherit'
    });

    pbProcess.on('error', (err) => {
      console.error('❌ Error al ejecutar PocketBase:', err);
    });

    process.on('SIGINT', () => {
      pbProcess.kill();
      process.exit();
    });
  } catch (err) {
    console.error('❌ Fallo al inicializar el servicio PocketBase:', err.message);
  }
}

main();
