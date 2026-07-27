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
      <div class="wysiwyg-toolbar" style="display:flex; gap:0.4rem; padding:0.5rem; background:#242832; border:1px solid #4a5568; border-bottom:none; border-radius:6px 6px 0 0; flex-wrap:wrap;">
        <button type="button" data-cmd="bold" style="padding:0.4rem 0.7rem; font-weight:bold; cursor:pointer;">B</button>
        <button type="button" data-cmd="italic" style="padding:0.4rem 0.7rem; font-style:italic; cursor:pointer;">I</button>
        <button type="button" data-cmd="underline" style="padding:0.4rem 0.7rem; text-decoration:underline; cursor:pointer;">U</button>
        <button type="button" data-cmd="formatBlock" data-val="H2" style="padding:0.4rem 0.7rem; cursor:pointer;">H2</button>
        <button type="button" data-cmd="formatBlock" data-val="H3" style="padding:0.4rem 0.7rem; cursor:pointer;">H3</button>
        <button type="button" data-cmd="insertUnorderedList" style="padding:0.4rem 0.7rem; cursor:pointer;">• Lista</button>
        <button type="button" id="btn-insert-image" style="padding:0.4rem 0.7rem; background:#4a5568; color:#fff; border:none; border-radius:4px; cursor:pointer;">🖼️ WebP Imagen</button>
        <button type="button" id="btn-insert-youtube" style="padding:0.4rem 0.7rem; background:#e53e3e; color:#fff; border:none; border-radius:4px; cursor:pointer;">▶️ YouTube</button>
        <input type="file" id="wysiwyg-file-input" accept="image/*" style="display:none;">
      </div>
      <div class="wysiwyg-content" contenteditable="true" style="min-height:250px; padding:1rem; background:#1a1d24; border:1px solid #4a5568; border-radius:0 0 6px 6px; color:#fff; overflow-y:auto;">
        ${this.initialHTML}
      </div>
    `;

    const contentDiv = this.container.querySelector('.wysiwyg-content');
    const toolbar = this.container.querySelector('.wysiwyg-toolbar');

    toolbar.querySelectorAll('button[data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.execCommand(btn.dataset.cmd, false, btn.dataset.val || null);
      });
    });

    const fileInput = this.container.querySelector('#wysiwyg-file-input');
    this.container.querySelector('#btn-insert-image').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const webpFile = await convertToWebP(file);
        const url = await dbService.uploadMedia(webpFile);
        document.execCommand('insertImage', false, url);
      } catch (err) {
        alert('Error al procesar/subir imagen: ' + err.message);
      }
    });

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

  getContent() {
    return this.container.querySelector('.wysiwyg-content').innerHTML;
  }
}
