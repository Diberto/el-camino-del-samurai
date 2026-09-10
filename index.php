<?php
/**
 * EL CAMINO DEL SAMURÁI - PORTAL PRINCIPAL
 * Arquitectura modular PHP con renderizado 100% en servidor (SSR).
 */

require_once __DIR__ . '/config/settings.php';
require_once __DIR__ . '/config/analytics.php';
track_page_view('Página Principal');

// Validación de caché HTTP (ETag / 304 Not Modified) para concurrencia extrema
$data_files = [
    DATA_DIR . '/config.json',
    DATA_DIR . '/libros.json',
    DATA_DIR . '/opiniones.json',
    DATA_DIR . '/galeria.json',
    DATA_DIR . '/blog.json'
];
$last_mtime = filemtime(__FILE__);
foreach ($data_files as $df) {
    if (file_exists($df)) {
        $last_mtime = max($last_mtime, filemtime($df));
    }
}
$etag = '"' . md5($last_mtime . '_v3.8') . '"';

header('ETag: ' . $etag);
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $last_mtime) . ' GMT');
header('Cache-Control: no-cache, must-revalidate');

if (session_status() !== PHP_SESSION_ACTIVE || empty($_SESSION['admin_logged_in'])) {
    if ((isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) ||
        (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $last_mtime)) {
        header('HTTP/1.1 304 Not Modified');
        exit;
    }
}

$toggles = $settings['sections_toggle'] ?? [];

// Cabecera HTML y Meta Tags
require_once __DIR__ . '/includes/header.php';

// Menú de Navegación
require_once __DIR__ . '/includes/navbar.php';
?>

<main id="main">
<?php
// 1. Portada / Hero Section
if ($toggles['inicio'] ?? true) {
    require_once __DIR__ . '/sections/hero.php';
}

// 2. El Libro / Sinopsis de la Obra
if ($toggles['sinopsis'] ?? true) {
    require_once __DIR__ . '/sections/sinopsis.php';
}

// 3. Opiniones de nuestros lectores
if ($toggles['opiniones'] ?? true) {
    require_once __DIR__ . '/sections/opiniones.php';
}

// 4. Sigue la ruta del samurái en las redes
if ($toggles['redes'] ?? true) {
    require_once __DIR__ . '/sections/redes.php';
}

// 5. Ediciones Disponibles
if ($toggles['ediciones'] ?? true) {
    require_once __DIR__ . '/sections/ediciones.php';
}

// 6. El Autor (Jorge Orpianesi)
if ($toggles['autor'] ?? true) {
    require_once __DIR__ . '/sections/autor.php';
}

// 7. Galería de Expediciones
if ($toggles['galeria'] ?? true) {
    require_once __DIR__ . '/sections/galeria.php';
}

// 8. Artículos Destacados del Blog
if ($toggles['blog'] ?? true) {
    require_once __DIR__ . '/sections/blog-preview.php';
}

// 9. Contacto Oficial
if ($toggles['contacto'] ?? true) {
    require_once __DIR__ . '/sections/contacto.php';
}
?>
</main>

<?php
// Pie de Página y Modal Lightbox
require_once __DIR__ . '/includes/footer.php';
