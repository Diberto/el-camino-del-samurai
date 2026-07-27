import { dbService } from '../services/db-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('blog-posts-container');
  const posts = await dbService.getPosts();
  const published = (posts || []).filter(p => p.status === 'published');

  if (published.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 1.1rem; text-align: center;">No hay artículos publicados aún.</p>';
    return;
  }

  container.innerHTML = published.map(post => `
    <article id="${post.id}" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2.5rem; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.5); backdrop-filter: blur(12px);">
      <div style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.5rem;">
        ${new Date(post.created_at || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} ${post.author ? `• Por ${post.author}` : ''}
      </div>
      <h2 style="font-family: var(--font-title); color: var(--text-primary); margin: 0 0 1.5rem 0; font-size: 1.8rem; line-height: 1.3;">${post.title}</h2>
      <div class="post-body" style="line-height: 1.8; color: var(--text-secondary); font-size: 1.05rem;">
        ${post.content}
      </div>
    </article>
  `).join('');
});
