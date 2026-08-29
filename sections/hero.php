<?php
/**
 * SECCIÓN HERO / PORTADA PRINCIPAL OFICIAL
 * Tonos cálidos pergamino a juego con el logo original, sin duplicación de logo y con lluvia de sakura.
 */
?>
<!-- Hero Section (Diseño Oficial Unificado) -->
<section class="hero-parallax" id="inicio">
    <!-- Fondo Atmosférico Cálido estilo Pergamino Tradicional -->
    <div class="hero-bg-container">
        <div class="hero-bg-glow"></div>
    </div>
    
    <!-- Contenedor Principal del Hero -->
    <div class="hero-stage">
        <div class="parallax-text">
            <div class="hero-content">
                <div class="hero-main-logo-wrapper">
                    <img src="assets/enso_emblem_centered.png" 
                         alt="Emblema Enso Samurái" 
                         class="hero-logo-emblem" 
                         fetchpriority="high" 
                         decoding="async">
                    <img src="assets/logo_typography_dark.webp" 
                         alt="La Ruta del Samurái - Jorge Orpianesi" 
                         class="hero-logo-typography" 
                         id="hero-logo-main" 
                         fetchpriority="high" 
                         decoding="async">
                </div>
                <h2 class="hero-tagline">LA SENDA DE LA HISTORIA Y EL BUDO</h2>
                <p class="hero-desc">
                    Un recorrido por el Japón de los samuráis a través de los libros y canales de difusión de un estudioso de la cultura y la historia del país del sol naciente
                </p>
                <div class="hero-actions">
                    <a href="#sinopsis" class="btn btn-primary">Explorar Libros</a>
                    <a href="#ediciones" class="btn btn-secondary">Comprar</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Capa de Niebla Atmosférica Inferior -->
    <div class="hero-mist-layer">
        <div class="mist-wave mist-wave-1"></div>
        <div class="mist-wave mist-wave-2"></div>
    </div>

    <!-- Capa inferior de degradado para fusionar el final del hero -->
    <div class="hero-overlay-bottom"></div>
</section>
