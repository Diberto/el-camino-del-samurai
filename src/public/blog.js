import { dbService } from '../services/db-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('blog-posts-container');
  const posts = await dbService.getPosts();
  const published = posts.filter(p => p.status === 'published');

  if (published.length === 0) {
    container.innerHTML = '<p style="color:#a0aec0; font-size:1.1rem;">No hay artículos publicados aún.</p>';
    return;
  }

  container.innerHTML = published.map(post => `
    <article style="background:#1a1d24; border:1px solid #2d3748; padding:2rem; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.4);">
      <h2 style="font-family:'Cinzel', serif; color:#e2e8f0; margin-top:0;">${post.title}</h2>
      <div style="font-size:0.85rem; color:#a0aec0; margin-bottom:1.5rem;">${new Date(post.created_at).toLocaleDateString('es-ES')}</div>
      <div class="post-body" style="line-height:1.7; color:#cbd5e0;">
        ${post.content}
      </div>
    </article>
  `).join('');
});
