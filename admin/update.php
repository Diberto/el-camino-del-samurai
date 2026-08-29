<?php
/**
 * PANEL ADMIN - SISTEMA DE ACTUALIZACIÓN SEGURA EN 1 CLIC (SIN PÉRDIDA DE DATOS)
 * Protege de forma permanente los artículos, opiniones, fotos, libros y configuraciones.
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$msg = '';
$error = '';
$backup_notice = '';

// Función para crear backup automático antes de actualizar
function create_pre_update_backup(): string {
    if (!class_exists('ZipArchive')) return '';
    $zip = new ZipArchive();
    $backup_name = 'backup_pre_update_' . date('Y-m-d_H-i-s') . '.zip';
    $backup_path = BACKUPS_DIR . '/' . $backup_name;
    
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
        return $backup_name;
    }
    return '';
}

// Función para aplicar actualización de forma segura (sin sobreescribir datos existentes)
function apply_safe_update_zip(string $zip_path): array {
    if (!class_exists('ZipArchive')) {
        return ['success' => false, 'message' => 'La extensión PHP ZipArchive no está habilitada en el servidor.'];
    }

    $zip = new ZipArchive();
    if ($zip->open($zip_path) !== TRUE) {
        return ['success' => false, 'message' => 'No se pudo abrir el archivo ZIP de actualización.'];
    }

    // Lista de carpetas y archivos de datos protegidos que NUNCA deben sobrescribirse si ya existen
    $protected_databases = ['data/blog.json', 'data/opiniones.json', 'data/config.json', 'data/galeria.json', 'data/libros.json', 'data/analytics.json'];
    $updated_count = 0;

    for ($i = 0; $i < $zip->numFiles; $i++) {
        $entry_name = $zip->getNameIndex($i);
        
        // Omitir directorios puros
        if (substr($entry_name, -1) === '/') continue;

        // Omitir carpetas del sistema
        if (strpos($entry_name, '__MACOSX') === 0 || strpos($entry_name, '.git') === 0) continue;

        $target_file = ROOT_DIR . '/' . $entry_name;
        $target_dir = dirname($target_file);

        // Si es una foto de usuario existente, no sobrescribirla
        if (strpos($entry_name, 'photos/') === 0 && file_exists($target_file)) {
            continue;
        }

        // Si es una base de datos protegida y ya existe con contenido, preservarla 100%
        if (in_array($entry_name, $protected_databases) && file_exists($target_file) && filesize($target_file) > 10) {
            continue;
        }

        // Asegurar que el directorio de destino exista
        if (!is_dir($target_dir)) {
            @mkdir($target_dir, 0755, true);
        }

        // Extraer archivo actualizado de código, plantillas, estilos o scripts
        $content = $zip->getFromIndex($i);
        if ($content !== false) {
            file_put_contents($target_file, $content);
            $updated_count++;
        }
    }

    $zip->close();
    return [
        'success' => true, 
        'message' => "Actualización completada con éxito. Se actualizaron {$updated_count} archivos de código, estilos y plantillas sin modificar tus datos cargados."
    ];
}

// 1. Procesar subida de archivo ZIP de actualización
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['upload_update'])) {
    if (!empty($_FILES['update_zip']['tmp_name'])) {
        $tmp = $_FILES['update_zip']['tmp_name'];
        $name = $_FILES['update_zip']['name'];
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));

        if ($ext === 'zip') {
            // Crear copia de seguridad previa
            $b_name = create_pre_update_backup();
            if (!empty($b_name)) {
                $backup_notice = "Se creó automáticamente un respaldo de seguridad previo: {$b_name}";
            }

            $res = apply_safe_update_zip($tmp);
            if ($res['success']) {
                $msg = $res['message'];
            } else {
                $error = $res['message'];
            }
        } else {
            $error = 'El archivo subido debe ser un paquete comprimido .ZIP válido.';
        }
    } else {
        $error = 'Por favor selecciona un archivo ZIP de actualización.';
    }
}

// 2. Procesar actualización automática en 1 clic descargando el repositorio oficial
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['auto_update_git'])) {
    $b_name = create_pre_update_backup();
    if (!empty($b_name)) {
        $backup_notice = "Se creó automáticamente un respaldo de seguridad previo: {$b_name}";
    }

    // URL del zip oficial de la rama php-version en GitHub
    $repo_zip_url = 'https://github.com/Diberto/el-camino-del-samurai/archive/refs/heads/php-version.zip';
    $temp_zip = sys_get_temp_dir() . '/samurai_update_' . time() . '.zip';

    // Descargar usando cURL o file_get_contents
    $opts = [
        'http' => [
            'method' => 'GET',
            'header' => "User-Agent: Samurai-Updater/1.0\r\n"
        ]
    ];
    $context = stream_context_create($opts);
    $downloaded_data = @file_get_contents($repo_zip_url, false, $context);

    if ($downloaded_data !== false && strlen($downloaded_data) > 1000) {
        file_put_contents($temp_zip, $downloaded_data);
        
        // Extraer quitando el prefijo de carpeta de GitHub 'el-camino-del-samurai-php-version/'
        $zip = new ZipArchive();
        if ($zip->open($temp_zip) === TRUE) {
            $protected_databases = ['data/blog.json', 'data/opiniones.json', 'data/config.json', 'data/galeria.json', 'data/libros.json', 'data/analytics.json'];
            $updated_count = 0;

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $raw_name = $zip->getNameIndex($i);
                // Quitar la carpeta raíz que pone GitHub (ej. el-camino-del-samurai-php-version/index.php -> index.php)
                $parts = explode('/', $raw_name, 2);
                if (count($parts) < 2 || empty($parts[1])) continue;
                $entry_name = $parts[1];

                if (substr($entry_name, -1) === '/') continue;
                if (strpos($entry_name, '__MACOSX') === 0 || strpos($entry_name, '.git') === 0) continue;

                $target_file = ROOT_DIR . '/' . $entry_name;
                $target_dir = dirname($target_file);

                if (strpos($entry_name, 'photos/') === 0 && file_exists($target_file)) continue;
                if (in_array($entry_name, $protected_databases) && file_exists($target_file) && filesize($target_file) > 10) continue;

                if (!is_dir($target_dir)) {
                    @mkdir($target_dir, 0755, true);
                }

                $content = $zip->getFromIndex($i);
                if ($content !== false) {
                    file_put_contents($target_file, $content);
                    $updated_count++;
                }
            }
            $zip->close();
            @unlink($temp_zip);
            $msg = "✅ ¡Sistema actualizado en 1 clic directamente desde el repositorio oficial! Se actualizaron {$updated_count} archivos de código, estilos y plantillas. Todos tus artículos, opiniones y fotos se mantuvieron intactos.";
        } else {
            $error = 'Error al abrir el paquete descargado de GitHub.';
        }
    } else {
        $error = 'No se pudo descargar automáticamente el paquete desde GitHub. Puedes usar la opción de subir el archivo deploy-php-version.zip abajo.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualización Segura del Sistema | Panel de Administración</title>
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
                <a href="libros.php" class="admin-nav-item">📚 Catálogo de Libros</a>
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
                <a href="update.php" class="admin-nav-item active">🚀 Actualizar Sistema</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>
            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <h2>🚀 Actualizador Seguro del Sistema (Data-Protected)</h2>
            </header>

            <div class="admin-content">
                <?php if (!empty($msg)): ?>
                    <div class="alert alert-success" style="font-size: 0.95rem; line-height: 1.5;"><?= $msg ?></div>
                <?php endif; ?>

                <?php if (!empty($backup_notice)): ?>
                    <div class="alert alert-info" style="font-size: 0.88rem; background: rgba(33, 150, 243, 0.1); border: 1px solid rgba(33, 150, 243, 0.3); color: #90caf9; margin-bottom: 1.5rem;"><?= e($backup_notice) ?></div>
                <?php endif; ?>

                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger"><?= e($error) ?></div>
                <?php endif; ?>

                <!-- Escudo de Protección -->
                <div class="admin-card" style="border: 2px solid #2e7d32; background: rgba(46, 125, 50, 0.08); margin-bottom: 2rem;">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <span style="font-size: 2.2rem;">🛡️</span>
                        <div>
                            <h3 style="color: #4caf50; margin: 0 0 0.3rem 0;">Protección Total Contra Pérdida de Datos Activa</h3>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">
                                Este actualizador inteligente actualiza el código fuente, diseño, plantillas y lógica del sitio web <strong>garantizando que tus artículos del blog, opiniones, catálogo de libros, configuración y fotos se mantengan 100% intactos</strong>. Además, genera una copia de seguridad automática antes de cada actualización.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Método 1: Actualizar en 1 Clic desde GitHub -->
                <div class="admin-card" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <h3 style="margin-bottom: 0.4rem;">🌐 Opción 1: Actualizar en 1 Clic (Online Directo)</h3>
                            <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0; max-width: 600px;">
                                Descarga e instala automáticamente la última versión publicada en el repositorio de GitHub oficial (rama <code>php-version</code>) sin tener que descargar ni subir archivos manualmente.
                            </p>
                        </div>
                        <form method="POST" action="update.php">
                            <button type="submit" name="auto_update_git" class="btn btn-admin-primary" style="padding: 0.85rem 1.6rem; font-size: 0.95rem; font-weight: 700;" onclick="return confirm('¿Deseas actualizar el sistema a la última versión disponible en GitHub? Se creará una copia de seguridad previa de forma automática.');">
                                ⚡ Actualizar Ahora en 1 Clic
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Método 2: Subir archivo ZIP -->
                <div class="admin-card">
                    <h3 style="margin-bottom: 0.4rem;">📦 Opción 2: Subir Paquete de Actualización (.ZIP)</h3>
                    <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.25rem;">
                        Si prefieres subir manualmente el paquete generado <code>deploy-php-version.zip</code>, selecciónalo a continuación. El sistema lo extraerá de manera segura protegiendo todas tus carpetas de contenido.
                    </p>

                    <form method="POST" action="update.php" enctype="multipart/form-data" class="admin-form">
                        <div class="form-group" style="max-width: 480px;">
                            <label for="update_zip" style="font-weight: 600; font-size: 0.9rem;">Seleccionar archivo ZIP de actualización:</label>
                            <input type="file" id="update_zip" name="update_zip" accept=".zip" required style="padding: 0.6rem; border: 1px dashed var(--accent-gold); border-radius: 6px; width: 100%;">
                        </div>

                        <div class="form-actions" style="margin-top: 1rem;">
                            <button type="submit" name="upload_update" class="btn btn-admin-secondary" style="padding: 0.75rem 1.5rem;" onclick="return confirm('¿Confirmas la instalación del paquete ZIP seleccionado?');">
                                📤 Instalar Actualización ZIP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
