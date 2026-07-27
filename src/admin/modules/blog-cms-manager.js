import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';
import { WysiwygEditor } from '../components/wysiwyg-editor.js';

export async function initBlogManager(container) {
  let posts = await dbService.getPosts();
  let currentEditor = null;

  function renderList() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2 class="samurai-title">Gestión de Blog</h2>
        <button id="new-post-btn" class="btn-samurai-red">+ Nuevo Artículo</button>
      </div>

      <div class="samurai-card" style="overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:rgba(0,0,0,0.5); color:var(--text-secondary);">
            <tr>
              <th style="padding:1rem;">Título</th>
              <th style="padding:1rem;">Estado</th>
              <th style="padding:1rem; text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${posts.length === 0 ? '<tr><td colspan="3" style="padding:2rem; text-align:center; color:var(--text-muted);">No hay artículos creados.</td></tr>' : ''}
            ${posts.map(p => `
              <tr style="border-top:1px solid var(--border-color);">
                <td style="padding:1rem; font-weight:600; color:var(--text-primary);">${p.title}</td>
                <td style="padding:1rem;">
                  <span style="background:${p.status === 'published' ? 'rgba(39,103,73,0.4)' : 'rgba(116,42,42,0.4)'}; color:${p.status === 'published' ? '#48bb78' : '#f56565'}; border:1px solid ${p.status === 'published' ? '#276749' : '#742a2a'}; padding:0.3rem 0.7rem; border-radius:4px; font-size:0.8rem; font-weight:600;">
                    ${p.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td style="padding:1rem; text-align:right;">
                  <button class="edit-post-btn btn-samurai-outline" data-id="${p.id}" style="padding:0.4rem 0.8rem; margin-right:0.4rem;">✏️ Editar</button>
                  <button class="dup-post-btn btn-samurai-outline" data-id="${p.id}" style="padding:0.4rem 0.8rem; margin-right:0.4rem; color:var(--accent-gold); border-color:var(--accent-gold-glow);">📋 Duplicar</button>
                  <button class="del-post-btn btn-samurai-outline" data-id="${p.id}" style="padding:0.4rem 0.8rem; color:#f56565; border-color:rgba(229,62,62,0.3);">🗑️ Borrar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('new-post-btn').addEventListener('click', () => renderForm());
    
    container.querySelectorAll('.edit-post-btn').forEach(b => b.addEventListener('click', () => {
      const p = posts.find(item => item.id === b.dataset.id);
      renderForm(p);
    }));

    // Duplicate Post functionality
    container.querySelectorAll('.dup-post-btn').forEach(b => b.addEventListener('click', async () => {
      const original = posts.find(item => item.id === b.dataset.id);
      if (!original) return;

      const duplicatedPost = {
        title: `${original.title} (Copia)`,
        slug: `${original.slug || 'post'}-copia-${Date.now()}`,
        excerpt: original.excerpt || '',
        content: original.content || '',
        cover_image: original.cover_image || '',
        status: 'draft',
        author: original.author || 'Jorge Orpianesi',
        created_at: new Date().toISOString()
      };

      await dbService.savePost(duplicatedPost);
      posts = await dbService.getPosts();
      syncService.broadcast('SETTINGS_UPDATED', await dbService.getSettings());
      renderList();
    }));

    container.querySelectorAll('.del-post-btn').forEach(b => b.addEventListener('click', async () => {
      if (confirm('¿Eliminar este artículo del blog?')) {
        await dbService.deletePost(b.dataset.id);
        posts = await dbService.getPosts();
        syncService.broadcast('SETTINGS_UPDATED', await dbService.getSettings());
        renderList();
      }
    }));
  }

  function renderForm(post = null) {
    container.innerHTML = `
      <h2 class="samurai-title" style="margin-bottom:1.5rem;">${post ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
      <form id="post-form" style="display:flex; flex-direction:column; gap:1.2rem;">
        <label style="color:var(--text-secondary);">Título del Post
          <input type="text" id="post-title" required value="${post ? post.title : ''}" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.4rem;">
        </label>
        <label style="color:var(--text-secondary);">Resumen Corto (Excerpt)
          <input type="text" id="post-excerpt" value="${post ? post.excerpt || '' : ''}" placeholder="Breve introducción para las tarjetas del sitio" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.4rem;">
        </label>
        <label style="color:var(--text-secondary);">Estado
          <select id="post-status" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.4rem;">
            <option value="published" ${post?.status === 'published' ? 'selected' : ''}>Publicado</option>
            <option value="draft" ${post?.status === 'draft' ? 'selected' : ''}>Borrador</option>
          </select>
        </label>
        <div>
          <label style="display:block; margin-bottom:0.5rem; color:var(--text-secondary);">Contenido del Artículo (Editor WYSIWYG)</label>
          <div id="editor-container"></div>
        </div>
        <div style="display:flex; gap:1rem; margin-top:1rem;">
          <button type="submit" class="btn-samurai-red">Guardar y Publicar</button>
          <button type="button" id="cancel-post-btn" class="btn-samurai-outline">Cancelar</button>
        </div>
      </form>
    `;

    currentEditor = new WysiwygEditor(document.getElementById('editor-container'), post ? post.content : '');

    document.getElementById('cancel-post-btn').addEventListener('click', () => renderList());
    document.getElementById('post-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const postData = {
        id: post ? post.id : undefined,
        title: document.getElementById('post-title').value,
        excerpt: document.getElementById('post-excerpt').value,
        status: document.getElementById('post-status').value,
        content: currentEditor.getContent(),
        created_at: post ? post.created_at : new Date().toISOString()
      };
      await dbService.savePost(postData);
      posts = await dbService.getPosts();
      syncService.broadcast('SETTINGS_UPDATED', await dbService.getSettings());
      renderList();
    });
  }

  renderList();
}
