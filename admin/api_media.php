<?php
/**
 * API JSON DE MEDIOS - Para el selector modal en Blog, Opiniones y Galería
 */
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/media_helper.php';
require_admin_auth();

header('Content-Type: application/json; charset=utf-8');

// 1. Subida de archivo por AJAX con optimización automática a WebP
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $saved_path = optimize_and_save_image($_FILES['file'], 'media', 1920, 85);
    if ($saved_path) {
        echo json_encode([
            'success' => true,
            'path' => $saved_path,
            'filename' => basename($saved_path),
            'message' => 'Imagen optimizada a WebP y subida con éxito'
        ]);
        exit;
    }
    echo json_encode(['success' => false, 'message' => 'Error al procesar y optimizar la imagen']);
    exit;
}

// 2. Listado de todos los medios disponibles (photos/ y assets/)
$photos_dir = ROOT_DIR . '/photos';
$assets_dir = ROOT_DIR . '/assets';
$files = [];

function scan_images($dir, $prefix) {
    $result = [];
    if (!is_dir($dir)) return $result;
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === '.htaccess' || $item === '.gitkeep') continue;
        $full_path = $dir . '/' . $item;
        if (is_file($full_path)) {
            $ext = strtolower(pathinfo($item, PATHINFO_EXTENSION));
            if (in_array($ext, ['webp', 'jpg', 'jpeg', 'png', 'svg', 'gif'])) {
                $size_kb = round(filesize($full_path) / 1024, 1);
                $modified = date('Y-m-d H:i', filemtime($full_path));
                $result[] = [
                    'filename' => $item,
                    'path' => $prefix . '/' . $item,
                    'folder' => $prefix,
                    'size' => $size_kb > 1024 ? round($size_kb / 1024, 2) . ' MB' : $size_kb . ' KB',
                    'mtime' => filemtime($full_path),
                    'date' => $modified
                ];
            }
        }
    }
    return $result;
}

$photos = scan_images($photos_dir, 'photos');
$assets = scan_images($assets_dir, 'assets');
$all_media = array_merge($photos, $assets);

// Ordenar por fecha de modificación descendente (más recientes primero)
usort($all_media, fn($a, $b) => $b['mtime'] <=> $a['mtime']);

echo json_encode([
    'success' => true,
    'total' => count($all_media),
    'media' => $all_media
], JSON_UNESCAPED_SLASHES);
