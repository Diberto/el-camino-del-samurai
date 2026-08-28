<?php
/**
 * PANEL ADMIN - GESTIÓN DE ARTÍCULOS DE BLOG
 * Con Editor WYSIWYG interactivo y función para duplicar artículos
 */
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/media_helper.php';
require_admin_auth();

$posts = get_json_data('blog.json', []);
$action = $_GET['action'] ?? 'list';
$msg = '';

// 1. Eliminar Artículo
if ($action === 'delete' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $posts = array_values(array_filter($posts, fn($item) => $item['id'] !== $id));
    save_json_data('blog.json', $posts);
    header('Location: blog.php?msg=deleted');
    exit;
}

// 2. Duplicar Artículo
if ($action === 'duplicate' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $target = null;
    foreach ($posts as $item) {
        if ($item['id'] === $id) {
            $target = $item;
            break;
        }
    }
    if ($target) {
        $copy = $target;
        $timestamp = time();
        $copy['id'] = 'post-' . $timestamp;
        $copy['title'] = $target['title'] . ' (Copia)';
        $copy['slug'] = $target['slug'] . '-copia-' . substr($timestamp, -4);
        $copy['created_at'] = date('Y-m-d');
        array_unshift($posts, $copy);
        save_json_data('blog.json', $posts);
        header('Location: blog.php?msg=duplicated');
        exit;
    }
}

// 3. Guardar / Editar Artículo
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
        $saved = optimize_and_save_image($_FILES['cover_file'], 'blog', 1920, 85);
        if ($saved) {
            $cover_image = $saved;
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
    if ($_GET['msg'] === 'duplicated') $msg = 'Artículo duplicado con éxito como copia editable.';
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
    <link rel="stylesheet" href="../css/admin.css?v=3.0">
    
    <!-- Quill.js WYSIWYG Editor CDN -->
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <style>
        .ql-toolbar.ql-snow {
            background: #1c2130;
            border-color: rgba(255,255,255,0.12) !important;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }
        .ql-container.ql-snow {
            background: #11141e;
            border-color: rgba(255,255,255,0.12) !important;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            color: #f3f4f6;
            font-family: var(--font-body);
            font-size: 1rem;
            min-height: 280px;
        }
        .ql-snow .ql-stroke {
            stroke: #cbd5e1 !important;
        }
        .ql-snow .ql-fill {
            fill: #cbd5e1 !important;
        }
        .ql-snow .ql-picker {
            color: #cbd5e1 !important;
        }
        .ql-snow .ql-picker-options {
            background-color: #1c2130 !important;
            border-color: rgba(255,255,255,0.15) !important;
        }
        .ql-editor {
            min-height: 280px;
            line-height: 1.7;
        }
        .ql-editor p {
            margin-bottom: 1rem;
        }
        .ql-editor blockquote {
            border-left: 4px solid var(--admin-gold);
            padding-left: 1rem;
            font-style: italic;
            color: #cbd5e1;
        }
        .btn-duplicate {
            background: rgba(197, 168, 128, 0.15);
            color: var(--admin-gold);
            border: 1px solid rgba(197, 168, 128, 0.3);
        }
        .btn-duplicate:hover {
            background: rgba(197, 168, 128, 0.3);
            color: #ffffff;
        }
        .code-toggle-bar {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0.5rem;
        }
        .btn-toggle-view {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.15);
            color: var(--admin-text-muted);
            padding: 0.25rem 0.6rem;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
        }
        .btn-toggle-view:hover {
            color: #ffffff;
            border-color: var(--admin-primary);
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
                <a href="blog.php" class="admin-nav-item active">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
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
                <div class="admin-user-info">
                    <span>Administrador</span>
                </div>
            </header>

            <div class="admin-content">
                <?php if ($msg): ?>
                    <div class="admin-alert success"><?= e($msg) ?></div>
                <?php endif; ?>

                <?php if ($action === 'new' || $action === 'edit'): ?>
                    <!-- FORMULARIO CREAR / EDITAR CON WYSIWYG -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3><?= $action === 'edit' ? 'Editar Artículo' : 'Nuevo Artículo' ?></h3>
                            <a href="blog.php" class="btn btn-secondary btn-sm">← Volver al Listado</a>
                        </div>
                        <div class="admin-card-body">
                            <form action="blog.php" method="POST" enctype="multipart/form-data" class="admin-form" id="post-form">
                                <input type="hidden" name="id" value="<?= e($edit_item['id'] ?? '') ?>">

                                <div class="form-row">
                                    <div class="form-group flex-2">
                                        <label for="title">Título del Artículo *</label>
                                        <input type="text" id="title" name="title" required value="<?= e($edit_item['title'] ?? '') ?>" placeholder="Ej: La Filosofía del Bushido en el Siglo XXI">
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="created_at">Fecha de Publicación</label>
                                        <input type="date" id="created_at" name="created_at" value="<?= e($edit_item['created_at'] ?? date('Y-m-d')) ?>">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group flex-1">
                                        <label for="slug">Slug URL (Opcional, autogenerado)</label>
                                        <input type="text" id="slug" name="slug" value="<?= e($edit_item['slug'] ?? '') ?>" placeholder="ej: la-filosofia-del-bushido">
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="author">Autor</label>
                                        <input type="text" id="author" name="author" value="<?= e($edit_item['author'] ?? 'Jorge Orpianesi') ?>">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="excerpt">Resumen / Extracto Corto (para tarjetas en portada y listados)</label>
                                    <textarea id="excerpt" name="excerpt" rows="2" placeholder="Breve introducción que enganche al lector..."><?= e($edit_item['excerpt'] ?? '') ?></textarea>
                                </div>

                                <!-- EDITOR WYSIWYG COMPLETO -->
                                <div class="form-group">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap; gap: 0.5rem;">
                                        <label style="margin:0;">Cuerpo del Artículo (Editor Visual WYSIWYG) *</label>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <button type="button" class="btn-toggle-view" id="btn-insert-media-quill" style="background: rgba(197, 168, 128, 0.15); color: var(--admin-gold); border-color: rgba(197, 168, 128, 0.3);">
                                                🖼️ Insertar Foto de la Biblioteca
                                            </button>
                                            <button type="button" class="btn-toggle-view" id="btn-toggle-code" title="Alternar entre modo visual y código HTML">
                                                &lt;/&gt; Ver Código HTML
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <!-- Contenedor del Editor Quill -->
                                    <div id="quill-editor"><?= $edit_item['content'] ?? '<p>Escribe aquí el contenido del artículo...</p>' ?></div>
                                    
                                    <!-- Textarea oculta que se sincroniza al enviar -->
                                    <textarea name="content" id="content-hidden" style="display: none;"><?= e($edit_item['content'] ?? '') ?></textarea>
                                </div>

                                <div class="form-row">
                                    <div class="form-group flex-2">
                                        <label for="cover_image">Ruta de Imagen de Portada</label>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <input type="text" id="cover_image" name="cover_image" value="<?= e($edit_item['cover_image'] ?? 'photos/castillo_sengoku.webp') ?>" style="flex:1;">
                                            <button type="button" class="btn btn-secondary btn-sm" id="btn-pick-cover-media" style="white-space: nowrap;">📁 Elegir de Medios</button>
                                        </div>
                                    </div>
                                    <div class="form-group flex-1">
                                        <label for="cover_file">O Subir Nueva Imagen</label>
                                        <input type="file" id="cover_file" name="cover_file" accept=".webp,.jpg,.jpeg,.png">
                                    </div>
                                </div>

                                <div class="form-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                                    <button type="submit" name="save_post" class="btn btn-primary">💾 Guardar Artículo</button>
                                    <a href="blog.php" class="btn btn-secondary">Cancelar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                <?php else: ?>
                    <!-- LISTADO DE ARTÍCULOS CON ACCIÓN DUPLICAR -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3>Artículos Publicados (<?= count($posts) ?>)</h3>
                            <a href="blog.php?action=new" class="btn btn-primary btn-sm">+ Nuevo Artículo</a>
                        </div>
                        <div class="admin-card-body p-0">
                            <div class="table-responsive">
                                <table class="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Portada</th>
                                            <th>Título</th>
                                            <th>Autor</th>
                                            <th>Fecha</th>
                                            <th>URL / Slug</th>
                                            <th class="text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($posts)): ?>
                                            <tr>
                                                <td colspan="6" class="text-center py-4">No hay artículos publicados todavía.</td>
                                            </tr>
                                        <?php else: ?>
                                            <?php foreach ($posts as $item): ?>
                                                <tr>
                                                    <td>
                                                        <img src="../<?= e($item['cover_image'] ?? 'photos/castillo_sengoku.webp') ?>" alt="Portada" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" onerror="this.src='../photos/castillo_sengoku.webp'">
                                                    </td>
                                                    <td>
                                                        <strong><?= e($item['title']) ?></strong>
                                                    </td>
                                                    <td><?= e($item['author'] ?? 'Jorge Orpianesi') ?></td>
                                                    <td><?= format_date($item['created_at']) ?></td>
                                                    <td><code style="font-size: 0.8rem; color: var(--admin-gold);"><?= e($item['slug']) ?></code></td>
                                                    <td class="text-right">
                                                        <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                                                            <a href="../blog.php?slug=<?= urlencode($item['slug']) ?>" target="_blank" class="btn btn-secondary btn-xs" title="Ver en la web">👁️</a>
                                                            <a href="blog.php?action=duplicate&id=<?= urlencode($item['id']) ?>" class="btn btn-duplicate btn-xs" title="Duplicar este artículo">📑 Duplicar</a>
                                                            <a href="blog.php?action=edit&id=<?= urlencode($item['id']) ?>" class="btn btn-secondary btn-xs" title="Editar">✏️</a>
                                                            <a href="blog.php?action=delete&id=<?= urlencode($item['id']) ?>" class="btn btn-danger btn-xs" onclick="return confirm('¿Estás seguro de eliminar este artículo?');" title="Eliminar">🗑️</a>
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

    <!-- Quill.js WYSIWYG Init Script -->
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const quillContainer = document.getElementById('quill-editor');
            const hiddenTextarea = document.getElementById('content-hidden');
            const postForm = document.getElementById('post-form');
            const btnToggleCode = document.getElementById('btn-toggle-code');

            if (quillContainer && hiddenTextarea && postForm) {
                const quill = new Quill('#quill-editor', {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ 'header': [2, 3, 4, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link', 'image', 'video'],
                            ['clean']
                        ]
                    },
                    placeholder: 'Escribe y diseña el artículo aquí con formato enriquecido...'
                });

                let isCodeView = false;
                if (btnToggleCode) {
                    btnToggleCode.addEventListener('click', () => {
                        isCodeView = !isCodeView;
                        if (isCodeView) {
                            hiddenTextarea.value = quill.root.innerHTML;
                            hiddenTextarea.style.display = 'block';
                            hiddenTextarea.style.width = '100%';
                            hiddenTextarea.style.minHeight = '280px';
                            hiddenTextarea.style.background = '#11141e';
                            hiddenTextarea.style.color = '#a5f3fc';
                            hiddenTextarea.style.fontFamily = 'monospace';
                            hiddenTextarea.style.padding = '1rem';
                            hiddenTextarea.style.border = '1px solid rgba(255,255,255,0.15)';
                            hiddenTextarea.style.borderRadius = '6px';
                            quillContainer.style.display = 'none';
                            btnToggleCode.textContent = '👁️ Ver Vista Visual';
                        } else {
                            quill.root.innerHTML = hiddenTextarea.value;
                            hiddenTextarea.style.display = 'none';
                            quillContainer.style.display = 'block';
                            btnToggleCode.textContent = '</> Ver Código HTML';
                        }
                    });
                }

                // Interceptar botón de imagen nativo de la barra de herramientas de Quill
                quill.getModule('toolbar').addHandler('image', () => {
                    openMediaPicker((path) => {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, 'image', '../' + path);
                    });
                });

                // Botón elegir portada desde la biblioteca
                const btnPickCover = document.getElementById('btn-pick-cover-media');
                const coverInput = document.getElementById('cover_image');
                if (btnPickCover && coverInput) {
                    btnPickCover.addEventListener('click', () => {
                        openMediaPicker((path) => {
                            coverInput.value = path;
                        });
                    });
                }

                // Botón adicional insertar imagen en el editor Quill
                const btnInsertQuill = document.getElementById('btn-insert-media-quill');
                if (btnInsertQuill) {
                    btnInsertQuill.addEventListener('click', () => {
                        openMediaPicker((path) => {
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, 'image', '../' + path);
                        });
                    });
                }

                // Sincronizar HTML antes del submit
                postForm.addEventListener('submit', () => {
                    if (isCodeView) {
                        quill.root.innerHTML = hiddenTextarea.value;
                    } else {
                        hiddenTextarea.value = quill.root.innerHTML;
                    }
                });
            }
        });
    </script>

    <?php include __DIR__ . '/media_modal.php'; ?>
</body>
</html>
