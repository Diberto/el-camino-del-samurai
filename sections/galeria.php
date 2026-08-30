<?php
/**
 * SECCIÓN GALERÍA DE LA TRAVESÍA - FORMATO GALERÍA CON LIGHTBOX Y CONTROLES DE DESPLAZAMIENTO
 */
$galeria_all = get_json_data('galeria.json', []);
$gallery_limit = (int)($settings['home_gallery_limit'] ?? 8);
$galeria = ($gallery_limit > 0) ? array_slice($galeria_all, 0, $gallery_limit) : $galeria_all;
$total_fotos = count($galeria);
?>
<!-- Sección Galería Fotográfica de Japón -->
<section class="section gallery-section" id="galeria">
    <div class="container">
        <div class="section-header text-center fade-in">
            <span class="section-subtitle">Expediciones y fotografía</span>
            <h2 class="section-title">Galería de las travesías</h2>
            <p class="section-desc">Un recorrido visual por los lugares sagrados de la historia samurái con fotografías tomadas por el autor en sus viajes</p>
        </div>

        <!-- Barra de Controles de la Galería -->
        <div class="gallery-controls-bar fade-in">
            <div class="gallery-counter-tag">
                <span>📸 Mostrando <?= $total_fotos ?> fotografías</span>
            </div>

            <div class="gallery-nav-buttons">
                <button type="button" class="gallery-nav-btn" id="gallery-scroll-prev" aria-label="Desplazar a la izquierda" title="Ver fotos anteriores">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button type="button" class="gallery-nav-btn" id="gallery-scroll-next" aria-label="Desplazar a la derecha" title="Ver siguientes fotos">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Contenedor / Carrusel de Galería -->
        <div class="gallery-track-wrapper fade-in" id="gallery-track-wrapper">
            <div class="gallery-grid" id="gallery-scroll-track">
                <?php foreach ($galeria as $index => $item): ?>
                    <div class="gallery-card" 
                         data-gallery-index="<?= $index ?>"
                         data-src="<?= e($item['image']) ?>" 
                         data-title="<?= e($item['title']) ?>" 
                         data-tag="<?= e($item['tag'] ?? 'Fotografía') ?>">
                        <div class="gallery-thumb-wrapper">
                            <img src="<?= e($item['image']) ?>" 
                                 alt="<?= e($item['title']) ?>" 
                                 loading="lazy" 
                                 onerror="this.src='photos/castillo_sengoku.webp'">
                            <div class="gallery-overlay">
                                <?php if (!empty($item['tag'])): ?>
                                    <span class="gallery-tag"><?= e($item['tag']) ?></span>
                                <?php endif; ?>
                                <h4 class="gallery-card-title"><?= e($item['title']) ?></h4>
                                <span class="gallery-zoom-icon">🔍 Ampliar foto</span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Pie de Galería con Botón para Abrir Visor Completo -->
        <div class="gallery-footer-actions text-center fade-in">
            <button type="button" class="btn btn-secondary" id="btn-open-gallery-lightbox">
                🖼️ Explorar Galería en Pantalla Completa
            </button>
        </div>
    </div>
</section>
