import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

const SECTION_LABELS = {
  inicio: 'Inicio (Hero Parallax)',
  sinopsis: 'El Libro (Sinopsis & 3D)',
  virtudes: 'Las Virtudes del Bushido',
  oraculo: 'El Oráculo Interactivo',
  capitulos: 'Obras del Autor',
  ediciones: 'Ediciones Disponibles',
  autor: 'Jorge Orpianesi (Autor)',
  galeria: 'Galería Fotográfica',
  blog: 'Blog Samurai (Noticias & Artículos)',
  contacto: 'Suscripción / Contacto'
};

const SECTION_URL_MAP = {
  inicio: '#inicio',
  sinopsis: '#sinopsis',
  virtudes: '#virtudes',
  oraculo: '#oraculo',
  capitulos: '#capitulos',
  ediciones: '#ediciones',
  autor: '#autor',
  galeria: '#galeria',
  blog: '#blog',
  contacto: '#contacto'
};

export async function initSectionsManager(container) {
  const settings = (await dbService.getSettings()) || {
    sections_toggle: {
      inicio: true,
      sinopsis: true,
      virtudes: true,
      oraculo: true,
      capitulos: true,
      ediciones: true,
      autor: true,
      galeria: true,
      blog: true,
      contacto: true
    },
    navigation_menu: [
      { id: '1', label: 'Inicio', url: '#inicio', visible: true },
      { id: '2', label: 'El Libro', url: '#sinopsis', visible: true },
      { id: '3', label: 'Las Virtudes', url: '#virtudes', visible: true },
      { id: '4', label: 'El Oráculo', url: '#oraculo', visible: true },
      { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
      { id: '6', label: 'Autor', url: '#autor', visible: true },
      { id: '7', label: 'Galería', url: '#galeria', visible: true },
      { id: '8', label: 'Blog', url: '#blog', visible: true },
      { id: '9', label: 'Comprar', url: '#contacto', visible: true }
    ]
  };

  function renderUI() {
    container.innerHTML = `
      <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Control de Secciones y Menú del Sitio</h2>
      <div style="display: grid; gap: 2rem;">
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.2rem;">Secciones de la Landing Page</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Al activar/desactivar una sección, el ítem del menú correspondiente se sincroniza automáticamente:</p>
          <div id="sections-toggle-list" style="display:flex; flex-direction:column; gap:0.8rem;">
            ${Object.entries(settings.sections_toggle).map(([sec, active]) => `
              <label style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.8rem 1rem; border-radius:6px; border:1px solid rgba(255,255,255,0.05);">
                <span style="font-weight:600; color:var(--text-primary);">${SECTION_LABELS[sec] || sec}</span>
                <input type="checkbox" data-section="${sec}" ${active ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-red); cursor:pointer;">
              </label>
            `).join('')}
          </div>
        </div>

        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.2rem;">Menú de Navegación (Header)</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Edita el texto, enlace y visibilidad de los botones del menú superior:</p>
          <div id="menu-items-list" style="display:flex; flex-direction:column; gap:0.8rem;">
            ${settings.navigation_menu.map(item => `
              <div class="menu-item-row" style="display:flex; gap:0.8rem; align-items:center;">
                <input type="text" value="${item.label}" data-key="label" data-id="${item.id}" placeholder="Etiqueta" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
                <input type="text" value="${item.url}" data-key="url" data-id="${item.id}" placeholder="#seccion" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
                <label style="display:flex; align-items:center; gap:0.3rem; color:var(--text-secondary); white-space:nowrap;"><input type="checkbox" data-key="visible" data-id="${item.id}" ${item.visible ? 'checked' : ''} style="accent-color:var(--accent-red); cursor:pointer;"> Visible</label>
              </div>
            `).join('')}
          </div>
          <button id="add-menu-item-btn" class="btn-samurai-outline" style="margin-top:1rem;">+ Agregar Ítem al Menú</button>
        </div>
        <button id="save-sections-btn" class="btn-samurai-red" style="width: fit-content;">Guardar y Sincronizar con el Home</button>
        <div id="save-sections-msg" style="color:var(--accent-gold); font-weight:600;"></div>
      </div>
    `;

    // Auto-sync section toggle change to corresponding menu item
    container.querySelectorAll('#sections-toggle-list input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const sec = e.target.dataset.section;
        const isChecked = e.target.checked;
        settings.sections_toggle[sec] = isChecked;

        const targetUrl = SECTION_URL_MAP[sec];
        if (targetUrl) {
          const menuItem = settings.navigation_menu.find(m => m.url === targetUrl || m.url === `#${sec}`);
          if (menuItem) {
            menuItem.visible = isChecked;
            const menuChk = container.querySelector(`input[data-key="visible"][data-id="${menuItem.id}"]`);
            if (menuChk) menuChk.checked = isChecked;
          }
        }
      });
    });

    document.getElementById('add-menu-item-btn').addEventListener('click', () => {
      const newId = String(Date.now());
      settings.navigation_menu.push({ id: newId, label: 'Nuevo Enlace', url: '#inicio', visible: true });
      renderUI();
    });

    document.getElementById('save-sections-btn').addEventListener('click', async () => {
      const updatedToggles = {};
      container.querySelectorAll('#sections-toggle-list input[type="checkbox"]').forEach(chk => {
        updatedToggles[chk.dataset.section] = chk.checked;
      });

      const updatedMenu = settings.navigation_menu.map(item => {
        const labelInput = container.querySelector(`input[data-key="label"][data-id="${item.id}"]`);
        const urlInput = container.querySelector(`input[data-key="url"][data-id="${item.id}"]`);
        const visChk = container.querySelector(`input[data-key="visible"][data-id="${item.id}"]`);
        return {
          id: item.id,
          label: labelInput ? labelInput.value : item.label,
          url: urlInput ? urlInput.value : item.url,
          visible: visChk ? visChk.checked : item.visible
        };
      });

      settings.sections_toggle = updatedToggles;
      settings.navigation_menu = updatedMenu;

      await dbService.saveSettings(settings);
      syncService.broadcast('SETTINGS_UPDATED', settings);

      document.getElementById('save-sections-msg').textContent = '¡Sincronizado exitosamente con la Landing Page!';
      setTimeout(() => { document.getElementById('save-sections-msg').textContent = ''; }, 3000);
    });
  }

  renderUI();
}
