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
              <th style="padding:1rem;">Portada & Título</th>
              <th style="padding:1rem;">Estado</th>
              <th style="padding:1rem; text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${posts.length === 0 ? '<tr><td colspan="3" style="padding:2rem; text-align:center; color:var(--text-muted);">No hay artículos creados.</td></tr>' : ''}
            ${posts.map(p => `
              <tr style="border-top:1px solid var(--border-color);">
                <td style="padding:1rem; display:flex; align-items:center; gap:1rem;">
                  ${p.cover_image ? `<img src="${p.cover_image}" alt="${p.title}" style="width:60px; height:45px; object-fit:cover; border-radius:4px; border:1px solid rgba(255,255,255,0.1);">` : '<div style="width:60px; height:45px; background:rgba(0,0,0,0.3); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:0.8rem;">Sin foto</div>'}
                  <span style="font-weight:600; color:var(--text-primary);">${p.title}</span>
                </td>
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
    const defaultCover = post?.cover_image || 'assets/photos/WhatsApp%20Image%202026-06-25%20at%2016.10.13.webp';

    container.innerHTML = `
      <h2 class="samurai-title" style="margin-bottom:1.5rem;">${post ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
      <form id="post-form" style="display:flex; flex-direction:column; gap:1.2rem;">
        <label style="color:var(--text-secondary);">Título del Post
          <input type="text" id="post-title" required value="${post ? post.title : ''}" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.4rem;">
        </label>
        
        <label style="color:var(--text-secondary);">Resumen Corto (Excerpt)
          <input type="text" id="post-excerpt" value="${post ? post.excerpt || '' : ''}" placeholder="Breve introducción para las tarjetas del sitio" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.4rem;">
        </label>

        <!-- Cover Image Selection with Media Library Modal -->
        <div>
          <label style="display:block; color:var(--text-secondary); margin-bottom:0.4rem;">Imagen de Portada</label>
          <div style="display:flex; gap:1rem; align-items:center;">
            <input type="text" id="post-cover-image" value="${defaultCover}" style="flex:1; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px;">
            <button type="button" id="btn-pick-cover-media" class="btn-samurai-outline" style="white-space:nowrap; color:var(--accent-gold); border-color:var(--accent-gold-glow);">🖼️ Elegir de Galería</button>
          </div>
          <div id="cover-preview-container" style="margin-top:0.6rem;">
            <img id="cover-preview-img" src="${defaultCover}" alt="Portada" style="height:100px; border-radius:6px; border:1px solid var(--border-color); object-fit:cover;">
          </div>
        </div>

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

      <!-- Media Picker Modal for Cover Image -->
      <div id="cover-media-modal" class="admin-login-modal hidden" style="background:rgba(0,0,0,0.85); z-index:9999;">
        <div class="samurai-card" style="width:90%; max-width:800px; max-height:80vh; overflow-y:auto; padding:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h3 class="samurai-title">Seleccionar Imagen de Portada de la Galería</h3>
            <button type="button" id="close-cover-modal-btn" class="btn-samurai-outline">✕ Cerrar</button>
          </div>
          <div id="cover-media-modal-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:1rem;"></div>
        </div>
      </div>
    `;

    currentEditor = new WysiwygEditor(document.getElementById('editor-container'), post ? post.content : '');

    const coverInput = document.getElementById('post-cover-image');
    const coverPreview = document.getElementById('cover-preview-img');
    const coverModal = document.getElementById('cover-media-modal');
    const coverGrid = document.getElementById('cover-media-modal-grid');

    coverInput.addEventListener('input', (e) => {
      coverPreview.src = e.target.value;
    });

    document.getElementById('btn-pick-cover-media').addEventListener('click', async () => {
      const mediaItems = await dbService.getMedia();
      if (mediaItems.length === 0) {
        coverGrid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center;">No hay imágenes registradas en la Galería de Medios. Sube imágenes primero en el menú Medios.</p>';
      } else {
        coverGrid.innerHTML = mediaItems.map(item => `
          <div class="cover-modal-item" data-url="${item.url}" style="border:1px solid var(--border-color); border-radius:8px; padding:0.5rem; cursor:pointer; background:rgba(0,0,0,0.4); text-align:center; transition:transform 0.2s ease;">
            <img src="${item.url}" alt="${item.name}" style="width:100%; height:120px; object-fit:cover; border-radius:4px; margin-bottom:0.4rem;">
            <span style="font-size:0.75rem; color:var(--text-secondary); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</span>
          </div>
        `).join('');

        coverGrid.querySelectorAll('.cover-modal-item').forEach(card => {
          card.addEventListener('click', () => {
            const url = card.dataset.url;
            coverInput.value = url;
            coverPreview.src = url;
            coverModal.classList.add('hidden');
          });
        });
      }
      coverModal.classList.remove('hidden');
    });

    document.getElementById('close-cover-modal-btn').addEventListener('click', () => coverModal.classList.add('hidden'));

    document.getElementById('cancel-post-btn').addEventListener('click', () => renderList());
    document.getElementById('post-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const postData = {
        id: post ? post.id : undefined,
        title: document.getElementById('post-title').value,
        excerpt: document.getElementById('post-excerpt').value,
        cover_image: coverInput.value,
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
