// src/admin/modules/diagnostics-manager.js
import { dbService } from '../../services/db-service.js';

export async function initDiagnosticsManager(container) {
  let autoRefreshInterval = null;
  let isAutoRefresh = false;
  let logFilter = 'ALL';
  let logSearch = '';
  let lastData = null;

  function formatUptime(seconds) {
    if (!seconds || seconds < 0) return '0s';
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(' ');
  }

  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function loadData() {
    try {
      lastData = await dbService.getSystemDiagnostics();
      renderUI(lastData);
    } catch (err) {
      console.error('Error al cargar diagnósticos:', err);
    }
  }

  function renderUI(data) {
    if (!data) return;

    const isHealthy = data.status === 'HEALTHY' && data.pocketbase.status === 'ONLINE';
    const statusColor = isHealthy ? '#10b981' : (data.pocketbase.status === 'ONLINE' ? '#f59e0b' : '#ef4444');
    const statusLabel = isHealthy ? 'ÓPTIMO / OPERATIVO' : (data.pocketbase.status === 'ONLINE' ? 'DEGRADADO' : 'OFFLINE / REVISIÓN');

    const logs = (data.logs || []).filter(log => {
      const matchLevel = logFilter === 'ALL' || log.level === logFilter;
      const matchText = !logSearch.trim() || 
        log.message.toLowerCase().includes(logSearch.toLowerCase()) || 
        (log.details && JSON.stringify(log.details).toLowerCase().includes(logSearch.toLowerCase()));
      return matchLevel && matchText;
    });

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0;">🩺 Diagnósticos & Estado del Sistema</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0.3rem 0 0 0;">
            Monitoreo en vivo de servicios, rendimiento, almacenamiento y registro de eventos.
          </p>
        </div>
        <div style="display:flex; gap:0.8rem; align-items:center;">
          <button id="btn-run-diagnostics" class="btn-samurai-red" style="font-weight:600; cursor:pointer;">
            ⚡ Ejecutar Diagnóstico
          </button>
          <button id="btn-toggle-autorefresh" class="btn-samurai-outline" style="font-size:0.85rem; padding:0.5rem 0.9rem; cursor:pointer;">
            ${isAutoRefresh ? '⏸️ Pausar Auto (5s)' : '▶️ Auto-Refresco (5s)'}
          </button>
        </div>
      </div>

      <!-- Banner de Estado General -->
      <div class="samurai-card" style="padding:1.2rem 1.5rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-left:4px solid ${statusColor};">
        <div style="display:flex; align-items:center; gap:1rem;">
          <span style="font-size:1.8rem;">${isHealthy ? '✅' : '⚠️'}</span>
          <div>
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:1px;">Estado General de la Plataforma</div>
            <div style="font-size:1.2rem; font-weight:700; color:${statusColor}; font-family:var(--font-title);">${statusLabel}</div>
          </div>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary); text-align:right;">
          Último análisis: <strong style="color:#fff;">${new Date(data.timestamp).toLocaleTimeString('es-ES')}</strong>
        </div>
      </div>

      <!-- Tarjetas Métricas Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.2rem; margin-bottom:2rem;">
        
        <!-- PocketBase Service -->
        <div class="samurai-card" style="padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <span style="font-weight:700; color:var(--accent-gold); font-size:0.95rem;">⚔️ Backend PocketBase</span>
            <span class="badge" style="padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:${data.pocketbase.status === 'ONLINE' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${data.pocketbase.status === 'ONLINE' ? '#10b981' : '#ef4444'};">
              ${data.pocketbase.status}
            </span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
            <div>Puerto: <strong style="color:#fff;">${data.pocketbase.port}</strong></div>
            <div>Latencia Ping: <strong style="color:${data.pocketbase.latencyMs < 50 ? '#10b981' : '#f59e0b'};">${data.pocketbase.latencyMs >= 0 ? data.pocketbase.latencyMs + ' ms' : 'N/A'}</strong></div>
            <div>Código HTTP: <strong style="color:#fff;">${data.pocketbase.statusCode}</strong></div>
          </div>
        </div>

        <!-- Node.js App Server -->
        <div class="samurai-card" style="padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <span style="font-weight:700; color:var(--accent-gold); font-size:0.95rem;">🌐 Servidor Node.js</span>
            <span class="badge" style="padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:rgba(16,185,129,0.2); color:#10b981;">
              ACTIVO
            </span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
            <div>Versión: <strong style="color:#fff;">${data.system.nodeVersion}</strong></div>
            <div>Tiempo Activo: <strong style="color:#fff;">${formatUptime(data.system.uptimeSeconds)}</strong></div>
            <div>Plataforma: <strong style="color:#fff;">${data.system.platform} (${data.system.arch})</strong></div>
          </div>
        </div>

        <!-- Memory Usage -->
        <div class="samurai-card" style="padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <span style="font-weight:700; color:var(--accent-gold); font-size:0.95rem;">🧠 Memoria en Uso</span>
            <span class="badge" style="padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:rgba(217,119,6,0.2); color:#f59e0b;">
              RAM
            </span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
            <div>Heap Usado: <strong style="color:#fff;">${data.system.memory.heapUsedMb} MB</strong></div>
            <div>Heap Total: <strong style="color:#fff;">${data.system.memory.heapTotalMb} MB</strong></div>
            <div>RSS Total: <strong style="color:#fff;">${data.system.memory.rssMb} MB</strong></div>
          </div>
        </div>

        <!-- Storage & SQLite -->
        <div class="samurai-card" style="padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <span style="font-weight:700; color:var(--accent-gold); font-size:0.95rem;">💾 Almacenamiento & DB</span>
            <span class="badge" style="padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:rgba(59,130,246,0.2); color:#60a5fa;">
              SQLite
            </span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
            <div>Base data.db: <strong style="color:#fff;">${data.storage.databaseSizeFormatted}</strong></div>
            <div>Archivos Storage: <strong style="color:#fff;">${data.storage.mediaStorageCount} (${formatBytes(data.storage.mediaStorageSizeBytes)})</strong></div>
            <div>Respaldos: <strong style="color:#fff;">${data.storage.backupsCount} (${formatBytes(data.storage.backupsTotalSizeBytes)})</strong></div>
          </div>
        </div>

      </div>

      <!-- Resumen de Colecciones / Registros -->
      <div class="samurai-card" style="padding:1.5rem; margin-bottom:2rem;">
        <h3 class="samurai-title" style="font-size:1.1rem; margin-bottom:1rem;">📊 Resumen de Contenido y Colecciones</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem; text-align:center;">
          <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:1.6rem; font-weight:700; color:var(--accent-gold);">${data.collections.posts}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.2rem;">Artículos Blog</div>
          </div>
          <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:1.6rem; font-weight:700; color:#10b981;">${data.collections.opinions}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.2rem;">Opiniones</div>
          </div>
          <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:1.6rem; font-weight:700; color:#60a5fa;">${data.collections.media}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.2rem;">Archivos Medios</div>
          </div>
          <div style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:1.6rem; font-weight:700; color:#f43f5e;">${data.collections.users}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.2rem;">Administradores</div>
          </div>
        </div>
      </div>

      <!-- Consola de Logs del Sistema -->
      <div class="samurai-card" style="padding:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:1rem;">
          <h3 class="samurai-title" style="font-size:1.1rem; margin:0;">📜 Consola de Registros & Logs de Eventos</h3>
          <div style="display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap;">
            <input type="text" id="log-search-input" placeholder="🔍 Filtrar logs..." value="${escapeHTML(logSearch)}" style="padding:0.4rem 0.8rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem; min-width:180px;">
            <select id="log-level-select" style="padding:0.4rem 0.8rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-size:0.85rem; cursor:pointer;">
              <option value="ALL" ${logFilter === 'ALL' ? 'selected' : ''}>Todos los Niveles</option>
              <option value="INFO" ${logFilter === 'INFO' ? 'selected' : ''}>INFO</option>
              <option value="WARN" ${logFilter === 'WARN' ? 'selected' : ''}>WARN</option>
              <option value="ERROR" ${logFilter === 'ERROR' ? 'selected' : ''}>ERROR</option>
            </select>
          </div>
        </div>

        <div style="background:#05070a; border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:1rem; max-height:360px; overflow-y:auto; font-family:'Consolas', monospace; font-size:0.82rem; line-height:1.5;">
          ${logs.length === 0 ? `
            <div style="color:var(--text-muted); text-align:center; padding:2rem 0;">No hay logs registrados con los filtros actuales.</div>
          ` : logs.map(l => {
            let color = '#38bdf8';
            if (l.level === 'WARN') color = '#fbbf24';
            if (l.level === 'ERROR') color = '#f87171';
            return `
              <div style="margin-bottom:0.4rem; display:flex; gap:0.6rem; border-bottom:1px solid rgba(255,255,255,0.03); padding-bottom:0.3rem;">
                <span style="color:#64748b; white-space:nowrap;">${new Date(l.timestamp).toLocaleTimeString('es-ES')}</span>
                <span style="color:${color}; font-weight:700; width:50px;">[${l.level}]</span>
                <span style="color:#e2e8f0; flex:1; word-break:break-all;">${escapeHTML(l.message)} ${l.details ? `<em style="color:#94a3b8; font-size:0.75rem;">(${escapeHTML(JSON.stringify(l.details))})</em>` : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Event handlers
    const btnRun = container.querySelector('#btn-run-diagnostics');
    if (btnRun) {
      btnRun.addEventListener('click', async () => {
        btnRun.textContent = '⏳ Analizando...';
        await loadData();
      });
    }

    const btnToggleAuto = container.querySelector('#btn-toggle-autorefresh');
    if (btnToggleAuto) {
      btnToggleAuto.addEventListener('click', () => {
        isAutoRefresh = !isAutoRefresh;
        if (isAutoRefresh) {
          autoRefreshInterval = setInterval(loadData, 5000);
        } else {
          clearInterval(autoRefreshInterval);
        }
        renderUI(lastData);
      });
    }

    const searchInput = container.querySelector('#log-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        logSearch = e.target.value;
        renderUI(lastData);
      });
    }

    const levelSelect = container.querySelector('#log-level-select');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        logFilter = e.target.value;
        renderUI(lastData);
      });
    }
  }

  await loadData();
}
