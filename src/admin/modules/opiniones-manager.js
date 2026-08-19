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

    const res = await dbService.getOpinions(currentPage, perPage, filterStr);
    renderUI(res);
  }

  function renderStars(rating) {
    const r = Math.max(1, Math.min(5, parseInt(rating) || 5));
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  function renderUI(data) {
    const items = data.items || [];
    const totalPages = data.totalPages || 1;
    const totalItems = data.totalItems || items.length;

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
        <button id="btn-create-opinion-admin" class="btn-samurai-red">+ Crear Opinión</button>
      </div>

      <div class="samurai-card" style="padding: 1.2rem; margin-bottom: 1.5rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
        <input type="text" id="opinion-search-input" placeholder="🔍 Buscar por lector, contenido o rol..." value="${searchQuery}" style="padding:0.6rem 1rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px; flex:1; min-width:220px;">
        
        <select id="opinion-status-select" style="padding:0.6rem 1rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px;">
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
                  <td colspan="5" style="padding:2rem; text-align:center; color:var(--text-secondary);">No se encontraron opiniones registrados.</td>
                </tr>
              ` : items.map(op => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.8rem;">
                    <div style="font-weight:600; color:#fff;">${op.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${op.role || 'Lector'}</div>
                    ${op.verified ? '<span style="font-size:0.7rem; color:#10b981;">✓ Verificado</span>' : ''}
                  </td>
                  <td style="padding:0.8rem; color:#f59e0b; font-size:1.1rem; white-space:nowrap;">
                    ${renderStars(op.rating)}
                  </td>
                  <td style="padding:0.8rem; max-width:320px; line-height:1.4; color:var(--text-secondary);">
                    "${op.body}"
                  </td>
                  <td style="padding:0.8rem;">
                    <span class="badge ${op.status === 'pending' ? 'badge-warning' : 'badge-success'}" style="padding:0.25rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:600; background:${op.status === 'pending' ? '#d97706' : '#059669'}; color:#fff;">
                      ${op.status === 'pending' ? 'Pendiente' : 'Aprobado'}
                    </span>
                  </td>
                  <td style="padding:0.8rem; text-align:right; white-space:nowrap;">
                    <button class="btn-toggle-status btn-samurai-outline" data-id="${op.id}" data-status="${op.status === 'pending' ? 'approved' : 'pending'}" style="padding:0.3rem 0.6rem; font-size:0.75rem; margin-right:0.4rem;">
                      ${op.status === 'pending' ? '✓ Aprobar' : '⏸️ Pausar'}
                    </button>
                    <button class="btn-edit-op btn-samurai-outline" data-id="${op.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; margin-right:0.4rem;">✏️ Editar</button>
                    <button class="btn-delete-op btn-samurai-red" data-id="${op.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem;">🗑️ Borrar</button>
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
            <button id="btn-prev-page-op" class="btn-samurai-outline" ${currentPage <= 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>← Anterior</button>
            <button id="btn-next-page-op" class="btn-samurai-outline" ${currentPage >= totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>Siguiente →</button>
          </div>
        </div>
      </div>

      <!-- Modal Admin Opinión -->
      <div id="admin-op-modal" class="modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(6px); display:none; align-items:center; justify-content:center; z-index:9999;">
        <div class="samurai-card" style="width:90%; max-width:500px; padding:2rem;">
          <h3 id="admin-op-modal-title" class="samurai-title" style="margin-bottom:1.5rem;">Crear Nueva Opinión</h3>
          <form id="admin-op-form">
            <input type="hidden" id="admin-op-id" value="">
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Nombre del Lector *</label>
              <input type="text" id="admin-op-name" required placeholder="Ej. Carlos Mendoza" style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Rol u Ocupación *</label>
              <input type="text" id="admin-op-role" required placeholder="Ej. Lector / Practicante de Kendo" style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Valoración (Estrellas 1-5)</label>
              <select id="admin-op-rating" style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
                <option value="5">★★★★★ (5 Estrellas)</option>
                <option value="4">★★★★☆ (4 Estrellas)</option>
                <option value="3">★★★☆☆ (3 Estrellas)</option>
                <option value="2">★★☆☆☆ (2 Estrellas)</option>
                <option value="1">★☆☆☆☆ (1 Estrella)</option>
              </select>
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.85rem; margin-bottom:0.4rem; color:var(--text-secondary);">Opinión / Reseña *</label>
              <textarea id="admin-op-body" rows="4" required placeholder="Comentarios del lector..." style="width:100%; padding:0.6rem; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; font-family:inherit;"></textarea>
            </div>
            <div style="margin-bottom:1rem; display:flex; gap:1.5rem;">
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; color:#fff; cursor:pointer;">
                <input type="checkbox" id="admin-op-verified" checked style="accent-color:var(--accent-red);"> Compra Verificada
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; color:#fff; cursor:pointer;">
                <input type="checkbox" id="admin-op-approved" checked style="accent-color:var(--accent-red);"> Aprobado para Mostrar
              </label>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:0.8rem; margin-top:1.5rem;">
              <button type="button" id="btn-close-admin-op-modal" class="btn-samurai-outline">Cancelar</button>
              <button type="submit" class="btn-samurai-red">Guardar Opinión</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('opinion-search-input').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      loadData();
    });

    document.getElementById('opinion-status-select').addEventListener('change', (e) => {
      statusFilter = e.target.value;
      currentPage = 1;
      loadData();
    });

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

    // Modal triggers
    const modal = document.getElementById('admin-op-modal');
    const modalTitle = document.getElementById('admin-op-modal-title');
    const form = document.getElementById('admin-op-form');

    document.getElementById('btn-create-opinion-admin').addEventListener('click', () => {
      form.reset();
      document.getElementById('admin-op-id').value = '';
      modalTitle.textContent = 'Crear Nueva Opinión';
      modal.style.display = 'flex';
    });

    document.getElementById('btn-close-admin-op-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

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

    // Edit Item
    container.querySelectorAll('.btn-edit-op').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const op = items.find(o => o.id === id);
        if (!op) return;

        document.getElementById('admin-op-id').value = op.id;
        document.getElementById('admin-op-name').value = op.name;
        document.getElementById('admin-op-role').value = op.role || '';
        document.getElementById('admin-op-rating').value = op.rating || 5;
        document.getElementById('admin-op-body').value = op.body;
        document.getElementById('admin-op-verified').checked = op.verified !== false;
        document.getElementById('admin-op-approved').checked = op.status !== 'pending';

        modalTitle.textContent = 'Editar Opinión';
        modal.style.display = 'flex';
      });
    });

    // Delete Item
    container.querySelectorAll('.btn-delete-op').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Deseas eliminar esta opinión de forma permanente?')) return;
        const id = btn.dataset.id;
        await dbService.deleteOpinion(id);
        loadData();
      });
    });

    // Form Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('admin-op-id').value;
      const name = document.getElementById('admin-op-name').value.trim();
      const role = document.getElementById('admin-op-role').value.trim();
      const rating = document.getElementById('admin-op-rating').value;
      const body = document.getElementById('admin-op-body').value.trim();
      const verified = document.getElementById('admin-op-verified').checked;
      const isApproved = document.getElementById('admin-op-approved').checked;

      await dbService.saveOpinion({
        id,
        name,
        role,
        rating,
        body,
        verified,
        status: isApproved ? 'approved' : 'pending'
      });

      modal.style.display = 'none';
      loadData();
    });
  }

  await loadData();
}
