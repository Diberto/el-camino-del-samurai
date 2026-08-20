import { dbService } from '../../services/db-service.js';

export async function initOpinionesManager(container) {
  let currentPage = 1;
  const perPage = 10;
  let statusFilter = 'all';
  let searchQuery = '';

  async function loadData() {
    let filterStr = '';
    const conditions = [];

    if (statusFilter !== 'all') {
      conditions.push(`status = "${statusFilter}"`);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().replace(/"/g, '\\"');
      conditions.push(`(name ~ "${q}" || body ~ "${q}" || role ~ "${q}")`);
    }
    if (conditions.length > 0) {
      filterStr = conditions.join(' && ');
    }

    try {
      const res = await dbService.getOpinions(currentPage, perPage, filterStr);
      renderList(res);
    } catch (err) {
      console.error('Error cargando opiniones:', err);
      renderList({ items: [], totalPages: 1, totalItems: 0 });
    }
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

  function renderStars(rating) {
    const r = Math.max(1, Math.min(5, parseInt(rating) || 5));
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  function renderList(data) {
    const items = (data && data.items) || [];
    const totalPages = (data && data.totalPages) || 1;
    const totalItems = (data && data.totalItems) !== undefined ? data.totalItems : items.length;

    const avgRating = items.length > 0
      ? (items.reduce((acc, curr) => acc + (parseInt(curr.rating) || 5), 0) / items.length).toFixed(1)
      : '5.0';

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h2 class="samurai-title" style="margin:0;">Gestión de Opiniones de Lectores</h2>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin:0.3rem 0 0 0;">
            Total: <strong>${totalItems}</strong> opiniones | Promedio: <strong>${avgRating} ★</strong>
          </p>
        </div>
        <button id="btn-create-opinion-admin" class="btn-samurai-red" style="font-weight:600; cursor:pointer;">+ Nueva Opinión</button>
      </div>

      <div id="opinion-feedback-msg" style="color:var(--accent-gold); font-weight:600; margin-bottom:1rem;"></div>

      <div class="samurai-card" style="padding: 1.2rem; margin-bottom: 1.5rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
        <input type="text" id="opinion-search-input" placeholder="🔍 Buscar por lector, contenido o rol..." value="${escapeHTML(searchQuery)}" style="padding:0.6rem 1rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; flex:1; min-width:220px;">
        
        <select id="opinion-status-select" style="padding:0.6rem 1rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; cursor:pointer;">
          <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>Todos los Estados</option>
          <option value="approved" ${statusFilter === 'approved' ? 'selected' : ''}>Aprobados</option>
          <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>Pendientes</option>
        </select>
      </div>

      <div class="samurai-card" style="padding: 1.5rem;">
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--accent-gold);">
                <th style="padding:0.8rem;">Lector / Rol</th>
                <th style="padding:0.8rem;">Valoración</th>
                <th style="padding:0.8rem;">Reseña</th>
                <th style="padding:0.8rem;">Estado</th>
                <th style="padding:0.8rem; text-align:right;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `
                <tr>
                  <td colspan="5" style="padding:2.5rem; text-align:center; color:var(--text-secondary);">No se encontraron opiniones registradas.</td>
                </tr>
              ` : items.map(op => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.8rem;">
                    <div style="font-weight:600; color:#fff;">${escapeHTML(op.name)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${escapeHTML(op.role || 'Lector')}</div>
                    ${op.verified ? '<span style="font-size:0.7rem; color:#10b981;">✓ Verificado</span>' : ''}
                  </td>
                  <td style="padding:0.8rem; color:#f59e0b; font-size:1.1rem; white-space:nowrap;">
                    ${renderStars(op.rating)}
                  </td>
                  <td style="padding:0.8rem; max-width:320px; line-height:1.4; color:var(--text-secondary);">
                    "${escapeHTML(op.body)}"
                  </td>
                  <td style="padding:0.8rem;">
                    <span class="badge" style="padding:0.25rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:${op.status === 'pending' ? '#d97706' : '#059669'}; color:#fff;">
                      ${op.status === 'pending' ? 'Pendiente' : 'Aprobado'}
                    </span>
                  </td>
                  <td style="padding:0.8rem; text-align:right; white-space:nowrap;">
                    <button class="btn-toggle-status btn-samurai-outline" data-id="${op.id}" data-status="${op.status === 'pending' ? 'approved' : 'pending'}" style="padding:0.3rem 0.6rem; font-size:0.75rem; margin-right:0.4rem; cursor:pointer;">
                      ${op.status === 'pending' ? '✓ Aprobar' : '⏸️ Pausar'}
                    </button>
                    <button class="btn-edit-op btn-samurai-outline" data-id="${op.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; margin-right:0.4rem; cursor:pointer;">✏️ Editar</button>
                    <button class="btn-delete-op btn-samurai-red" data-id="${op.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; cursor:pointer;">🗑️ Borrar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
          <span style="font-size:0.85rem; color:var(--text-secondary);">
            Página <strong>${currentPage}</strong> de <strong>${totalPages}</strong>
          </span>
          <div style="display:flex; gap:0.5rem;">
            <button id="btn-prev-page-op" class="btn-samurai-outline" ${currentPage <= 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : 'style="cursor:pointer;"'}>← Anterior</button>
            <button id="btn-next-page-op" class="btn-samurai-outline" ${currentPage >= totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : 'style="cursor:pointer;"'}>Siguiente →</button>
          </div>
        </div>
      </div>
    `;

    // Bind Search & Filters
    const searchInput = document.getElementById('opinion-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1;
        loadData();
      });
    }

    const statusSelect = document.getElementById('opinion-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        currentPage = 1;
        loadData();
      });
    }

    const prevBtn = document.getElementById('btn-prev-page-op');
    if (prevBtn && currentPage > 1) {
      prevBtn.addEventListener('click', () => {
        currentPage--;
        loadData();
      });
    }

    const nextBtn = document.getElementById('btn-next-page-op');
    if (nextBtn && currentPage < totalPages) {
      nextBtn.addEventListener('click', () => {
        currentPage++;
        loadData();
      });
    }

    // Bind Create Button -> Renders Form View
    const createBtn = document.getElementById('btn-create-opinion-admin');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        renderForm(null);
      });
    }

    // Toggle Status
    container.querySelectorAll('.btn-toggle-status').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const newStatus = btn.dataset.status;
        const op = items.find(o => o.id === id);
        if (op) {
          await dbService.saveOpinion({ ...op, status: newStatus });
          loadData();
        }
      });
    });

    // Edit Button -> Renders Form View with Opinion Data
    container.querySelectorAll('.btn-edit-op').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const op = items.find(o => o.id === id);
        if (op) {
          renderForm(op);
        }
      });
    });

    // Delete Button
    container.querySelectorAll('.btn-delete-op').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Deseas eliminar esta opinión de forma permanente?')) return;
        const id = btn.dataset.id;
        await dbService.deleteOpinion(id);
        loadData();
      });
    });
  }

  function renderForm(opinion = null) {
    const isEdit = !!opinion;

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2 class="samurai-title">${isEdit ? 'Editar Opinión de Lector' : 'Crear Nueva Opinión'}</h2>
        <button id="btn-back-to-list-op" class="btn-samurai-outline" style="cursor:pointer;">← Volver al Listado</button>
      </div>

      <div class="samurai-card" style="padding:2rem; max-width:650px;">
        <form id="admin-op-form" style="display:flex; flex-direction:column; gap:1.2rem;">
          <input type="hidden" id="admin-op-id" value="${opinion ? opinion.id : ''}">
          
          <div>
            <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Nombre del Lector *</label>
            <input type="text" id="admin-op-name" required value="${opinion ? opinion.name || '' : ''}" placeholder="Ej. Sensei Carlos Mendoza" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; font-family:inherit;">
          </div>

          <div>
            <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Rol u Ocupación *</label>
            <input type="text" id="admin-op-role" required value="${opinion ? opinion.role || '' : ''}" placeholder="Ej. Instructor de Iaido (6° Dan) / Lector" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; font-family:inherit;">
          </div>

          <div>
            <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Valoración (Estrellas 1-5)</label>
            <select id="admin-op-rating" style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; font-family:inherit; cursor:pointer;">
              <option value="5" ${opinion?.rating == 5 || !opinion ? 'selected' : ''}>★★★★★ (5 Estrellas - Excelente)</option>
              <option value="4" ${opinion?.rating == 4 ? 'selected' : ''}>★★★★☆ (4 Estrellas - Muy Bueno)</option>
              <option value="3" ${opinion?.rating == 3 ? 'selected' : ''}>★★★☆☆ (3 Estrellas - Bueno)</option>
              <option value="2" ${opinion?.rating == 2 ? 'selected' : ''}>★★☆☆☆ (2 Estrellas - Regular)</option>
              <option value="1" ${opinion?.rating == 1 ? 'selected' : ''}>★☆☆☆☆ (1 Estrella - Deficiente)</option>
            </select>
          </div>

          <div>
            <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Opinión / Reseña Completa *</label>
            <textarea id="admin-op-body" rows="5" required placeholder="Escribe el testimonio o reseña del lector sobre la obra..." style="width:100%; padding:0.7rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; font-family:inherit; line-height:1.5;">${opinion ? opinion.body || '' : ''}</textarea>
          </div>

          <div style="display:flex; gap:2rem; flex-wrap:wrap; padding:0.5rem 0;">
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:#fff; cursor:pointer;">
              <input type="checkbox" id="admin-op-verified" ${opinion ? (opinion.verified !== false ? 'checked' : '') : 'checked'} style="width:18px; height:18px; accent-color:var(--accent-red);"> Compra Verificada
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:#fff; cursor:pointer;">
              <input type="checkbox" id="admin-op-approved" ${opinion ? (opinion.status !== 'pending' ? 'checked' : '') : 'checked'} style="width:18px; height:18px; accent-color:var(--accent-red);"> Aprobado para Mostrar en Portada
            </label>
          </div>

          <div id="form-op-feedback" style="color:var(--accent-gold); font-size:0.9rem;"></div>

          <div style="display:flex; gap:1rem; margin-top:1rem;">
            <button type="submit" class="btn-samurai-red" style="padding:0.8rem 1.8rem; font-weight:600; cursor:pointer;">
              ${isEdit ? '💾 Guardar Cambios' : '➕ Crear y Publicar'}
            </button>
            <button type="button" id="btn-cancel-op-form" class="btn-samurai-outline" style="padding:0.8rem 1.5rem; cursor:pointer;">Cancelar</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('btn-back-to-list-op').addEventListener('click', () => loadData());
    document.getElementById('btn-cancel-op-form').addEventListener('click', () => loadData());

    const form = document.getElementById('admin-op-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-op-feedback');
      feedback.textContent = '⏳ Guardando opinión...';

      const id = document.getElementById('admin-op-id').value;
      const name = document.getElementById('admin-op-name').value.trim();
      const role = document.getElementById('admin-op-role').value.trim();
      const rating = document.getElementById('admin-op-rating').value;
      const body = document.getElementById('admin-op-body').value.trim();
      const verified = document.getElementById('admin-op-verified').checked;
      const isApproved = document.getElementById('admin-op-approved').checked;

      try {
        await dbService.saveOpinion({
          id: id || undefined,
          name,
          role,
          rating,
          body,
          verified,
          status: isApproved ? 'approved' : 'pending'
        });
        feedback.textContent = '¡Opinión guardada con éxito!';
        setTimeout(() => {
          loadData();
        }, 400);
      } catch (err) {
        feedback.textContent = 'Error al guardar: ' + (err.message || err);
      }
    });
  }

  await loadData();
}
