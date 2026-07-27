import { dbService } from '../../services/db-service.js';
import { WysiwygEditor } from '../components/wysiwyg-editor.js';

export async function initBlogManager(container) {
  let posts = await dbService.getPosts();
  let currentEditor = null;

  function renderList() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2>Gestión de Blog</h2>
        <button id="new-post-btn" style="padding:0.6rem 1.2rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">+ Nuevo Artículo</button>
      </div>

      <div style="background:#1a1d24; border:1px solid #2d3748; border-radius:8px; overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:#242832; color:#a0aec0;">
            <tr>
              <th style="padding:0.8rem 1rem;">Título</th>
              <th style="padding:0.8rem 1rem;">Estado</th>
              <th style="padding:0.8rem 1rem;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${posts.length === 0 ? '<tr><td colspan="3" style="padding:1rem; text-align:center; color:#a0aec0;">No hay artículos creados.</td></tr>' : ''}
            ${posts.map(p => `
              <tr style="border-top:1px solid #2d3748;">
                <td style="padding:0.8rem 1rem;">${p.title}</td>
                <td style="padding:0.8rem 1rem;"><span style="background:${p.status === 'published' ? '#276749' : '#742a2a'}; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.8rem;">${p.status}</span></td>
                <td style="padding:0.8rem 1rem;">
                  <button class="edit-post-btn" data-id="${p.id}" style="background:#3182ce; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Editar</button>
                  <button class="del-post-btn" data-id="${p.id}" style="background:#e53e3e; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Borrar</button>
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
    container.querySelectorAll('.del-post-btn').forEach(b => b.addEventListener('click', async () => {
      if (confirm('¿Eliminar artículo?')) {
        await dbService.deletePost(b.dataset.id);
        posts = await dbService.getPosts();
        renderList();
      }
    }));
  }

  function renderForm(post = null) {
    container.innerHTML = `
      <h2>${post ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
      <form id="post-form" style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1.2rem;">
        <label>Título
          <input type="text" id="post-title" required value="${post ? post.title : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.4rem;">
        </label>
        <label>Estado
          <select id="post-status" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.4rem;">
            <option value="published" ${post?.status === 'published' ? 'selected' : ''}>Publicado</option>
            <option value="draft" ${post?.status === 'draft' ? 'selected' : ''}>Borrador</option>
          </select>
        </label>
        <div>
          <label style="display:block; margin-bottom:0.5rem;">Contenido del Artículo</label>
          <div id="editor-container"></div>
        </div>
        <div style="display:flex; gap:1rem;">
          <button type="submit" style="padding:0.8rem 1.5rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Post</button>
          <button type="button" id="cancel-post-btn" style="padding:0.8rem 1.5rem; background:#4a5568; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
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
        status: document.getElementById('post-status').value,
        content: currentEditor.getContent(),
        created_at: post ? post.created_at : new Date().toISOString()
      };
      await dbService.savePost(postData);
      posts = await dbService.getPosts();
      renderList();
    });
  }

  renderList();
}
