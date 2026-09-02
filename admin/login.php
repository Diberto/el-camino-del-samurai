<?php
/**
 * PANEL ADMIN - LOGIN
 */
ob_start(); // Previene ERR_HTTP2_PROTOCOL_ERROR por output antes de headers
require_once __DIR__ . '/../config/auth.php';

// Definir URL base del admin de forma dinámica
$admin_base = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http')
    . '://' . ($_SERVER['HTTP_HOST'] ?? 'larutadelsamurai.com') . '/admin/';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (admin_login($username, $password)) {
        session_write_close();
        header('Location: ' . $admin_base . 'index.php', true, 302);
        ob_end_flush();
        exit;
    } else {
        $error = 'Usuario o contraseña incorrectos.';
    }
}

if (is_admin_logged_in()) {
    session_write_close();
    header('Location: ' . $admin_base . 'index.php', true, 302);
    ob_end_flush();
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso al Panel | La Ruta del Samurái</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=2.0">
</head>
<body class="admin-login-body">
    <div class="admin-login-card">
        <div class="admin-login-header">
            <img src="../assets/kanji_stamp.webp" alt="Sello Kanji" class="admin-login-logo">
            <h2>Panel de Administración</h2>
            <p>La Ruta del Samurái</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="alert alert-error"><?= e($error) ?></div>
        <?php endif; ?>

        <form method="POST" action="login.php" class="admin-form">
            <div class="form-group">
                <label for="username">Usuario</label>
                <input type="text" id="username" name="username" required autofocus placeholder="Usuario admin">
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required placeholder="Contraseña">
            </div>

            <button type="submit" class="btn btn-admin-primary btn-block">Ingresar al Panel</button>
        </form>

        <div class="admin-login-footer">
            <a href="../index.php">&larr; Volver al sitio público</a>
        </div>
    </div>
</body>
</html>
