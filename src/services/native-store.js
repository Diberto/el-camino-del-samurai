// src/services/native-store.js - Hostinger & Production Native Persistent Data Engine
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const DATA_DIR = path.join(rootDir, 'data');

const DEFAULT_SETTINGS = {
  sections_toggle: {
    inicio: true,
    sinopsis: true,
    opiniones: true,
    redes: true,
    capitulos: true,
    ediciones: true,
    autor: true,
    galeria: true,
    blog: true,
    contacto: true
  },
  navigation_menu: [
    { id: '1', label: 'Inicio', url: '#inicio', visible: true },
    { id: '2', label: 'El Libro', url: '#sinopsis', visible: true },
    { id: '3', label: 'Opiniones', url: '#opiniones', visible: true },
    { id: '4', label: 'Redes', url: '#redes', visible: true },
    { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
    { id: '6', label: 'Autor', url: '#autor', visible: true },
    { id: '7', label: 'Galería', url: '#galeria', visible: true },
    { id: '8', label: 'Blog', url: '#blog', visible: true },
    { id: '9', label: 'Contacto', url: '#contacto', visible: true }
  ],
  social_links: {
    instagram: { url: 'https://www.instagram.com/la.ruta.del.samurai/', handle: '@la.ruta.del.samurai', desc: 'Fotografías diarias de expediciones, castillos y dojos tradicionales en Japón.', visible: true },
    youtube: { url: 'https://www.youtube.com/@larutadelsamurai', handle: 'La Ruta del Samurái', desc: 'Documentales de viaje, técnicas de artes marciales y charlas sobre filosofía samurái.', visible: true },
    facebook: { url: 'https://www.facebook.com/jorgeorpianesi', handle: 'Jorge Orpianesi', desc: 'Comunidad de lectores, eventos, debates marciales y transmisiones especiales.', visible: true },
    whatsapp: { url: 'https://wa.me/5493513886443', handle: '+549 351 3886443', desc: 'Consultas directas y pedidos de libros físicos dedicados en Argentina.', visible: true }
  },
  gallery_items: [
    { id: 'gal_1', title: 'Castillo de Himeji y Fortalezas Feudales', tag: 'Patrimonio Histórico', image_url: 'photos/castillo_sengoku.webp', alt: 'Castillo de Himeji Japón', visible: true },
    { id: 'gal_2', title: 'Meditación Zen en Templos de Kioto', tag: 'Naturaleza & Zen', image_url: 'photos/jardin_zen.webp', alt: 'Jardín Zen y templo en Kioto', visible: true },
    { id: 'gal_3', title: 'Huellas de Miyamoto Musashi', tag: 'Ruta del Budo', image_url: 'photos/cueva_reigando.webp', alt: 'Cueva Reigando y estatuas de piedra', visible: true },
    { id: 'gal_4', title: 'Entrenamiento Tradicional y Filosofía', tag: 'Artes Marciales', image_url: 'photos/orpianesi1.webp', alt: 'Jorge Orpianesi en dojo', visible: true },
    { id: 'gal_5', title: 'Puentes y Pasos Legendarios', tag: 'Patrimonio Histórico', image_url: 'photos/WhatsApp Image 2026-06-25 at 16.10.29.webp', alt: 'Puentes históricos', visible: true },
    { id: 'gal_6', title: 'Esculturas y Monumentos del Budo', tag: 'Cultura & Tradición', image_url: 'photos/WhatsApp Image 2026-06-25 at 16.10.35.webp', alt: 'Esculturas tradicionales', visible: true }
  ]
};

const DEFAULT_POSTS = [
  {
    id: 'post_1',
    title: 'La senda del guerrero en el Japón actual',
    slug: 'la-senda-del-guerrero-en-el-japon-actual',
    excerpt: 'Reflexiones y experiencias recorriendo los castillos feudales y templos sagrados de Japón.',
    content: '<p>Caminar por los pasos de montaña y los castillos de la era Sengoku permite comprender que el Bushido no es solo una reliquia del pasado, sino un código vivo de conducta, honor y superación diaria.</p><p>Durante mis viajes de investigación para <em>El Camino del Samurai</em>, descubrí que la verdadera espada del samurái es su propia mente templada ante la adversidad.</p>',
    cover_image: 'photos/cueva_reigando.webp',
    status: 'published',
    author: 'Jorge Orpianesi',
    created: '2026-06-25T10:00:00.000Z',
    created_at: '2026-06-25T10:00:00.000Z'
  },
  {
    id: 'post_2',
    title: 'Miyamoto Musashi y el secreto de la Cueva Reigando',
    slug: 'miyamoto-musashi-y-el-secreto-de-la-cueva-reigando',
    excerpt: 'El lugar sagrado donde el más grande espadachín redactó El Libro de los Cinco Anillos.',
    content: '<p>En las profundidades de la cueva de Reigando, rodeado por cientos de estatuas de piedra de los 500 Rakan, Musashi alcanzó la claridad absoluta antes de despedirse de este mundo.</p><p>Allí condensó décadas de combates y meditación en los principios del Dokkodo y el Go Rin No Sho.</p>',
    cover_image: 'photos/castillo_sengoku.webp',
    status: 'published',
    author: 'Jorge Orpianesi',
    created: '2026-06-20T14:30:00.000Z',
    created_at: '2026-06-20T14:30:00.000Z'
  }
];

const DEFAULT_OPINIONS = [
  {
    id: 'op_1',
    name: 'Carlos Méndez',
    role: 'Practicante de Kendo 3er Dan',
    body: 'Una obra maestra absoluta. La profundidad histórica combinada con las fotografías en los lugares reales de Japón hacen de este libro una joya imprescindible para cualquier budoka.',
    avatar: 'assets/kanji_stamp.webp',
    approved: true,
    created: '2026-06-15T09:00:00.000Z',
    created_at: '2026-06-15T09:00:00.000Z'
  },
  {
    id: 'op_2',
    name: 'Mariana Sato',
    role: 'Investigadora Cultural & Historiadora',
    body: 'El rigor documental de Jorge Orpianesi y su respeto por las tradiciones japonesas se sienten en cada página. Imprescindible para comprender el alma del Japón feudal.',
    avatar: 'assets/kanji_stamp.webp',
    approved: true,
    created: '2026-06-18T16:20:00.000Z',
    created_at: '2026-06-18T16:20:00.000Z'
  },
  {
    id: 'op_3',
    name: 'Fernando Rossi',
    role: 'Lector & Coleccionista',
    body: 'La calidad fotográfica y la encuadernación de la edición de lujo son sublimes. Un viaje visual y espiritual a través de la historia samurai.',
    avatar: 'assets/kanji_stamp.webp',
    approved: true,
    created: '2026-06-22T11:45:00.000Z',
    created_at: '2026-06-22T11:45:00.000Z'
  }
];

const DEFAULT_MEDIA = [
  { id: 'default-media-1', name: 'Cueva Reigando', alt: 'Entrada a la mítica Cueva Reigando donde meditó Miyamoto Musashi', caption: 'Lugar sagrado de retiro y redacción de El Libro de los Cinco Anillos.', url: 'photos/cueva_reigando.webp', type: 'image/webp', size: '229.7 KB', created: '2026-06-25T10:00:00.000Z' },
  { id: 'default-media-2', name: 'Castillo Sengoku', alt: 'Castillo y fortaleza feudal de la era Sengoku en Japón', caption: 'Arquitectura defensiva tradicional de la casta guerrera samurái.', url: 'photos/castillo_sengoku.webp', type: 'image/webp', size: '159.5 KB', created: '2026-06-25T10:00:00.000Z' },
  { id: 'default-media-3', name: 'Jardín Zen', alt: 'Jardín seco de piedras y arena rastrillada para meditación Zen', caption: 'Espacio de introspección y serenidad para cultores del Budo.', url: 'photos/jardin_zen.webp', type: 'image/webp', size: '53.0 KB', created: '2026-06-25T10:00:00.000Z' },
  { id: 'default-media-4', name: 'Jorge Orpianesi 1', alt: 'Jorge Orpianesi en dojo tradicional sosteniendo katana', caption: 'Instructor e investigador en la senda del guerrero.', url: 'photos/orpianesi1.webp', type: 'image/webp', size: '31.8 KB', created: '2026-06-25T10:00:00.000Z' },
  { id: 'default-media-5', name: 'Jorge Orpianesi 2', alt: 'Jorge Orpianesi con vestimenta tradicional de Iaido', caption: 'Práctica y preservación de las artes marciales japonesas.', url: 'photos/orpianesi2.webp', type: 'image/webp', size: '48.2 KB', created: '2026-06-25T10:00:00.000Z' }
];

const DEFAULT_USERS = [
  { id: 'admin-usr', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin', active: true }
];

export function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  ensureFile('settings.json', DEFAULT_SETTINGS);
  ensureFile('posts.json', DEFAULT_POSTS);
  ensureFile('opinions.json', DEFAULT_OPINIONS);
  ensureFile('media.json', DEFAULT_MEDIA);
  ensureFile('users.json', DEFAULT_USERS);
}

function ensureFile(filename, defaults) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(defaults, null, 2), 'utf-8');
    } catch (e) {
      console.warn(`Could not create ${filename}:`, e.message);
    }
  }
}

export function readStore(filename, fallback = []) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      ensureFile(filename, fallback);
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    if (filename === 'settings.json' && parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        sections_toggle: {
          ...DEFAULT_SETTINGS.sections_toggle,
          ...(parsed.sections_toggle || {})
        },
        social_links: {
          ...DEFAULT_SETTINGS.social_links,
          ...(parsed.social_links || {})
        },
        navigation_menu: (Array.isArray(parsed.navigation_menu) && parsed.navigation_menu.length > 0) ? parsed.navigation_menu : DEFAULT_SETTINGS.navigation_menu,
        gallery_items: (Array.isArray(parsed.gallery_items) && parsed.gallery_items.length > 0) ? parsed.gallery_items : DEFAULT_SETTINGS.gallery_items
      };
    }
    return parsed;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return fallback;
  }
}

export function writeStore(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err.message);
    return false;
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export async function handleNativeDataStore(req, res, pathname) {
  const method = req.method.toUpperCase();
  const headers = { 'Content-Type': 'application/json' };

  // 1. Auth: POST /api/collections/users/auth-with-password
  if (pathname === '/api/collections/users/auth-with-password' && method === 'POST') {
    const body = await readBody(req);
    const email = body.identity || body.email;
    const password = body.password;

    if (email === 'admin@samurai.com' && password === 'admin123') {
      const user = { id: 'admin-usr', email, name: 'Jorge Orpianesi Admin', role: 'admin' };
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        token: 'samurai-server-session-token',
        record: user
      }));
    }

    res.writeHead(400, headers);
    return res.end(JSON.stringify({ error: 'Credenciales inválidas' }));
  }

  // 2. Auth Refresh: POST /api/collections/users/auth-refresh
  if (pathname === '/api/collections/users/auth-refresh' && method === 'POST') {
    const user = { id: 'admin-usr', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin' };
    res.writeHead(200, headers);
    return res.end(JSON.stringify({
      token: 'samurai-server-session-token',
      record: user
    }));
  }

  // 3. Settings Collection: /api/collections/settings/records
  if (pathname.startsWith('/api/collections/settings/records')) {
    if (method === 'GET') {
      const settings = readStore('settings.json', DEFAULT_SETTINGS);
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        page: 1,
        perPage: 30,
        totalItems: 1,
        totalPages: 1,
        items: [
          {
            id: 'settings_main',
            settings_data: JSON.stringify(settings),
            created: new Date().toISOString()
          }
        ]
      }));
    }

    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
      const body = await readBody(req);
      let newSettings = body.settings_data;
      if (typeof newSettings === 'string') {
        try { newSettings = JSON.parse(newSettings); } catch {}
      }
      if (newSettings && typeof newSettings === 'object') {
        writeStore('settings.json', newSettings);
      }
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        id: 'settings_main',
        settings_data: JSON.stringify(newSettings || DEFAULT_SETTINGS),
        success: true
      }));
    }
  }

  // 4. Posts Collection: /api/collections/posts/records
  if (pathname.startsWith('/api/collections/posts/records')) {
    let posts = readStore('posts.json', DEFAULT_POSTS);

    if (method === 'GET') {
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        page: 1,
        perPage: 100,
        totalItems: posts.length,
        totalPages: 1,
        items: posts
      }));
    }

    if (method === 'POST') {
      const body = await readBody(req);
      const newPost = {
        id: 'post_' + Date.now(),
        title: body.title || 'Nuevo Artículo',
        slug: body.slug || (body.title ? body.title.toLowerCase().replace(/\s+/g, '-') : 'articulo-' + Date.now()),
        excerpt: body.excerpt || '',
        content: body.content || '',
        cover_image: body.cover_image || 'photos/cueva_reigando.webp',
        status: body.status || 'published',
        author: body.author || 'Jorge Orpianesi',
        created: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      posts.unshift(newPost);
      writeStore('posts.json', posts);
      res.writeHead(200, headers);
      return res.end(JSON.stringify(newPost));
    }

    const idMatch = pathname.match(/\/api\/collections\/posts\/records\/([^\/\?]+)/);
    if (idMatch && idMatch[1]) {
      const targetId = idMatch[1];
      if (method === 'PATCH' || method === 'PUT') {
        const body = await readBody(req);
        const idx = posts.findIndex(p => p.id === targetId);
        if (idx !== -1) {
          posts[idx] = { ...posts[idx], ...body };
          writeStore('posts.json', posts);
          res.writeHead(200, headers);
          return res.end(JSON.stringify(posts[idx]));
        }
      }

      if (method === 'DELETE') {
        posts = posts.filter(p => p.id !== targetId);
        writeStore('posts.json', posts);
        res.writeHead(204);
        return res.end();
      }
    }
  }

  // 5. Opinions Collection: /api/collections/opinions/records
  if (pathname.startsWith('/api/collections/opinions/records')) {
    let opinions = readStore('opinions.json', DEFAULT_OPINIONS);

    if (method === 'GET') {
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        page: 1,
        perPage: 100,
        totalItems: opinions.length,
        totalPages: 1,
        items: opinions
      }));
    }

    if (method === 'POST') {
      const body = await readBody(req);
      const newOp = {
        id: 'op_' + Date.now(),
        name: body.name || 'Lector',
        role: body.role || 'Lector Verificado',
        body: body.body || '',
        avatar: body.avatar || 'assets/kanji_stamp.webp',
        approved: body.approved !== false,
        created: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      opinions.unshift(newOp);
      writeStore('opinions.json', opinions);
      res.writeHead(200, headers);
      return res.end(JSON.stringify(newOp));
    }

    const idMatch = pathname.match(/\/api\/collections\/opinions\/records\/([^\/\?]+)/);
    if (idMatch && idMatch[1]) {
      const targetId = idMatch[1];
      if (method === 'PATCH' || method === 'PUT') {
        const body = await readBody(req);
        const idx = opinions.findIndex(o => o.id === targetId);
        if (idx !== -1) {
          opinions[idx] = { ...opinions[idx], ...body };
          writeStore('opinions.json', opinions);
          res.writeHead(200, headers);
          return res.end(JSON.stringify(opinions[idx]));
        }
      }

      if (method === 'DELETE') {
        opinions = opinions.filter(o => o.id !== targetId);
        writeStore('opinions.json', opinions);
        res.writeHead(204);
        return res.end();
      }
    }
  }

  // 6. Media Collection: /api/collections/media/records
  if (pathname.startsWith('/api/collections/media/records')) {
    let media = readStore('media.json', DEFAULT_MEDIA);

    if (method === 'GET') {
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        page: 1,
        perPage: 100,
        totalItems: media.length,
        totalPages: 1,
        items: media
      }));
    }

    if (method === 'POST') {
      const body = await readBody(req);
      let finalUrl = body.url || '';
      let fileSizeStr = body.size ? (typeof body.size === 'number' ? `${(body.size / 1024).toFixed(1)} KB` : body.size) : 'WebP';

      if (body.data || body.file_base64 || body.dataUrl) {
        try {
          const rawBase64 = body.data || body.file_base64 || body.dataUrl;
          const cleanBase64 = rawBase64.includes(';base64,') ? rawBase64.split(';base64,')[1] : rawBase64;
          const buffer = Buffer.from(cleanBase64, 'base64');
          
          const originalName = body.name || body.filename || 'image';
          const cleanName = originalName
            .toLowerCase()
            .replace(/[^a-z0-9_\-\.]/g, '_')
            .replace(/\.[^/.]+$/, '');
          const filename = `upload_${Date.now()}_${cleanName}.webp`;

          const rootUploads = path.join(rootDir, 'uploads');
          const publicUploads = path.join(rootDir, 'public', 'uploads');
          const distUploads = path.join(rootDir, 'dist', 'uploads');
          
          if (!fs.existsSync(rootUploads)) fs.mkdirSync(rootUploads, { recursive: true });
          if (!fs.existsSync(publicUploads)) fs.mkdirSync(publicUploads, { recursive: true });
          if (!fs.existsSync(distUploads)) fs.mkdirSync(distUploads, { recursive: true });

          fs.writeFileSync(path.join(rootUploads, filename), buffer);
          try { fs.writeFileSync(path.join(publicUploads, filename), buffer); } catch {}
          try { fs.writeFileSync(path.join(distUploads, filename), buffer); } catch {}

          finalUrl = `uploads/${filename}`;
          fileSizeStr = `${(buffer.length / 1024).toFixed(1)} KB`;
        } catch (errUpload) {
          console.error('Error al guardar archivo en uploads/:', errUpload.message);
        }
      }

      if (!finalUrl) {
        finalUrl = (body.dataUrl && body.dataUrl.startsWith('data:')) ? body.dataUrl : 'photos/cueva_reigando.webp';
      }

      const newItem = {
        id: 'media_' + Date.now(),
        name: body.name || 'Imagen WebP',
        alt: body.alt || body.name || '',
        caption: body.caption || '',
        url: finalUrl,
        type: body.type || 'image/webp',
        size: fileSizeStr,
        created: new Date().toISOString()
      };
      media.unshift(newItem);
      writeStore('media.json', media);
      res.writeHead(200, headers);
      return res.end(JSON.stringify(newItem));
    }

    const idMatch = pathname.match(/\/api\/collections\/media\/records\/([^\/\?]+)/);
    if (idMatch && idMatch[1]) {
      const targetId = idMatch[1];
      if (method === 'PATCH' || method === 'PUT') {
        const body = await readBody(req);
        const idx = media.findIndex(m => m.id === targetId);
        if (idx !== -1) {
          media[idx] = { ...media[idx], ...body };
          writeStore('media.json', media);
          res.writeHead(200, headers);
          return res.end(JSON.stringify(media[idx]));
        }
      }

      if (method === 'DELETE') {
        media = media.filter(m => m.id !== targetId);
        writeStore('media.json', media);
        res.writeHead(204);
        return res.end();
      }
    }
  }

  // 7. Users Collection: /api/collections/users/records
  if (pathname.startsWith('/api/collections/users/records')) {
    let users = readStore('users.json', DEFAULT_USERS);
    if (method === 'GET') {
      res.writeHead(200, headers);
      return res.end(JSON.stringify({
        page: 1,
        perPage: 50,
        totalItems: users.length,
        totalPages: 1,
        items: users
      }));
    }
  }

  // Fallback for unhandled /api/
  res.writeHead(200, headers);
  return res.end(JSON.stringify({ success: true, message: 'Operación procesada por el servidor nativo' }));
}
