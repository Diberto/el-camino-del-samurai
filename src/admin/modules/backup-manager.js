// src/admin/modules/backup-manager.js
import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

export async function initBackupManager(container) {
  let settings = (await dbService.getSettings()) || {};
  let scheduleConfig = settings.backup_schedule || {
    frequency: 'disabled',
    retention: 10,
    last_backup_at: 0
  };

  async function loadAndRender() {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0 0 0.3rem 0;">Gestión y Resguardo del Sitio (Respaldos)</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0;">Crea copias de seguridad completas (.zip o .json) con la base de datos, galería y configuraciones.</p>
        </div>
        <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
          <button id="export-json-btn" class="btn-samurai-outline" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; cursor:pointer;">
            <span>📥</span> Exportar Configuración (.json)
          </button>
          <input type="file" id="import-json-input" accept=".json" style="display:none;">
          <button id="import-json-btn" class="btn-samurai-outline" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; cursor:pointer;">
            <span>📤</span> Importar Configuración (.json)
          </button>
          <button id="manual-backup-btn" class="btn-samurai-red" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 1.2rem; cursor:pointer;">
            <span>⚡</span> Crear Respaldo Completo (.zip)
          </button>
        </div>
      </div>

      <div id="backup-status-msg" style="margin-bottom:1rem; font-weight:600; color:var(--accent-gold);"></div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <!-- Card 1: Configuración Automática -->
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.15rem; margin-bottom: 1rem;">⏰ Programación Automática</h3>
          
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div>
              <label style="display:block; font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.4rem;">Frecuencia de Respaldo</label>
              <select id="auto-frequency-select" style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid var(--border-color); color:#fff; border-radius:6px;">
                <option value="disabled" ${scheduleConfig.frequency === 'disabled' ? 'selected' : ''}>Desactivado (Solo Manual)</option>
                <option value="daily" ${scheduleConfig.frequency === 'daily' ? 'selected' : ''}>Diario (Cada 24 horas)</option>
                <option value="weekly" ${scheduleConfig.frequency === 'weekly' ? 'selected' : ''}>Semanal (Cada 7 días)</option>
                <option value="monthly" ${scheduleConfig.frequency === 'monthly' ? 'selected' : ''}>Mensual (Cada 30 días)</option>
              </select>
            </div>

            <div>
              <label style="display:block; font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.4rem;">Máximo de Respaldos a Retener</label>
              <select id="auto-retention-select" style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid var(--border-color); color:#fff; border-radius:6px;">
                <option value="5" ${Number(scheduleConfig.retention) === 5 ? 'selected' : ''}>5 últimos respaldos</option>
                <option value="10" ${Number(scheduleConfig.retention) === 10 ? 'selected' : ''}>10 últimos respaldos</option>
                <option value="20" ${Number(scheduleConfig.retention) === 20 ? 'selected' : ''}>20 últimos respaldos</option>
              </select>
            </div>

            <div style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">
              Último respaldo auto: <strong style="color:var(--text-primary);">${scheduleConfig.last_backup_at ? new Date(scheduleConfig.last_backup_at).toLocaleString('es-ES') : 'Nunca'}</strong>
            </div>

            <button id="save-schedule-btn" class="btn-samurai-outline" style="align-self:start; font-size:0.85rem; cursor:pointer;">
              Guardar Configuración
            </button>
          </div>
        </div>

        <!-- Card 2: Restaurar / Subir Respaldo (.zip) -->
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.15rem; margin-bottom: 1rem;">📤 Subir y Restaurar Respaldo (.zip)</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Arrastra o selecciona un archivo de copia de seguridad descargado previamente en tu computadora para restaurarlo:</p>
          
          <div id="drop-zone" style="border: 2px dashed rgba(255,255,255,0.2); border-radius: 8px; padding: 1.5rem; text-align: center; background: rgba(0,0,0,0.2); cursor: pointer; transition: background 0.3s ease;">
            <span style="font-size: 2rem; display:block; margin-bottom:0.5rem;">📦</span>
            <span style="font-size: 0.85rem; color: var(--text-primary); font-weight:600; display:block;">Haz clic o arrastra aquí tu archivo .zip</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Formatos admitidos: .zip exportados por el servidor</span>
            <input type="file" id="zip-file-input" accept=".zip" style="display:none;">
          </div>
        </div>
      </div>

      <!-- Tabla de Historial de Respaldos -->
      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.15rem; margin-bottom: 1rem;">📁 Archivos de Respaldo Disponibles en Servidor</h3>
        <div id="backups-table-container">
          <p style="color:var(--text-muted); text-align:center; padding:1.5rem 0;">Cargando historial de respaldos...</p>
        </div>
      </div>
    `;

    bindEvents();
    await fetchAndRenderTable();
  }

  async function fetchAndRenderTable() {
    const tableContainer = container.querySelector('#backups-table-container');
    const backups = await dbService.getBackups();

    if (!backups || backups.length === 0) {
      tableContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem 0;">No hay respaldos generados aún en el servidor. Presiona "Crear Respaldo Completo (.zip)" para generar el primero.</p>`;
      return;
    }

    tableContainer.innerHTML = `
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--text-secondary);">
              <th style="padding:0.75rem 0.5rem;">Archivo</th>
              <th style="padding:0.75rem 0.5rem;">Tamaño</th>
              <th style="padding:0.75rem 0.5rem;">Fecha de Creación</th>
              <th style="padding:0.75rem 0.5rem; text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${backups.map(b => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:0.75rem 0.5rem; font-weight:600; color:#fff;">
                  📦 ${b.name || b.key}
                </td>
                <td style="padding:0.75rem 0.5rem; color:var(--text-secondary);">
                  ${b.size ? (b.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}
                </td>
                <td style="padding:0.75rem 0.5rem; color:var(--text-muted);">
                  ${b.modified ? new Date(b.modified).toLocaleString('es-ES') : 'Reciente'}
                </td>
                <td style="padding:0.75rem 0.5rem; text-align:right;">
                  <div style="display:inline-flex; gap:0.5rem;">
                    <a href="/api/backups/${encodeURIComponent(b.key || b.name)}?token=${encodeURIComponent(dbService.token || '')}" download class="btn-samurai-outline" style="padding:0.3rem 0.6rem; font-size:0.75rem; text-decoration:none;">
                      ⬇️ Descargar
                    </a>
                    <button class="btn-samurai-red restore-btn" data-key="${b.key || b.name}" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
                      🔄 Restaurar
                    </button>
                    <button class="btn-samurai-outline delete-btn" data-key="${b.key || b.name}" style="padding:0.3rem 0.6rem; font-size:0.75rem; color:#ff8585; border-color:rgba(218,68,83,0.3);">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind action buttons in table
    tableContainer.querySelectorAll('.restore-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.target.dataset.key;
        if (confirm(`¿Restaurar el sitio al estado del respaldo "${key}"? Esta acción reemplazará la base de datos actual.`)) {
          showMsg(`⏳ Restaurando respaldo "${key}"...`);
          const success = await dbService.restoreBackup(key);
          if (success) {
            showMsg('✅ Sitio restaurado con éxito. Recargando datos...');
            setTimeout(() => { window.location.reload(); }, 2000);
          } else {
            showMsg('❌ Error al restaurar el respaldo.');
          }
        }
      });
    });

    tableContainer.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.target.dataset.key;
        if (confirm(`¿Eliminar el archivo de respaldo "${key}"?`)) {
          showMsg(`⏳ Eliminando "${key}"...`);
          const success = await dbService.deleteBackup(key);
          if (success) {
            showMsg('🗑️ Respaldo eliminado.');
            await fetchAndRenderTable();
          } else {
            showMsg('❌ Error al eliminar el respaldo.');
          }
        }
      });
    });
  }

  function showMsg(msg) {
    const el = container.querySelector('#backup-status-msg');
    if (el) {
      el.textContent = msg;
      setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 4500);
    }
  }

  function bindEvents() {
    // Manual Backup
    container.querySelector('#manual-backup-btn').addEventListener('click', async () => {
      showMsg('⏳ Generando respaldo completo en el servidor...');
      const res = await dbService.createBackup();
      if (res && (res.key || res.name)) {
        showMsg(`✅ Respaldo "${res.name || res.key}" creado exitosamente.`);
        await fetchAndRenderTable();
      } else {
        showMsg('❌ Error al generar el respaldo.');
      }
    });

    // Save Schedule
    container.querySelector('#save-schedule-btn').addEventListener('click', async () => {
      const freq = container.querySelector('#auto-frequency-select').value;
      const ret = Number(container.querySelector('#auto-retention-select').value);

      scheduleConfig.frequency = freq;
      scheduleConfig.retention = ret;

      settings.backup_schedule = scheduleConfig;
      await dbService.saveSettings(settings);
      syncService.broadcast('SETTINGS_UPDATED', settings);

      showMsg('💾 Configuración de respaldo automático guardada.');
    });

    // JSON Export
    const exportJsonBtn = container.querySelector('#export-json-btn');
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', async () => {
        showMsg('⏳ Preparando exportación completa en formato JSON...');
        try {
          const [curSettings, posts, opinions, media] = await Promise.all([
            dbService.getSettings() || {},
            dbService.getPosts() || [],
            dbService.getOpinions() || [],
            dbService.getMedia() || []
          ]);

          const exportPayload = {
            version: '1.0',
            exported_at: new Date().toISOString(),
            website: 'El Camino del Samurai',
            settings: curSettings,
            posts: posts,
            opinions: opinions,
            media: media
          };

          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
          const downloadAnchor = document.createElement('a');
          const dateSlug = new Date().toISOString().split('T')[0];
          downloadAnchor.setAttribute("href", dataStr);
          downloadAnchor.setAttribute("download", `samurai_backup_${dateSlug}.json`);
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          downloadAnchor.remove();

          showMsg('✅ Archivo de respaldo JSON descargado exitosamente.');
        } catch (err) {
          showMsg('❌ Error al exportar: ' + err.message);
        }
      });
    }

    // JSON Import
    const importJsonBtn = container.querySelector('#import-json-btn');
    const importJsonInput = container.querySelector('#import-json-input');
    if (importJsonBtn && importJsonInput) {
      importJsonBtn.addEventListener('click', () => importJsonInput.click());
      importJsonInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          try {
            showMsg(`⏳ Leyendo y restaurando desde "${file.name}"...`);
            const fileText = await file.text();
            const parsed = JSON.parse(fileText);

            if (parsed.settings) {
              await dbService.saveSettings(parsed.settings);
              syncService.broadcast('SETTINGS_UPDATED', parsed.settings);
            }

            showMsg('✅ Configuración y personalización restauradas con éxito.');
            setTimeout(() => { window.location.reload(); }, 1500);
          } catch (err) {
            showMsg('❌ Error al restaurar archivo JSON: ' + err.message);
          }
        }
      });
    }

    // File Drop Zone for ZIP
    const dropZone = container.querySelector('#drop-zone');
    const zipInput = container.querySelector('#zip-file-input');

    dropZone.addEventListener('click', () => zipInput.click());
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.background = 'rgba(212, 175, 55, 0.15)';
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.style.background = 'rgba(0,0,0,0.2)';
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.background = 'rgba(0,0,0,0.2)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleZipUpload(e.dataTransfer.files[0]);
      }
    });
    zipInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleZipUpload(e.target.files[0]);
      }
    });
  }

  async function handleZipUpload(file) {
    if (!file.name.endsWith('.zip')) {
      alert('Por favor selecciona un archivo comprimido .zip válido.');
      return;
    }
    showMsg(`📤 Subiendo respaldo "${file.name}" al servidor...`);
    const success = await dbService.uploadBackup(file);
    if (success) {
      showMsg('✅ Archivo de respaldo subido correctamente.');
      await fetchAndRenderTable();
    } else {
      showMsg('❌ Error al subir el archivo de respaldo.');
    }
  }

  await loadAndRender();
}
