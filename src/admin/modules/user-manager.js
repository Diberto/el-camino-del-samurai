import { dbService } from '../../services/db-service.js';

export async function initUserManager(container) {
  let users = await dbService.getUsers();

  function renderList() {
    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <h2>Gestión de Usuarios</h2>
        <button id="new-user-btn" style="padding:0.6rem 1.2rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">+ Agregar Usuario</button>
      </div>

      <div style="background:#1a1d24; border:1px solid #2d3748; border-radius:8px; overflow:hidden;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead style="background:#242832; color:#a0aec0;">
            <tr>
              <th style="padding:0.8rem 1rem;">Nombre</th>
              <th style="padding:0.8rem 1rem;">Email</th>
              <th style="padding:0.8rem 1rem;">Rol</th>
              <th style="padding:0.8rem 1rem;">Estado</th>
              <th style="padding:0.8rem 1rem;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr style="border-top:1px solid #2d3748;">
                <td style="padding:0.8rem 1rem;">${u.name || 'Sin Nombre'}</td>
                <td style="padding:0.8rem 1rem;">${u.email}</td>
                <td style="padding:0.8rem 1rem;">${u.role}</td>
                <td style="padding:0.8rem 1rem;">${u.active !== false ? 'Activo' : 'Inactivo'}</td>
                <td style="padding:0.8rem 1rem;">
                  <button class="edit-usr-btn" data-id="${u.id}" style="background:#3182ce; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer;">Editar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('new-user-btn').addEventListener('click', () => renderForm());
    container.querySelectorAll('.edit-usr-btn').forEach(b => b.addEventListener('click', () => {
      const u = users.find(item => item.id === b.dataset.id);
      renderForm(u);
    }));
  }

  function renderForm(user = null) {
    container.innerHTML = `
      <h2>${user ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      <form id="usr-form" style="margin-top:1.5rem; display:flex; flex-direction:column; gap:1.2rem; max-width:500px;">
        <label>Nombre
          <input type="text" id="usr-name" required value="${user ? user.name || '' : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.4rem;">
        </label>
        <label>Email
          <input type="email" id="usr-email" required value="${user ? user.email : ''}" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.4rem;">
        </label>
        <label>Rol
          <select id="usr-role" style="width:100%; padding:0.6rem; background:#242832; color:#fff; border:1px solid #4a5568; border-radius:4px; margin-top:0.4rem;">
            <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Administrador</option>
            <option value="editor" ${user?.role === 'editor' ? 'selected' : ''}>Editor</option>
          </select>
        </label>
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" id="usr-active" ${user?.active !== false ? 'checked' : ''} style="width:18px; height:18px;"> Usuario Activo
        </label>
        <div style="display:flex; gap:1rem;">
          <button type="submit" style="padding:0.8rem 1.5rem; background:#38a169; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:600;">Guardar Usuario</button>
          <button type="button" id="cancel-usr-btn" style="padding:0.8rem 1.5rem; background:#4a5568; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
        </div>
      </form>
    `;

    document.getElementById('cancel-usr-btn').addEventListener('click', () => renderList());
    document.getElementById('usr-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const userData = {
        id: user ? user.id : undefined,
        name: document.getElementById('usr-name').value,
        email: document.getElementById('usr-email').value,
        role: document.getElementById('usr-role').value,
        active: document.getElementById('usr-active').checked
      };
      await dbService.saveUser(userData);
      users = await dbService.getUsers();
      renderList();
    });
  }

  renderList();
}
