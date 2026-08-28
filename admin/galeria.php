<?php
/**
 * PANEL ADMIN - GESTIÓN DE GALERÍA FOTOGRÁFICA
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$galeria = get_json_data('galeria.json', []);
$action = $_GET['action'] ?? 'list';
$msg = '';

if ($action === 'delete' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $galeria = array_values(array_filter($galeria, fn($item) => $item['id'] !== $id));
    save_json_data('galeria.json', $galeria);
    header('Location: galeria.php?msg=deleted');
    exit;
}

if ($action === 'duplicate' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $target = null;
    foreach ($galeria as $item) {
        if ($item['id'] === $id) {
            $target = $item;
            break;
        }
    }
    if ($target) {
        $copy = $target;
        $copy['id'] = 'gal-' . time();
        $copy['title'] = $target['title'] . ' (Copia)';
        array_unshift($galeria, $copy);
        save_json_data('galeria.json', $galeria);
        header('Location: galeria.php?msg=duplicated');
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_galeria'])) {
    $id = !empty($_POST['id']) ? trim($_POST['id']) : 'gal-' . time();
    $title = trim($_POST['title'] ?? '');
    $tag = trim($_POST['tag'] ?? 'Patrimonio Histórico');
    $image = trim($_POST['image'] ?? '');
    $fallback = trim($_POST['fallback'] ?? 'photos/castillo_sengoku.webp');

    if (isset($_FILES['photo_file']) && $_FILES['photo_file']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['photo_file']['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['webp', 'jpg', 'jpeg', 'png'])) {
            $new_filename = 'gal_' . time() . '.' . $ext;
            $dest = ROOT_DIR . '/photos/' . $new_filename;
            if (move_uploaded_file($_FILES['photo_file']['tmp_name'], $dest)) {
                $image = 'photos/' . $new_filename;
            }
        }
    }

    $existing_index = -1;
    foreach ($galeria as $idx => $item) {
        if ($item['id'] === $id) {
            $existing_index = $idx;
            break;
        }
    }

    $item_data = [
        'id' => $id,
        'title' => $title,
        'tag' => $tag,
        'image' => $image,
        'fallback' => $fallback
    ];

    if ($existing_index >= 0) {
        $galeria[$existing_index] = $item_data;
    } else {
        array_unshift($galeria, $item_data);
    }

    save_json_data('galeria.json', $galeria);
    header('Location: galeria.php?msg=saved');
    exit;
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'saved') $msg = 'Fotografía guardada con éxito.';
    if ($_GET['msg'] === 'deleted') $msg = 'Fotografía eliminada con éxito.';
}

$edit_item = null;
if ($action === 'edit' && isset($_GET['id'])) {
    foreach ($galeria as $item) {
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
    <title>Gestión de Galería | Panel de Administración</title>
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
                <a href="galeria.php" class="admin-nav-item active">🖼️ Galería de Fotos</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Gestión de Galería de Fotos</h2>
                <a href="galeria.php?action=new" class="btn btn-admin-primary">➕ Subir Foto</a>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'new' || $action === 'edit'): ?>
                    <div class="admin-card">
                        <h3><?= $action === 'edit' ? 'Editar Fotografía' : 'Agregar Fotografía a la Galería' ?></h3>
                        <form method="POST" action="galeria.php" enctype="multipart/form-data" class="admin-form">
                            <input type="hidden" name="id" value="<?= e($edit_item['id'] ?? '') ?>">

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="title">Título / Lugar Histórico *</label>
                                    <input type="text" id="title" name="title" required value="<?= e($edit_item['title'] ?? '') ?>" placeholder="Ej: Castillo de Himeji y Fortalezas">
                                </div>
                                <div class="form-group">
                                    <label for="tag">Categoría / Etiqueta</label>
                                    <input type="text" id="tag" name="tag" value="<?= e($edit_item['tag'] ?? 'Patrimonio Histórico') ?>" placeholder="Ej: Naturaleza & Zen">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="photo_file">Subir Archivo de Imagen</label>
                                    <input type="file" id="photo_file" name="photo_file" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <label for="image">O Ruta de Imagen</label>
                                    <input type="text" id="image" name="image" value="<?= e($edit_item['image'] ?? '') ?>" placeholder="photos/foto.webp">
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="submit" name="save_galeria" class="btn btn-admin-primary">Guardar en Galería</button>
                                <a href="galeria.php" class="btn btn-admin-secondary">Cancelar</a>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>

                <div class="admin-card">
                    <h3>Fotografías Publicadas (<?= count($galeria) ?>)</h3>
                    <div class="admin-gallery-grid">
                        <?php foreach ($galeria as $item): ?>
                            <div class="admin-gallery-item">
                                <img src="../<?= e($item['image']) ?>" alt="<?= e($item['title']) ?>" class="admin-gallery-thumb" onerror="this.src='../photos/castillo_sengoku.webp'">
                                <div class="admin-gallery-info">
                                    <span class="badge badge-tag"><?= e($item['tag'] ?? 'Japón') ?></span>
                                    <h4><?= e($item['title']) ?></h4>
                                    <div class="admin-gallery-actions">
                                        <a href="galeria.php?action=duplicate&id=<?= urlencode($item['id']) ?>" class="btn-sm btn-edit" title="Duplicar">📑 Duplicar</a>
                                        <a href="galeria.php?action=edit&id=<?= urlencode($item['id']) ?>" class="btn-sm btn-edit">Editar</a>
                                        <a href="galeria.php?action=delete&id=<?= urlencode($item['id']) ?>" class="btn-sm btn-delete" onclick="return confirm('¿Eliminar esta fotografía?');">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
