<?php
/**
 * SECCIÓN HERO / PORTADA PRINCIPAL (PARALLAX MULTICAPA ORIGINAL)
 */
?>
<!-- Hero Section (Parallax Multicapa SVG Impecable) -->
<section class="hero-parallax" id="inicio">
    <!-- Capa de Cielos Animados (Día & Noche - GPU Accelerated) -->
    <div class="sky-container" id="sky-container">
        <!-- Cielo de Día (Azul Profundo & Nubes de Fondo) -->
        <div class="sky-layer sky-day">
            <div class="sun-glow"></div>
            <canvas id="clouds-bg-canvas"></canvas>
        </div>
        <!-- Cielo de Noche (Estrellas & Aura Índigo) -->
        <div class="sky-layer sky-night">
            <canvas id="starfield-canvas"></canvas>
            <div class="moon-aura"></div>
        </div>
    </div>
    
    <!-- Contenedor de Escenario Parallax de Ancho Máximo 1280px en Desktop -->
    <div class="hero-stage">
        <!-- Capa 1: Monte Fuji Nevado (SVG Layer 1) -->
        <div class="parallax-layer layer-svg-1" style="background-image: url('assets/svg_true_layer_1.webp');"></div>
        
        <!-- Capa 1.5: Nubes Frontales Volumétricas -->
        <canvas id="clouds-fg-canvas" class="parallax-layer layer-clouds-fg"></canvas>
        
        <!-- Capa 2: Río / Camino Serpenteante (SVG Layer 2) -->
        <div class="parallax-layer layer-svg-2" style="background-image: url('assets/svg_true_layer_2.webp');"></div>
        
        <!-- Capa 3: Terreno y Rocas (SVG Layer 3) -->
        <div class="parallax-layer layer-svg-3" style="background-image: url('assets/svg_true_layer_3.webp');"></div>
        
        <!-- Capa 4: Samurái Ilustrado en Acantilado (SVG Layer 4) -->
        <div class="parallax-layer layer-svg-4" style="background-image: url('assets/svg_true_layer_4.webp');"></div>
        
        <!-- Capa 7: Marco Enso Sumi-e (SVG Layer 5) -->
        <div class="parallax-layer layer-svg-5" style="background-image: url('assets/svg_true_layer_5.webp');"></div>
        
        <!-- Capa 8: Rama de Sakura y Flores (SVG Layer 6) -->
        <div class="parallax-layer layer-svg-6" style="background-image: url('assets/svg_true_layer_6.webp');"></div>
        
        <!-- Capa 9: Pétalos Flotantes (SVG Layers 7 & 8) -->
        <div class="parallax-layer layer-svg-7" style="background-image: url('assets/svg_true_layer_7.webp');"></div>
        <div class="parallax-layer layer-svg-8" style="background-image: url('assets/svg_true_layer_8.webp');"></div>
        
        <!-- Capa 10: Contenido Principal con el Logo Tipográfico Oficial (Letras Negras Originales) -->
        <div class="parallax-layer parallax-text">
            <div class="hero-content">
                <div class="hero-main-logo-wrapper">
                    <img src="assets/logo_hero_complete.svg" 
                         alt="La Ruta del Samurái - Jorge Orpianesi" 
                         class="hero-logo-main" 
                         id="hero-logo-main" 
                         fetchpriority="high" 
                         decoding="async">
                </div>
                <h2 class="hero-tagline">LA SENDA DE LA HISTORIA Y EL BUDO</h2>
                <p class="hero-desc">
                    Sigue las huellas de Miyamoto Musashi. Un fascinante viaje por la geografía, templos y castillos feudales del Japón tradicional.
                </p>
                <div class="hero-actions">
                    <a href="#sinopsis" class="btn btn-primary">Explorar Libros</a>
                    <a href="#ediciones" class="btn btn-secondary">Comprar</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Capa de Niebla Atmosférica Inferior (Mist/Fog Místico de Ancho Completo) -->
    <div class="hero-mist-layer">
        <div class="mist-wave mist-wave-1"></div>
        <div class="mist-wave mist-wave-2"></div>
    </div>

    <!-- Capa inferior de degradado para fusionar el final del hero -->
    <div class="hero-overlay-bottom"></div>
</section>
