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
          <button type="button" data-cmd="bold" title="Negrita (Ctrl+B)" class="wysiwyg-btn" style="font-weight:bold;">B</button>
          <button type="button" data-cmd="italic" title="Cursiva (Ctrl+I)" class="wysiwyg-btn" style="font-style:italic;">I</button>
          <button type="button" data-cmd="underline" title="Subrayado (Ctrl+U)" class="wysiwyg-btn" style="text-decoration:underline;">U</button>
          <button type="button" data-cmd="strikeThrough" title="Tachado" class="wysiwyg-btn" style="text-decoration:line-through;">S</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Alignment -->
          <button type="button" data-cmd="justifyLeft" title="Alinear a la Izquierda" class="wysiwyg-btn">⬅️</button>
          <button type="button" data-cmd="justifyCenter" title="Alinear al Centro" class="wysiwyg-btn">↔️</button>
          <button type="button" data-cmd="justifyRight" title="Alinear a la Derecha" class="wysiwyg-btn">➡️</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Lists -->
          <button type="button" data-cmd="insertUnorderedList" title="Lista con Viñetas" class="wysiwyg-btn">• Lista</button>
          <button type="button" data-cmd="insertOrderedList" title="Lista Numerada" class="wysiwyg-btn">1. Lista</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Links -->
          <button type="button" id="btn-insert-link" title="Insertar Enlace" class="wysiwyg-btn">🔗 Link</button>
          <button type="button" data-cmd="unlink" title="Quitar Enlace" class="wysiwyg-btn">✂️ Unlink</button>

          <span style="color:rgba(255,255,255,0.15); margin:0 0.2rem;">|</span>

          <!-- Media & WebP -->
          <button type="button" id="btn-insert-image" class="btn-samurai-outline" style="padding:0.3rem 0.7rem; font-size:0.85rem;">🖼️ Subir WebP</button>
          <button type="button" id="btn-insert-youtube" class="btn-samurai-red" style="padding:0.3rem 0.7rem; font-size:0.85rem;">▶️ YouTube</button>

          <input type="file" id="wysiwyg-file-input" accept="image/*" style="display:none;">
        </div>

        <!-- Drag & Drop Zone -->
        <div id="drop-zone-hint" style="padding:0.4rem 1rem; background:rgba(197,168,128,0.05); font-size:0.8rem; color:var(--accent-gold); border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <span>✨ <em>Tip: Arrastra y suelta cualquier imagen (PNG/JPG) directamente en el editor para convertirla automáticamente a WebP.</em></span>
        </div>

        <div class="wysiwyg-content" contenteditable="true" style="min-height:300px; padding:1.5rem; color:var(--text-primary); outline:none; line-height:1.7; font-family:var(--font-body);">
          ${this.initialHTML}
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
