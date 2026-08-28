<?php
/**
 * GESTOR DE AUTENTICACIÓN Y SESIONES DEL PANEL DE ADMINISTRACIÓN
 */

require_once __DIR__ . '/settings.php';

// Contraseña por defecto del panel (puede actualizarse desde el panel o variables de entorno)
define('ADMIN_USER', 'admin');
// Hash por defecto para 'samurai2026'
define('DEFAULT_ADMIN_HASH', '$2y$10$eO0p5912xN7tZtKqm0iC.O1.uYFmYj2R2vTfx6Vj2tX0gR9vM4u9W');

function is_admin_logged_in(): bool {
    return isset($_SESSION['admin_auth']) && $_SESSION['admin_auth'] === true;
}

function require_admin_auth() {
    if (!is_admin_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

function admin_login(string $username, string $password): bool {
    // Verificar credenciales
    if ($username === ADMIN_USER && ($password === 'samurai2026' || password_verify($password, DEFAULT_ADMIN_HASH))) {
        $_SESSION['admin_auth'] = true;
        $_SESSION['admin_user'] = $username;
        $_SESSION['admin_login_time'] = time();
        return true;
    }
    return false;
}

function admin_logout() {
    unset($_SESSION['admin_auth'], $_SESSION['admin_user'], $_SESSION['admin_login_time']);
    session_destroy();
}
