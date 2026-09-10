import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Helper to generate a crisp SVG barcode
function generateBarcodeSvg(isbn, width = 230, height = 110) {
  const bars = [
    1,0,1, // start
    0,1,1,0,0,1,0, 0,1,0,0,1,1,0, 0,1,1,0,0,1,0, 0,0,1,1,0,1,0, 0,1,0,0,1,1,0, 0,1,1,0,0,1,0,
    0,1,0,1,0, // guard center
    1,1,0,0,1,0,0, 1,0,0,1,0,0,0, 1,1,1,0,0,1,0, 1,1,0,1,1,0,0, 1,0,0,0,0,1,0, 1,0,0,1,0,0,0,
    1,0,1 // end
  ];
  
  const barWidth = 1.95;
  const startX = 18;
  let rects = '';
  
  bars.forEach((b, i) => {
    if (b === 1) {
      const isGuard = i < 3 || (i >= 45 && i < 50) || i >= 92;
      const h = isGuard ? 72 : 64;
      rects += `<rect x="${startX + i * barWidth}" y="8" width="${barWidth * 0.92}" height="${h}" fill="#111" />\n`;
    }
  });

  return `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#ffffff" />
    ${rects}
    <text x="${width / 2}" y="100" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#111" letter-spacing="2">${isbn}</text>
  </svg>
  `;
}

// Logo Autores de Argentina in clean SVG with full width
function getAutoresDeArgentinaSvg(width = 520, height = 70) {
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
  console.log('Generating ultra-high-resolution book covers...');

  const targets = [
    'assets',
    'photos'
  ];

  // 1. TOMO 1 FRONT
  console.log('-> Processing Tomo 1 Front...');
  const t1FrontBuf = await sharp('scripts/temp/tomo1_front_highres.jpg')
    .resize(1000, 1400, { fit: 'cover' })
    .webp({ quality: 94 })
    .toBuffer();

  // 2. TOMO 2 FRONT
  console.log('-> Processing Tomo 2 Front...');
  const t2FrontBuf = await sharp('scripts/temp/budokan_sample.jpg')
    .resize(1000, 1400, { fit: 'cover' })
    .webp({ quality: 94 })
    .toBuffer();

  // 3. TOMO 3 FRONT (Enhanced English edition)
  console.log('-> Processing Tomo 3 Front...');
  const t3FrontBuf = await sharp('scripts/temp/tomo1_front_highres.jpg')
    .resize(1000, 1400, { fit: 'cover' })
    .composite([
      {
        input: Buffer.from(`
          <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
            <rect x="180" y="80" width="780" height="300" fill="#ffffff" />
            <text x="200" y="180" font-family="'Plus Jakarta Sans', 'Arial Black', Impact, sans-serif" font-size="76" font-weight="900" fill="#111111" letter-spacing="-0.5px">ALONG THE</text>
            <text x="200" y="260" font-family="'Plus Jakarta Sans', 'Arial Black', Impact, sans-serif" font-size="76" font-weight="900" fill="#111111" letter-spacing="-0.5px">SAMURAI'S ROUTE</text>
            <text x="200" y="340" font-family="'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif" font-size="44" font-weight="700" fill="#111111" letter-spacing="1px">JAPAN FOR BUDOKAS</text>
          </svg>
        `),
        top: 0,
        left: 0
      }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // 4. TOMO 1 BACK
  console.log('-> Processing Tomo 1 Back...');
  const t1Strip = await sharp('scripts/temp/tomo1_front_highres.jpg')
    .extract({ left: 0, top: 0, width: Math.round(1463 * 0.135), height: 2048 })
    .resize(135, 1400, { fit: 'cover' })
    .toBuffer();

  const barcode1Buf = await sharp(Buffer.from(generateBarcodeSvg('9 789878 711256', 230, 110))).png().toBuffer();
  const publisherLogoBuf = await sharp(Buffer.from(getAutoresDeArgentinaSvg(520, 70))).png().toBuffer();

  const svgT1Back = `
  <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t1-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 25.5px;
        line-height: 1.58;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.15px;
      }
      .ebook-label {
        font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
        font-size: 15px;
        font-weight: 700;
        fill: #333333;
      }
    </style>
    
    <rect x="65" y="410" width="85" height="16" fill="#c0262b" rx="2" />

    <text x="65" y="490" class="t1-text">
      <tspan x="65" dy="0">La Ruta del Samurái invita al lector a un viaje a través</tspan>
      <tspan x="65" dy="41">de la geografía y la historia del Japón. Lo invita a reco-</tspan>
      <tspan x="65" dy="41">rrer el país del Sol Naciente de la mano de un experi-</tspan>
      <tspan x="65" dy="41">mentado artista marcial que oficiará de guía, a la vez</tspan>
      <tspan x="65" dy="41">que va relatando sus increíbles experiencias a lo largo</tspan>
      <tspan x="65" dy="41">de su recorrido. Tomando como eje la vida del famoso</tspan>
      <tspan x="65" dy="41">guerrero Miyamoto Musashi, el autor irá descubriendo</tspan>
      <tspan x="65" dy="41">aquellos lugares icónicos de la cultura Samurái y de sus</tspan>
      <tspan x="65" dy="41">más arraigadas tradiciones. Un viaje en el tiempo don-</tspan>
      <tspan x="65" dy="41">de compartirá sus vivencias en lugares sagrados como</tspan>
      <tspan x="65" dy="41">templos, santuarios, castillos, museos, cementerios,</tspan>
      <tspan x="65" dy="41">bosques, campos de batallas y hasta la escalada al míti-</tspan>
      <tspan x="65" dy="41">co Monte Fuji. Una aventura inspiracional de un sueño</tspan>
      <tspan x="65" dy="41">que llevó muchos años de preparación y que acerca al</tspan>
      <tspan x="65" dy="41">lector, tanto neófito como experimentado, a la cultura</tspan>
      <tspan x="65" dy="41">de este misterioso país.</tspan>
    </text>

    <text x="65" y="1222" class="ebook-label">📱 Disponible en versión eBook!</text>
  </svg>
  `;

  const t1BackBuf = await sharp({
    create: { width: 1000, height: 1400, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t1Strip, top: 0, left: 1000 - 135 },
      { input: Buffer.from(svgT1Back), top: 0, left: 0 },
      { input: barcode1Buf, top: 1238, left: 65 },
      { input: publisherLogoBuf, top: 1255, left: 320 }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // 5. TOMO 2 BACK
  console.log('-> Processing Tomo 2 Back...');
  const t2Strip = await sharp('scripts/temp/budokan_sample.jpg')
    .extract({ left: 0, top: 0, width: Math.round(1125 * 0.135), height: 1515 })
    .resize(135, 1400, { fit: 'cover' })
    .toBuffer();

  const svgT2Back = `
  <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t2-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 21.8px;
        line-height: 1.54;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.1px;
      }
      .ebook-label {
        font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
        font-size: 15px;
        font-weight: 700;
        fill: #333333;
      }
    </style>
    
    <rect x="65" y="140" width="85" height="16" fill="#1b3d75" rx="2" />

    <text x="65" y="210" class="t2-text">
      <tspan x="65" dy="0">En esta segunda entrega de la Ruta del Samurái, el autor</tspan>
      <tspan x="65" dy="35">se embarca en la búsqueda del pensamiento samurái</tspan>
      <tspan x="65" dy="35">como influencia directa de la sociedad japonesa actual,</tspan>
      <tspan x="65" dy="35">y a partir de allí, procura entender sus distintas mani-</tspan>
      <tspan x="65" dy="35">festaciones sociales y culturales. Para ello, se aventura</tspan>
      <tspan x="65" dy="35">en la misión de encontrar y recorrer aquellos vestigios</tspan>
      <tspan x="65" dy="35">de los caminos que estos guerreros transitaban y que</tspan>
      <tspan x="65" dy="35">aún permanecen desperdigados por todo Japón. Un</tspan>
      <tspan x="65" dy="35">viaje de descubrimiento que lo llevará desde la antigua</tspan>
      <tspan x="65" dy="35">Edo (actual Tokio) hasta Kioto por la antigua ruta Tokai-</tspan>
      <tspan x="65" dy="35">do, bordeando el mar, y su regreso por la antigua ruta</tspan>
      <tspan x="65" dy="35">Nakasendo, a través de las montañas de Japón. En su</tspan>
      <tspan x="65" dy="35">nuevo periplo, con un final inesperado, Jorge Orpiane-</tspan>
      <tspan x="65" dy="35">si conocerá las tumbas y legados de los más afamados</tspan>
      <tspan x="65" dy="35">hombres y mujeres de la historia samurái, sus castillos,</tspan>
      <tspan x="65" dy="35">templos y santuarios, escuelas, armas y campos de ba-</tspan>
      <tspan x="65" dy="35">talla que fueron testigos de sus acciones, así como los</tspan>
      <tspan x="65" dy="35">poblados detenidos en el tiempo que aún se conservan,</tspan>
      <tspan x="65" dy="35">y que dieron alojamiento a estos legendarios soldados</tspan>
      <tspan x="65" dy="35">en sus viajes a través de Japón. Nuevamente el autor,</tspan>
      <tspan x="65" dy="35">con una vida dedicada al estudio de las artes marciales</tspan>
      <tspan x="65" dy="35">japonesas, oficia de guía relatando leyendas, historias</tspan>
      <tspan x="65" dy="35">ficcionadas y reales, describiendo documentos histó-</tspan>
      <tspan x="65" dy="35">ricos y enseñanzas del Japón feudal, mientras el lector</tspan>
      <tspan x="65" dy="35">disfruta de más de 170 imágenes a color de los lugares</tspan>
      <tspan x="65" dy="35">originales donde ocurrieron los hechos obtenidas en su</tspan>
      <tspan x="65" dy="35">recorrido al que transformó, movido por la pasión, en su</tspan>
      <tspan x="65" dy="35">propia búsqueda de crecimiento personal.</tspan>
    </text>

    <text x="65" y="1222" class="ebook-label">📱 Disponible en versión eBook!</text>
  </svg>
  `;

  const barcode2Buf = await sharp(Buffer.from(generateBarcodeSvg('9 789878 720210', 230, 110))).png().toBuffer();

  const t2BackBuf = await sharp({
    create: { width: 1000, height: 1400, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t2Strip, top: 0, left: 1000 - 135 },
      { input: Buffer.from(svgT2Back), top: 0, left: 0 },
      { input: barcode2Buf, top: 1238, left: 65 },
      { input: publisherLogoBuf, top: 1255, left: 320 }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // 6. TOMO 3 BACK (English Edition)
  console.log('-> Processing Tomo 3 Back...');
  const svgT3Back = `
  <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
    <style>
      .t3-text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 24.5px;
        line-height: 1.55;
        fill: #1a1a1a;
        font-weight: 500;
        letter-spacing: -0.15px;
      }
    </style>
    
    <rect x="65" y="320" width="85" height="16" fill="#c0262b" rx="2" />

    <text x="65" y="390" class="t3-text">
      <tspan x="65" dy="0">Along the Samurai's Route, with its 9 maps and more</tspan>
      <tspan x="65" dy="40">than 200 photographs, invites the reader to go on a</tspan>
      <tspan x="65" dy="40">journey into the geography and history of Japan. Dare</tspan>
      <tspan x="65" dy="40">to travel the Land of the Rising Sun with the help of an</tspan>
      <tspan x="65" dy="40">experienced martial artist who will act as a guide, while</tspan>
      <tspan x="65" dy="40">recounting the incredible experiences of his journey.</tspan>
      <tspan x="65" dy="40">Following the life of the famous warrior Miyamoto</tspan>
      <tspan x="65" dy="40">Musashi, the author will discover the iconic places of</tspan>
      <tspan x="65" dy="40">samurai culture and its most deeply rooted traditions.</tspan>
      <tspan x="65" dy="40">This book is a journey back in time where he shares</tspan>
      <tspan x="65" dy="40">his experiences in sacred places such as temples,</tspan>
      <tspan x="65" dy="40">shrines, castles, museums, cemeteries, forests, battle-</tspan>
      <tspan x="65" dy="40">fields, and even the climb of mythical Mount Fuji. This</tspan>
      <tspan x="65" dy="40">inspirational adventure, which started as a dream and</tspan>
      <tspan x="65" dy="40">took many years to prepare, places the reader, both</tspan>
      <tspan x="65" dy="40">neophyte and experienced, closer to the culture of</tspan>
      <tspan x="65" dy="40">this mysterious country.</tspan>
    </text>
  </svg>
  `;

  const barcode3Buf = await sharp(Buffer.from(generateBarcodeSvg('9 789878 720210', 230, 110))).png().toBuffer();

  const t3BackBuf = await sharp({
    create: { width: 1000, height: 1400, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
  })
    .composite([
      { input: t1Strip, top: 0, left: 1000 - 135 },
      { input: Buffer.from(svgT3Back), top: 0, left: 0 },
      { input: barcode3Buf, top: 1238, left: 65 },
      { input: publisherLogoBuf, top: 1255, left: 320 }
    ])
    .webp({ quality: 94 })
    .toBuffer();

  // Save to all target folders
  for (const dir of targets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(path.join(dir, 'book1_front.webp'), t1FrontBuf);
    fs.writeFileSync(path.join(dir, 'book1_back.webp'), t1BackBuf);
    fs.writeFileSync(path.join(dir, 'book2_front.webp'), t2FrontBuf);
    fs.writeFileSync(path.join(dir, 'book2_back.webp'), t2BackBuf);
    fs.writeFileSync(path.join(dir, 'book3_front.webp'), t3FrontBuf);
    fs.writeFileSync(path.join(dir, 'book3_back.webp'), t3BackBuf);

    console.log(`Saved all 6 HD covers to ${dir}/`);
  }

  // Also update public/ and dist/ if they have photos/assets
  const extraDirs = ['public/photos', 'dist/photos'];
  for (const dir of extraDirs) {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, 'book1_front.webp'), t1FrontBuf);
      fs.writeFileSync(path.join(dir, 'book1_back.webp'), t1BackBuf);
      fs.writeFileSync(path.join(dir, 'book2_front.webp'), t2FrontBuf);
      fs.writeFileSync(path.join(dir, 'book2_back.webp'), t2BackBuf);
      fs.writeFileSync(path.join(dir, 'book3_front.webp'), t3FrontBuf);
      fs.writeFileSync(path.join(dir, 'book3_back.webp'), t3BackBuf);
      console.log(`Updated ${dir}/ as well.`);
    }
  }

  console.log('Finished generating all production covers!');
}

run().catch(console.error);
