<?php
/**
 * SECCIÓN OPINIONES DE NUESTROS LECTORES
 */
$opiniones = get_json_data('opiniones.json', []);
?>
<section id="opiniones" class="section reviews-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">COMUNIDAD MARCIAL</span>
            <h2 class="section-title">Opiniones de nuestros lectores</h2>
            <p class="section-desc">Testimonios, reseñas y fotografías de practicantes de artes marciales, historiadores y viajeros apasionados.</p>
        </div>

        <!-- Filtros de Opiniones -->
        <div class="reviews-filter-bar">
            <button class="btn-filter active" data-filter="all">Todas las opiniones</button>
            <button class="btn-filter" data-filter="photo">📸 Con Fotos de Lectores</button>
            <button class="btn-filter" data-filter="text">✍️ Reseñas Literarias</button>
        </div>

        <!-- Cuadrícula de Opiniones -->
        <div class="reviews-grid">
            <?php foreach ($opiniones as $rev): ?>
                <div class="review-card" data-type="<?= e($rev['type']) ?>">
                    <?php if (!empty($rev['photo'])): ?>
                        <div class="review-photo-wrapper" 
                             data-src="<?= e($rev['photo']) ?>" 
                             data-title="<?= e($rev['photo_title'] ?? $rev['name']) ?>">
                            <img src="<?= e($rev['photo']) ?>" 
                                 alt="<?= e($rev['name']) ?>" 
                                 class="review-photo-img" 
                                 loading="lazy" 
                                 onerror="this.src='assets/orpianesi1.webp'">
                            <span class="review-zoom-badge">🔍 Ampliar foto</span>
                        </div>
                    <?php endif; ?>

                    <div class="review-card-content">
                        <div class="review-stars">
                            <?php for ($i = 0; $i < (int)($rev['rating'] ?? 5); $i++): ?>★<?php endfor; ?>
                        </div>
                        <p class="review-text">"<?= e($rev['text']) ?>"</p>
                        
                        <div class="review-author-meta">
                            <h4 class="review-name"><?= e($rev['name']) ?></h4>
                            <span class="review-role"><?= e($rev['role']) ?></span>
                            <?php if (!empty($rev['verified'])): ?>
                                <span class="verified-pill">✓ Lector Verificado</span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
