// src/services/adapters/sqlite-adapter.js
export class LocalSqliteAdapter {
  constructor() {
    this.storageKey = 'local_db_emulator_v3';
    if (!localStorage.getItem(this.storageKey)) {
      const defaultMedia = [
        {
          id: 'med-1',
          name: 'Jorge Orpianesi en Japón',
          url: 'assets/photos/orpianesi1.webp',
          type: 'image/webp',
          size: '31.8 KB',
          created_at: new Date(Date.now() - 86400000 * 10).toISOString()
        },
        {
          id: 'med-2',
          name: 'Castillo Feudales Sengoku',
          url: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.09.webp',
          type: 'image/webp',
          size: '159.5 KB',
          created_at: new Date(Date.now() - 86400000 * 8).toISOString()
        },
        {
          id: 'med-3',
          name: 'Retiro Cueva Reigando',
          url: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.13.webp',
          type: 'image/webp',
          size: '229.7 KB',
          created_at: new Date(Date.now() - 86400000 * 6).toISOString()
        },
        {
          id: 'med-4',
          name: 'Jardines Zen & Meditación',
          url: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.15.webp',
          type: 'image/webp',
          size: '53.0 KB',
          created_at: new Date(Date.now() - 86400000 * 4).toISOString()
        }
      ];

      const defaultPosts = [
        {
          id: 'post-1',
          title: 'Los Secretos de Miyamoto Musashi en la Cueva Reigando',
          slug: 'secretos-miyamoto-musashi-reigando',
          excerpt: 'Un recorrido espiritual por el retiro de montaña donde Musashi escribió El Libro de los Cinco Anillos.',
          content: `<p class="text-large">En las profundidades de las montañas de Kumamoto se encuentra Reigando, la cueva sagrada donde el legendario Miyamoto Musashi pasó sus últimos años dictando su legado al mundo.</p><p>Al visitar este santuario rodeado de estatuas de piedra cubiertas de musgo, se respira una solemnidad única. Musashi buscó la tranquilidad absoluta para plasmar los principios del Gorin no Sho (El Libro de los Cinco Anillos), divididos en los elementos de Tierra, Agua, Fuego, Viento y Vacío.</p><div style="margin: 1.5rem 0; text-align: center;"><img src="assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.13.webp" alt="Cueva Reigando" style="border-radius: 8px; border: 1px solid var(--accent-gold-glow); max-width: 100%;"></div><blockquote style="border-left: 3px solid var(--accent-gold); padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: var(--accent-gold); background: rgba(197, 168, 128, 0.05); padding: 1rem;">"No hagas nada que sea inútil. Percibe aquello que no puede ser visto a simple vista." — Miyamoto Musashi</blockquote><p>Para todo estudiante del Budo, recorrer los escalones de piedra de Reigando no es solo un viaje geográfico, sino una inmersión directa en la mente del espadachín más célebre del Japón feudal.</p>`,
          cover_image: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.13.webp',
          status: 'published',
          author: 'Jorge Orpianesi',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: 'post-2',
          title: 'Castillos Feudales del Periodo Sengoku: Arquitectura e Historia',
          slug: 'castillos-feudales-periodo-sengoku',
          excerpt: 'Descubre la ingeniería militar de las fortalezas samurái de Himeji, Matsumoto y Kumamoto.',
          content: `<p class="text-large">Las fortalezas del Japón feudal no solo eran baluartes inexpugnables de guerra, sino también expresiones sublimes de la estética Zen y la filosofía militar Sengoku.</p><p>Desde los fosos concéntricos de Himeji hasta los muros en pendiente 'mushagaeshi' del Castillo de Kumamoto, cada estructura estaba diseñada para confundir e inmovilizar a las tropas enemigas.</p><div style="margin: 1.5rem 0; text-align: center;"><img src="assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.09.webp" alt="Castillo Feudal" style="border-radius: 8px; border: 1px solid var(--border-glow); max-width: 100%;"></div><h3 style="font-family:var(--font-title); color:var(--accent-gold); margin-top:1.5rem;">Elementos Clave de la Arquitectura Samurái:</h3><ul style="line-height:1.8; margin-left:1.2rem;"><li><strong>Ishigaki:</strong> Muros de piedra sin mortero con curvaturas parabólicas defensivas.</li><li><strong>Uguisubari:</strong> Pisos de 'ruiseñor' que crujen intencionalmente para alertar sobre infiltrados.</li><li><strong>Tenshu:</strong> La torre principal que servía de puesto de mando final.</li></ul>`,
          cover_image: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.09.webp',
          status: 'published',
          author: 'Jorge Orpianesi',
          created_at: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          id: 'post-3',
          title: 'La Filosofía del Bushido en el Trabajo Diario y la Vida Moderna',
          slug: 'filosofia-bushido-vida-moderna',
          excerpt: 'Cómo aplicar las 7 virtudes ancestrales para cultivar disciplina, enfoque y serenidad cotidiana.',
          content: `<p class="text-large">El camino del guerrero (Bushido) transciende el campo de batalla. En la era digital, sus principios ofrecen un faro ético y mental inquebrantable.</p><p>Practicar la virtud de <em>Makoto</em> (Sinceridad Absoluta) implica que tus palabras e intenciones se alineen perfectamente con tus actos cotidianos.</p><div style="margin: 1.5rem 0; text-align: center;"><img src="assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.15.webp" alt="Jardines Zen" style="border-radius: 8px; border: 1px solid var(--border-glow); max-width: 100%;"></div><p>Al cultivar la serenidad interior (Fudoshin), el practicante aprende a responder a las crisis externas sin perder el eje ni la calma mental.</p>`,
          cover_image: 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.15.webp',
          status: 'published',
          author: 'Jorge Orpianesi',
          created_at: new Date(Date.now() - 86400000 * 9).toISOString()
        }
      ];

      localStorage.setItem(this.storageKey, JSON.stringify({
        settings: {
          sections_toggle: {
            inicio: true,
            sinopsis: true,
            virtudes: true,
            oraculo: true,
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
            { id: '3', label: 'Las Virtudes', url: '#virtudes', visible: true },
            { id: '4', label: 'El Oráculo', url: '#oraculo', visible: true },
            { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
            { id: '6', label: 'Autor', url: '#autor', visible: true },
            { id: '7', label: 'Galería', url: '#galeria', visible: true },
            { id: '8', label: 'Blog', url: '#blog', visible: true },
            { id: '9', label: 'Comprar', url: '#contacto', visible: true }
          ],
          gpu_config: { renderScale: 1.0, quality: 'high', enableShaders: true }
        },
        posts: defaultPosts,
        media: defaultMedia,
        users: [{ id: 'usr-1', email: 'admin@samurai.com', name: 'Jorge Orpianesi Admin', role: 'admin', active: true }]
      }));
    }
  }

  _getData() { return JSON.parse(localStorage.getItem(this.storageKey)); }
  _saveData(d) { localStorage.setItem(this.storageKey, JSON.stringify(d)); }

  async login(email, password) {
    const data = this._getData();
    const user = data.users.find(u => u.email === email);
    if (!user) throw new Error('Usuario no encontrado');
    localStorage.setItem('local_auth_user', JSON.stringify(user));
    return user;
  }

  logout() { localStorage.removeItem('local_auth_user'); }
  getCurrentUser() { return JSON.parse(localStorage.getItem('local_auth_user') || 'null'); }
  async getSettings() { return this._getData().settings; }
  async saveSettings(s) {
    const d = this._getData();
    d.settings = { ...d.settings, ...s };
    this._saveData(d);
    return d.settings;
  }

  async getPosts() { return this._getData().posts || []; }
  async savePost(post) {
    const d = this._getData();
    if (!d.posts) d.posts = [];
    if (!post.id) post.id = 'post-' + Date.now();
    const idx = d.posts.findIndex(p => p.id === post.id);
    if (idx >= 0) d.posts[idx] = post; else d.posts.unshift(post);
    this._saveData(d);
    return post;
  }
  async deletePost(id) {
    const d = this._getData();
    d.posts = (d.posts || []).filter(p => p.id !== id);
    this._saveData(d);
  }

  async getMedia() { return this._getData().media || []; }
  async deleteMedia(id) {
    const d = this._getData();
    d.media = (d.media || []).filter(m => m.id !== id);
    this._saveData(d);
  }

  async getUsers() { return this._getData().users || []; }
  async saveUser(user) {
    const d = this._getData();
    if (!d.users) d.users = [];
    if (!user.id) user.id = 'usr-' + Date.now();
    const idx = d.users.findIndex(u => u.id === user.id);
    if (idx >= 0) d.users[idx] = user; else d.users.push(user);
    this._saveData(d);
    return user;
  }

  async uploadMedia(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        const dataUrl = e.target.result;
        const d = this._getData();
        if (!d.media) d.media = [];
        const mediaItem = {
          id: 'med-' + Date.now(),
          name: file.name || 'Imagen WebP',
          url: dataUrl,
          type: file.type || 'image/webp',
          size: `${(file.size / 1024).toFixed(1)} KB`,
          created_at: new Date().toISOString()
        };
        d.media.unshift(mediaItem);
        this._saveData(d);
        resolve(dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }
}
