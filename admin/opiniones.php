<?php
/**
 * PANEL ADMIN - GESTIÓN DE OPINIONES DE LECTORES
 * Con función para duplicar testimonios y fotos de lectores
 */
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/media_helper.php';
require_admin_auth();

$opiniones = get_json_data('opiniones.json', []);
$action = $_GET['action'] ?? 'list';
$msg = '';
$error = '';

// 1. Eliminar Opinión
if ($action === 'delete' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $opiniones = array_values(array_filter($opiniones, fn($item) => $item['id'] !== $id));
    save_json_data('opiniones.json', $opiniones);
    header('Location: opiniones.php?msg=deleted');
    exit;
}

// 2. Duplicar Opinión
if ($action === 'duplicate' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $target = null;
    foreach ($opiniones as $item) {
        if ($item['id'] === $id) {
            $target = $item;
            break;
        }
    }
    if ($target) {
        $copy = $target;
        $timestamp = time();
        $copy['id'] = 'rev-' . $timestamp;
        $copy['name'] = $target['name'] . ' (Copia)';
        $copy['date'] = date('Y-m-d');
        array_unshift($opiniones, $copy);
        save_json_data('opiniones.json', $opiniones);
        header('Location: opiniones.php?msg=duplicated');
        exit;
    }
}

// 3. Guardar / Editar Opinión
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_opinion'])) {
    $id = !empty($_POST['id']) ? trim($_POST['id']) : 'rev-' . time();
    $name = trim($_POST['name'] ?? '');
    $role = trim($_POST['role'] ?? '');
    $type = trim($_POST['type'] ?? 'text');
    $rating = (int)($_POST['rating'] ?? 5);
    $text = trim($_POST['text'] ?? '');
    $photo = trim($_POST['photo'] ?? '');
    $photo_title = trim($_POST['photo_title'] ?? '');
    $verified = isset($_POST['verified']);
    $date = !empty($_POST['date']) ? trim($_POST['date']) : date('Y-m-d');

    if (isset($_FILES['photo_file']) && $_FILES['photo_file']['error'] === UPLOAD_ERR_OK) {
        $saved = optimize_and_save_image($_FILES['photo_file'], 'lector', 1200, 85);
        if ($saved) {
            $photo = $saved;
            $type = 'photo';
        }
    }

    $existing_index = -1;
    foreach ($opiniones as $idx => $item) {
        if ($item['id'] === $id) {
            $existing_index = $idx;
            break;
        }
    }

    $opinion_data = [
        'id' => $id,
        'name' => $name,
        'role' => $role,
        'type' => $type,
        'avatar' => 'assets/orpianesi1.webp',
        'photo' => $photo,
        'photo_title' => $photo_title,
        'rating' => $rating,
        'text' => $text,
        'date' => $date,
        'verified' => $verified
    ];

    if ($existing_index >= 0) {
        $opiniones[$existing_index] = $opinion_data;
    } else {
        array_unshift($opiniones, $opinion_data);
    }

    save_json_data('opiniones.json', $opiniones);
    header('Location: opiniones.php?msg=saved');
    exit;
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'saved') $msg = 'Opinión guardada con éxito.';
    if ($_GET['msg'] === 'deleted') $msg = 'Opinión eliminada con éxito.';
    if ($_GET['msg'] === 'duplicated') $msg = 'Opinión duplicada con éxito como nueva copia editable.';
}

$edit_item = null;
if ($action === 'edit' && isset($_GET['id'])) {
    foreach ($opiniones as $item) {
        if ($item['id'] === $_GET['id']) {
            $edit_item = $item;
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
    <title>Gestión de Opiniones | Panel de Administración</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=3.0">
    <style>
        .btn-duplicate {
            background: rgba(197, 168, 128, 0.15);
            color: var(--admin-gold);
            border: 1px solid rgba(197, 168, 128, 0.3);
        }
        .btn-duplicate:hover {
            background: rgba(197, 168, 128, 0.3);
            color: #ffffff;
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
                <a href="libros.php" class="admin-nav-item">📚 Catálogo de Libros</a>
                <a href="opiniones.php" class="admin-nav-item active">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
                <a href="backups.php" class="admin-nav-item">💾 Copias de Seguridad</a>
                <a href="update.php" class="admin-nav-item">🚀 Actualizar Sistema</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Gestión de Opiniones y Reseñas</h2>
                <div class="admin-user-info">
                    <span>Administrador</span>
                </div>
            </header>

            <div class="admin-content">
                <?php if ($msg): ?>
                    <div class="admin-alert success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'new' || $action === 'edit'): ?>
                    <!-- FORMULARIO CREAR / EDITAR -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3><?= $action === 'edit' ? 'Editar Opinión' : 'Nueva Opinión de Lector' ?></h3>
                            <a href="opiniones.php" class="btn btn-secondary btn-sm">← Volver al Listado</a>
                        </div>
                        <div class="admin-card-body">
                            <form action="opiniones.php" method="POST" enctype="multipart/form-data" class="admin-form">
                                <input type="hidden" name="id" value="<?= e($edit_item['id'] ?? '') ?>">

                                <div class="form-row">
                                    <div class="form-group flex-2">
                                        <label for="name">Nombre del Lector *</label>
                                        <input type="text" id="name" name="name" required value="<?= e($edit_item['name'] ?? '') ?>" placeholder="Ej: Sensei Carlos Medina">
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="role">Subtítulo / Profesión / Ubicación</label>
                                        <input type="text" id="role" name="role" value="<?= e($edit_item['role'] ?? 'Lector Verificado') ?>" placeholder="Ej: 5° Dan Iaido, Buenos Aires">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group flex-1">
                                        <label for="type">Tipo de Tarjeta</label>
                                        <select id="type" name="type">
                                            <option value="text" <?= ($edit_item['type'] ?? '') === 'text' ? 'selected' : '' ?>>✍️ Reseña Escrita (Tarjeta Estándar)</option>
                                            <option value="photo" <?= ($edit_item['type'] ?? '') === 'photo' ? 'selected' : '' ?>>📸 Con Fotografía (Tarjeta Destacada)</option>
                                        </select>
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="rating">Calificación en Estrellas</label>
                                        <select id="rating" name="rating">
                                            <option value="5" <?= ($edit_item['rating'] ?? 5) == 5 ? 'selected' : '' ?>>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                                            <option value="4" <?= ($edit_item['rating'] ?? 5) == 4 ? 'selected' : '' ?>>⭐⭐⭐⭐ (4 Estrellas)</option>
                                            <option value="3" <?= ($edit_item['rating'] ?? 5) == 3 ? 'selected' : '' ?>>⭐⭐⭐ (3 Estrellas)</option>
                                        </select>
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="date">Fecha</label>
                                        <input type="date" id="date" name="date" value="<?= e($edit_item['date'] ?? date('Y-m-d')) ?>">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="text">Texto del Testimonio / Reseña *</label>
                                    <textarea id="text" name="text" rows="4" required placeholder="Escribe el testimonio que dio el lector sobre el libro..."><?= e($edit_item['text'] ?? '') ?></textarea>
                                </div>

                                <div class="form-row">
                                    <div class="form-group flex-2">
                                        <label for="photo">Ruta de Foto del Lector (Opcional)</label>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <input type="text" id="photo" name="photo" value="<?= e($edit_item['photo'] ?? '') ?>" placeholder="photos/lector_ejemplo.webp" style="flex:1;">
                                            <button type="button" class="btn btn-secondary btn-sm" id="btn-pick-photo-media" style="white-space: nowrap;">📁 Elegir de Medios</button>
                                        </div>
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="photo_file">O Subir Nueva Foto</label>
                                        <input type="file" id="photo_file" name="photo_file" accept=".webp,.jpg,.jpeg,.png">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="photo_title">Título / Pie de Foto (para fotos de lectores)</label>
                                    <input type="text" id="photo_title" name="photo_title" value="<?= e($edit_item['photo_title'] ?? '') ?>" placeholder="Ej: Lector disfrutando el Tomo I en Japón">
                                </div>

                                <div class="form-group">
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="verified" value="1" <?= (!isset($edit_item) || !empty($edit_item['verified'])) ? 'checked' : '' ?>>
                                        <span>Mostrar insignia oficial de <strong>"Compra Verificada"</strong></span>
                                    </label>
                                </div>

                                <div class="form-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                                    <button type="submit" name="save_opinion" class="btn btn-primary">💾 Guardar Opinión</button>
                                    <a href="opiniones.php" class="btn btn-secondary">Cancelar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                <?php else: ?>
                    <!-- LISTADO DE OPINIONES CON ACCIÓN DUPLICAR -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3>Opiniones Registradas (<?= count($opiniones) ?>)</h3>
                            <a href="opiniones.php?action=new" class="btn btn-primary btn-sm">+ Nueva Opinión</a>
                        </div>
                        <div class="admin-card-body p-0">
                            <div class="table-responsive">
                                <table class="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Lector</th>
                                            <th>Tipo</th>
                                            <th>Valoración</th>
                                            <th>Testimonio</th>
                                            <th>Fecha</th>
                                            <th class="text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($opiniones)): ?>
                                            <tr>
                                                <td colspan="6" class="text-center py-4">No hay opiniones registradas todavía.</td>
                                            </tr>
                                        <?php else: ?>
                                            <?php foreach ($opiniones as $item): ?>
                                                <tr>
                                                    <td>
                                                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                                                            <?php if (!empty($item['photo'])): ?>
                                                                <img src="../<?= e($item['photo']) ?>" alt="Foto" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" onerror="this.src='../photos/review_juan.webp'">
                                                            <?php else: ?>
                                                                <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: var(--admin-gold);">✍️</div>
                                                            <?php endif; ?>
                                                            <div>
                                                                <strong><?= e($item['name']) ?></strong>
                                                                <div style="font-size: 0.75rem; color: var(--admin-text-muted);"><?= e($item['role'] ?? '') ?></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="badge <?= ($item['type'] ?? '') === 'photo' ? 'badge-primary' : 'badge-secondary' ?>">
                                                            <?= ($item['type'] ?? '') === 'photo' ? '📸 Foto' : '✍️ Escrita' ?>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style="color: #fbbf24;"><?= str_repeat('★', (int)($item['rating'] ?? 5)) ?></span>
                                                    </td>
                                                    <td>
                                                        <p style="font-size: 0.85rem; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0;">
                                                            <?= e($item['text']) ?>
                                                        </p>
                                                    </td>
                                                    <td><?= format_date($item['date'] ?? '') ?></td>
                                                    <td class="text-right">
                                                        <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                                                            <a href="opiniones.php?action=duplicate&id=<?= urlencode($item['id']) ?>" class="btn btn-duplicate btn-xs" title="Duplicar este testimonio">📑 Duplicar</a>
                                                            <a href="opiniones.php?action=edit&id=<?= urlencode($item['id']) ?>" class="btn btn-secondary btn-xs" title="Editar">✏️</a>
                                                            <a href="opiniones.php?action=delete&id=<?= urlencode($item['id']) ?>" class="btn btn-danger btn-xs" onclick="return confirm('¿Estás seguro de eliminar esta opinión?');" title="Eliminar">🗑️</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const btnPick = document.getElementById('btn-pick-photo-media');
            const photoInput = document.getElementById('photo');
            const typeSelect = document.getElementById('type');
            if (btnPick && photoInput) {
                btnPick.addEventListener('click', () => {
                    openMediaPicker((path) => {
                        photoInput.value = path;
                        if (typeSelect) typeSelect.value = 'photo';
                    });
                });
            }
        });
    </script>

    <?php include __DIR__ . '/media_modal.php'; ?>
</body>
</html>
