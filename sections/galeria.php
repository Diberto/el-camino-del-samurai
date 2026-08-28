<?php
/**
 * SECCIÓN GALERÍA DE FOTOS
 */
$galeria = get_json_data('galeria.json', []);
?>
<section id="galeria" class="section gallery-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">EXPEDICIONES EN JAPÓN</span>
            <h2 class="section-title">Galería Fotográfica</h2>
            <p class="section-desc">Imágenes registradas durante las travesías históricas por templos, castillos y pasos medievales japoneses.</p>
        </div>

        <div class="gallery-grid">
            <?php foreach ($galeria as $item): ?>
                <div class="gallery-card" 
                     data-src="<?= e($item['image']) ?>" 
                     data-title="<?= e($item['title']) ?>"
                     data-tag="<?= e($item['tag'] ?? 'Japón') ?>">
                    <div class="gallery-img-box">
                        <img src="<?= e($item['image']) ?>" 
                             alt="<?= e($item['title']) ?>" 
                             class="gallery-thumbnail" 
                             loading="lazy" 
                             onerror="this.src='<?= e($item['fallback'] ?? 'assets/orpianesi1.webp') ?>'">
                        <div class="gallery-hover-overlay">
                            <span class="gallery-tag"><?= e($item['tag'] ?? 'Japón') ?></span>
                            <h3 class="gallery-card-title"><?= e($item['title']) ?></h3>
                            <span class="gallery-zoom-icon">🔍 Ampliar foto</span>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
