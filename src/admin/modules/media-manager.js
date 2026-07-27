import { dbService } from '../../services/db-service.js';
import { convertToWebP } from '../../utils/webp-converter.js';

export async function initMediaManager(container) {
  let mediaList = await dbService.getMedia();

  function renderUI() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2 class="samurai-title">🖼️ Galería y Biblioteca de Medios</h2>
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
      <div id="media-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem;">
        ${mediaList.length === 0 ? '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No hay imágenes cargadas en la galería.</p>' : ''}
        ${mediaList.map(item => `
          <div class="media-card samurai-card" style="display: flex; flex-direction: column; overflow: hidden; padding: 1rem; position: relative;">
            <div style="height: 160px; overflow: hidden; border-radius: 6px; background: #000; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 0.8rem; display: flex; align-items: center; justify-content: center;">
              <img src="${item.url}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div style="flex: 1; display: flex; flex-direction: column;">
              <h4 style="font-size: 0.9rem; color: var(--text-primary); margin: 0 0 0.4rem 0; word-break: break-all; line-height: 1.3;">${item.name}</h4>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.8rem; display: flex; justify-content: space-between;">
                <span>${item.size || 'WebP'}</span>
                <span style="color: var(--accent-gold); font-weight: 600;">WebP</span>
              </div>
              <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                <button class="copy-url-btn btn-samurai-outline" data-url="${item.url}" style="flex: 1; padding: 0.4rem; font-size: 0.8rem;">📋 Copiar URL</button>
                <button class="del-media-btn btn-samurai-outline" data-id="${item.id}" style="padding: 0.4rem 0.6rem; font-size: 0.8rem; color: #f56565; border-color: rgba(229,62,62,0.3);">🗑️</button>
              </div>
            </div>
          </div>
        `).join('')}
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
