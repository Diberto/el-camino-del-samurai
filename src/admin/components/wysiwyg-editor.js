import { convertToWebP } from '../../utils/webp-converter.js';
import { extractYouTubeId, generateYouTubeEmbedHTML } from '../../utils/youtube-embed.js';
import { dbService } from '../../services/db-service.js';

export class WysiwygEditor {
  constructor(containerEl, initialHTML = '') {
    this.container = containerEl;
    this.initialHTML = initialHTML;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="wysiwyg-wrapper" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: var(--bg-card);">
        <div class="wysiwyg-toolbar" style="display:flex; gap:0.4rem; padding:0.6rem; background:rgba(0,0,0,0.5); border-bottom:1px solid var(--border-color); flex-wrap:wrap; align-items:center;">
          <!-- Format Selector -->
          <select id="wysiwyg-block-type" style="padding:0.4rem 0.6rem; background:rgba(255,255,255,0.05); color:var(--text-primary); border:1px solid rgba(255,255,255,0.1); border-radius:4px; font-size:0.85rem; cursor:pointer;">
            <option value="p">Párrafo Normal</option>
            <option value="h2">Encabezado H2</option>
            <option value="h3">Encabezado H3</option>
            <option value="h4">Encabezado H4</option>
            <option value="blockquote">Cita Destacada (Blockquote)</option>
          </select>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Inline Text Formats -->
          <button type="button" data-cmd="bold" title="Negrita" class="wysiwyg-btn" style="font-weight:bold;">B</button>
          <button type="button" data-cmd="italic" title="Cursiva" class="wysiwyg-btn" style="font-style:italic;">I</button>
          <button type="button" data-cmd="underline" title="Subrayado" class="wysiwyg-btn" style="text-decoration:underline;">U</button>
          <button type="button" data-cmd="strikeThrough" title="Tachado" class="wysiwyg-btn" style="text-decoration:line-through;">S</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Alignment -->
          <button type="button" data-cmd="justifyLeft" title="Alinear a Izquierda" class="wysiwyg-btn">⬅️</button>
          <button type="button" data-cmd="justifyCenter" title="Alinear al Centro" class="wysiwyg-btn">↔️</button>
          <button type="button" data-cmd="justifyRight" title="Alinear a Derecha" class="wysiwyg-btn">➡️</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Lists -->
          <button type="button" data-cmd="insertUnorderedList" title="Lista Viñetas" class="wysiwyg-btn">• Lista</button>
          <button type="button" data-cmd="insertOrderedList" title="Lista Numerada" class="wysiwyg-btn">1. Lista</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Links -->
          <button type="button" id="btn-insert-link" title="Insertar Enlace" class="wysiwyg-btn">🔗 Link</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Media Gallery Picker & WebP -->
          <button type="button" id="btn-open-media-gallery" class="btn-samurai-outline" style="padding:0.3rem 0.7rem; font-size:0.85rem; color:var(--accent-gold); border-color:var(--accent-gold-glow);">🖼️ Galería de Medios</button>
          <button type="button" id="btn-insert-image" class="btn-samurai-outline" style="padding:0.3rem 0.7rem; font-size:0.85rem;">⬆️ Subir WebP</button>
          <button type="button" id="btn-insert-youtube" class="btn-samurai-red" style="padding:0.3rem 0.7rem; font-size:0.85rem;">▶️ YouTube</button>

          <input type="file" id="wysiwyg-file-input" accept="image/*" style="display:none;">
        </div>

        <div class="wysiwyg-content" contenteditable="true" style="min-height:300px; padding:1.5rem; color:var(--text-primary); outline:none; line-height:1.7; font-family:var(--font-body);">
          ${this.initialHTML}
        </div>
      </div>

      <!-- Media Gallery Modal -->
      <div id="wysiwyg-media-modal" class="admin-login-modal hidden" style="background:rgba(0,0,0,0.85); z-index:9999;">
        <div class="samurai-card" style="width:90%; max-width:800px; max-height:80vh; overflow-y:auto; padding:2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h3 class="samurai-title">Seleccionar Imagen de Galería de Medios</h3>
            <button type="button" id="close-media-modal-btn" class="btn-samurai-outline">✕ Cerrar</button>
          </div>
          <div id="media-modal-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:1rem;"></div>
        </div>
      </div>
    `;

    const contentDiv = this.container.querySelector('.wysiwyg-content');
    const toolbar = this.container.querySelector('.wysiwyg-toolbar');

    // ExecCommand buttons
    toolbar.querySelectorAll('button[data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.execCommand(btn.dataset.cmd, false, btn.dataset.val || null);
        contentDiv.focus();
      });
    });

    // Block type selector
    const blockSelect = this.container.querySelector('#wysiwyg-block-type');
    blockSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'blockquote') {
        document.execCommand('formatBlock', false, 'blockquote');
      } else {
        document.execCommand('formatBlock', false, `<${val}>`);
      }
      contentDiv.focus();
    });

    // Link inserter
    this.container.querySelector('#btn-insert-link').addEventListener('click', () => {
      const url = prompt('Ingresa la URL del enlace (https://...):');
      if (url) {
        document.execCommand('createLink', false, url);
        contentDiv.focus();
      }
    });

    // Open Media Gallery Modal Picker
    const mediaModal = this.container.querySelector('#wysiwyg-media-modal');
    const mediaGrid = this.container.querySelector('#media-modal-grid');
    const closeMediaModalBtn = this.container.querySelector('#close-media-modal-btn');

    this.container.querySelector('#btn-open-media-gallery').addEventListener('click', async () => {
      const mediaItems = await dbService.getMedia();
      if (mediaItems.length === 0) {
        mediaGrid.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1; text-align:center;">No hay imágenes registradas en la Galería de Medios. Sube una desde el menú Medios o el botón Subir WebP.</p>';
      } else {
        mediaGrid.innerHTML = mediaItems.map(item => `
          <div class="media-modal-item" data-url="${item.url}" style="border:1px solid var(--border-color); border-radius:8px; padding:0.5rem; cursor:pointer; background:rgba(0,0,0,0.4); text-align:center; transition:transform 0.2s ease;">
            <img src="${item.url}" alt="${item.name}" style="width:100%; height:120px; object-fit:cover; border-radius:4px; margin-bottom:0.4rem;">
            <span style="font-size:0.75rem; color:var(--text-secondary); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</span>
          </div>
        `).join('');

        mediaGrid.querySelectorAll('.media-modal-item').forEach(card => {
          card.addEventListener('click', () => {
            const url = card.dataset.url;
            contentDiv.focus();
            document.execCommand('insertImage', false, url);
            mediaModal.classList.add('hidden');
          });
        });
      }
      mediaModal.classList.remove('hidden');
    });

    closeMediaModalBtn.addEventListener('click', () => mediaModal.classList.add('hidden'));

    // Image upload (WebP converter)
    const fileInput = this.container.querySelector('#wysiwyg-file-input');
    this.container.querySelector('#btn-insert-image').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) await this.handleImageFile(file, contentDiv);
    });

    // Drag & Drop image handler
    contentDiv.addEventListener('dragover', (e) => e.preventDefault());
    contentDiv.addEventListener('drop', async (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files && files.length > 0 && files[0].type.startsWith('image/')) {
        await this.handleImageFile(files[0], contentDiv);
      }
    });

    // YouTube embed tool
    this.container.querySelector('#btn-insert-youtube').addEventListener('click', () => {
      const input = prompt('Ingresa la URL o ID del video de YouTube:');
      const yid = extractYouTubeId(input);
      if (yid) {
        const html = generateYouTubeEmbedHTML(yid);
        contentDiv.focus();
        document.execCommand('insertHTML', false, html);
      } else if (input) {
        alert('URL de YouTube no válida');
      }
    });
  }

  async handleImageFile(file, contentDiv) {
    try {
      const webpFile = await convertToWebP(file);
      const url = await dbService.uploadMedia(webpFile);
      contentDiv.focus();
      document.execCommand('insertImage', false, url);
    } catch (err) {
      alert('Error al procesar/subir imagen a WebP: ' + err.message);
    }
  }

  getContent() {
    return this.container.querySelector('.wysiwyg-content').innerHTML;
  }
}
