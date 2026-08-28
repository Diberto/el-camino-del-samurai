<?php
/**
 * PANEL ADMIN - CONFIGURACIÓN GENERAL Y REDES SOCIALES
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$config_data = get_json_data('config.json', ['settings' => []]);
$settings = $config_data['settings'] ?? [];
$msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_settings'])) {
    $settings['site_title'] = trim($_POST['site_title'] ?? 'La Ruta del Samurái - Jorge Orpianesi');
    $settings['site_description'] = trim($_POST['site_description'] ?? '');
    $settings['address'] = trim($_POST['address'] ?? 'Budokan Argentina - Sarmiento 375, Córdoba, República Argentina. CP: 5000');
    $settings['whatsapp'] = trim($_POST['whatsapp'] ?? '+549 351 3886443');
    $settings['whatsapp_url'] = trim($_POST['whatsapp_url'] ?? 'https://wa.me/5493513886443');
    $settings['email'] = trim($_POST['email'] ?? 'budokanorpianesi@hotmail.com');
    $settings['amazon_url'] = trim($_POST['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi');
    $settings['budokan_url'] = trim($_POST['budokan_url'] ?? 'https://www.budokanweb.com/categoria-producto/libros/');

    // Redes Sociales Oficiales
    $settings['social']['youtube']['url'] = trim($_POST['yt_url'] ?? 'https://www.youtube.com/@larutadelsamurai');
    $settings['social']['youtube']['handle'] = trim($_POST['yt_handle'] ?? '@larutadelsamurai');
    $settings['social']['youtube']['desc'] = trim($_POST['yt_desc'] ?? '');

    $settings['social']['instagram']['url'] = trim($_POST['ig_url'] ?? 'https://www.instagram.com/la.ruta.del.samurai/');
    $settings['social']['instagram']['handle'] = trim($_POST['ig_handle'] ?? '@la.ruta.del.samurai');
    $settings['social']['instagram']['desc'] = trim($_POST['ig_desc'] ?? '');

    $settings['social']['facebook']['url'] = trim($_POST['fb_url'] ?? 'https://www.facebook.com/jorgeorpianesi');
    $settings['social']['facebook']['handle'] = trim($_POST['fb_handle'] ?? 'Jorge Orpianesi');
    $settings['social']['facebook']['desc'] = trim($_POST['fb_desc'] ?? '');

    // Toggles de secciones
    $sections = ['inicio', 'sinopsis', 'opiniones', 'redes', 'ediciones', 'autor', 'galeria', 'blog', 'contacto'];
    foreach ($sections as $sec) {
        $settings['sections_toggle'][$sec] = isset($_POST['section_' . $sec]);
    }

    $config_data['settings'] = $settings;
    save_json_data('config.json', $config_data);
    $msg = 'Configuración y redes actualizadas con éxito.';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración & Redes | Panel de Administración</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=2.0">
</head>
<body class="admin-body">
    <div class="admin-layout">
        <aside class="admin-sidebar">
            <div class="admin-brand">
                <img src="../assets/kanji_stamp.webp" alt="Sello" class="admin-brand-icon">
                <div class="admin-brand-text">
                    <h3>La Ruta del Samurái</h3>
                    <span>Panel de Control</span>
                </div>
            </div>
            <nav class="admin-nav">
                <a href="index.php" class="admin-nav-item">📊 Dashboard</a>
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="settings.php" class="admin-nav-item active">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Configuración General & Redes Sociales</h2>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success"><?= e($msg) ?></div>
                <?php endif; ?>

                <form method="POST" action="settings.php" class="admin-form">
                    <!-- Datos de Contacto Oficial -->
                    <div class="admin-card">
                        <h3>📍 Datos de Contacto Oficial</h3>
                        
                        <div class="form-group">
                            <label for="address">Dirección Física (Sede Budokan)</label>
                            <input type="text" id="address" name="address" value="<?= e($settings['address'] ?? 'Budokan Argentina - Sarmiento 375, Córdoba, República Argentina. CP: 5000') ?>">
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="whatsapp">WhatsApp (Texto)</label>
                                <input type="text" id="whatsapp" name="whatsapp" value="<?= e($settings['whatsapp'] ?? '+549 351 3886443') ?>">
                            </div>
                            <div class="form-group">
                                <label for="whatsapp_url">Enlace Directo de WhatsApp</label>
                                <input type="text" id="whatsapp_url" name="whatsapp_url" value="<?= e($settings['whatsapp_url'] ?? 'https://wa.me/5493513886443') ?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Correo Electrónico Oficial</label>
                            <input type="email" id="email" name="email" value="<?= e($settings['email'] ?? 'budokanorpianesi@hotmail.com') ?>">
                        </div>
                    </div>

                    <!-- Enlaces de Compra -->
                    <div class="admin-card">
                        <h3>🛒 Enlaces Oficiales de Compra</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="budokan_url">Tienda Budokan Web (Argentina)</label>
                                <input type="url" id="budokan_url" name="budokan_url" value="<?= e($settings['budokan_url'] ?? 'https://www.budokanweb.com/categoria-producto/libros/') ?>">
                            </div>
                            <div class="form-group">
                                <label for="amazon_url">Enlace Amazon Global (Digital / Papel)</label>
                                <input type="url" id="amazon_url" name="amazon_url" value="<?= e($settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi') ?>">
                            </div>
                        </div>
                    </div>

                    <!-- Redes Sociales Oficiales -->
                    <div class="admin-card">
                        <h3>🌐 Redes Sociales Oficiales</h3>

                        <!-- YouTube -->
                        <h4>🔴 YouTube Oficial</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>URL de YouTube</label>
                                <input type="url" name="yt_url" value="<?= e($settings['social']['youtube']['url'] ?? 'https://www.youtube.com/@larutadelsamurai') ?>">
                            </div>
                            <div class="form-group">
                                <label>Usuario / Handle</label>
                                <input type="text" name="yt_handle" value="<?= e($settings['social']['youtube']['handle'] ?? '@larutadelsamurai') ?>">
                            </div>
                        </div>

                        <!-- Instagram -->
                        <h4>🟣 Instagram Oficial</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>URL de Instagram</label>
                                <input type="url" name="ig_url" value="<?= e($settings['social']['instagram']['url'] ?? 'https://www.instagram.com/la.ruta.del.samurai/') ?>">
                            </div>
                            <div class="form-group">
                                <label>Usuario / Handle</label>
                                <input type="text" name="ig_handle" value="<?= e($settings['social']['instagram']['handle'] ?? '@la.ruta.del.samurai') ?>">
                            </div>
                        </div>

                        <!-- Facebook -->
                        <h4>🔵 Facebook Oficial</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>URL de Facebook</label>
                                <input type="url" name="fb_url" value="<?= e($settings['social']['facebook']['url'] ?? 'https://www.facebook.com/jorgeorpianesi') ?>">
                            </div>
                            <div class="form-group">
                                <label>Nombre de Página / Usuario</label>
                                <input type="text" name="fb_handle" value="<?= e($settings['social']['facebook']['handle'] ?? 'Jorge Orpianesi') ?>">
                            </div>
                        </div>
                    </div>

                    <!-- Interruptores de Secciones -->
                    <div class="admin-card">
                        <h3>📑 Visibilidad de Secciones en la Web</h3>
                        <div class="toggles-grid">
                            <?php 
                                $sec_names = [
                                    'inicio' => 'Portada / Hero',
                                    'sinopsis' => 'El Libro / Sinopsis',
                                    'opiniones' => 'Opiniones de Lectores',
                                    'redes' => 'Redes Sociales',
                                    'ediciones' => 'Ediciones Disponibles',
                                    'autor' => 'El Autor',
                                    'galeria' => 'Galería de Fotos',
                                    'blog' => 'Artículos de Blog',
                                    'contacto' => 'Contacto Oficial'
                                ];
                                foreach ($sec_names as $k => $label): 
                            ?>
                                <label class="toggle-label">
                                    <input type="checkbox" name="section_<?= $k ?>" value="1" <?= ($settings['sections_toggle'][$k] ?? true) ? 'checked' : '' ?>>
                                    <span><?= e($label) ?></span>
                                </label>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" name="save_settings" class="btn btn-admin-primary">Guardar Configuración</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
