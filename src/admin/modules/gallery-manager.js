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

export async function initGalleryManager(container) {
  const [loadedSettings, availableMedia] = await Promise.all([
    dbService.getSettings() || {},
    dbService.getMedia() || []
  ]);

  const settings = loadedSettings;
  if (!settings.gallery_items || !Array.isArray(settings.gallery_items)) {
    settings.gallery_items = DEFAULT_GALLERY_ITEMS;
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderUI() {
    const totalCount = settings.gallery_items.length;
    const activeCount = settings.gallery_items.filter(g => g.visible !== false).length;
    const hiddenCount = totalCount - activeCount;

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0;">📸 Gestión de Galería Fotográfica</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0.3rem 0 0 0;">
            Administra las imágenes, títulos, etiquetas de categoría y textos SEO de la sección <strong>#galeria</strong> en la Landing Page.
          </p>
        </div>
        <div style="display:flex; gap:0.8rem;">
          <button id="add-gal-photo-btn" class="btn-samurai-outline" style="padding:0.7rem 1.2rem; cursor:pointer; font-weight:600;">➕ Nueva Foto</button>
          <button id="save-gal-btn" class="btn-samurai-red" style="padding:0.7rem 1.6rem; cursor:pointer; font-weight:700;">💾 Guardar Cambios</button>
        </div>
      </div>

      <!-- Resumen de Métricas -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:var(--accent-gold);">${totalCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Fotos Totales</div>
        </div>
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:#48bb78;">${activeCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Visibles en Home</div>
        </div>
        <div class="samurai-card" style="padding:1rem; text-align:center; background:rgba(0,0,0,0.3);">
          <div style="font-size:1.6rem; font-weight:700; color:#ecc94b;">${hiddenCount}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">Ocultas / Borradores</div>
        </div>
      </div>

      <!-- Cuadrícula de Edición de Fotos -->
      <div id="gallery-cards-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:1.5rem;">
        ${settings.gallery_items.map((item, index) => `
          <div class="samurai-card gal-edit-card" data-id="${item.id}" style="padding:1.2rem; background:var(--bg-card); border:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:0.8rem; position:relative; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; font-weight:700; color:var(--accent-gold); letter-spacing:0.05em;">#${index + 1} &bull; ID: ${item.id}</span>
              <button type="button" class="del-gal-btn" data-id="${item.id}" style="background:rgba(218,68,83,0.15); border:1px solid #da4453; color:#ff8585; border-radius:4px; cursor:pointer; font-size:0.75rem; padding:0.25rem 0.6rem;">🗑️ Eliminar</button>
            </div>

            <!-- Preview Imagen -->
            <div style="width:100%; height:180px; background:#0c0d12; border-radius:6px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); position:relative;">
              <img src="${escapeHTML(item.image_url)}" class="gal-card-img" data-id="${item.id}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='photos/cueva_reigando.webp'">
              <div style="position:absolute; bottom:6px; left:6px; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); padding:2px 8px; border-radius:4px; font-size:0.7rem; color:var(--accent-gold); font-weight:600;">
                ${escapeHTML(item.tag || 'Sin Categoría')}
              </div>
            </div>

            <!-- Título -->
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

            <!-- URL de Imagen -->
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">Ruta / URL de la Imagen</label>
              <input type="text" class="gal-input-url" data-id="${item.id}" value="${escapeHTML(item.image_url)}" placeholder="photos/... o uploads/..." style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.8rem;">
            </div>

            <!-- Selector de Medios Subidos -->
            ${availableMedia && availableMedia.length > 0 ? `
              <div>
                <label style="font-size:0.75rem; color:var(--accent-gold); display:block; margin-bottom:0.2rem; font-weight:600;">📂 Seleccionar de Galería de Medios:</label>
                <select class="gal-select-media" data-id="${item.id}" style="width:100%; padding:0.5rem; background:#12131a; border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:4px; font-size:0.8rem; cursor:pointer;">
                  <option value="">-- Elige una imagen subida --</option>
                  ${availableMedia.map(m => `
                    <option value="${escapeHTML(m.url)}" ${m.url === item.image_url ? 'selected' : ''}>
                      ${escapeHTML(m.name || 'Imagen')} (${escapeHTML(m.url)})
                    </option>
                  `).join('')}
                </select>
              </div>
            ` : ''}

            <!-- Texto Alt SEO -->
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem; font-weight:600;">
                Texto Alternativo Alt (SEO & Google Images)
              </label>
              <input type="text" class="gal-input-alt" data-id="${item.id}" value="${escapeHTML(item.alt || '')}" placeholder="Descripción detallada de la imagen..." style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.8rem;">
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:2rem; display:flex; align-items:center; gap:1rem;">
        <button id="save-gal-btn-bottom" class="btn-samurai-red" style="padding:0.8rem 2rem; font-weight:700; cursor:pointer;">💾 Guardar y Sincronizar con la Web</button>
        <div id="gal-feedback-msg" style="color:var(--accent-gold); font-weight:600;"></div>
      </div>
    `;

    // Add Photo Button
    const addBtn = container.querySelector('#add-gal-photo-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        syncStateFromInputs();
        const newId = 'gal_' + Date.now();
        settings.gallery_items.push({
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

    // Delete Photo Button
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

    // Quick Tag Buttons
    container.querySelectorAll('.quick-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const tag = e.target.dataset.tag;
        const inputTag = container.querySelector(`.gal-input-tag[data-id="${id}"]`);
        if (inputTag) inputTag.value = tag;
      });
    });

    // Select Media Dropdown
    container.querySelectorAll('.gal-select-media').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const val = e.target.value;
        if (val) {
          const inputUrl = container.querySelector(`.gal-input-url[data-id="${id}"]`);
          const imgEl = container.querySelector(`.gal-card-img[data-id="${id}"]`);
          if (inputUrl) inputUrl.value = val;
          if (imgEl) imgEl.src = val;
        }
      });
    });

    // Live URL Preview Input
    container.querySelectorAll('.gal-input-url').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = e.target.dataset.id;
        const imgEl = container.querySelector(`.gal-card-img[data-id="${id}"]`);
        if (imgEl) imgEl.src = e.target.value;
      });
    });

    // Save Handlers
    const saveTop = container.querySelector('#save-gal-btn');
    const saveBottom = container.querySelector('#save-gal-btn-bottom');
    const msgEl = container.querySelector('#gal-feedback-msg');

    async function handleSave() {
      syncStateFromInputs();
      if (msgEl) msgEl.textContent = '⏳ Guardando cambios...';

      try {
        await dbService.saveSettings(settings);
        syncService.broadcast('SETTINGS_UPDATED', settings);
        if (msgEl) {
          msgEl.textContent = '¡Galería fotográfica actualizada y sincronizada con éxito!';
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
