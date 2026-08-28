<?php
/**
 * SECCIÓN HERO / PORTADA PRINCIPAL
 * Renderizado estático de alto contraste con el logo oficial de letras negras permanente.
 */
?>
<section id="inicio" class="hero-section">
    <div class="hero-bg-wrapper">
        <!-- Ilustración de Fondo Samurái y Sol Naciente -->
        <div class="hero-artwork-layer" style="background-image: url('assets/svg_true_layer_5.webp');"></div>
        <div class="hero-fuji-layer" style="background-image: url('assets/svg_true_layer_1.webp');"></div>
        <div class="hero-samurai-layer" style="background-image: url('assets/svg_true_layer_4.webp');"></div>
        <div class="hero-sakura-layer" style="background-image: url('assets/svg_true_layer_6.webp');"></div>
    </div>

    <div class="hero-container container">
        <div class="hero-content-box">
            <!-- Logo Oficial con Letras Negras Originales y Sello Kanji -->
            <div class="hero-logo-box">
                <img src="assets/logo_typography_dark.webp" 
                     alt="La Ruta del Samurái - Jorge Orpianesi" 
                     class="hero-logo-img" 
                     loading="eager" 
                     fetchpriority="high">
            </div>

            <h2 class="hero-tagline">LA SENDA DE LA HISTORIA Y EL BUDO</h2>
            <p class="hero-desc">
                Sigue las huellas de Miyamoto Musashi. Un fascinante viaje por la geografía, templos y castillos feudales del Japón tradicional.
            </p>

            <!-- Botones de Acción de Alto Contraste -->
            <div class="hero-actions">
                <a href="#sinopsis" class="btn btn-primary">Explorar Libros</a>
                <a href="#ediciones" class="btn btn-hero-comprar">Comprar Ediciones</a>
            </div>
        </div>
    </div>
</section>
