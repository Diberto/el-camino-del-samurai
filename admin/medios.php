<?php
/**
 * PANEL ADMIN - BIBLIOTECA CENTRAL DE MEDIOS
 * Gestión centralizada de fotografías, portadas y recursos para todo el sitio
 */
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/media_helper.php';
require_admin_auth();

$msg = '';
$error = '';

// 1. Eliminar archivo
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['file'])) {
    $file_to_delete = basename($_GET['file']);
    $folder = $_GET['folder'] === 'assets' ? 'assets' : 'photos';
    $target_path = ROOT_DIR . '/' . $folder . '/' . $file_to_delete;
    
    if (file_exists($target_path) && is_file($target_path)) {
        if (unlink($target_path)) {
            header('Location: medios.php?msg=deleted');
            exit;
        } else {
            $error = 'No se pudo eliminar el archivo. Verifica los permisos.';
        }
    } else {
        $error = 'El archivo no existe.';
    }
}

// 2. Subir nuevo archivo con optimización automática a WebP
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload_media'])) {
    if (isset($_FILES['media_files'])) {
        $uploaded_count = 0;
        $total_files = count($_FILES['media_files']['name']);
        
        for ($i = 0; $i < $total_files; $i++) {
            if ($_FILES['media_files']['error'][$i] === UPLOAD_ERR_OK) {
                $single_file = [
                    'name' => $_FILES['media_files']['name'][$i],
                    'type' => $_FILES['media_files']['type'][$i],
                    'tmp_name' => $_FILES['media_files']['tmp_name'][$i],
                    'error' => $_FILES['media_files']['error'][$i],
                    'size' => $_FILES['media_files']['size'][$i]
                ];
                
                $saved = optimize_and_save_image($single_file, 'media', 1920, 85);
                if ($saved) {
                    $uploaded_count++;
                }
            }
        }
        if ($uploaded_count > 0) {
            header('Location: medios.php?msg=uploaded&count=' . $uploaded_count);
            exit;
        } else {
            $error = 'No se pudo subir ningún archivo válido (Formatos permitidos: WebP, JPG, PNG, SVG).';
        }
    }
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'deleted') $msg = 'Archivo eliminado de la biblioteca de medios.';
    if ($_GET['msg'] === 'uploaded') $msg = ($_GET['count'] ?? '1') . ' archivo(s) subido(s) con éxito a la biblioteca.';
}

// 3. Escanear medios
function scan_folder($dir, $prefix) {
    $list = [];
    if (!is_dir($dir)) return $list;
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === '.htaccess' || $item === '.gitkeep') continue;
        $full = $dir . '/' . $item;
        if (is_file($full)) {
            $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
            if (in_array($ext, ['webp', 'jpg', 'jpeg', 'png', 'svg', 'gif'])) {
                $size_kb = round(filesize($full) / 1024, 1);
                $list[] = [
                    'filename' => $item,
                    'path' => $prefix . '/' . $item,
                    'folder' => $prefix,
                    'size' => $size_kb > 1024 ? round($size_kb / 1024, 2) . ' MB' : $size_kb . ' KB',
                    'mtime' => filemtime($full),
                    'date' => date('Y-m-d H:i', filemtime($full))
                ];
            }
        }
    }
    return $list;
}

$photos = scan_folder(ROOT_DIR . '/photos', 'photos');
$assets = scan_folder(ROOT_DIR . '/assets', 'assets');
$all_media = array_merge($photos, $assets);
usort($all_media, fn($a, $b) => $b['mtime'] <=> $a['mtime']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca de Medios | Panel de Administración</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=3.0">
    <style>
        .media-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.25rem;
            margin-top: 1.5rem;
        }
        .media-card {
            background: #171b26;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .media-card:hover {
            transform: translateY(-4px);
            border-color: var(--admin-primary);
        }
        .media-thumb-wrapper {
            width: 100%;
            height: 140px;
            background: #0f1219;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        .media-thumb-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .media-card:hover .media-thumb-wrapper img {
            transform: scale(1.05);
        }
        .media-info {
            padding: 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            flex: 1;
        }
        .media-name {
            font-size: 0.85rem;
            font-weight: 600;
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .media-meta {
            font-size: 0.75rem;
            color: var(--admin-text-muted);
            display: flex;
            justify-content: space-between;
        }
        .media-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(255,255,255,0.06);
        }
        .btn-copy-path {
            flex: 1;
            background: rgba(197, 168, 128, 0.15);
            color: var(--admin-gold);
            border: none;
            padding: 0.35rem;
            border-radius: 4px;
            font-size: 0.75rem;
            cursor: pointer;
            text-align: center;
            font-weight: 600;
        }
        .btn-copy-path:hover {
            background: var(--admin-gold);
            color: #000;
        }
        .btn-delete-media {
            background: rgba(239, 35, 60, 0.15);
            color: #f87171;
            border: none;
            padding: 0.35rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            cursor: pointer;
        }
        .btn-delete-media:hover {
            background: #ef233c;
            color: #fff;
        }
        .upload-dropzone {
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            background: rgba(255,255,255,0.02);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .upload-dropzone:hover {
            border-color: var(--admin-gold);
            background: rgba(197, 168, 128, 0.05);
        }
    </style>
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
                <a href="medios.php" class="admin-nav-item active">📁 Biblioteca de Medios</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Biblioteca Central de Medios</h2>
                <span class="admin-user-badge"><?= count($all_media) ?> archivos disponibles</span>
            </header>

            <div class="admin-content">
                <?php if ($msg): ?>
                    <div class="admin-alert success"><?= e($msg) ?></div>
                <?php endif; ?>
                <?php if ($error): ?>
                    <div class="admin-alert danger"><?= e($error) ?></div>
                <?php endif; ?>

                <!-- Subir Nuevos Medios -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3>Subir Archivos a la Biblioteca</h3>
                    </div>
                    <div class="admin-card-body">
                        <form action="medios.php" method="POST" enctype="multipart/form-data">
                            <div class="upload-dropzone" onclick="document.getElementById('media_files').click();">
                                <span style="font-size: 2.2rem; display: block; margin-bottom: 0.5rem;">📤</span>
                                <p style="font-weight: 600; color: #fff; margin-bottom: 0.25rem;">Haz clic aquí o arrastra tus imágenes para subirlas</p>
                                <span style="font-size: 0.85rem; color: var(--admin-text-muted);">Soporta WebP, JPG, PNG, SVG (Archivos optimizados)</span>
                                <input type="file" id="media_files" name="media_files[]" multiple accept=".webp,.jpg,.jpeg,.png,.svg,.gif" style="display: none;" onchange="this.form.submit();">
                            </div>
                            <input type="hidden" name="upload_media" value="1">
                        </form>
                    </div>
                </div>

                <!-- Buscador y Listado de Medios -->
                <div class="admin-card">
                    <div class="admin-card-header" style="flex-wrap: wrap; gap: 1rem;">
                        <h3>Imágenes en el Servidor (<?= count($all_media) ?>)</h3>
                        <input type="text" id="search-media" placeholder="🔍 Buscar por nombre..." style="padding: 0.5rem 1rem; border-radius: 20px; background: #11141e; border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 0.85rem; min-width: 250px;">
                    </div>
                    <div class="admin-card-body">
                        <div class="media-grid" id="media-grid-container">
                            <?php foreach ($all_media as $item): ?>
                                <div class="media-card" data-filename="<?= strtolower(e($item['filename'])) ?>">
                                    <div class="media-thumb-wrapper">
                                        <img src="../<?= e($item['path']) ?>" alt="<?= e($item['filename']) ?>" loading="lazy">
                                    </div>
                                    <div class="media-info">
                                        <span class="media-name" title="<?= e($item['filename']) ?>"><?= e($item['filename']) ?></span>
                                        <div class="media-meta">
                                            <span>📁 <?= e($item['folder']) ?></span>
                                            <span><?= e($item['size']) ?></span>
                                        </div>
                                        <div class="media-actions">
                                            <button type="button" class="btn-copy-path" onclick="copyPath('<?= e($item['path']) ?>', this)">📋 Copiar Ruta</button>
                                            <a href="medios.php?action=delete&folder=<?= e($item['folder']) ?>&file=<?= urlencode($item['filename']) ?>" class="btn-delete-media" onclick="return confirm('¿Eliminar <?= e($item['filename']) ?> de la biblioteca?');" title="Eliminar">🗑️</a>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Buscador de medios en tiempo real
        const searchInput = document.getElementById('search-media');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase().trim();
                document.querySelectorAll('.media-card').forEach(card => {
                    const name = card.getAttribute('data-filename') || '';
                    if (name.includes(term)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Copiar ruta al portapapeles
        function copyPath(path, btn) {
            navigator.clipboard.writeText(path).then(() => {
                const origText = btn.textContent;
                btn.textContent = '¡Copiado! ✓';
                btn.style.background = '#22c55e';
                btn.style.color = '#fff';
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            });
        }
    </script>
</body>
</html>
