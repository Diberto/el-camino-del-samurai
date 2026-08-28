<?php
/**
 * LA RUTA DEL SAMURÁI - HELPER DE OPTIMIZACIÓN AUTOMÁTICA DE IMÁGENES A WEBP
 * Convierte automáticamente JPG, PNG, GIF y WebP a formato WebP comprimido y optimizado.
 */

if (!defined('ROOT_DIR')) {
    define('ROOT_DIR', realpath(__DIR__ . '/..'));
}

/**
 * Procesa, optimiza, redimensiona y convierte una imagen subida a formato WebP.
 *
 * @param array $file_input El array del archivo en $_FILES['campo']
 * @param string $prefix Prefijo para el nombre del archivo (ej: 'blog', 'lector', 'gal', 'media')
 * @param int $max_width Ancho máximo en píxeles (default: 1920)
 * @param int $quality Calidad de compresión WebP (default: 85)
 * @return string|null La ruta relativa del archivo guardado (ej: 'photos/img_123.webp') o null si falló.
 */
function optimize_and_save_image(array $file_input, string $prefix = 'media', int $max_width = 1920, int $quality = 85): ?string {
    if (!isset($file_input['tmp_name']) || empty($file_input['tmp_name']) || $file_input['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $tmp_path = $file_input['tmp_name'];
    $orig_name = $file_input['name'];
    $ext = strtolower(pathinfo($orig_name, PATHINFO_EXTENSION));

    $allowed = ['webp', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
    if (!in_array($ext, $allowed)) {
        return null;
    }

    $clean_base = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($orig_name, PATHINFO_FILENAME));
    $timestamp = time();
    $target_dir = ROOT_DIR . '/photos';
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }

    // 1. Archivos vectoriales SVG no necesitan conversión rasterizada
    if ($ext === 'svg') {
        $filename = $prefix . '_' . $clean_base . '_' . $timestamp . '.svg';
        $dest = $target_dir . '/' . $filename;
        if (move_uploaded_file($tmp_path, $dest)) {
            return 'photos/' . $filename;
        }
        return null;
    }

    // 2. Conversión y Optimización a WebP con GD Library
    if (function_exists('imagewebp')) {
        $source_image = null;

        switch ($ext) {
            case 'jpg':
            case 'jpeg':
                if (function_exists('imagecreatefromjpeg')) {
                    $source_image = @imagecreatefromjpeg($tmp_path);
                }
                break;
            case 'png':
                if (function_exists('imagecreatefrompng')) {
                    $source_image = @imagecreatefrompng($tmp_path);
                }
                break;
            case 'webp':
                if (function_exists('imagecreatefromwebp')) {
                    $source_image = @imagecreatefromwebp($tmp_path);
                }
                break;
            case 'gif':
                if (function_exists('imagecreatefromgif')) {
                    $source_image = @imagecreatefromgif($tmp_path);
                }
                break;
        }

        if ($source_image) {
            $orig_w = imagesx($source_image);
            $orig_h = imagesy($source_image);

            // Redimensionar proporcionalmente si supera el ancho máximo
            if ($orig_w > $max_width) {
                $new_w = $max_width;
                $new_h = (int)round(($orig_h * $max_width) / $orig_w);
            } else {
                $new_w = $orig_w;
                $new_h = $orig_h;
            }

            $canvas = imagecreatetruecolor($new_w, $new_h);

            // Preservar canal alfa / transparencia
            imagealphablending($canvas, false);
            imagesavealpha($canvas, true);
            $transparent = imagecolorallocatealpha($canvas, 255, 255, 255, 127);
            imagefilledrectangle($canvas, 0, 0, $new_w, $new_h, $transparent);
            imagealphablending($canvas, true);

            // Remuestreo de alta calidad
            imagecopyresampled($canvas, $source_image, 0, 0, 0, 0, $new_w, $new_h, $orig_w, $orig_h);

            $filename = $prefix . '_' . $clean_base . '_' . $timestamp . '.webp';
            $dest = $target_dir . '/' . $filename;

            imagealphablending($canvas, false);
            imagesavealpha($canvas, true);

            if (@imagewebp($canvas, $dest, $quality)) {
                imagedestroy($source_image);
                imagedestroy($canvas);
                return 'photos/' . $filename;
            }

            imagedestroy($source_image);
            imagedestroy($canvas);
        }
    }

    // 3. Fallback en caso de que GD no soporte WebP
    $filename = $prefix . '_' . $clean_base . '_' . $timestamp . '.' . $ext;
    $dest = $target_dir . '/' . $filename;
    if (move_uploaded_file($tmp_path, $dest)) {
        return 'photos/' . $filename;
    }

    return null;
}
