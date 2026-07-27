import { dbService } from '../../services/db-service.js';

export async function initGpuManager(container) {
  const settings = (await dbService.getSettings()) || {};
  const gpuConf = settings.gpu_config || {
    renderScale: 1.0,
    quality: 'high',
    enableShaders: true
  };

  container.innerHTML = `
    <h2>Configuración Motor GPU</h2>
    <div style="background:#1a1d24; padding:1.5rem; border-radius:8px; border:1px solid #2d3748; margin-top:1.5rem; max-width:600px;">
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        <label>Escala de Renderizado (Render Scale): <strong id="gpu-scale-val">${gpuConf.renderScale}</strong>
          <input type="range" id="gpu-scale" min="0.5" max="2.0" step="0.1" value="${gpuConf.renderScale}" style="width:100%; margin-top:0.5rem;">
        </label>

        <label>Nivel de Calidad Shaders
          <select id="gpu-quality" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.5rem;">
            <option value="low" ${gpuConf.quality === 'low' ? 'selected' : ''}>Bajo (Rendimiento)</option>
            <option value="medium" ${gpuConf.quality === 'medium' ? 'selected' : ''}>Medio</option>
            <option value="high" ${gpuConf.quality === 'high' ? 'selected' : ''}>Alto (Ultra)</option>
          </select>
        </label>

        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" id="gpu-shaders" ${gpuConf.enableShaders ? 'checked' : ''} style="width:18px; height:18px;"> Activar Efectos WebGL/WebGPU
        </label>

        <button id="save-gpu-btn" style="padding:0.8rem; background:#3182ce; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Ajustes GPU</button>
        <div id="save-gpu-msg" style="color:#48bb78; font-weight:600;"></div>
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
    document.getElementById('save-gpu-msg').textContent = '¡Ajustes GPU actualizados!';
    setTimeout(() => { document.getElementById('save-gpu-msg').textContent = ''; }, 3000);
  });
}
