<?php
/**
 * MENÚ DE NAVEGACIÓN RESPONSIVE
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
<!-- Barra de Navegación Principal -->
<header class="navbar" id="navbar">
    <div class="nav-container">
        <!-- Botón Hamburguesa Móvil -->
        <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <!-- Logo / Marca -->
        <a href="index.php#inicio" class="nav-logo">
            <img src="assets/kanji_stamp.webp" alt="Sello Kanji" class="logo-img">
            <span class="logo-text">LA RUTA DEL SAMURÁI</span>
        </a>

        <!-- Menú de Enlaces -->
        <nav class="nav-menu" id="nav-menu">
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

        <!-- Botón Selector Modo Día / Noche -->
        <button class="theme-toggle-btn" id="theme-toggle" aria-label="Cambiar modo día/noche" title="Modo Día (日) / Noche (月)">
            <div class="toggle-sky-bg">
                <div class="toggle-sky-night">
                    <span class="toggle-star star-1"></span>
                    <span class="toggle-star star-2"></span>
                    <span class="toggle-star star-3"></span>
                    <span class="toggle-moon-aura"></span>
                </div>
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
