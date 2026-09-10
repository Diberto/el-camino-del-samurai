import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WIDTH = 1600;
const HEIGHT = 2240;
const STRIP_WIDTH = Math.round(WIDTH * 0.135); // 216px

// Helper to generate a crisp SVG barcode at 1600px scale
function generateBarcodeSvg(isbn, width = 368, height = 176) {
  const bars = [
    1,0,1, // start
    0,1,1,0,0,1,0, 0,1,0,0,1,1,0, 0,1,1,0,0,1,0, 0,0,1,1,0,1,0, 0,1,0,0,1,1,0, 0,1,1,0,0,1,0,
    0,1,0,1,0, // guard center
    1,1,0,0,1,0,0, 1,0,0,1,0,0,0, 1,1,1,0,0,1,0, 1,1,0,1,1,0,0, 1,0,0,0,0,1,0, 1,0,0,1,0,0,0,
    1,0,1 // end
  ];
  
  const scale = width / 230; // 1.6
  const barWidth = 1.95 * scale;
  const startX = 28;
  let rects = '';
  
  bars.forEach((b, i) => {
    if (b === 1) {
      const isGuard = i < 3 || (i >= 45 && i < 50) || i >= 92;
      const h = isGuard ? Math.round(72 * scale) : Math.round(64 * scale);
      rects += `<rect x="${(startX + i * barWidth).toFixed(1)}" y="${Math.round(12 * scale)}" width="${(barWidth * 0.92).toFixed(1)}" height="${h}" fill="#111111" />\n`;
    }
  });

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#ffffff" />
    ${rects}
    <text x="${width / 2}" y="${Math.round(160 * scale / 1.6)}" font-family="'Segoe UI', Arial, sans-serif" font-size="${Math.round(13 * scale)}" font-weight="700" text-anchor="middle" fill="#111111" letter-spacing="3">${isbn}</text>
  </svg>
  `;
}

// Logo Autores de Argentina in clean SVG at 1600px scale
function getAutoresDeArgentinaSvg(width = 832, height = 112) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 520 70" xmlns="http://www.w3.org/2000/svg">
    <!-- Emblem circle -->
    <circle cx="35" cy="35" r="26" fill="none" stroke="#111111" stroke-width="4.5" />
    <path d="M35 15 L22 52 L28 52 L31 43 L39 43 L42 52 L48 52 Z M35 24 L32.5 37 L37.5 37 Z" fill="#111111" />
    <path d="M35 18 Q41 28 35 44" stroke="#ffffff" stroke-width="2" fill="none" />
    
    <!-- Text fits completely -->
    <text x="75" y="42" font-family="'Cinzel', 'Times New Roman', Georgia, serif" font-size="16.5" font-weight="700" letter-spacing="1.8" fill="#111111">
      EDITORIAL AUTORES DE ARGENTINA
    </text>
  </svg>
  `;
}

async function run() {
  console.log('Generating ultra-high-resolution original white back covers (1600x2240)...');

  const targets = [
    path.join(rootDir, 'assets'),
    path.join(rootDir, 'photos'),
    path.join(rootDir, 'public', 'photos')
  ];

  // 1. TOMO 1 BACK
  console.log('-> Processing Tomo 1 Back (original white background, ultra-sharp)...');
  const t1FrontBuf = fs.readFileSync(path.join(rootDir, 'assets', 'book1_front.webp'));
  const t1Strip = await sharp(t1FrontBuf)
    .extract({ left: 0, top: 0, width: Math.round(1600 * 0.135), height: 2240 })
    .resize(STRIP_WIDTH, HEIGHT, { fit: 'cover' })
    .toBuffer();

  const barcode1Svg = generateBarcodeSvg('9 789878 711256', 368, 176);
  const barcode1Buf = await sharp(Buffer.from(barcode1Svg)).png().toBuffer();

  const publisherLogoSvg = getAutoresDeArgentinaSvg(832, 112);
  const publisherLogoBuf = await sharp(Buffer.from(publisherLogoSvg)).png().toBuffer();

  const svgT1Back = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t1-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 40.8px;
        line-height: 1.58;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.24px;
      }
      .ebook-label {
        font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        fill: #333333;
      }
    </style>
    
    <rect x="104" y="656" width="136" height="26" fill="#c0262b" rx="3" />

    <text x="104" y="784" class="t1-text">
      <tspan x="104" dy="0">La Ruta del Samurái invita al lector a un viaje a través</tspan>
      <tspan x="104" dy="65.6">de la geografía y la historia del Japón. Lo invita a reco-</tspan>
      <tspan x="104" dy="65.6">rrer el país del Sol Naciente de la mano de un experi-</tspan>
      <tspan x="104" dy="65.6">mentado artista marcial que oficiará de guía, a la vez</tspan>
      <tspan x="104" dy="65.6">que va relatando sus increíbles experiencias a lo largo</tspan>
      <tspan x="104" dy="65.6">de su recorrido. Tomando como eje la vida del famoso</tspan>
      <tspan x="104" dy="65.6">guerrero Miyamoto Musashi, el autor irá descubriendo</tspan>
      <tspan x="104" dy="65.6">aquellos lugares icónicos de la cultura Samurái y de sus</tspan>
      <tspan x="104" dy="65.6">más arraigadas tradiciones. Un viaje en el tiempo don-</tspan>
      <tspan x="104" dy="65.6">de compartirá sus vivencias en lugares sagrados como</tspan>
      <tspan x="104" dy="65.6">templos, santuarios, castillos, museos, cementerios,</tspan>
      <tspan x="104" dy="65.6">bosques, campos de batallas y hasta la escalada al míti-</tspan>
      <tspan x="104" dy="65.6">co Monte Fuji. Una aventura inspiracional de un sueño</tspan>
      <tspan x="104" dy="65.6">que llevó muchos años de preparación y que acerca al</tspan>
      <tspan x="104" dy="65.6">lector, tanto neófito como experimentado, a la cultura</tspan>
      <tspan x="104" dy="65.6">de este misterioso país.</tspan>
    </text>

    <text x="104" y="1955" class="ebook-label">📱 Disponible en versión eBook!</text>
  </svg>
  `;

  const t1BackBuf = await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t1Strip, top: 0, left: WIDTH - STRIP_WIDTH },
      { input: Buffer.from(svgT1Back), top: 0, left: 0 },
      { input: barcode1Buf, top: 1980, left: 104 },
      { input: publisherLogoBuf, top: 2008, left: 512 }
    ])
    .webp({ quality: 98, effort: 6 })
    .toBuffer();

  // 2. TOMO 2 BACK
  console.log('-> Processing Tomo 2 Back (original white background, ultra-sharp)...');
  const t2FrontBuf = fs.readFileSync(path.join(rootDir, 'assets', 'book2_front.webp'));
  const t2Strip = await sharp(t2FrontBuf)
    .extract({ left: 0, top: 0, width: Math.round(1600 * 0.135), height: 2240 })
    .resize(STRIP_WIDTH, HEIGHT, { fit: 'cover' })
    .toBuffer();

  const svgT2Back = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t2-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 34.88px;
        line-height: 1.54;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.16px;
      }
      .ebook-label {
        font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        fill: #333333;
      }
    </style>
    
    <rect x="104" y="224" width="136" height="26" fill="#1b3d75" rx="3" />

    <text x="104" y="336" class="t2-text">
      <tspan x="104" dy="0">En esta segunda entrega de la Ruta del Samurái, el autor</tspan>
      <tspan x="104" dy="56">se embarca en la búsqueda del pensamiento samurái</tspan>
      <tspan x="104" dy="56">como influencia directa de la sociedad japonesa actual,</tspan>
      <tspan x="104" dy="56">y a partir de allí, procura entender sus distintas mani-</tspan>
      <tspan x="104" dy="56">festaciones sociales y culturales. Para ello, se aventura</tspan>
      <tspan x="104" dy="56">en la misión de encontrar y recorrer aquellos vestigios</tspan>
      <tspan x="104" dy="56">de los caminos que estos guerreros transitaban y que</tspan>
      <tspan x="104" dy="56">aún permanecen desperdigados por todo Japón. Un</tspan>
      <tspan x="104" dy="56">viaje de descubrimiento que lo llevará desde la antigua</tspan>
      <tspan x="104" dy="56">Edo (actual Tokio) hasta Kioto por la antigua ruta Tokai-</tspan>
      <tspan x="104" dy="56">do, bordeando el mar, y su regreso por la antigua ruta</tspan>
      <tspan x="104" dy="56">Nakasendo, a través de las montañas de Japón. En su</tspan>
      <tspan x="104" dy="56">nuevo periplo, con un final inesperado, Jorge Orpiane-</tspan>
      <tspan x="104" dy="56">si conocerá las tumbas y legados de los más afamados</tspan>
      <tspan x="104" dy="56">hombres y mujeres de la historia samurái, sus castillos,</tspan>
      <tspan x="104" dy="56">templos y santuarios, escuelas, armas y campos de ba-</tspan>
      <tspan x="104" dy="56">talla que fueron testigos de sus acciones, así como los</tspan>
      <tspan x="104" dy="56">poblados detenidos en el tiempo que aún se conservan,</tspan>
      <tspan x="104" dy="56">y que dieron alojamiento a estos legendarios soldados</tspan>
      <tspan x="104" dy="56">en sus viajes a través de Japón. Nuevamente el autor,</tspan>
      <tspan x="104" dy="56">con una vida dedicada al estudio de las artes marciales</tspan>
      <tspan x="104" dy="56">japonesas, oficia de guía relatando leyendas, historias</tspan>
      <tspan x="104" dy="56">ficcionadas y reales, describiendo documentos histó-</tspan>
      <tspan x="104" dy="56">ricos y enseñanzas del Japón feudal, mientras el lector</tspan>
      <tspan x="104" dy="56">disfruta de más de 170 imágenes a color de los lugares</tspan>
      <tspan x="104" dy="56">originales donde ocurrieron los hechos obtenidas en su</tspan>
      <tspan x="104" dy="56">recorrido al que transformó, movido por la pasión, en su</tspan>
      <tspan x="104" dy="56">propia búsqueda de crecimiento personal.</tspan>
    </text>

    <text x="104" y="1955" class="ebook-label">📱 Disponible en versión eBook!</text>
  </svg>
  `;

  const barcode2Svg = generateBarcodeSvg('9 789878 720210', 368, 176);
  const barcode2Buf = await sharp(Buffer.from(barcode2Svg)).png().toBuffer();

  const t2BackBuf = await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t2Strip, top: 0, left: WIDTH - STRIP_WIDTH },
      { input: Buffer.from(svgT2Back), top: 0, left: 0 },
      { input: barcode2Buf, top: 1980, left: 104 },
      { input: publisherLogoBuf, top: 2008, left: 512 }
    ])
    .webp({ quality: 98, effort: 6 })
    .toBuffer();

  // 3. TOMO 3 BACK (English Edition)
  console.log('-> Processing Tomo 3 Back (original white background, ultra-sharp)...');
  const t3FrontBuf = fs.readFileSync(path.join(rootDir, 'assets', 'book3_front.webp'));
  const t3Strip = await sharp(t3FrontBuf)
    .extract({ left: 0, top: 0, width: Math.round(1600 * 0.135), height: 2240 })
    .resize(STRIP_WIDTH, HEIGHT, { fit: 'cover' })
    .toBuffer();

  const svgT3Back = `
  <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t3-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 39.2px;
        line-height: 1.55;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.24px;
      }
      .ebook-label {
        font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
        font-size: 24px;
        font-weight: 700;
        fill: #333333;
      }
    </style>
    
    <rect x="104" y="512" width="136" height="26" fill="#c0262b" rx="3" />

    <text x="104" y="624" class="t3-text">
      <tspan x="104" dy="0">Along the Samurai's Route, with its 9 maps and more</tspan>
      <tspan x="104" dy="64">than 200 photographs, invites the reader to go on a</tspan>
      <tspan x="104" dy="64">journey into the geography and history of Japan. Dare</tspan>
      <tspan x="104" dy="64">to travel the Land of the Rising Sun with the help of an</tspan>
      <tspan x="104" dy="64">experienced martial artist who will act as a guide, while</tspan>
      <tspan x="104" dy="64">recounting the incredible experiences of his journey.</tspan>
      <tspan x="104" dy="64">Following the life of the famous warrior Miyamoto</tspan>
      <tspan x="104" dy="64">Musashi, the author will discover the iconic places of</tspan>
      <tspan x="104" dy="64">samurai culture and its most deeply rooted traditions.</tspan>
      <tspan x="104" dy="64">This book is a journey back in time where he shares</tspan>
      <tspan x="104" dy="64">his experiences in sacred places such as temples,</tspan>
      <tspan x="104" dy="64">shrines, castles, museums, cemeteries, forests, battle-</tspan>
      <tspan x="104" dy="64">fields, and even the climb of mythical Mount Fuji. This</tspan>
      <tspan x="104" dy="64">inspirational adventure, which started as a dream and</tspan>
      <tspan x="104" dy="64">took many years to prepare, places the reader, both</tspan>
      <tspan x="104" dy="64">neophyte and experienced, closer to the culture of</tspan>
      <tspan x="104" dy="64">this mysterious country.</tspan>
    </text>

    <text x="104" y="1955" class="ebook-label">📱 Available in eBook edition!</text>
  </svg>
  `;

  const barcode3Svg = generateBarcodeSvg('9 789878 720210', 368, 176);
  const barcode3Buf = await sharp(Buffer.from(barcode3Svg)).png().toBuffer();

  const t3BackBuf = await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t3Strip, top: 0, left: WIDTH - STRIP_WIDTH },
      { input: Buffer.from(svgT3Back), top: 0, left: 0 },
      { input: barcode3Buf, top: 1980, left: 104 },
      { input: publisherLogoBuf, top: 2008, left: 512 }
    ])
    .webp({ quality: 98, effort: 6 })
    .toBuffer();

  // Save to all target folders
  for (const dir of targets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(path.join(dir, 'book1_back.webp'), t1BackBuf);
    fs.writeFileSync(path.join(dir, 'book2_back.webp'), t2BackBuf);
    fs.writeFileSync(path.join(dir, 'book3_back.webp'), t3BackBuf);

    console.log(`Saved white Ultra-HD back covers to ${dir}/`);
  }

  // Also update dist/ if it exists
  const distPhotos = path.join(rootDir, 'dist', 'photos');
  if (fs.existsSync(distPhotos)) {
    fs.writeFileSync(path.join(distPhotos, 'book1_back.webp'), t1BackBuf);
    fs.writeFileSync(path.join(distPhotos, 'book2_back.webp'), t2BackBuf);
    fs.writeFileSync(path.join(distPhotos, 'book3_back.webp'), t3BackBuf);
    console.log(`Updated ${distPhotos}/ as well.`);
  }

  console.log('Finished restoring and sharpening original white back covers!');
}

run().catch(console.error);
