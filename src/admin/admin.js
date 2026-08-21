import { dbService } from '../services/db-service.js';
import { initSectionsManager } from './modules/sections-menu-manager.js';
import { initGpuManager } from './modules/gpu-config-manager.js';
import { initBlogManager } from './modules/blog-cms-manager.js';
import { initOpinionesManager } from './modules/opiniones-manager.js';
import { initUserManager } from './modules/user-manager.js';
import { initMediaManager } from './modules/media-manager.js';
import { initBackupManager } from './modules/backup-manager.js';
import { initDiagnosticsManager } from './modules/diagnostics-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const adminApp = document.getElementById('admin-app');
  const logoutBtn = document.getElementById('logout-btn');
  const userDisplayName = document.getElementById('user-display-name');

  async function checkAuth() {
    const user = dbService.getCurrentUser();
    if (user) {
      loginModal.classList.add('hidden');
      adminApp.classList.remove('hidden');
      userDisplayName.textContent = user.name || user.email;
      await loadModules();
    } else {
      loginModal.classList.remove('hidden');
      adminApp.classList.add('hidden');
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = 'Verificando credenciales...';

    try {
      await dbService.login(email, password);
      errorEl.textContent = '';
      await checkAuth();
    } catch (err) {
      errorEl.textContent = err.message || 'Error de autenticación';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    dbService.logout();
    await checkAuth();
  });

  // Tab switching
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPanel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  async function loadModules() {
    try {
      const sectionsEl = document.getElementById('tab-sections');
      if (sectionsEl) await initSectionsManager(sectionsEl).catch(e => console.warn('Error loading sections manager:', e));

      const gpuEl = document.getElementById('tab-gpu');
      if (gpuEl) await initGpuManager(gpuEl).catch(e => console.warn('Error loading gpu manager:', e));

      const blogEl = document.getElementById('tab-blog');
      if (blogEl) await initBlogManager(blogEl).catch(e => console.warn('Error loading blog manager:', e));

      const opinionesEl = document.getElementById('tab-opiniones');
      if (opinionesEl) await initOpinionesManager(opinionesEl).catch(e => console.warn('Error loading opiniones manager:', e));

      const mediaEl = document.getElementById('tab-media');
      if (mediaEl) await initMediaManager(mediaEl).catch(e => console.warn('Error loading media manager:', e));

      const usersEl = document.getElementById('tab-users');
      if (usersEl) await initUserManager(usersEl).catch(e => console.warn('Error loading user manager:', e));

      const backupsEl = document.getElementById('tab-backups');
      if (backupsEl) await initBackupManager(backupsEl).catch(e => console.warn('Error loading backup manager:', e));

      const diagnosticsEl = document.getElementById('tab-diagnostics');
      if (diagnosticsEl) await initDiagnosticsManager(diagnosticsEl).catch(e => console.warn('Error loading diagnostics manager:', e));
    } catch (err) {
      console.warn('Error in loadModules:', err);
    }
  }

  checkAuth();
});
