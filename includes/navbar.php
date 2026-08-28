<?php
/**
 * MENÚ DE NAVEGACIÓN GLOBAL - LA RUTA DEL SAMURÁI
 * Soporta navegación fluida entre páginas (index.php y blog.php) sin superposición de URLs.
 */
$current_page = basename($_SERVER['PHP_SELF'] ?? '');
$is_home = ($current_page === 'index.php' || empty($current_page) || $current_page === 'index');

$nav_menu = [
    ['label' => 'Inicio', 'section' => 'inicio', 'url' => $is_home ? '#inicio' : 'index.php#inicio'],
    ['label' => 'El Libro', 'section' => 'sinopsis', 'url' => $is_home ? '#sinopsis' : 'index.php#sinopsis'],
    ['label' => 'Opiniones', 'section' => 'opiniones', 'url' => $is_home ? '#opiniones' : 'index.php#opiniones'],
    ['label' => 'Redes', 'section' => 'redes', 'url' => $is_home ? '#redes' : 'index.php#redes'],
    ['label' => 'Ediciones', 'section' => 'ediciones', 'url' => $is_home ? '#ediciones' : 'index.php#ediciones'],
    ['label' => 'Autor', 'section' => 'autor', 'url' => $is_home ? '#autor' : 'index.php#autor'],
    ['label' => 'Galería', 'section' => 'galeria', 'url' => $is_home ? '#galeria' : 'index.php#galeria'],
    ['label' => 'Blog', 'section' => 'blog', 'url' => 'blog.php', 'is_page' => true],
    ['label' => 'Contacto', 'section' => 'contacto', 'url' => $is_home ? '#contacto' : 'index.php#contacto', 'is_btn' => true]
];
?>
<!-- Header / Navbar -->
<header class="navbar" id="navbar" role="banner">
    <div class="nav-container">
        <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav class="nav-menu" id="nav-menu" role="navigation" aria-label="Menú principal">
            <ul>
                <?php foreach ($nav_menu as $item): ?>
                    <?php 
                        $is_active = false;
                        if (!empty($item['is_page']) && strpos($current_page, 'blog') !== false) {
                            $is_active = true;
                        } elseif ($is_home && $item['section'] === 'inicio') {
                            $is_active = true;
                        }
                        
                        $classes = [];
                        if (!empty($item['is_btn'])) {
                            $classes[] = 'btn btn-nav';
                        } else {
                            $classes[] = 'nav-link';
                        }
                        if ($is_active) {
                            $classes[] = 'active';
                        }
                    ?>
                    <li>
                        <a href="<?= e($item['url']) ?>" class="<?= implode(' ', $classes) ?>" data-section="<?= e($item['section']) ?>">
                            <?= e($item['label']) ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <button class="theme-toggle-btn" id="theme-toggle" aria-label="Cambiar modo día/noche" title="Modo Día (日) / Noche (月)">
            <div class="toggle-sky-bg">
                <!-- Vista Nocturna -->
                <div class="toggle-sky-night">
                    <span class="toggle-star star-1"></span>
                    <span class="toggle-star star-2"></span>
                    <span class="toggle-star star-3"></span>
                    <span class="toggle-moon-aura"></span>
                </div>
                <!-- Vista Diurna -->
                <div class="toggle-sky-day">
                    <span class="toggle-sun-rays"></span>
                    <span class="toggle-cloud cloud-1"></span>
                    <span class="toggle-cloud cloud-2"></span>
                </div>
            </div>
            <span class="kanji-day" aria-hidden="true">日</span>
            <span class="kanji-night" aria-hidden="true">月</span>
        </button>
    </div>
</header>
