<?php
/**
 * MENÚ DE NAVEGACIÓN GLOBAL (DISEÑO ORIGINAL)
 */
$nav_menu = $settings['navigation_menu'] ?? [
    ['label' => 'Inicio', 'url' => '#inicio', 'visible' => true],
    ['label' => 'El Libro', 'url' => '#sinopsis', 'visible' => true],
    ['label' => 'Opiniones', 'url' => '#opiniones', 'visible' => true],
    ['label' => 'Redes', 'url' => '#redes', 'visible' => true],
    ['label' => 'Ediciones', 'url' => '#ediciones', 'visible' => true],
    ['label' => 'Autor', 'url' => '#autor', 'visible' => true],
    ['label' => 'Galería', 'url' => '#galeria', 'visible' => true],
    ['label' => 'Blog', 'url' => '#blog', 'visible' => true],
    ['label' => 'Contacto', 'url' => '#contacto', 'visible' => true]
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
                    <?php if (!empty($item['visible'])): ?>
                        <?php 
                            $is_contacto = strpos($item['url'], 'contacto') !== false;
                            $class = $is_contacto ? 'btn btn-nav' : 'nav-link';
                        ?>
                        <li><a href="<?= e($item['url']) ?>" class="<?= $class ?>"><?= e($item['label']) ?></a></li>
                    <?php endif; ?>
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
