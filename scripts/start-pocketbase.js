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
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${binDir}' -Force"`);
  } else {
    execSync(`unzip -o "${zipPath}" -d "${binDir}"`);
    fs.chmodSync(binPath, 0o755);
  }

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }

  console.log('✨ PocketBase instalado correctamente.');
}

async function main() {
  try {
    await ensureBinary();

    console.log('🚀 Iniciando PocketBase Backend en http://127.0.0.1:8090...');
    const pbProcess = spawn(binPath, ['serve', '--http=127.0.0.1:8090'], {
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
