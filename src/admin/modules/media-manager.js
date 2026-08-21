import { dbService } from '../../services/db-service.js';
import { convertToWebP } from '../../utils/webp-converter.js';

export async function initMediaManager(container) {
  let mediaList = await dbService.getMedia();
  let editingItem = null;

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderUI() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0;">🖼️ Galería y Biblioteca de Medios</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0.3rem 0 0 0;">
            Administra imágenes, optimización WebP y metadatos SEO (etiquetas alt y descripciones).
          </p>
        </div>
        <button id="media-upload-btn" class="btn-samurai-red">⬆️ Subir Nueva Imagen (WebP)</button>
        <input type="file" id="media-file-input" accept="image/*" style="display:none;">
      </div>

      <!-- Drag and Drop Dropzone -->
      <div id="media-dropzone" class="samurai-card" style="border: 2px dashed var(--accent-gold); padding: 2rem; text-align: center; cursor: pointer; margin-bottom: 2rem; background: rgba(197, 168, 128, 0.03);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🖼️</span>
        <h3 class="samurai-title" style="font-size: 1.1rem; color: var(--accent-gold);">Arrastra y suelta imágenes aquí para subirlas</h3>
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.3rem;">Soporta JPG, PNG y WebP. Se convertirán automáticamente a WebP antes de guardarse.</p>
      </div>

      <div id="media-feedback-msg" style="color: var(--accent-gold); font-weight: 600; margin-bottom: 1rem;"></div>

      <!-- Media Grid -->
      <div id="media-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem;">
        ${mediaList.length === 0 ? '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No hay imágenes cargadas en la galería.</p>' : ''}
        ${mediaList.map(item => `
          <div class="media-card samurai-card" style="display: flex; flex-direction: column; overflow: hidden; padding: 1rem; position: relative;" data-id="${escapeHTML(item.id)}">
            <div style="height: 160px; overflow: hidden; border-radius: 6px; background: #000; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center; position: relative;">
              <img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.alt || item.name)}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
              <span style="position: absolute; bottom: 6px; right: 6px; font-size: 0.7rem; padding: 2px 6px; border-radius: 3px; background: ${item.alt ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)'}; color: #fff; font-weight: 600;">
                ${item.alt ? 'SEO Alt ✓' : 'Sin Alt'}
              </span>
            </div>
            
            <div style="flex: 1; display: flex; flex-direction: column;">
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin: 0 0 0.3rem 0; word-break: break-all; line-height: 1.3;">${escapeHTML(item.name)}</h4>
              
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.6rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                <strong style="color: var(--accent-gold); font-size: 0.75rem;">Alt:</strong> ${escapeHTML(item.alt || 'No especificado')}
              </div>

              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.8rem; display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.4rem;">
                <span>${escapeHTML(item.size || 'WebP')}</span>
                <span style="color: var(--accent-gold); font-weight: 600;">WebP</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-top: auto; margin-bottom: 0.4rem;">
                <button class="copy-url-btn btn-samurai-outline" data-url="${escapeHTML(item.url)}" style="padding: 0.4rem; font-size: 0.78rem;">📋 Copiar URL</button>
                <button class="copy-tag-btn btn-samurai-outline" data-id="${escapeHTML(item.id)}" style="padding: 0.4rem; font-size: 0.78rem;">🏷️ Tag HTML</button>
              </div>

              <div style="display: flex; gap: 0.4rem;">
                <button class="edit-media-btn btn-samurai-outline" data-id="${escapeHTML(item.id)}" style="flex: 1; padding: 0.4rem; font-size: 0.8rem; color: var(--accent-gold); border-color: rgba(197,168,128,0.3);">✏️ Editar SEO</button>
                <button class="del-media-btn btn-samurai-outline" data-id="${escapeHTML(item.id)}" style="padding: 0.4rem 0.6rem; font-size: 0.8rem; color: #f56565; border-color: rgba(229,62,62,0.3);">🗑️</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Modal de Edición de Metadatos SEO -->
      <div id="media-edit-modal" class="admin-login-modal ${editingItem ? '' : 'hidden'}" style="z-index: 1000;">
        <div class="samurai-card" style="max-width: 520px; width: 90%; padding: 1.8rem; background: var(--bg-card); position: relative;">
          <button id="close-media-modal-btn" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #fff; font-size: 1.4rem; cursor: pointer;">&times;</button>
          
          <h3 class="samurai-title" style="margin: 0 0 1rem 0; font-size: 1.2rem;">✏️ Metadatos SEO y Descripción</h3>
          
          ${editingItem ? `
            <div style="display: flex; gap: 1rem; margin-bottom: 1.2rem; align-items: center; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 6px;">
              <img src="${escapeHTML(editingItem.url)}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 0.85rem; color: var(--text-secondary); word-break: break-all;">
                <div style="color: #fff; font-weight: 600;">${escapeHTML(editingItem.name)}</div>
                <div style="font-size: 0.75rem; margin-top: 0.2rem;">${escapeHTML(editingItem.size || 'WebP')}</div>
              </div>
            </div>

            <form id="media-edit-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.3rem;">Nombre / Título de la Imagen</label>
                <input type="text" id="edit-media-name" value="${escapeHTML(editingItem.name)}" required style="width: 100%; padding: 0.6rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 4px;">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.3rem;">
                  Texto Alternativo (Alt Text para SEO & Accesibilidad)
                  <span style="color: var(--accent-gold); font-size: 0.75rem;">* Clave para buscadores</span>
                </label>
                <input type="text" id="edit-media-alt" value="${escapeHTML(editingItem.alt || '')}" placeholder="Descripción precisa de lo que muestra la imagen..." style="width: 100%; padding: 0.6rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 4px;">
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 0.2rem 0 0 0;">Ayuda a Google Images y a lectores de pantalla para personas con discapacidad visual.</p>
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label style="display: block; font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.3rem;">Pie de Foto / Descripción (Caption)</label>
                <textarea id="edit-media-caption" rows="2" placeholder="Información contextual adicional..." style="width: 100%; padding: 0.6rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 4px; resize: vertical;">${escapeHTML(editingItem.caption || '')}</textarea>
              </div>

              <div style="display: flex; gap: 0.8rem;">
                <button type="submit" class="btn-samurai-red" style="flex: 1; padding: 0.7rem; font-weight: 700; cursor: pointer;">Guardar Metadatos</button>
                <button type="button" id="cancel-edit-media-btn" class="btn-samurai-outline" style="padding: 0.7rem 1.2rem; cursor: pointer;">Cancelar</button>
              </div>
            </form>
          ` : ''}
        </div>
      </div>
    `;

    const fileInput = container.querySelector('#media-file-input');
    const uploadBtn = container.querySelector('#media-upload-btn');
    const dropzone = container.querySelector('#media-dropzone');
    const feedbackMsg = container.querySelector('#media-feedback-msg');

    uploadBtn.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(197, 168, 128, 0.1)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.background = 'rgba(197, 168, 128, 0.03)';
    });

    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.style.background = 'rgba(197, 168, 128, 0.03)';
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await processAndUploadFile(files[0]);
      }
    });

    fileInput.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        await processAndUploadFile(e.target.files[0]);
      }
    });

    async function processAndUploadFile(file) {
      try {
        feedbackMsg.textContent = '⏳ Convirtiendo a WebP y guardando en galería...';
        const webpFile = await convertToWebP(file);
        await dbService.uploadMedia(webpFile);
        mediaList = await dbService.getMedia();
        feedbackMsg.textContent = '¡Imagen guardada exitosamente!';
        setTimeout(() => { feedbackMsg.textContent = ''; }, 3000);
        renderUI();
      } catch (err) {
        feedbackMsg.textContent = 'Error al subir imagen: ' + err.message;
      }
    }

    // Copy URL to clipboard
    container.querySelectorAll('.copy-url-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.target.dataset.url;
        navigator.clipboard.writeText(url);
        const origText = e.target.textContent;
        e.target.textContent = '¡Copiado!';
        setTimeout(() => { e.target.textContent = origText; }, 2000);
      });
    });

    // Copy HTML Tag with Alt
    container.querySelectorAll('.copy-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = mediaList.find(m => m.id === id);
        if (item) {
          const htmlTag = `<img src="${item.url}" alt="${item.alt || item.name}" loading="lazy"${item.caption ? ` title="${item.caption}"` : ''}>`;
          navigator.clipboard.writeText(htmlTag);
          const origText = e.target.textContent;
          e.target.textContent = '¡Tag Copiado!';
          setTimeout(() => { e.target.textContent = origText; }, 2000);
        }
      });
    });

    // Open Edit Modal
    container.querySelectorAll('.edit-media-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        editingItem = mediaList.find(m => m.id === id);
        if (editingItem) renderUI();
      });
    });

    // Close Modal
    const closeModalBtn = container.querySelector('#close-media-modal-btn');
    const cancelEditBtn = container.querySelector('#cancel-edit-media-btn');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => { editingItem = null; renderUI(); });
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => { editingItem = null; renderUI(); });

    // Save Media Metadata
    const editForm = container.querySelector('#media-edit-form');
    if (editForm && editingItem) {
      editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedName = container.querySelector('#edit-media-name').value.trim();
        const updatedAlt = container.querySelector('#edit-media-alt').value.trim();
        const updatedCaption = container.querySelector('#edit-media-caption').value.trim();

        await dbService.updateMedia(editingItem.id, {
          name: updatedName || editingItem.name,
          alt: updatedAlt,
          caption: updatedCaption
        });

        editingItem = null;
        mediaList = await dbService.getMedia();
        feedbackMsg.textContent = '¡Metadatos SEO actualizados con éxito!';
        setTimeout(() => { feedbackMsg.textContent = ''; }, 3000);
        renderUI();
      });
    }

    // Delete Media item
    container.querySelectorAll('.del-media-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        if (confirm('¿Eliminar esta imagen de la galería de medios?')) {
          await dbService.deleteMedia(e.target.dataset.id);
          mediaList = await dbService.getMedia();
          renderUI();
        }
      });
    });
  }

  renderUI();
}
