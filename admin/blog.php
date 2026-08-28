<?php
/**
 * PANEL ADMIN - GESTIÓN DE ARTÍCULOS DE BLOG
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$posts = get_json_data('blog.json', []);
$action = $_GET['action'] ?? 'list';
$msg = '';

if ($action === 'delete' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $posts = array_values(array_filter($posts, fn($item) => $item['id'] !== $id));
    save_json_data('blog.json', $posts);
    header('Location: blog.php?msg=deleted');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_post'])) {
    $id = !empty($_POST['id']) ? trim($_POST['id']) : 'post-' . time();
    $title = trim($_POST['title'] ?? '');
    $slug = !empty($_POST['slug']) ? trim($_POST['slug']) : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $author = trim($_POST['author'] ?? 'Jorge Orpianesi');
    $cover_image = trim($_POST['cover_image'] ?? 'photos/castillo_sengoku.webp');
    $created_at = !empty($_POST['created_at']) ? trim($_POST['created_at']) : date('Y-m-d');

    if (isset($_FILES['cover_file']) && $_FILES['cover_file']['error'] === UPLOAD_ERR_OK) {
        $ext = strtolower(pathinfo($_FILES['cover_file']['name'], PATHINFO_EXTENSION));
        if (in_array($ext, ['webp', 'jpg', 'jpeg', 'png'])) {
            $new_filename = 'blog_' . time() . '.' . $ext;
            $dest = ROOT_DIR . '/photos/' . $new_filename;
            if (move_uploaded_file($_FILES['cover_file']['tmp_name'], $dest)) {
                $cover_image = 'photos/' . $new_filename;
            }
        }
    }

    $existing_index = -1;
    foreach ($posts as $idx => $item) {
        if ($item['id'] === $id) {
            $existing_index = $idx;
            break;
        }
    }

    $post_data = [
        'id' => $id,
        'title' => $title,
        'slug' => $slug,
        'excerpt' => $excerpt,
        'content' => $content,
        'cover_image' => $cover_image,
        'author' => $author,
        'created_at' => $created_at
    ];

    if ($existing_index >= 0) {
        $posts[$existing_index] = $post_data;
    } else {
        array_unshift($posts, $post_data);
    }

    save_json_data('blog.json', $posts);
    header('Location: blog.php?msg=saved');
    exit;
}

if (isset($_GET['msg'])) {
    if ($_GET['msg'] === 'saved') $msg = 'Artículo guardado con éxito.';
    if ($_GET['msg'] === 'deleted') $msg = 'Artículo eliminado con éxito.';
}

$edit_item = null;
if ($action === 'edit' && isset($_GET['id'])) {
    foreach ($posts as $item) {
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
    <title>Gestión de Blog | Panel de Administración</title>
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
                <a href="blog.php" class="admin-nav-item active">📝 Artículos del Blog</a>
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
                <h2>Gestión de Artículos del Blog</h2>
                <a href="blog.php?action=new" class="btn btn-admin-primary">➕ Nuevo Artículo</a>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'new' || $action === 'edit'): ?>
                    <div class="admin-card">
                        <h3><?= $action === 'edit' ? 'Editar Artículo' : 'Crear Nuevo Artículo' ?></h3>
                        <form method="POST" action="blog.php" enctype="multipart/form-data" class="admin-form">
                            <input type="hidden" name="id" value="<?= e($edit_item['id'] ?? '') ?>">

                            <div class="form-group">
                                <label for="title">Título del Artículo *</label>
                                <input type="text" id="title" name="title" required value="<?= e($edit_item['title'] ?? '') ?>" placeholder="Ej: La Filosofía del Bushido en el Siglo XXI">
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="slug">Slug / URL Amigable (Opcional)</label>
                                    <input type="text" id="slug" name="slug" value="<?= e($edit_item['slug'] ?? '') ?>" placeholder="la-filosofia-del-bushido">
                                </div>
                                <div class="form-group">
                                    <label for="author">Autor</label>
                                    <input type="text" id="author" name="author" value="<?= e($edit_item['author'] ?? 'Jorge Orpianesi') ?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="excerpt">Resumen / Bajada (Extracto para listados) *</label>
                                <textarea id="excerpt" name="excerpt" rows="2" required placeholder="Breve introducción que motive a leer..."><?= e($edit_item['excerpt'] ?? '') ?></textarea>
                            </div>

                            <div class="form-group">
                                <label for="content">Contenido Completo (HTML permitido) *</label>
                                <textarea id="content" name="content" rows="10" required placeholder="<p>Escribe aquí el contenido del artículo...</p>"><?= e($edit_item['content'] ?? '') ?></textarea>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="cover_file">Subir Imagen de Portada</label>
                                    <input type="file" id="cover_file" name="cover_file" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <label for="cover_image">O Ruta de Imagen Existente</label>
                                    <input type="text" id="cover_image" name="cover_image" value="<?= e($edit_item['cover_image'] ?? 'photos/cueva_reigando.webp') ?>">
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="submit" name="save_post" class="btn btn-admin-primary">Guardar Artículo</button>
                                <a href="blog.php" class="btn btn-admin-secondary">Cancelar</a>
                            </div>
                        </form>
                    </div>
                <?php endif; ?>

                <div class="admin-card">
                    <h3>Listado de Publicaciones (<?= count($posts) ?>)</h3>
                    <div class="table-responsive">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Portada</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($posts as $post): ?>
                                    <tr>
                                        <td>
                                            <img src="../<?= e($post['cover_image']) ?>" alt="Portada" class="table-thumb" onerror="this.style.display='none'">
                                        </td>
                                        <td>
                                            <strong><?= e($post['title']) ?></strong><br>
                                            <small><a href="../blog.php?slug=<?= urlencode($post['slug']) ?>" target="_blank" class="table-preview-link">🔗 Ver en web pública</a></small>
                                        </td>
                                        <td><?= e($post['author'] ?? 'Jorge Orpianesi') ?></td>
                                        <td><?= e($post['created_at']) ?></td>
                                        <td class="table-actions">
                                            <a href="blog.php?action=edit&id=<?= urlencode($post['id']) ?>" class="btn-sm btn-edit">Editar</a>
                                            <a href="blog.php?action=delete&id=<?= urlencode($post['id']) ?>" class="btn-sm btn-delete" onclick="return confirm('¿Eliminar este artículo?');">Eliminar</a>
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
