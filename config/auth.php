<?php
/**
 * GESTOR DE AUTENTICACIÓN Y SESIONES DEL PANEL DE ADMINISTRACIÓN
 */

require_once __DIR__ . '/settings.php';

// Contraseña por defecto del panel (puede actualizarse desde el panel o variables de entorno)
define('ADMIN_USER', 'admin');
// Hash bcrypt — para cambiar la contraseña, generar un nuevo hash con password_hash()
define('DEFAULT_ADMIN_HASH', '$2y$10$eO0p5912xN7tZtKqm0iC.O1.uYFmYj2R2vTfx6Vj2tX0gR9vM4u9W');

// Máximo de intentos de login fallidos antes de bloqueo temporal
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOGIN_LOCKOUT_SECONDS', 600); // 10 minutos

function is_admin_logged_in(): bool {
    return isset($_SESSION['admin_auth']) && $_SESSION['admin_auth'] === true;
}

function require_admin_auth() {
    if (!is_admin_logged_in()) {
        header('Location: login.php');
        exit;
    }
}

/**
 * Verifica si la IP actual está bloqueada por demasiados intentos fallidos.
 */
function is_login_blocked(): bool {
    $ip_key  = 'lf_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
    $attempts = $_SESSION[$ip_key] ?? 0;
    $since    = $_SESSION[$ip_key . '_t'] ?? 0;

    if ($attempts >= MAX_LOGIN_ATTEMPTS) {
        if ((time() - $since) < LOGIN_LOCKOUT_SECONDS) {
            return true; // Aún bloqueado
        }
        // Venció el bloqueo — resetear
        unset($_SESSION[$ip_key], $_SESSION[$ip_key . '_t']);
    }
    return false;
}

function admin_login(string $username, string $password): bool {
    $ip_key = 'lf_' . md5($_SERVER['REMOTE_ADDR'] ?? '');

    // Rechazar si la IP está bloqueada por brute force
    if (is_login_blocked()) {
        return false;
    }

    // Verificar credenciales SOLO con password_verify (sin texto plano)
    if ($username === ADMIN_USER && password_verify($password, DEFAULT_ADMIN_HASH)) {
        // Éxito: regenerar ID de sesión para prevenir Session Fixation
        session_regenerate_id(true);
        $_SESSION['admin_auth']       = true;
        $_SESSION['admin_user']       = $username;
        $_SESSION['admin_login_time'] = time();
        // Limpiar contadores de intentos fallidos
        unset($_SESSION[$ip_key], $_SESSION[$ip_key . '_t']);
        return true;
    }

    // Fallo: incrementar contador de intentos
    if (!isset($_SESSION[$ip_key . '_t'])) {
        $_SESSION[$ip_key . '_t'] = time();
    }
    $_SESSION[$ip_key] = ($_SESSION[$ip_key] ?? 0) + 1;

    return false;
}

function admin_logout() {
    unset($_SESSION['admin_auth'], $_SESSION['admin_user'], $_SESSION['admin_login_time']);
    session_write_close();
    session_destroy();
}
