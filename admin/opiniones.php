<?php
/**
 * PANEL ADMIN - GESTIÓN DE OPINIONES DE LECTORES
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$opiniones = get_json_data('opiniones.json', []);
$action = $_GET['action'] ?? 'list';
$msg = '';
$error = '';

// 1. Procesar Eliminación
if ($action === 'delete' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $opiniones = array_values(array_filter($opiniones, fn($item) => $item['id'] !== $id));
    save_json_data('opiniones.json', $opiniones);
    header('Location: opiniones.php?msg=deleted');
    exit;
}

// 2. Procesar Guardado (Crear o Editar)
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

    // Procesar subida de archivo si existe
    if (isset($_FILES['photo_file']) && $_FILES['photo_file']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['photo_file']['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['webp', 'jpg', 'jpeg', 'png'])) {
            $new_filename = 'reader_' . time() . '.' . $ext;
            $dest = ROOT_DIR . '/photos/' . $new_filename;
            if (move_uploaded_file($_FILES['photo_file']['tmp_name'], $dest)) {
                $photo = 'photos/' . $new_filename;
                $type = 'photo';
            }
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
                <a href="opiniones.php" class="admin-nav-item active">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Gestión de Opiniones de Lectores</h2>
                <a href="opiniones.php?action=new" class="btn btn-admin-primary">➕ Nueva Opinión</a>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'new' || $action === 'edit'): ?>
                    <!-- Formulario de Creación / Edición -->
                    <div class="admin-card">
                        <h3><?= $action === 'edit' ? 'Editar Opinión de Lector' : 'Agregar Nueva Opinión de Lector' ?></h3>
                        <form method="POST" action="opiniones.php" enctype="multipart/form-data" class="admin-form">
                            <input type="hidden" name="id" value="<?= e($edit_item['id'] ?? '') ?>">
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name">Nombre del Lector / Sensei *</label>
                                    <input type="text" id="name" name="name" required value="<?= e($edit_item['name'] ?? '') ?>" placeholder="Ej: Sensei Carlos Benítez">
                                </div>
                                <div class="form-group">
                                    <label for="role">Rol / Dojo / Ciudad *</label>
                                    <input type="text" id="role" name="role" required value="<?= e($edit_item['role'] ?? '') ?>" placeholder="Ej: 5° Dan Karate-Do, Córdoba">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="type">Tipo de Opinión</label>
                                    <select id="type" name="type">
                                        <option value="text" <?= ($edit_item['type'] ?? '') === 'text' ? 'selected' : '' ?>>✍️ Reseña Literaria (Solo Texto)</option>
                                        <option value="photo" <?= ($edit_item['type'] ?? '') === 'photo' ? 'selected' : '' ?>>📸 Con Foto del Lector / Libro</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="rating">Calificación (Estrellas)</label>
                                    <select id="rating" name="rating">
                                        <option value="5" <?= ($edit_item['rating'] ?? 5) == 5 ? 'selected' : '' ?>>★★★★★ (5 Estrellas)</option>
                                        <option value="4" <?= ($edit_item['rating'] ?? 5) == 4 ? 'selected' : '' ?>>★★★★☆ (4 Estrellas)</option>
                                        <option value="3" <?= ($edit_item['rating'] ?? 5) == 3 ? 'selected' : '' ?>>★★★☆☆ (3 Estrellas)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="text">Texto de la Opinión / Testimonio *</label>
                                <textarea id="text" name="text" rows="4" required placeholder="Escribe la reseña o comentario del lector..."><?= e($edit_item['text'] ?? '') ?></textarea>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="photo_file">Subir Foto del Lector (WebP / JPG / PNG)</label>
                                    <input type="file" id="photo_file" name="photo_file" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <label for="photo">O Ruta de Foto Existente</label>
                                    <input type="text" id="photo" name="photo" value="<?= e($edit_item['photo'] ?? '') ?>" placeholder="photos/foto.webp">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="photo_title">Título / Pie de Foto (Opcional)</label>
                                    <input type="text" id="photo_title" name="photo_title" value="<?= e($edit_item['photo_title'] ?? '') ?>" placeholder="Ej: Lectura en el Dojo">
                                </div>
                                <div class="form-group checkbox-group">
                                    <label>
                                        <input type="checkbox" name="verified" value="1" <?= !empty($edit_item['verified']) ? 'checked' : '' ?>>
                                        Mostrar distintivo "✓ Lector Verificado"
                                    </label>
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="submit" name="save_opinion" class="btn btn-admin-primary">Guardar Opinión</button>
                                <a href="opiniones.php" class="btn btn-admin-secondary">Cancelar</a>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>

                <!-- Listado de Opiniones -->
                <div class="admin-card">
                    <h3>Listado de Opiniones Publicadas (<?= count($opiniones) ?>)</h3>
                    <div class="table-responsive">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Lector</th>
                                    <th>Tipo</th>
                                    <th>Calificación</th>
                                    <th>Foto</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($opiniones as $rev): ?>
                                    <tr>
                                        <td>
                                            <strong><?= e($rev['name']) ?></strong><br>
                                            <small><?= e($rev['role']) ?></small>
                                        </td>
                                        <td><span class="badge badge-<?= $rev['type'] ?>"><?= $rev['type'] === 'photo' ? 'Foto' : 'Texto' ?></span></td>
                                        <td><?= str_repeat('★', (int)$rev['rating']) ?></td>
                                        <td>
                                            <?php if (!empty($rev['photo'])): ?>
                                                <img src="../<?= e($rev['photo']) ?>" alt="Foto" class="table-thumb" onerror="this.style.display='none'">
                                            <?php else: ?>
                                                <span class="text-muted">—</span>
                                            <?php endif; ?>
                                        </td>
                                        <td><?= e($rev['date']) ?></td>
                                        <td class="table-actions">
                                            <a href="opiniones.php?action=edit&id=<?= urlencode($rev['id']) ?>" class="btn-sm btn-edit">Editar</a>
                                            <a href="opiniones.php?action=delete&id=<?= urlencode($rev['id']) ?>" class="btn-sm btn-delete" onclick="return confirm('¿Eliminar esta opinión?');">Eliminar</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
