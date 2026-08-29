<?php
/**
 * PANEL ADMIN - GESTIÓN DE LIBROS Y EDICIONES
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$libros = get_json_data('libros.json', []);
$msg = '';
$action = $_GET['action'] ?? 'list';
$edit_id = $_GET['id'] ?? '';

// Guardar / Crear / Editar Libro
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_libro'])) {
    $id = trim($_POST['id'] ?? '');
    if (empty($id)) {
        $id = 'libro_' . time();
    }
    
    $title = trim($_POST['title'] ?? '');
    $subtitle = trim($_POST['subtitle'] ?? '');
    $tab_label = trim($_POST['tab_label'] ?? $title);
    $badge = trim($_POST['badge'] ?? 'EDICIÓN');
    $format = trim($_POST['format'] ?? 'Formato Libro');
    $pages = trim($_POST['pages'] ?? '');
    $desc = trim($_POST['desc'] ?? '');
    $buy_url = trim($_POST['buy_url'] ?? '');
    $cover_front = trim($_POST['cover_front'] ?? 'assets/book1_front.webp');
    $cover_back = trim($_POST['cover_back'] ?? 'assets/book1_back.webp');

    // Procesar subida de tapa frontal si se adjuntó archivo
    if (!empty($_FILES['cover_front_file']['name'])) {
        require_once __DIR__ . '/../config/media_helper.php';
        $res = optimize_and_save_image($_FILES['cover_front_file'], 'book_front');
        if ($res['success']) {
            $cover_front = $res['path'];
        }
    }

    // Procesar subida de contratapa si se adjuntó archivo
    if (!empty($_FILES['cover_back_file']['name'])) {
        require_once __DIR__ . '/../config/media_helper.php';
        $res = optimize_and_save_image($_FILES['cover_back_file'], 'book_back');
        if ($res['success']) {
            $cover_back = $res['path'];
        }
    }

    $libro_data = [
        'id' => $id,
        'title' => $title,
        'subtitle' => $subtitle,
        'tab_label' => $tab_label,
        'badge' => $badge,
        'format' => $format,
        'pages' => $pages,
        'desc' => $desc,
        'buy_url' => $buy_url,
        'cover_front' => $cover_front,
        'cover_back' => $cover_back
    ];

    $found = false;
    foreach ($libros as $k => $l) {
        if ($l['id'] === $id) {
            $libros[$k] = $libro_data;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $libros[] = $libro_data;
    }

    save_json_data('libros.json', $libros);
    $msg = 'Libro guardado exitosamente.';
    $action = 'list';
}

// Duplicar Libro
if ($action === 'duplicate' && !empty($edit_id)) {
    foreach ($libros as $l) {
        if ($l['id'] === $edit_id) {
            $dup = $l;
            $dup['id'] = 'libro_' . time();
            $dup['title'] = $l['title'] . ' (Copia)';
            $dup['tab_label'] = $l['tab_label'] . ' (Copia)';
            $libros[] = $dup;
            save_json_data('libros.json', $libros);
            $msg = 'Libro duplicado con éxito.';
            break;
        }
    }
    $action = 'list';
}

// Eliminar Libro
if ($action === 'delete' && !empty($edit_id)) {
    $libros = array_values(array_filter($libros, function($l) use ($edit_id) {
        return $l['id'] !== $edit_id;
    }));
    save_json_data('libros.json', $libros);
    $msg = 'Libro eliminado con éxito.';
    $action = 'list';
}

$current_libro = null;
if ($action === 'edit' && !empty($edit_id)) {
    foreach ($libros as $l) {
        if ($l['id'] === $edit_id) {
            $current_libro = $l;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Libros | Panel de Administración</title>
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
                <a href="libros.php" class="admin-nav-item active">📚 Catálogo de Libros</a>
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
                <a href="update.php" class="admin-nav-item">🚀 Actualizar Sistema</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php#sinopsis" target="_blank" class="admin-nav-item">🌐 Ver Visor de Libros</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>📚 Gestor de Libros & Obras del Autor</h2>
                <?php if ($action === 'list'): ?>
                    <a href="libros.php?action=new" class="btn btn-admin-primary">+ Agregar Nuevo Libro</a>
                <?php else: ?>
                    <a href="libros.php" class="btn btn-admin-secondary">← Volver al Listado</a>
                <?php endif; ?>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'list'): ?>
                    <div class="admin-card">
                        <h3>Libros en Exhibición (Visor 3D y Sección Obras)</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                            Los libros aquí configurados se muestran automáticamente en el visor 3D interactivo y en las fichas de compra de la web oficial.
                        </p>

                        <div class="admin-table-wrapper">
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tapa Frontal</th>
                                        <th>Contratapa</th>
                                        <th>Título y Subtítulo</th>
                                        <th>Etiqueta Pestaña</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($libros as $l): ?>
                                        <tr>
                                            <td style="width: 80px;">
                                                <img src="../<?= e($l['cover_front']) ?>" alt="Tapa" style="width: 60px; height: 85px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);" onerror="this.src='../assets/book1_front.webp'">
                                            </td>
                                            <td style="width: 80px;">
                                                <img src="../<?= e($l['cover_back']) ?>" alt="Contratapa" style="width: 60px; height: 85px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);" onerror="this.src='../assets/book1_back.webp'">
                                            </td>
                                            <td>
                                                <strong style="font-size: 1rem; color: var(--text-primary);"><?= e($l['title']) ?></strong>
                                                <div style="font-size: 0.85rem; color: var(--accent-gold);"><?= e($l['subtitle']) ?></div>
                                                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;"><?= e($l['badge']) ?> · <?= e($l['format']) ?></div>
                                            </td>
                                            <td>
                                                <span class="badge" style="background: rgba(170, 125, 54, 0.15); color: var(--accent-gold); padding: 0.3rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                                                    <?= e($l['tab_label']) ?>
                                                </span>
                                            </td>
                                            <td>
                                                <div class="admin-actions">
                                                    <a href="libros.php?action=edit&id=<?= urlencode($l['id']) ?>" class="btn btn-action edit">✏️ Editar</a>
                                                    <a href="libros.php?action=duplicate&id=<?= urlencode($l['id']) ?>" class="btn btn-action duplicate">📋 Duplicar</a>
                                                    <a href="libros.php?action=delete&id=<?= urlencode($l['id']) ?>" class="btn btn-action delete" onclick="return confirm('¿Seguro que deseas eliminar este libro?');">🗑️</a>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                <?php else: ?>
                    <!-- Formulario de Creación / Edición de Libro -->
                    <div class="admin-card">
                        <h3><?= $action === 'new' ? '📖 Agregar Nuevo Libro' : '✏️ Editar Libro: ' . e($current_libro['title'] ?? '') ?></h3>
                        
                        <form method="POST" action="libros.php" enctype="multipart/form-data" class="admin-form">
                            <input type="hidden" name="id" value="<?= e($current_libro['id'] ?? '') ?>">
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="title">Título del Libro *</label>
                                    <input type="text" id="title" name="title" required value="<?= e($current_libro['title'] ?? '') ?>" placeholder="Ej: La Ruta del Samurái">
                                </div>
                                <div class="form-group">
                                    <label for="subtitle">Subtítulo</label>
                                    <input type="text" id="subtitle" name="subtitle" value="<?= e($current_libro['subtitle'] ?? '') ?>" placeholder="Ej: Japón para Budokas">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="tab_label">Etiqueta de Pestaña en Visor 3D *</label>
                                    <input type="text" id="tab_label" name="tab_label" required value="<?= e($current_libro['tab_label'] ?? '') ?>" placeholder="Ej: Tomo I: La Ruta del Samurái">
                                </div>
                                <div class="form-group">
                                    <label for="badge">Distintivo / Badge</label>
                                    <input type="text" id="badge" name="badge" value="<?= e($current_libro['badge'] ?? 'TOMO') ?>" placeholder="Ej: TOMO I, TOMO II o ENGLISH">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="format">Formato de Edición</label>
                                    <input type="text" id="format" name="format" value="<?= e($current_libro['format'] ?? 'Formato Libro & Ebook') ?>">
                                </div>
                                <div class="form-group">
                                    <label for="pages">Páginas / Especificaciones</label>
                                    <input type="text" id="pages" name="pages" value="<?= e($current_libro['pages'] ?? '320 páginas') ?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="desc">Descripción / Sinopsis del Libro</label>
                                <textarea id="desc" name="desc" rows="4"><?= e($current_libro['desc'] ?? '') ?></textarea>
                            </div>

                            <div class="form-group">
                                <label for="buy_url">Enlace Oficial de Compra (Budokan / Amazon / WhatsApp)</label>
                                <input type="url" id="buy_url" name="buy_url" value="<?= e($current_libro['buy_url'] ?? '') ?>" placeholder="https://...">
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="cover_front">Tapa Frontal (Ruta o Subir archivo)</label>
                                    <input type="text" id="cover_front" name="cover_front" value="<?= e($current_libro['cover_front'] ?? 'assets/book1_front.webp') ?>">
                                    <input type="file" name="cover_front_file" accept="image/*" style="margin-top: 6px;">
                                    <?php if (!empty($current_libro['cover_front'])): ?>
                                        <div style="margin-top: 8px;">
                                            <img src="../<?= e($current_libro['cover_front']) ?>" alt="Vista previa Tapa" style="height: 100px; border-radius: 4px; border: 1px solid var(--border-color);">
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <div class="form-group">
                                    <label for="cover_back">Contratapa (Ruta o Subir archivo)</label>
                                    <input type="text" id="cover_back" name="cover_back" value="<?= e($current_libro['cover_back'] ?? 'assets/book1_back.webp') ?>">
                                    <input type="file" name="cover_back_file" accept="image/*" style="margin-top: 6px;">
                                    <?php if (!empty($current_libro['cover_back'])): ?>
                                        <div style="margin-top: 8px;">
                                            <img src="../<?= e($current_libro['cover_back']) ?>" alt="Vista previa Contratapa" style="height: 100px; border-radius: 4px; border: 1px solid var(--border-color);">
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="submit" name="save_libro" class="btn btn-admin-primary">💾 Guardar Libro</button>
                                <a href="libros.php" class="btn btn-admin-secondary">Cancelar</a>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
</body>
</html>
