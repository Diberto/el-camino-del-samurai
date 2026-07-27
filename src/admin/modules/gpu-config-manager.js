import { dbService } from '../../services/db-service.js';
import { syncService } from '../../services/sync-service.js';

export async function initGpuManager(container) {
  const settings = (await dbService.getSettings()) || {};
  const gpuConf = settings.gpu_config || {
    renderScale: 1.0,
    quality: 'high',
    enableShaders: true
  };

  container.innerHTML = `
    <h2 class="samurai-title" style="margin-bottom: 1.5rem;">Configuración Motor GPU</h2>
    <div class="samurai-card" style="padding:1.5rem; max-width:600px;">
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <label style="color:var(--text-secondary);">Escala de Renderizado (Render Scale): <strong id="gpu-scale-val" style="color:var(--accent-gold);">${gpuConf.renderScale}</strong>
          <input type="range" id="gpu-scale" min="0.5" max="2.0" step="0.1" value="${gpuConf.renderScale}" style="width:100%; margin-top:0.5rem; accent-color:var(--accent-red);">
        </label>

        <label style="color:var(--text-secondary);">Nivel de Calidad Shaders
          <select id="gpu-quality" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); color:#fff; border:1px solid rgba(255,255,255,0.1); border-radius:6px; margin-top:0.5rem;">
            <option value="low" ${gpuConf.quality === 'low' ? 'selected' : ''}>Bajo (Rendimiento)</option>
            <option value="medium" ${gpuConf.quality === 'medium' ? 'selected' : ''}>Medio</option>
            <option value="high" ${gpuConf.quality === 'high' ? 'selected' : ''}>Alto (Ultra)</option>
          </select>
        </label>

        <label style="display:flex; align-items:center; gap:0.5rem; color:var(--text-primary);">
          <input type="checkbox" id="gpu-shaders" ${gpuConf.enableShaders ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--accent-red);"> Activar Efectos WebGL/WebGPU
        </label>

        <button id="save-gpu-btn" class="btn-samurai-red" style="width:100%;">Guardar Ajustes GPU</button>
        <div id="save-gpu-msg" style="color:var(--accent-gold); font-weight:600;"></div>
      </div>
    </div>
  `;

  const scaleInput = document.getElementById('gpu-scale');
  scaleInput.addEventListener('input', (e) => {
    document.getElementById('gpu-scale-val').textContent = e.target.value;
  });

  document.getElementById('save-gpu-btn').addEventListener('click', async () => {
    settings.gpu_config = {
      renderScale: parseFloat(scaleInput.value),
      quality: document.getElementById('gpu-quality').value,
      enableShaders: document.getElementById('gpu-shaders').checked
    };
    await dbService.saveSettings(settings);
    syncService.broadcast('SETTINGS_UPDATED', settings);

    document.getElementById('save-gpu-msg').textContent = '¡Ajustes GPU actualizados y sincronizados en vivo!';
    setTimeout(() => { document.getElementById('save-gpu-msg').textContent = ''; }, 3000);
  });
}
