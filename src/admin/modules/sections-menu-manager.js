import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

const SECTION_LABELS = {
  inicio: 'Inicio (Hero Parallax)',
  sinopsis: 'El Libro (Sinopsis & 3D)',
  virtudes: 'Las Virtudes del Bushido',
  oraculo: 'El Oráculo Interactivo',
  capitulos: 'Obras del Autor',
  ediciones: 'Ediciones Disponibles',
  opiniones: 'Opiniones de Lectores',
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
  opiniones: '#opiniones',
  autor: '#autor',
  galeria: '#galeria',
  blog: '#blog',
  contacto: '#contacto'
};

export async function initSectionsManager(container) {
  const loadedSettings = (await dbService.getSettings()) || {};

  const settings = {
    ...loadedSettings,
    sections_toggle: {
      inicio: true,
      sinopsis: true,
      virtudes: true,
      oraculo: true,
      capitulos: true,
      ediciones: true,
      opiniones: true,
      autor: true,
      galeria: true,
      blog: true,
      redes: true,
      contacto: true,
      ...(loadedSettings.sections_toggle || {})
    },
    navigation_menu: loadedSettings.navigation_menu || [
      { id: '1', label: 'Inicio', url: '#inicio', visible: true },
      { id: '2', label: 'El Libro', url: '#sinopsis', visible: true },
      { id: '3', label: 'Las Virtudes', url: '#virtudes', visible: true },
      { id: '4', label: 'El Oráculo', url: '#oraculo', visible: true },
      { id: '5', label: 'Ediciones', url: '#ediciones', visible: true },
      { id: '5b', label: 'Opiniones', url: '#opiniones', visible: true },
      { id: '6', label: 'Autor', url: '#autor', visible: true },
      { id: '7', label: 'Galería', url: '#galeria', visible: true },
      { id: '8', label: 'Blog', url: '#blog', visible: true },
      { id: '8b', label: 'Redes', url: '#redes', visible: true },
      { id: '9', label: 'Comprar', url: '#contacto', visible: true }
    ],
    social_links: {
      instagram: { url: 'https://www.instagram.com/larutadelsamurai', handle: '@larutadelsamurai', desc: 'Fotografías diarias de expediciones, castillos y dojos tradicionales en Japón.', visible: true },
      youtube: { url: 'https://www.youtube.com/@larutadelsamurai', handle: 'La Ruta del Samurái', desc: 'Documentales de viaje, técnicas de artes marciales y charlas sobre filosofía samurái.', visible: true },
      facebook: { url: 'https://www.facebook.com/larutadelsamurai', handle: 'La Ruta del Samurái', desc: 'Comunidad de lectores, eventos, debates marciales y transmisiones especiales.', visible: true },
      whatsapp: { url: 'https://wa.me/5491100000000', handle: 'Contacto WhatsApp', desc: 'Consultas directas sobre ejemplares físicos autografiados y expediciones.', visible: false },
      ...(loadedSettings.social_links || {})
    }
  };

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderUI() {
    container.innerHTML = `
      <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Control de Secciones, Menú y Redes Sociales</h2>
      <div style="display: grid; gap: 2rem;">
        
        <!-- Secciones de la Landing Page -->
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

        <!-- Menú de Navegación -->
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.2rem;">Menú de Navegación (Header)</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Edita el texto, enlace y visibilidad de los botones del menú superior:</p>
          <div id="menu-items-list" style="display:flex; flex-direction:column; gap:0.8rem;">
            ${settings.navigation_menu.map(item => `
              <div class="menu-item-row" style="display:flex; gap:0.8rem; align-items:center;">
                <input type="text" value="${escapeHTML(item.label)}" data-key="label" data-id="${item.id}" placeholder="Etiqueta" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
                <input type="text" value="${escapeHTML(item.url)}" data-key="url" data-id="${item.id}" placeholder="#seccion" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
                <label style="display:flex; align-items:center; gap:0.3rem; color:var(--text-secondary); white-space:nowrap;"><input type="checkbox" data-key="visible" data-id="${item.id}" ${item.visible ? 'checked' : ''} style="accent-color:var(--accent-red); cursor:pointer;"> Visible</label>
              </div>
            `).join('')}
          </div>
          <button id="add-menu-item-btn" class="btn-samurai-outline" style="margin-top:1rem; cursor:pointer;">+ Agregar Ítem al Menú</button>
        </div>

        <!-- Configuración de Redes Sociales -->
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.2rem;">🌐 Redes Sociales y Comunidad Oficial</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1.2rem;">Configura los enlaces, handles y descripciones que aparecen en la sección de comunidad y en el footer:</p>
          
          <div id="social-links-list" style="display:flex; flex-direction:column; gap:1.2rem;">
            ${Object.entries(settings.social_links).map(([platform, conf]) => `
              <div class="samurai-card" style="padding:1rem; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06);" data-platform="${platform}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                  <span style="font-weight:700; color:var(--accent-gold); text-transform:uppercase; font-size:0.9rem;">
                    ${platform === 'instagram' ? '📷 Instagram' : (platform === 'youtube' ? '🎥 YouTube' : (platform === 'facebook' ? '📘 Facebook' : (platform === 'whatsapp' ? '💬 WhatsApp' : '🔗 ' + platform)))}
                  </span>
                  <label style="display:flex; align-items:center; gap:0.4rem; color:var(--text-secondary); font-size:0.85rem; cursor:pointer;">
                    <input type="checkbox" class="social-vis-chk" ${conf.visible ? 'checked' : ''} style="accent-color:var(--accent-red);">
                    Mostrar en Web
                  </label>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.8rem; margin-bottom:0.6rem;">
                  <div>
                    <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem;">URL de Perfil / Enlace</label>
                    <input type="text" class="social-url-input" value="${escapeHTML(conf.url)}" placeholder="https://..." style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem;">
                  </div>
                  <div>
                    <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem;">Nombre / Handle Público</label>
                    <input type="text" class="social-handle-input" value="${escapeHTML(conf.handle)}" placeholder="@usuario" style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem;">
                  </div>
                </div>
                <div>
                  <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.2rem;">Descripción / Llamado a la acción</label>
                  <input type="text" class="social-desc-input" value="${escapeHTML(conf.desc)}" placeholder="Breve texto sobre el contenido en esta red..." style="width:100%; padding:0.5rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem;">
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <button id="save-sections-btn" class="btn-samurai-red" style="width: fit-content; padding:0.8rem 1.8rem; font-weight:700; cursor:pointer;">💾 Guardar y Sincronizar Cambios con el Home</button>
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
      syncCurrentFormState();
      const newId = String(Date.now());
      settings.navigation_menu.push({ id: newId, label: 'Nuevo Enlace', url: '#inicio', visible: true });
      renderUI();
    });

    function syncCurrentFormState() {
      settings.navigation_menu = settings.navigation_menu.map(item => {
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
    }

    document.getElementById('save-sections-btn').addEventListener('click', async () => {
      const updatedToggles = {};
      container.querySelectorAll('#sections-toggle-list input[type="checkbox"]').forEach(chk => {
        updatedToggles[chk.dataset.section] = chk.checked;
      });

      syncCurrentFormState();

      const updatedSocial = {};
      container.querySelectorAll('#social-links-list [data-platform]').forEach(el => {
        const platform = el.dataset.platform;
        const urlInput = el.querySelector('.social-url-input');
        const handleInput = el.querySelector('.social-handle-input');
        const descInput = el.querySelector('.social-desc-input');
        const visChk = el.querySelector('.social-vis-chk');
        updatedSocial[platform] = {
          url: urlInput ? urlInput.value : '',
          handle: handleInput ? handleInput.value : '',
          desc: descInput ? descInput.value : '',
          visible: visChk ? visChk.checked : true
        };
      });

      settings.sections_toggle = updatedToggles;
      settings.social_links = updatedSocial;

      // Ensure latest settings from server are merged
      const currentFullSettings = (await dbService.getSettings()) || {};
      const mergedSettings = { ...currentFullSettings, ...settings };

      await dbService.saveSettings(mergedSettings);
      syncService.broadcast('SETTINGS_UPDATED', mergedSettings);

      document.getElementById('save-sections-msg').textContent = '¡Sincronizado exitosamente con la Landing Page!';
      setTimeout(() => { document.getElementById('save-sections-msg').textContent = ''; }, 3000);
    });
  }

  renderUI();
}
