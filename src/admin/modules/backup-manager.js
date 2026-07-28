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
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0;">Crea copias de seguridad completas (.zip) con la base de datos y todas las imágenes subidas.</p>
        </div>
        <button id="manual-backup-btn" class="btn-samurai-red" style="display:flex; align-items:center; gap:0.5rem;">
          <span>⚡</span> Crear Respaldo Manual Ahora
        </button>
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

            <button id="save-schedule-btn" class="btn-samurai-outline" style="align-self:start; font-size:0.85rem;">
              Guardar Configuración
            </button>
          </div>
        </div>

        <!-- Card 2: Restaurar / Subir Respaldo (.zip) -->
        <div class="samurai-card" style="padding: 1.5rem;">
          <h3 class="samurai-title" style="font-size: 1.15rem; margin-bottom: 1rem;">📤 Subir y Restaurar Respaldo External (.zip)</h3>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Arrastra o selecciona un archivo de copia de seguridad descargado previamente en tu computadora para restaurarlo:</p>
          
          <div id="drop-zone" style="border: 2px dashed rgba(255,255,255,0.2); border-radius: 8px; padding: 1.5rem; text-align: center; background: rgba(0,0,0,0.2); cursor: pointer; transition: background 0.3s ease;">
            <span style="font-size: 2rem; display:block; margin-bottom:0.5rem;">📦</span>
            <span style="font-size: 0.85rem; color: var(--text-primary); font-weight:600; display:block;">Haz clic o arrastra aquí tu archivo .zip</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Formatos admitidos: .zip exportados por PocketBase</span>
            <input type="file" id="zip-file-input" accept=".zip" style="display:none;">
          </div>
        </div>
      </div>

      <!-- Tabla de Historial de Respaldos -->
      <div class="samurai-card" style="padding: 1.5rem;">
        <h3 class="samurai-title" style="font-size: 1.15rem; margin-bottom: 1rem;">📁 Archivos de Respaldo Disponibles</h3>
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
      tableContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem 0;">No hay respaldos generados aún en el servidor. Presiona "Crear Respaldo Manual Ahora" para generar el primero.</p>`;
      return;
    }

    tableContainer.innerHTML = `
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-color); color:var(--accent-gold); font-family:var(--font-title);">
              <th style="padding:0.8rem;">Archivo</th>
              <th style="padding:0.8rem;">Modificado</th>
              <th style="padding:0.8rem;">Tamaño</th>
              <th style="padding:0.8rem; text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${backups.map(b => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                <td style="padding:0.8rem; font-weight:600; color:var(--text-primary);">${b.key || b.name}</td>
                <td style="padding:0.8rem; color:var(--text-secondary);">${b.modified ? new Date(b.modified).toLocaleString('es-ES') : '-'}</td>
                <td style="padding:0.8rem; color:var(--text-muted);">${(b.size / (1024 * 1024)).toFixed(2)} MB</td>
                <td style="padding:0.8rem; text-align:right; display:flex; gap:0.5rem; justify-content:flex-end;">
                  <a href="${dbService.getDownloadBackupUrl(b.key)}" download class="btn-samurai-outline" style="font-size:0.75rem; padding:0.3rem 0.6rem; text-decoration:none; display:inline-block;">📥 Descargar</a>
                  <button data-action="restore" data-key="${b.key}" class="btn-samurai-outline" style="font-size:0.75rem; padding:0.3rem 0.6rem; color:var(--accent-gold);">🔄 Restaurar</button>
                  <button data-action="delete" data-key="${b.key}" class="btn-samurai-outline" style="font-size:0.75rem; padding:0.3rem 0.6rem; color:#f56565; border-color:rgba(245,101,101,0.3);">🗑️ Eliminar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Row Actions
    tableContainer.querySelectorAll('button[data-action="restore"]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.target.dataset.key;
        if (confirm(`⚠️ ATENCIÓN: Se restaurará el sitio al respaldo "${key}". Todos los cambios posteriores a ese respaldo se sobrescribirán. ¿Deseas continuar?`)) {
          showMsg('🔄 Restaurando copia de seguridad... Por favor espera...');
          const res = await dbService.restoreBackup(key);
          if (res) {
            showMsg('✨ ¡Restauración completada con éxito!');
            setTimeout(() => window.location.reload(), 1500);
          } else {
            showMsg('❌ Error al restaurar el respaldo.');
          }
        }
      });
    });

    tableContainer.querySelectorAll('button[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const key = e.target.dataset.key;
        if (confirm(`¿Seguro que deseas eliminar el respaldo "${key}"?`)) {
          await dbService.deleteBackup(key);
          showMsg('🗑️ Respaldo eliminado.');
          fetchAndRenderTable();
        }
      });
    });
  }

  function showMsg(text) {
    const statusMsg = container.querySelector('#backup-status-msg');
    if (statusMsg) {
      statusMsg.textContent = text;
      setTimeout(() => { if (statusMsg) statusMsg.textContent = ''; }, 4000);
    }
  }

  function bindEvents() {
    // Manual Backup
    container.querySelector('#manual-backup-btn').addEventListener('click', async () => {
      showMsg('⏳ Empaquetando base de datos e imágenes... Esto puede demorar unos segundos...');
      const res = await dbService.createBackup();
      if (res !== null) {
        showMsg('✅ Respaldo manual generado con éxito.');
        await fetchAndRenderTable();
      } else {
        showMsg('❌ Ocurrió un error al generar el respaldo.');
      }
    });

    // Save Schedule Config
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

    // File Drop Zone
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
