import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

const DEFAULT_GALLERY_ITEMS = [
  { id: 'gal_1', title: 'Castillo de Himeji y Fortalezas Feudales', tag: 'Patrimonio Histórico', image_url: 'photos/castillo_sengoku.webp', alt: 'Castillo de Himeji Japón', visible: true },
  { id: 'gal_2', title: 'Meditación Zen en Templos de Kioto', tag: 'Naturaleza & Zen', image_url: 'photos/jardin_zen.webp', alt: 'Jardín Zen y templo en Kioto', visible: true },
  { id: 'gal_3', title: 'Huellas de Miyamoto Musashi', tag: 'Ruta del Budo', image_url: 'photos/cueva_reigando.webp', alt: 'Cueva Reigando y estatuas de piedra', visible: true },
  { id: 'gal_4', title: 'Entrenamiento Tradicional y Filosofía', tag: 'Artes Marciales', image_url: 'photos/orpianesi1.webp', alt: 'Jorge Orpianesi en dojo', visible: true },
  { id: 'gal_5', title: 'Puentes y Pasos Legendarios', tag: 'Patrimonio Histórico', image_url: 'photos/WhatsApp Image 2026-06-25 at 16.10.29.webp', alt: 'Puentes históricos', visible: true },
  { id: 'gal_6', title: 'Esculturas y Monumentos del Budo', tag: 'Cultura & Tradición', image_url: 'photos/WhatsApp Image 2026-06-25 at 16.10.35.webp', alt: 'Esculturas tradicionales', visible: true }
];

const SUGGESTED_TAGS = [
  'Patrimonio Histórico',
  'Naturaleza & Zen',
  'Ruta del Budo',
  'Artes Marciales',
  'Cultura & Tradición',
  'Templos & Santuarios',
  'Castillos Feudales',
  'Expediciones'
];

async function convertToWebP(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const baseName = file.name.replace(/\.[^/.]+$/, '');
              const newFile = new File([blob], `${baseName}.webp`, { type: 'image/webp' });
              resolve(newFile);
            } else {
              reject(new Error('Fallo al convertir a WebP'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export async function initGalleryManager(container) {
  let [loadedSettings, availableMedia] = await Promise.all([
    dbService.getSettings() || {},
    dbService.getMedia() || []
  ]);

  const settings = loadedSettings;
  if (!settings.gallery_items || !Array.isArray(settings.gallery_items)) {
    settings.gallery_items = DEFAULT_GALLERY_ITEMS;
  }

  let activeMediaModalTargetId = null;

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderUI() {
    const totalCount = settings.gallery_items.length;
    const activeCount = settings.gallery_items.filter(g => g.visible !== false).length;
    const hiddenCount = totalCount - activeCount;

    container.innerHTML = `
      <!-- Encabezado de la Sección -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0;">📸 Gestión de Galería Fotográfica</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0.3rem 0 0 0;">
            Área exclusiva para modificar, agregar, ordenar o quitar fotos de la sección <strong>#galeria</strong> en la web.
          </p>
        </div>
        <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
          <input type="file" id="gal-direct-upload-input" accept="image/*" style="display:none;">
          <button id="gal-direct-upload-btn" class="btn-samurai-outline" style="padding:0.7rem 1.2rem; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            📤 Subir Foto Directa
          </button>
          <button id="add-gal-photo-btn" class="btn-samurai-outline" style="padding:0.7rem 1.2rem; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            ➕ Nueva Tarjeta
          </button>
          <button id="save-gal-btn" class="btn-samurai-red" style="padding:0.7rem 1.6rem; cursor:pointer; font-weight:700;">
            💾 Guardar y Sincronizar
          </button>
        </div>
      </div>

      <!-- Tarjetas de Métricas -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:var(--accent-gold);">${totalCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Fotos en la Galería</div>
        </div>
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:#48bb78;">${activeCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Visibles en la Landing Page</div>
        </div>
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:#ecc94b;">${hiddenCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Ocultas / Borradores</div>
        </div>
      </div>

      <!-- Mensaje de Feedback de Subida -->
      <div id="gal-upload-status" style="margin-bottom:1rem; font-size:0.9rem; font-weight:600; color:var(--accent-gold);"></div>

      <!-- Cuadrícula de Edición de Fotos -->
      <div id="gallery-cards-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:1.5rem;">
        ${settings.gallery_items.map((item, index) => `
          <div class="samurai-card gal-edit-card" data-id="${item.id}" style="padding:1.2rem; background:var(--bg-card); border:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:0.8rem; position:relative; border-radius:8px;">
            
            <!-- Barra Superior de Control de Tarjeta -->
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <span style="font-size:0.85rem; font-weight:700; color:var(--accent-gold); letter-spacing:0.05em;">#${index + 1}</span>
                <button type="button" class="move-up-btn" data-index="${index}" title="Subir posición" style="background:rgba(255,255,255,0.08); border:none; color:#fff; border-radius:3px; cursor:pointer; padding:0.15rem 0.4rem; font-size:0.75rem;" ${index === 0 ? 'disabled style="opacity:0.3;"' : ''}>▲</button>
                <button type="button" class="move-down-btn" data-index="${index}" title="Bajar posición" style="background:rgba(255,255,255,0.08); border:none; color:#fff; border-radius:3px; cursor:pointer; padding:0.15rem 0.4rem; font-size:0.75rem;" ${index === totalCount - 1 ? 'disabled style="opacity:0.3;"' : ''}>▼</button>
              </div>

              <div style="display:flex; gap:0.4rem;">
                <button type="button" class="clone-gal-btn" data-id="${item.id}" title="Duplicar tarjeta" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; cursor:pointer; font-size:0.75rem; padding:0.25rem 0.5rem;">📋 Duplicar</button>
                <button type="button" class="del-gal-btn" data-id="${item.id}" style="background:rgba(218,68,83,0.15); border:1px solid #da4453; color:#ff8585; border-radius:4px; cursor:pointer; font-size:0.75rem; padding:0.25rem 0.6rem;">🗑️ Quitar</button>
              </div>
            </div>

            <!-- Preview Imagen con botón de cambio directo -->
            <div style="width:100%; height:190px; background:#0c0d12; border-radius:6px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); position:relative; group;">
              <img src="${escapeHTML(item.image_url)}" class="gal-card-img" data-id="${item.id}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='photos/cueva_reigando.webp'">
              <div style="position:absolute; bottom:6px; left:6px; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); padding:3px 8px; border-radius:4px; font-size:0.75rem; color:var(--accent-gold); font-weight:600;">
                🏷️ ${escapeHTML(item.tag || 'Sin Categoría')}
              </div>
              <button type="button" class="open-media-modal-btn" data-id="${item.id}" style="position:absolute; top:6px; right:6px; background:rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.3); color:#fff; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.75rem; cursor:pointer; font-weight:600;">
                🖼️ Cambiar Imagen
              </button>
            </div>

            <!-- Título de la Foto -->
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">Título de la Fotografía</label>
              <input type="text" class="gal-input-title" data-id="${item.id}" value="${escapeHTML(item.title)}" placeholder="Nombre o ubicación..." style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.9rem;">
            </div>

            <!-- Categoría / Tag & Visibilidad -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
              <div>
                <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">Categoría / Tag</label>
                <input type="text" class="gal-input-tag" data-id="${item.id}" value="${escapeHTML(item.tag || '')}" placeholder="Ej: Ruta del Budo" style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem;">
              </div>
              <div>
                <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">Visibilidad</label>
                <label style="display:flex; align-items:center; gap:0.4rem; color:var(--text-primary); font-size:0.85rem; height:36px; background:rgba(0,0,0,0.2); padding:0 0.6rem; border-radius:4px; cursor:pointer;">
                  <input type="checkbox" class="gal-chk-vis" data-id="${item.id}" ${item.visible !== false ? 'checked' : ''} style="accent-color:var(--accent-red); width:16px; height:16px;"> Mostrar en Web
                </label>
              </div>
            </div>

            <!-- Sugerencias de Tags Rápidos -->
            <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
              ${SUGGESTED_TAGS.slice(0, 4).map(st => `
                <button type="button" class="quick-tag-btn" data-id="${item.id}" data-tag="${st}" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:var(--text-secondary); font-size:0.7rem; padding:0.15rem 0.4rem; border-radius:3px; cursor:pointer;">+ ${st}</button>
              `).join('')}
            </div>

            <!-- URL de Imagen / Ruta -->
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">Ruta / URL de la Imagen</label>
              <div style="display:flex; gap:0.4rem;">
                <input type="text" class="gal-input-url" data-id="${item.id}" value="${escapeHTML(item.image_url)}" placeholder="photos/... o uploads/..." style="flex:1; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.8rem;">
                <button type="button" class="open-media-modal-btn btn-samurai-outline" data-id="${item.id}" style="padding:0.4rem 0.7rem; font-size:0.75rem; white-space:nowrap; cursor:pointer;">📂 Elegir</button>
              </div>
            </div>

            <!-- Texto Alt SEO -->
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">
                Texto Alternativo Alt (SEO & Google Images)
              </label>
              <input type="text" class="gal-input-alt" data-id="${item.id}" value="${escapeHTML(item.alt || '')}" placeholder="Descripción visual para buscadores..." style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.8rem;">
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Barra Inferior de Guardado -->
      <div style="margin-top:2.5rem; padding:1.5rem; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h4 style="margin:0 0 0.3rem 0; color:#fff;">¿Listo para publicar tus cambios?</h4>
          <p style="margin:0; font-size:0.85rem; color:var(--text-secondary);">Al guardar, la sección de galería y su lightbox se actualizarán instantáneamente en toda la web.</p>
        </div>
        <div style="display:flex; align-items:center; gap:1rem;">
          <div id="gal-feedback-msg" style="color:var(--accent-gold); font-weight:600;"></div>
          <button id="save-gal-btn-bottom" class="btn-samurai-red" style="padding:0.8rem 2.2rem; font-weight:700; cursor:pointer;">💾 Guardar y Sincronizar Galería</button>
        </div>
      </div>

      <!-- Modal Visual de Selección de Medios -->
      <div id="gal-media-modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); z-index:9999; align-items:center; justify-content:center;">
        <div class="samurai-card" style="width:90%; max-width:840px; max-height:85vh; padding:1.5rem; display:flex; flex-direction:column; background:var(--bg-card); position:relative; border-radius:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.8rem;">
            <h3 class="samurai-title" style="margin:0; font-size:1.2rem;">📂 Seleccionar Imagen de la Biblioteca de Medios</h3>
            <button id="close-media-modal-btn" style="background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer;">&times;</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <input type="file" id="modal-upload-input" accept="image/*" style="display:none;">
            <button id="modal-upload-btn" class="btn-samurai-outline" style="padding:0.5rem 1rem; font-size:0.85rem; cursor:pointer;">📤 Subir Nueva Imagen Aquí</button>
            <span style="font-size:0.8rem; color:var(--text-secondary);">Haz clic en cualquier imagen para asignarla a la foto</span>
          </div>

          <div id="modal-media-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:1rem; overflow-y:auto; padding-right:0.5rem; max-height:55vh;">
            ${availableMedia.map(m => `
              <div class="media-pick-item" data-url="${escapeHTML(m.url)}" data-name="${escapeHTML(m.name || '')}" data-alt="${escapeHTML(m.alt || '')}" style="cursor:pointer; border:1px solid rgba(255,255,255,0.1); border-radius:6px; overflow:hidden; background:#0c0d12; transition:transform 0.2s, border-color 0.2s;">
                <div style="width:100%; height:100px;">
                  <img src="${escapeHTML(m.url)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='photos/cueva_reigando.webp'">
                </div>
                <div style="padding:0.4rem; font-size:0.75rem; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${escapeHTML(m.name || m.url)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // 1. Direct File Upload to Gallery
    const directUploadInput = container.querySelector('#gal-direct-upload-input');
    const directUploadBtn = container.querySelector('#gal-direct-upload-btn');
    const uploadStatus = container.querySelector('#gal-upload-status');

    if (directUploadBtn && directUploadInput) {
      directUploadBtn.addEventListener('click', () => directUploadInput.click());
      directUploadInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          await handleFileUploadDirectly(e.target.files[0]);
        }
      });
    }

    async function handleFileUploadDirectly(file) {
      try {
        if (uploadStatus) uploadStatus.textContent = `⏳ Optimizando y subiendo "${file.name}" a la galería...`;
        const webpFile = await convertToWebP(file);
        const uploadedUrl = await dbService.uploadMedia(webpFile, { name: file.name });
        
        syncStateFromInputs();
        const newId = 'gal_' + Date.now();
        const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        settings.gallery_items.unshift({
          id: newId,
          title: baseName.charAt(0).toUpperCase() + baseName.slice(1),
          tag: 'Expediciones',
          image_url: uploadedUrl,
          alt: file.name,
          visible: true
        });

        availableMedia = (await dbService.getMedia()) || [];
        if (uploadStatus) {
          uploadStatus.textContent = `¡Imagen "${file.name}" subida y agregada a la galería con éxito! Recuerda hacer clic en "Guardar Cambios".`;
          setTimeout(() => { uploadStatus.textContent = ''; }, 4500);
        }
        renderUI();
      } catch (err) {
        if (uploadStatus) uploadStatus.textContent = 'Error al subir imagen: ' + err.message;
      }
    }

    // 2. Add New Blank Card
    const addBtn = container.querySelector('#add-gal-photo-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        syncStateFromInputs();
        const newId = 'gal_' + Date.now();
        settings.gallery_items.unshift({
          id: newId,
          title: 'Nueva Fotografía',
          tag: 'Ruta del Budo',
          image_url: availableMedia.length > 0 ? availableMedia[0].url : 'photos/cueva_reigando.webp',
          alt: 'Fotografía histórica en Japón',
          visible: true
        });
        renderUI();
      });
    }

    // 3. Move Up / Down
    container.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        if (index > 0) {
          syncStateFromInputs();
          const temp = settings.gallery_items[index];
          settings.gallery_items[index] = settings.gallery_items[index - 1];
          settings.gallery_items[index - 1] = temp;
          renderUI();
        }
      });
    });

    container.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        if (index < settings.gallery_items.length - 1) {
          syncStateFromInputs();
          const temp = settings.gallery_items[index];
          settings.gallery_items[index] = settings.gallery_items[index + 1];
          settings.gallery_items[index + 1] = temp;
          renderUI();
        }
      });
    });

    // 4. Clone / Duplicate Card
    container.querySelectorAll('.clone-gal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        syncStateFromInputs();
        const item = settings.gallery_items.find(g => g.id === id);
        if (item) {
          const cloned = { ...item, id: 'gal_' + Date.now(), title: item.title + ' (Copia)' };
          const idx = settings.gallery_items.findIndex(g => g.id === id);
          settings.gallery_items.splice(idx + 1, 0, cloned);
          renderUI();
        }
      });
    });

    // 5. Delete Photo Button
    container.querySelectorAll('.del-gal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (confirm('¿Eliminar esta fotografía de la galería?')) {
          syncStateFromInputs();
          settings.gallery_items = settings.gallery_items.filter(g => g.id !== id);
          renderUI();
        }
      });
    });

    // 6. Quick Tag Buttons
    container.querySelectorAll('.quick-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const tag = e.target.dataset.tag;
        const inputTag = container.querySelector(`.gal-input-tag[data-id="${id}"]`);
        if (inputTag) inputTag.value = tag;
      });
    });

    // 7. Visual Media Selector Modal
    const modal = container.querySelector('#gal-media-modal');
    const closeModalBtn = container.querySelector('#close-media-modal-btn');
    const modalUploadBtn = container.querySelector('#modal-upload-btn');
    const modalUploadInput = container.querySelector('#modal-upload-input');

    container.querySelectorAll('.open-media-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeMediaModalTargetId = e.currentTarget.dataset.id;
        if (modal) modal.style.display = 'flex';
      });
    });

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    if (modalUploadBtn && modalUploadInput) {
      modalUploadBtn.addEventListener('click', () => modalUploadInput.click());
      modalUploadInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          try {
            const webpFile = await convertToWebP(file);
            const uploadedUrl = await dbService.uploadMedia(webpFile, { name: file.name });
            availableMedia = (await dbService.getMedia()) || [];
            
            if (activeMediaModalTargetId) {
              const inputUrl = container.querySelector(`.gal-input-url[data-id="${activeMediaModalTargetId}"]`);
              const imgEl = container.querySelector(`.gal-card-img[data-id="${activeMediaModalTargetId}"]`);
              if (inputUrl) inputUrl.value = uploadedUrl;
              if (imgEl) imgEl.src = uploadedUrl;
            }

            if (modal) modal.style.display = 'none';
          } catch (err) {
            alert('Error al subir imagen: ' + err.message);
          }
        }
      });
    }

    container.querySelectorAll('.media-pick-item').forEach(item => {
      item.addEventListener('click', () => {
        const url = item.dataset.url;
        if (activeMediaModalTargetId && url) {
          const inputUrl = container.querySelector(`.gal-input-url[data-id="${activeMediaModalTargetId}"]`);
          const imgEl = container.querySelector(`.gal-card-img[data-id="${activeMediaModalTargetId}"]`);
          if (inputUrl) inputUrl.value = url;
          if (imgEl) imgEl.src = url;
        }
        if (modal) modal.style.display = 'none';
      });
    });

    // 8. Live URL Preview Input
    container.querySelectorAll('.gal-input-url').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = e.target.dataset.id;
        const imgEl = container.querySelector(`.gal-card-img[data-id="${id}"]`);
        if (imgEl) imgEl.src = e.target.value;
      });
    });

    // 9. Save Handlers
    const saveTop = container.querySelector('#save-gal-btn');
    const saveBottom = container.querySelector('#save-gal-btn-bottom');
    const msgEl = container.querySelector('#gal-feedback-msg');

    async function handleSave() {
      syncStateFromInputs();
      if (msgEl) msgEl.textContent = '⏳ Guardando y sincronizando cambios...';

      try {
        const currentFullSettings = (await dbService.getSettings()) || {};
        const mergedSettings = { ...currentFullSettings, gallery_items: settings.gallery_items };

        await dbService.saveSettings(mergedSettings);
        syncService.broadcast('SETTINGS_UPDATED', mergedSettings);
        if (msgEl) {
          msgEl.textContent = '¡Galería fotográfica guardada y sincronizada con éxito en la Landing Page!';
          setTimeout(() => { msgEl.textContent = ''; }, 3500);
        }
      } catch (err) {
        if (msgEl) msgEl.textContent = 'Error al guardar: ' + err.message;
      }
    }

    if (saveTop) saveTop.addEventListener('click', handleSave);
    if (saveBottom) saveBottom.addEventListener('click', handleSave);

    function syncStateFromInputs() {
      settings.gallery_items = settings.gallery_items.map(item => {
        const titleEl = container.querySelector(`.gal-input-title[data-id="${item.id}"]`);
        const tagEl = container.querySelector(`.gal-input-tag[data-id="${item.id}"]`);
        const urlEl = container.querySelector(`.gal-input-url[data-id="${item.id}"]`);
        const altEl = container.querySelector(`.gal-input-alt[data-id="${item.id}"]`);
        const visEl = container.querySelector(`.gal-chk-vis[data-id="${item.id}"]`);

        return {
          id: item.id,
          title: titleEl ? titleEl.value.trim() : item.title,
          tag: tagEl ? tagEl.value.trim() : item.tag,
          image_url: urlEl ? urlEl.value.trim() : item.image_url,
          alt: altEl ? altEl.value.trim() : item.alt,
          visible: visEl ? visEl.checked : item.visible
        };
      });
    }
  }

  renderUI();
}
