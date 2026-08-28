<?php
/**
 * SECCIÓN GALERÍA DE LA TRAVESÍA (DISEÑO ORIGINAL)
 */
$galeria = get_json_data('galeria.json', []);
?>
<!-- Sección Galería Fotográfica de Japón -->
<section class="section gallery-section" id="galeria">
    <div class="container">
        <div class="section-header text-center fade-in">
            <span class="section-subtitle">EXPEDICIONES Y FOTOGRAFÍA</span>
            <h2 class="section-title">Galería de la Travesía</h2>
            <p class="section-desc">Un recorrido visual exclusivo por los santuarios, castillos feudales y caminos sagrados que forman la esencia de las obras de Jorge Orpianesi.</p>
        </div>

        <div class="gallery-grid fade-in">
            <?php foreach ($galeria as $item): ?>
                <div class="gallery-card" 
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
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
