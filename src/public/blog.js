import { dbService } from '../services/db-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('blog-posts-container');
  const posts = await dbService.getPosts();
  const published = (posts || [])
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

  const DEFAULT_TITLE = 'Blog de Artículos | La Ruta del Samurái';
  const DEFAULT_DESC = 'Artículos, crónicas y reflexiones sobre artes marciales, historia feudal japonesa y la filosofía Bushido por Jorge Orpianesi.';

  function updateDynamicSEO(post) {
    let schemaScript = document.getElementById('dynamic-blog-jsonld');
    if (post) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-blog-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      document.title = `${post.title} | La Ruta del Samurái`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const excerptText = post.excerpt || (post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : post.title);
      if (metaDesc) metaDesc.setAttribute('content', excerptText);

      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://larutadelsamurai.com';
      const postUrl = `${origin}/blog.html?post=${encodeURIComponent(post.id || post.slug)}`;
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': postUrl
        },
        'headline': post.title,
        'description': excerptText,
        'image': post.cover_image || `${origin}/assets/logo_typography_light.webp`,
        'datePublished': post.created_at || new Date().toISOString(),
        'dateModified': post.updated_at || post.created_at || new Date().toISOString(),
        'author': {
          '@type': 'Person',
          'name': post.author || 'Jorge Orpianesi'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'La Ruta del Samurái',
          'logo': {
            '@type': 'ImageObject',
            'url': `${origin}/assets/logo_typography_light.webp`
          }
        }
      };
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    } else {
      document.title = DEFAULT_TITLE;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESC);
      if (schemaScript) schemaScript.remove();
    }
  }

  function getTargetPostId() {
    const params = new URLSearchParams(window.location.search);
    const postParam = params.get('post');
    if (postParam) return postParam;
    const hash = window.location.hash.replace('#', '');
    return hash || null;
  }

  function renderView() {
    const postId = getTargetPostId();
    if (postId) {
      const selectedPost = published.find(p => 
        String(p.id) === String(postId) || 
        p.slug === postId || 
        (p.id && String(p.id).toLowerCase() === String(postId).toLowerCase()) ||
        (p.slug && String(p.slug).toLowerCase() === String(postId).toLowerCase())
      );
      if (selectedPost) {
        updateDynamicSEO(selectedPost);
        renderSinglePost(selectedPost);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    updateDynamicSEO(null);
    renderCatalog();
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderCatalog(filterQuery = '') {
    const filtered = published.filter(p => {
      const q = filterQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || (p.excerpt && p.excerpt.toLowerCase().includes(q));
    });

    container.innerHTML = `
      <div style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h2 style="font-family: var(--font-title); font-size: 1.5rem; color: var(--text-primary); margin: 0;">Catálogo de Artículos (${published.length})</h2>
          <input type="text" id="blog-search-input" value="${escapeHTML(filterQuery)}" placeholder="🔍 Buscar por título o tema..." style="padding: 0.6rem 1rem; background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; font-size: 0.9rem; min-width: 260px;">
        </div>
      </div>

      ${filtered.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 3rem 0;">No se encontraron artículos con ese criterio de búsqueda.</p>' : ''}

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
        ${filtered.map(post => `
          <article class="blog-catalog-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: transform 0.3s ease; cursor: pointer;" data-id="${post.id || post.slug}">
            ${post.cover_image ? `<div style="height: 180px; overflow: hidden;"><img src="${post.cover_image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;"></div>` : ''}
            <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1;">
              <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.4rem;">
                ${new Date(post.created_at || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <h3 style="font-family: var(--font-title); font-size: 1.15rem; color: var(--text-primary); margin: 0 0 0.8rem 0; line-height: 1.4;">${escapeHTML(post.title)}</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.2rem; flex: 1; line-height: 1.6;">
                ${escapeHTML(post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 110) + '...')}
              </p>
              <button class="open-post-btn btn-samurai-outline" data-id="${post.id || post.slug}" style="align-self: start; font-size: 0.85rem; padding: 0.5rem 1rem; color: var(--accent-gold); border-color: var(--accent-gold-glow);">
                Leer Artículo Completo →
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => renderCatalog(e.target.value));
    }

    container.querySelectorAll('.blog-catalog-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.id;
        if (id) {
          history.pushState(null, '', `blog.html?post=${id}`);
          renderView();
        }
      });
    });
  }

  function renderSinglePost(post) {
    const currentIndex = published.findIndex(p => p.id === post.id);
    const prevPost = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? published[currentIndex - 1] : null;

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <button id="back-to-catalog-btn" class="btn-samurai-outline" style="font-size: 0.9rem; padding: 0.5rem 1rem; cursor: pointer;">
          ← Volver al Catálogo de Artículos
        </button>
      </div>

      <article style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; padding: 2.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
        ${post.cover_image ? `
          <div style="max-height: 380px; overflow: hidden; border-radius: 8px; margin-bottom: 2rem; border: 1px solid var(--border-color);">
            <img src="${post.cover_image}" alt="${escapeHTML(post.title)}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        ` : ''}

        <div style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem; display: flex; gap: 1rem; align-items: center;">
          <span>📅 ${new Date(post.created_at || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>✍️ ${escapeHTML(post.author || 'Jorge Orpianesi')}</span>
        </div>

        <h1 style="font-family: var(--font-title); color: var(--text-primary); margin: 0 0 1.5rem 0; font-size: 2.2rem; line-height: 1.3;">${escapeHTML(post.title)}</h1>

        <div class="post-body" style="line-height: 1.85; color: var(--text-secondary); font-size: 1.05rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
          ${post.content}
        </div>

        <!-- Post Navigation Footer -->
        <div style="display: flex; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); flex-wrap: wrap;">
          ${prevPost ? `<button class="nav-prev-post btn-samurai-outline" data-id="${prevPost.id || prevPost.slug}" style="font-size: 0.85rem; cursor: pointer;">← Anterior: ${escapeHTML(prevPost.title.substring(0, 30))}...</button>` : '<div></div>'}
          ${nextPost ? `<button class="nav-next-post btn-samurai-outline" data-id="${nextPost.id || nextPost.slug}" style="font-size: 0.85rem; cursor: pointer;">Siguiente: ${escapeHTML(nextPost.title.substring(0, 30))}... →</button>` : '<div></div>'}
        </div>
      </article>
    `;

    document.getElementById('back-to-catalog-btn').addEventListener('click', () => {
      history.pushState(null, '', 'blog.html');
      renderView();
    });

    container.querySelectorAll('.nav-prev-post, .nav-next-post').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('button');
        const id = targetBtn ? targetBtn.dataset.id : null;
        if (id) {
          history.pushState(null, '', `blog.html?post=${id}`);
          renderView();
        }
      });
    });
  }

  window.addEventListener('popstate', () => renderView());

  renderView();
});
