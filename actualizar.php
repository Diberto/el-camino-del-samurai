<?php
/**
 * ACTUALIZADOR SEGURO EN 1 CLIC PARA EL SERVIDOR (ROOT STANDALONE)
 * URL: https://larutadelsamurai.com/actualizar.php
 * Protege de forma permanente las bases de datos data/*.json y las fotos photos/*
 */
session_start();
define('ROOT_DIR', __DIR__);
define('DATA_DIR', ROOT_DIR . '/data');
define('UPLOADS_DIR', ROOT_DIR . '/photos');
define('BACKUPS_DIR', DATA_DIR . '/backups');

if (!is_dir(BACKUPS_DIR)) @mkdir(BACKUPS_DIR, 0755, true);

$auth_pass = 'samurai2026';
$is_authenticated = (isset($_SESSION['admin_logged']) && $_SESSION['admin_logged'] === true) || (isset($_POST['auth_pass']) && $_POST['auth_pass'] === $auth_pass);

if (isset($_POST['auth_pass']) && $_POST['auth_pass'] === $auth_pass) {
    $_SESSION['admin_logged'] = true;
    $is_authenticated = true;
}

$msg = '';
$error = '';
$backup_notice = '';

function create_pre_backup(): string {
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

if ($is_authenticated && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['run_update'])) {
    $b_name = create_pre_backup();
    if (!empty($b_name)) {
        $backup_notice = "Copia de seguridad previa creada: {$b_name}";
    }

    $repo_zip_url = 'https://github.com/Diberto/el-camino-del-samurai/archive/refs/heads/php-version.zip';
    $temp_zip = sys_get_temp_dir() . '/samurai_update_' . time() . '.zip';

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
        
        $zip = new ZipArchive();
        if ($zip->open($temp_zip) === TRUE) {
            $protected_databases = ['data/blog.json', 'data/opiniones.json', 'data/config.json', 'data/galeria.json', 'data/libros.json', 'data/analytics.json'];
            $updated_count = 0;

            for ($i = 0; $i < $zip->numFiles; $i++) {
                $raw_name = $zip->getNameIndex($i);
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
            $msg = "✅ ¡Sitio web actualizado con éxito! Se aplicaron {$updated_count} archivos de código, estilos y funciones. Todos tus artículos, opiniones y fotos se mantuvieron 100% intactos.";
        } else {
            $error = 'Error al procesar el archivo ZIP descargado.';
        }
    } else {
        $error = 'No se pudo conectar a GitHub para descargar la actualización automática. Verifica la conexión a Internet del servidor.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Actualizador Oficial | La Ruta del Samurái</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #0f111a;
            color: #e0e0e0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 1.5rem;
            box-sizing: border-box;
        }
        .updater-box {
            background: #171b26;
            border: 1px solid #2a3142;
            border-radius: 12px;
            padding: 2.5rem;
            max-width: 550px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            text-align: center;
        }
        h1 {
            font-family: 'Cinzel', serif;
            color: #d81124;
            margin: 0 0 0.5rem 0;
            font-size: 1.6rem;
        }
        p {
            color: #9e9e9e;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        .btn {
            background: #d81124;
            color: #ffffff;
            border: none;
            padding: 0.9rem 2rem;
            font-size: 1rem;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: 0.2s ease;
        }
        .btn:hover {
            background: #b50e1e;
            box-shadow: 0 0 15px rgba(216, 17, 36, 0.4);
        }
        .alert {
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            text-align: left;
            font-size: 0.9rem;
        }
        .alert-success { background: rgba(46, 125, 50, 0.15); border: 1px solid #4caf50; color: #81c784; }
        .alert-danger { background: rgba(211, 47, 47, 0.15); border: 1px solid #e57373; color: #ef9a9a; }
        .alert-info { background: rgba(33, 150, 243, 0.15); border: 1px solid #64b5f6; color: #90caf9; }
        .input-text {
            width: 100%;
            padding: 0.8rem;
            background: #10131c;
            border: 1px solid #2a3142;
            color: #ffffff;
            border-radius: 6px;
            margin-bottom: 1rem;
            box-sizing: border-box;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="updater-box">
        <h1>🚀 Actualizador del Sistema</h1>
        <p>La Ruta del Samurái · Herramienta de Actualización Segura</p>

        <?php if (!empty($msg)): ?>
            <div class="alert alert-success"><?= $msg ?></div>
        <?php endif; ?>

        <?php if (!empty($backup_notice)): ?>
            <div class="alert alert-info"><?= htmlspecialchars($backup_notice) ?></div>
        <?php endif; ?>

        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <?php if (!$is_authenticated): ?>
            <form method="POST" action="actualizar.php">
                <input type="password" name="auth_pass" placeholder="Contraseña de Administrador" required class="input-text">
                <button type="submit" class="btn">Ingresar</button>
            </form>
        <?php else: ?>
            <div style="background: rgba(46, 125, 50, 0.08); border: 1px solid #2e7d32; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; text-align: left; font-size: 0.85rem;">
                🛡️ <strong>Protección Activa:</strong> Esta actualización preserva 100% tus artículos del blog, opiniones, catálogo de libros, configuración y fotos.
            </div>

            <form method="POST" action="actualizar.php">
                <button type="submit" name="run_update" class="btn" style="width: 100%;" onclick="return confirm('¿Confirmas que deseas actualizar la web ahora? Se creará una copia de seguridad automática previa.');">
                    ⚡ Actualizar Web Ahora (Sin Perder Datos)
                </button>
            </form>

            <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; font-size: 0.85rem;">
                <a href="index.php" style="color: #c5a880; text-decoration: none;">🌐 Ir a la Web</a>
                <a href="admin/index.php" style="color: #c5a880; text-decoration: none;">⚙️ Ir al Panel Admin</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
