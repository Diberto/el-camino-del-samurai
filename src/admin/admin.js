import { dbService } from '../services/db-service.js';
import { initSectionsManager } from './modules/sections-menu-manager.js';
import { initGpuManager } from './modules/gpu-config-manager.js';
import { initBlogManager } from './modules/blog-cms-manager.js';
import { initUserManager } from './modules/user-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const adminApp = document.getElementById('admin-app');
  const logoutBtn = document.getElementById('logout-btn');
  const userDisplayName = document.getElementById('user-display-name');

  function checkAuth() {
    const user = dbService.getCurrentUser();
    if (user) {
      loginModal.classList.add('hidden');
      adminApp.classList.remove('hidden');
      userDisplayName.textContent = user.name || user.email;
      loadModules();
    } else {
      loginModal.classList.remove('hidden');
      adminApp.classList.add('hidden');
    }
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      await dbService.login(email, password);
      checkAuth();
    } catch (err) {
      document.getElementById('login-error').textContent = err.message || 'Error de autenticación';
    }
  });

  logoutBtn.addEventListener('click', () => {
    dbService.logout();
    checkAuth();
  });

  // Tab switching
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  const providerSelect = document.getElementById('db-provider-select');
  if (providerSelect) {
    providerSelect.value = dbService.getProvider();
    providerSelect.addEventListener('change', (e) => {
      dbService.setProvider(e.target.value);
      loadModules();
    });
  }

  function loadModules() {
    initSectionsManager(document.getElementById('tab-sections'));
    initGpuManager(document.getElementById('tab-gpu'));
    initBlogManager(document.getElementById('tab-blog'));
    initUserManager(document.getElementById('tab-users'));
  }

  checkAuth();
});
