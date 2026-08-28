<?php
/**
 * EL CAMINO DEL SAMURÁI - PORTAL PRINCIPAL
 * Arquitectura modular PHP con renderizado 100% en servidor (SSR).
 */

require_once __DIR__ . '/config/settings.php';

$toggles = $settings['sections_toggle'] ?? [];

// Cabecera HTML y Meta Tags
require_once __DIR__ . '/includes/header.php';

// Menú de Navegación
require_once __DIR__ . '/includes/navbar.php';

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

// Pie de Página y Modal Lightbox
require_once __DIR__ . '/includes/footer.php';
