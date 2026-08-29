<?php
/**
 * PANEL ADMIN - CONFIGURACIÓN GENERAL Y REDES SOCIALES
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$config_data = get_json_data('config.json', ['settings' => []]);
$settings = $config_data['settings'] ?? [];
$msg = '';

// Descargar Copia de Seguridad Completa (.ZIP)
if (isset($_GET['action']) && $_GET['action'] === 'download_backup') {
    if (class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        $zipname = 'backup_samurai_' . date('Y-m-d_H-i') . '.zip';
        $zip_path = sys_get_temp_dir() . '/' . $zipname;
        if ($zip->open($zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $data_files = glob(DATA_DIR . '/*.json');
            if (is_array($data_files)) {
                foreach ($data_files as $f) {
                    $zip->addFile($f, 'data/' . basename($f));
                }
            }
            $photo_files = glob(UPLOADS_DIR . '/*.*');
            if (is_array($photo_files)) {
                foreach ($photo_files as $f) {
                    $zip->addFile($f, 'photos/' . basename($f));
                }
            }
            $zip->close();
            if (file_exists($zip_path)) {
                header('Content-Type: application/zip');
                header('Content-Disposition: attachment; filename="' . $zipname . '"');
                header('Content-Length: ' . filesize($zip_path));
                header('Pragma: no-cache');
                header('Expires: 0');
                readfile($zip_path);
                @unlink($zip_path);
                exit;
            }
        }
    }
}

// Restaurar Copia de Seguridad (.ZIP o .JSON)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['restore_backup'])) {
    if (!empty($_FILES['backup_file']['tmp_name'])) {
        $tmp = $_FILES['backup_file']['tmp_name'];
        $name = $_FILES['backup_file']['name'];
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        
        if ($ext === 'zip' && class_exists('ZipArchive')) {
            $zip = new ZipArchive();
            if ($zip->open($tmp) === TRUE) {
                for ($i = 0; $i < $zip->numFiles; $i++) {
                    $entry = $zip->getNameIndex($i);
                    if (strpos($entry, 'data/') === 0 && substr($entry, -5) === '.json') {
                        $content = $zip->getFromIndex($i);
                        file_put_contents(ROOT_DIR . '/' . $entry, $content);
                    } elseif (strpos($entry, 'photos/') === 0 && substr($entry, -1) !== '/') {
                        $content = $zip->getFromIndex($i);
                        file_put_contents(ROOT_DIR . '/' . $entry, $content);
                    }
                }
                $zip->close();
                $msg = '✅ Copia de seguridad ZIP restaurada con éxito. Todos tus datos y fotos fueron recuperados.';
            } else {
                $msg = '❌ Error al procesar el archivo ZIP de respaldo.';
            }
        } elseif ($ext === 'json') {
            $target = DATA_DIR . '/' . basename($name);
            move_uploaded_file($tmp, $target);
            $msg = '✅ Archivo ' . htmlspecialchars($name) . ' restaurado con éxito.';
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_settings'])) {
    $settings['site_title'] = trim($_POST['site_title'] ?? 'La Ruta del Samurái - Jorge Orpianesi');
    $settings['site_description'] = trim($_POST['site_description'] ?? '');
    $settings['address'] = trim($_POST['address'] ?? 'Budokan Argentina - Sarmiento 375, Córdoba, República Argentina. CP: 5000');
    $settings['whatsapp'] = trim($_POST['whatsapp'] ?? '+549 351 3886443');
    $settings['whatsapp_url'] = trim($_POST['whatsapp_url'] ?? 'https://wa.me/5493513886443');
    $settings['email'] = trim($_POST['email'] ?? 'budokanorpianesi@hotmail.com');
    $settings['amazon_url'] = trim($_POST['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi&crid=6E5AFU50XWPW&sprefix=jorge+orpianesi%2Caps%2C237&ref=nb_sb_noss');
    $settings['budokan_url'] = trim($_POST['budokan_url'] ?? 'https://www.budokanweb.com/tienda/libros/la-ruta-del-samurai-formato-libro/');
    $settings['budokan_tomo1_url'] = trim($_POST['budokan_tomo1_url'] ?? 'https://www.budokanweb.com/tienda/libros/la-ruta-del-samurai-formato-libro/');
    $settings['budokan_tomo2_url'] = trim($_POST['budokan_tomo2_url'] ?? 'https://www.budokanweb.com/tienda/destacados/el-paso-de-las-luciernagas-la-ruta-del-samurai-2/');
    $settings['theme_default'] = trim($_POST['theme_default'] ?? 'day');
    $settings['reviews_default_filter'] = trim($_POST['reviews_default_filter'] ?? 'text');

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
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
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

                <!-- Respaldo y Protección de Datos -->
                <div class="admin-card" style="border: 2px solid var(--accent-gold); background: rgba(170, 125, 54, 0.04);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
                        <div>
                            <h3 style="margin-bottom: 0.3rem;">🛡️ Copias de Seguridad & Protección de Contenidos</h3>
                            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">
                                Descarga o restaura en cualquier momento una copia completa de tus <strong>artículos de blog, opiniones, galería, configuración y fotos</strong>.
                            </p>
                        </div>
                        <a href="settings.php?action=download_backup" class="btn btn-admin-primary" style="text-decoration: none; padding: 0.75rem 1.4rem; font-weight: 700;">
                            📥 Descargar Backup (.ZIP)
                        </a>
                    </div>
                    
                    <form method="POST" action="settings.php" enctype="multipart/form-data" style="border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
                        <div class="form-group" style="margin-bottom: 0; flex-grow: 1; max-width: 400px;">
                            <label style="font-size: 0.85rem; font-weight: 600;">Restaurar Copia de Seguridad (.ZIP o .JSON):</label>
                            <input type="file" name="backup_file" accept=".zip,.json" required style="padding: 0.5rem; font-size: 0.85rem;">
                        </div>
                        <button type="submit" name="restore_backup" class="btn btn-admin-secondary" style="padding: 0.65rem 1.25rem;" onclick="return confirm('¿Estás seguro de restaurar este archivo de respaldo?');">
                            📤 Restaurar Archivo
                        </button>
                    </form>
                </div>

                <form method="POST" action="settings.php" class="admin-form">
                    <!-- Apariencia y Filtros Predeterminados -->
                    <div class="admin-card">
                        <h3>🎨 Apariencia y Filtros Predeterminados</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="theme_default">Modo de Color por Defecto</label>
                                <select id="theme_default" name="theme_default">
                                    <option value="day" <?= ($settings['theme_default'] ?? 'day') === 'day' ? 'selected' : '' ?>>☀️ Modo Día (日) - Predeterminado</option>
                                    <option value="night" <?= ($settings['theme_default'] ?? 'day') === 'night' ? 'selected' : '' ?>>🌙 Modo Noche (月)</option>
                                    <option value="time" <?= ($settings['theme_default'] ?? 'day') === 'time' ? 'selected' : '' ?>>⏰ Automático según la hora (6h-19h Día / 19h-6h Noche)</option>
                                    <option value="device" <?= ($settings['theme_default'] ?? 'day') === 'device' ? 'selected' : '' ?>>📱 Automático según dispositivo / sistema operativo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="reviews_default_filter">Filtro por Defecto de Opiniones</label>
                                <select id="reviews_default_filter" name="reviews_default_filter">
                                    <option value="text" <?= ($settings['reviews_default_filter'] ?? 'text') === 'text' ? 'selected' : '' ?>>✍️ Reseñas Escritas (Predeterminado)</option>
                                    <option value="all" <?= ($settings['reviews_default_filter'] ?? 'text') === 'all' ? 'selected' : '' ?>>🌐 Todas las Opiniones</option>
                                    <option value="photo" <?= ($settings['reviews_default_filter'] ?? 'text') === 'photo' ? 'selected' : '' ?>>📸 Fotos de Lectores con el Libro</option>
                                </select>
                            </div>
                        </div>
                    </div>

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
                                <label for="budokan_tomo1_url">Tomo 1: La Ruta del Samurái (Budokan Argentina)</label>
                                <input type="url" id="budokan_tomo1_url" name="budokan_tomo1_url" value="<?= e($settings['budokan_tomo1_url'] ?? 'https://www.budokanweb.com/tienda/libros/la-ruta-del-samurai-formato-libro/') ?>">
                            </div>
                            <div class="form-group">
                                <label for="budokan_tomo2_url">Tomo 2: El Paso de las Luciérnagas (Budokan Argentina)</label>
                                <input type="url" id="budokan_tomo2_url" name="budokan_tomo2_url" value="<?= e($settings['budokan_tomo2_url'] ?? 'https://www.budokanweb.com/tienda/destacados/el-paso-de-las-luciernagas-la-ruta-del-samurai-2/') ?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="amazon_url">Enlace Amazon Global (Todos los títulos / Exterior)</label>
                            <input type="url" id="amazon_url" name="amazon_url" value="<?= e($settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi&crid=6E5AFU50XWPW&sprefix=jorge+orpianesi%2Caps%2C237&ref=nb_sb_noss') ?>">
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
