<?php
/**
 * ACCESO DE EMERGENCIA — ELIMINAR ESTE ARCHIVO INMEDIATAMENTE DESPUES DE USARLO
 * Sube a: public_html/admin/emergency_access.php via cPanel File Manager
 * Uso: visitar https://larutadelsamurai.com/admin/emergency_access.php
 */
session_start();

// Limpiar bloqueo por intentos fallidos
$ip_key = 'lf_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
unset($_SESSION[$ip_key], $_SESSION[$ip_key . '_t']);

// Establecer sesión de admin
$_SESSION['admin_auth']       = true;
$_SESSION['admin_user']       = 'admin';
$_SESSION['admin_login_time'] = time();

// Auto-eliminar este archivo del servidor
@unlink(__FILE__);

// Redirigir al panel
header('Location: index.php');
exit;
