<?php
/**
 * PANEL ADMIN - GESTOR DE COPIAS DE SEGURIDAD Y RESTAURACIÓN (BACKUP MANAGER)
 * Permite crear, listar, descargar, restaurar y eliminar copias de seguridad de datos y fotos.
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$msg = '';
$error = '';

if (!is_dir(BACKUPS_DIR)) {
    @mkdir(BACKUPS_DIR, 0755, true);
}

// 1. Descargar copia de seguridad específica
if (isset($_GET['download'])) {
    $file = basename($_GET['download']);
    $file_path = BACKUPS_DIR . '/' . $file;
    if (file_exists($file_path) && pathinfo($file, PATHINFO_EXTENSION) === 'zip') {
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $file . '"');
        header('Content-Length: ' . filesize($file_path));
        header('Pragma: no-cache');
        header('Expires: 0');
        readfile($file_path);
        exit;
    } else {
        $error = 'El archivo de respaldo solicitado no existe o no es válido.';
    }
}

// 2. Descargar base de datos individual JSON
if (isset($_GET['download_json'])) {
    $json_name = basename($_GET['download_json']);
    $allowed_jsons = ['blog.json', 'opiniones.json', 'galeria.json', 'libros.json', 'config.json', 'analytics.json'];
    if (in_array($json_name, $allowed_jsons)) {
        $json_path = DATA_DIR . '/' . $json_name;
        if (file_exists($json_path)) {
            header('Content-Type: application/json');
            header('Content-Disposition: attachment; filename="' . $json_name . '"');
            header('Content-Length: ' . filesize($json_path));
            header('Pragma: no-cache');
            header('Expires: 0');
            readfile($json_path);
            exit;
        }
    }
}

// 3. Crear nueva copia de seguridad manual (.ZIP)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_backup'])) {
    if (class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        $backup_filename = 'backup_samurai_' . date('Y-m-d_H-i-s') . '.zip';
        $backup_path = BACKUPS_DIR . '/' . $backup_filename;

        if ($zip->open($backup_path, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
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
            $msg = "✅ ¡Copia de seguridad creada con éxito! Archivo: <strong>{$backup_filename}</strong> (" . format_file_size(filesize($backup_path)) . ")";
        } else {
            $error = 'No se pudo crear el archivo ZIP en el servidor.';
        }
    } else {
        $error = 'La extensión PHP ZipArchive no está disponible en el servidor.';
    }
}

// 4. Restaurar copia de seguridad seleccionada de la lista
if (isset($_GET['restore'])) {
    $file = basename($_GET['restore']);
    $file_path = BACKUPS_DIR . '/' . $file;

    if (file_exists($file_path) && pathinfo($file, PATHINFO_EXTENSION) === 'zip' && class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        if ($zip->open($file_path) === TRUE) {
            $restored_data = 0;
            $restored_photos = 0;

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $entry = $zip->getNameIndex($i);
                if (substr($entry, -1) === '/') continue;

                $target = ROOT_DIR . '/' . $entry;
                $dir = dirname($target);
                if (!is_dir($dir)) @mkdir($dir, 0755, true);

                $content = $zip->getFromIndex($i);
                if ($content !== false) {
                    file_put_contents($target, $content);
                    if (strpos($entry, 'data/') === 0) $restored_data++;
                    if (strpos($entry, 'photos/') === 0) $restored_photos++;
                }
            }
            $zip->close();
            $msg = "✅ ¡Copia <strong>{$file}</strong> restaurada con éxito! Se restablecieron {$restored_data} bases de datos y {$restored_photos} fotografías.";
        } else {
            $error = 'Error al abrir y descomprimir el archivo de respaldo.';
        }
    } else {
        $error = 'Archivo de respaldo no encontrado o inválido.';
    }
}

// 5. Eliminar copia de seguridad seleccionada
if (isset($_GET['delete'])) {
    $file = basename($_GET['delete']);
    $file_path = BACKUPS_DIR . '/' . $file;

    if (file_exists($file_path) && pathinfo($file, PATHINFO_EXTENSION) === 'zip') {
        @unlink($file_path);
        $msg = "Copia de seguridad <strong>{$file}</strong> eliminada correctamente.";
    } else {
        $error = 'No se encontró el archivo a eliminar.';
    }
}

// 6. Subir y restaurar respaldo externo (.ZIP o .JSON)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload_restore'])) {
    if (!empty($_FILES['backup_upload']['tmp_name'])) {
        $tmp = $_FILES['backup_upload']['tmp_name'];
        $name = $_FILES['backup_upload']['name'];
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));

        if ($ext === 'zip' && class_exists('ZipArchive')) {
            $zip = new ZipArchive();
            if ($zip->open($tmp) === TRUE) {
                // Guardar copia del archivo subido en data/backups/
                $saved_name = 'backup_subido_' . date('Y-m-d_H-i-s') . '.zip';
                @copy($tmp, BACKUPS_DIR . '/' . $saved_name);

                $restored_count = 0;
                for ($i = 0; $i < $zip->numFiles; $i++) {
                    $entry = $zip->getNameIndex($i);
                    if (substr($entry, -1) === '/') continue;

                    $target = ROOT_DIR . '/' . $entry;
                    $dir = dirname($target);
                    if (!is_dir($dir)) @mkdir($dir, 0755, true);

                    $content = $zip->getFromIndex($i);
                    if ($content !== false) {
                        file_put_contents($target, $content);
                        $restored_count++;
                    }
                }
                $zip->close();
                $msg = "✅ Respaldo ZIP subido y restaurado con éxito ({$restored_count} archivos actualizados).";
            } else {
                $error = 'El archivo ZIP subido está dañado o no se puede leer.';
            }
        } elseif ($ext === 'json') {
            $target = DATA_DIR . '/' . basename($name);
            if (move_uploaded_file($tmp, $target)) {
                $msg = "✅ Archivo de datos <strong>" . htmlspecialchars($name) . "</strong> restaurado con éxito.";
            } else {
                $error = 'Error al guardar el archivo JSON subido.';
            }
        } else {
            $error = 'Por favor sube un archivo .ZIP o .JSON válido.';
        }
    } else {
        $error = 'Selecciona un archivo de respaldo para subir.';
    }
}

// Función auxiliar para formatear tamaño de archivo
function format_file_size(int $bytes): string {
    if ($bytes >= 1073741824) return number_format($bytes / 1073741824, 2) . ' GB';
    if ($bytes >= 1048576) return number_format($bytes / 1048576, 2) . ' MB';
    if ($bytes >= 1024) return number_format($bytes / 1024, 2) . ' KB';
    return $bytes . ' B';
}

// Escanear copias de seguridad existentes
$backup_files = glob(BACKUPS_DIR . '/*.zip');
$backups_list = [];

if (is_array($backup_files)) {
    foreach ($backup_files as $f) {
        $name = basename($f);
        $time = filemtime($f);
        $size = filesize($f);

        $type = '💾 Manual';
        $badge_class = 'badge-success';
        if (strpos($name, 'backup_pre_update_') === 0) {
            $type = '⚡ Pre-Actualización';
            $badge_class = 'badge-info';
        } elseif (strpos($name, 'backup_subido_') === 0) {
            $type = '📤 Subido Expreso';
            $badge_class = 'badge-warning';
        }

        $backups_list[] = [
            'name' => $name,
            'path' => $f,
            'time' => $time,
            'formatted_date' => date('d/m/Y H:i:s', $time),
            'size' => format_file_size($size),
            'raw_size' => $size,
            'type' => $type,
            'badge_class' => $badge_class
        ];
    }

    // Ordenar de más reciente a más antiguo
    usort($backups_list, function($a, $b) {
        return $b['time'] <=> $a['time'];
    });
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Copias de Seguridad | Panel de Administración</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=2.0">
    <style>
        .badge {
            display: inline-block;
            padding: 0.3rem 0.65rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        .badge-success { background: rgba(46, 125, 50, 0.2); color: #81c784; border: 1px solid #4caf50; }
        .badge-info { background: rgba(33, 150, 243, 0.2); color: #90caf9; border: 1px solid #2196f3; }
        .badge-warning { background: rgba(255, 152, 0, 0.2); color: #ffb74d; border: 1px solid #ff9800; }
        .action-btns {
            display: flex;
            gap: 0.4rem;
            align-items: center;
        }
        .action-btn-sm {
            padding: 0.35rem 0.65rem;
            font-size: 0.8rem;
            border-radius: 4px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            transition: all 0.2s ease;
        }
        .btn-dl { background: #1976d2; color: #fff; }
        .btn-dl:hover { background: #1565c0; }
        .btn-rst { background: #388e3c; color: #fff; }
        .btn-rst:hover { background: #2e7d32; }
        .btn-del { background: #d32f2f; color: #fff; }
        .btn-del:hover { background: #c62828; }
        .json-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 1rem;
        }
        .json-pill {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.45rem 0.85rem;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.2s ease;
        }
        .json-pill:hover {
            border-color: var(--accent-gold);
            color: var(--accent-gold);
            transform: translateY(-2px);
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
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
                <a href="backups.php" class="admin-nav-item active">💾 Copias de Seguridad</a>
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
                <h2>💾 Gestor de Copias de Seguridad & Respaldos</h2>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success" style="font-size: 0.95rem;"><?= $msg ?></div>
                <?php endif; ?>

                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger"><?= e($error) ?></div>
                <?php endif; ?>

                <!-- Panel Superior: Crear y Subir Copias -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Crear Copia Manual -->
                    <div class="admin-card">
                        <h3 style="margin-bottom: 0.4rem;">⚡ Crear Nuevo Respaldo</h3>
                        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">
                            Empaqueta en un archivo ZIP todas tus bases de datos (artículos, opiniones, libros, configuración) y todas las fotografías de la galería.
                        </p>
                        <form method="POST" action="backups.php">
                            <button type="submit" name="create_backup" class="btn btn-admin-primary" style="width: 100%; padding: 0.8rem;">
                                💾 Generar Copia de Seguridad Ahora
                            </button>
                        </form>
                    </div>

                    <!-- Subir Respaldo Externo -->
                    <div class="admin-card">
                        <h3 style="margin-bottom: 0.4rem;">📤 Subir y Restaurar Copia</h3>
                        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1rem;">
                            Restaura una copia previa (.ZIP o .JSON) desde tu computadora.
                        </p>
                        <form method="POST" action="backups.php" enctype="multipart/form-data">
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <input type="file" name="backup_upload" accept=".zip,.json" required style="padding: 0.5rem; border: 1px dashed var(--accent-gold); border-radius: 6px; flex: 1; min-width: 180px;">
                                <button type="submit" name="upload_restore" class="btn btn-admin-secondary" style="padding: 0.6rem 1rem;" onclick="return confirm('¿Confirmas la restauración de este respaldo? Sobrescribirá los datos actuales con los del archivo subido.');">
                                    Restaurar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Exportaciones Rápidas JSON -->
                <div class="admin-card" style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 0.25rem;">📄 Exportación Rápida de Bases de Datos (JSON)</h3>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem;">Descarga archivos de datos individuales directamente para editarlos o respaldarlos:</p>
                    <div class="json-pills">
                        <a href="backups.php?download_json=blog.json" class="json-pill">📝 blog.json</a>
                        <a href="backups.php?download_json=opiniones.json" class="json-pill">💬 opiniones.json</a>
                        <a href="backups.php?download_json=galeria.json" class="json-pill">🖼️ galeria.json</a>
                        <a href="backups.php?download_json=libros.json" class="json-pill">📚 libros.json</a>
                        <a href="backups.php?download_json=config.json" class="json-pill">⚙️ config.json</a>
                        <a href="backups.php?download_json=analytics.json" class="json-pill">📊 analytics.json</a>
                    </div>
                </div>

                <!-- Tabla de Respaldos Almacenados -->
                <div class="admin-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
                        <h3 style="margin: 0;">📦 Copias de Seguridad Almacenadas en el Servidor (<?= count($backups_list) ?>)</h3>
                        <span style="font-size: 0.85rem; color: var(--text-secondary);">Directorio: <code>data/backups/</code></span>
                    </div>

                    <?php if (empty($backups_list)): ?>
                        <p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">No hay copias de seguridad creadas todavía. Puedes generar una con el botón de arriba.</p>
                    <?php else: ?>
                        <div class="table-responsive">
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Nombre del Archivo</th>
                                        <th>Fecha y Hora</th>
                                        <th>Tamaño</th>
                                        <th style="text-align: right;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($backups_list as $b): ?>
                                        <tr>
                                            <td>
                                                <span class="badge <?= $b['badge_class'] ?>"><?= $b['type'] ?></span>
                                            </td>
                                            <td style="font-weight: 600; font-family: monospace; font-size: 0.85rem;">
                                                <?= e($b['name']) ?>
                                            </td>
                                            <td style="font-size: 0.88rem; color: var(--text-secondary);">
                                                <?= $b['formatted_date'] ?>
                                            </td>
                                            <td style="font-size: 0.88rem; font-weight: 600;">
                                                <?= $b['size'] ?>
                                            </td>
                                            <td style="text-align: right;">
                                                <div class="action-btns" style="justify-content: flex-end;">
                                                    <a href="backups.php?download=<?= urlencode($b['name']) ?>" class="action-btn-sm btn-dl" title="Descargar ZIP">
                                                        📥 Descargar
                                                    </a>
                                                    <a href="backups.php?restore=<?= urlencode($b['name']) ?>" class="action-btn-sm btn-rst" title="Restaurar este respaldo" onclick="return confirm('⚠️ ¿Estás seguro de restaurar el respaldo <?= e($b['name']) ?>? Los datos actuales serán reemplazados por los de esta copia.');">
                                                        🔄 Restaurar
                                                    </a>
                                                    <a href="backups.php?delete=<?= urlencode($b['name']) ?>" class="action-btn-sm btn-del" title="Eliminar respaldo" onclick="return confirm('¿Deseas eliminar permanentemente esta copia de seguridad?');">
                                                        🗑️
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
