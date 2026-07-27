import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

export async function initSectionsManager(container) {
  const settings = (await dbService.getSettings()) || {
    sections_toggle: { hero: true, philosophy: true, gallery: true, gpu: true, blog: true, contact: true },
    navigation_menu: [
      { id: '1', label: 'Inicio', url: '#hero', visible: true },
      { id: '2', label: 'Filosofía', url: '#philosophy', visible: true },
      { id: '3', label: 'Galería', url: '#gallery', visible: true },
      { id: '4', label: 'GPU Engine', url: '#gpu', visible: true },
      { id: '5', label: 'Blog', url: '#blog', visible: true }
    ]
  };

  container.innerHTML = `
    <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Control de Secciones y Menú</h2>
    <div style="display: grid; gap: 2rem;">
      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.2rem;">Visibilidad de Secciones</h3>
        <div id="sections-toggle-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${Object.entries(settings.sections_toggle).map(([sec, active]) => `
            <label style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.8rem 1rem; border-radius:6px; border:1px solid rgba(255,255,255,0.05);">
              <span style="text-transform:capitalize; font-weight:600; color:var(--text-primary);">${sec}</span>
              <input type="checkbox" data-section="${sec}" ${active ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-red);">
            </label>
          `).join('')}
        </div>
      </div>

      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.2rem;">Menú de Navegación</h3>
        <div id="menu-items-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-top:1rem;">
          ${settings.navigation_menu.map(item => `
            <div class="menu-item-row" style="display:flex; gap:0.8rem; align-items:center;">
              <input type="text" value="${item.label}" data-key="label" data-id="${item.id}" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
              <input type="text" value="${item.url}" data-key="url" data-id="${item.id}" style="padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; flex:1;">
              <label style="display:flex; align-items:center; gap:0.3rem; color:var(--text-secondary);"><input type="checkbox" data-key="visible" data-id="${item.id}" ${item.visible ? 'checked' : ''} style="accent-color:var(--accent-red);"> Visible</label>
            </div>
          `).join('')}
        </div>
      </div>
      <button id="save-sections-btn" class="btn-samurai-red" style="width: fit-content;">Guardar y Sincronizar</button>
      <div id="save-sections-msg" style="color:var(--accent-gold); font-weight:600;"></div>
    </div>
  `;

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

    document.getElementById('save-sections-msg').textContent = '¡Configuración guardada y sincronizada en vivo!';
    setTimeout(() => { document.getElementById('save-sections-msg').textContent = ''; }, 3000);
  });
}
