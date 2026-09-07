const fs = require('fs');
const path = require('path');

async function syncAll() {
  console.log('--- Step 1: Logging in ---');
  const initialRes = await fetch('https://larutadelsamurai.com/admin/login.php');
  let cookie = initialRes.headers.get('set-cookie')?.split(';')[0];

  const body = new URLSearchParams();
  body.append('username', 'admin');
  body.append('password', 'samurai2026');

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  if (cookie) headers['Cookie'] = cookie;

  const loginRes = await fetch('https://larutadelsamurai.com/admin/login.php', {
    method: 'POST',
    headers,
    body: body.toString(),
    redirect: 'manual'
  });

  const loginSetCookie = loginRes.headers.get('set-cookie');
  if (loginSetCookie) cookie = loginSetCookie.split(';')[0];
  console.log('Session Cookie:', cookie);

  console.log('\n--- Step 2: Listing all remote media via admin/api_media.php ---');
  const mediaRes = await fetch('https://larutadelsamurai.com/admin/api_media.php', {
    headers: { 'Cookie': cookie }
  });
  const mediaData = await mediaRes.json();
  console.log(`Total remote media files: ${mediaData.total}`);

  let downloadedCount = 0;
  for (const item of mediaData.media) {
    const localPath = path.join(__dirname, '..', item.path);
    if (!fs.existsSync(localPath)) {
      console.log(`Downloading missing media: ${item.path}...`);
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const fileRes = await fetch(`https://larutadelsamurai.com/${encodeURI(item.path)}`);
      if (fileRes.status === 200) {
        const buffer = await fileRes.arrayBuffer();
        fs.writeFileSync(localPath, Buffer.from(buffer));
        downloadedCount++;
      } else {
        console.error(`Failed to download ${item.path}: HTTP ${fileRes.status}`);
      }
    }
  }
  console.log(`Downloaded ${downloadedCount} missing media files.`);

  console.log('\n--- Step 3: Downloading remote JSON databases ---');
  const jsons = ['blog.json', 'galeria.json', 'opiniones.json', 'libros.json', 'config.json', 'analytics.json'];
  for (const file of jsons) {
    const url = `https://larutadelsamurai.com/admin/backups.php?download_json=${file}`;
    const res = await fetch(url, { headers: { 'Cookie': cookie } });
    if (res.status === 200 && res.headers.get('content-type')?.includes('json')) {
      const text = await res.text();
      // Verify valid JSON
      JSON.parse(text);
      // Save directly to data/ directory
      const destPath = path.join(__dirname, '..', 'data', file);
      fs.writeFileSync(destPath, text, 'utf8');
      console.log(`Successfully synced and saved data/${file} (${text.length} bytes)`);
    } else {
      console.error(`Failed to download data/${file}: status ${res.status}`);
    }
  }

  console.log('\n🎉 ALL REMOTE DATA AND MEDIA SAFELY SYNCED!');
}

syncAll().catch(console.error);
