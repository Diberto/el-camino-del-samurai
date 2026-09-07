<?php
/**
 * SECCIÓN DE OPINIONES Y TESTIMONIOS DE LECTORES (CONFIGURABLE DESDE ADMIN)
 */
$opiniones_all = get_json_data('opiniones.json', []);
$reviews_limit = (int)($settings['home_reviews_limit'] ?? 0);
$opiniones = ($reviews_limit > 0 && $reviews_limit < count($opiniones_all)) ? array_slice($opiniones_all, 0, $reviews_limit) : $opiniones_all;
$default_filter = $settings['reviews_default_filter'] ?? 'all';
?>
<!-- Sección de Opiniones y Testimonios de Lectores -->
<section class="section reviews-section" id="opiniones" aria-label="Opiniones de Lectores">
    <div class="container">
        <div class="section-header center fade-in">
            <span class="section-subtitle">Testimonios y comunidad</span>
            <h2 class="section-title">Opiniones de nuestros lectores</h2>
            <p class="section-desc">Experiencias, valoraciones y fotografías de nuestros seguidores apasionados por la cultura samurái.</p>
        </div>

        <!-- Filtros de Opiniones (Configurable desde Admin) -->
        <div class="reviews-filter-wrapper fade-in">
            <button class="review-filter-btn <?= $default_filter === 'all' ? 'active' : '' ?>" data-filter="all">Todas las Opiniones</button>
            <button class="review-filter-btn <?= $default_filter === 'photo' ? 'active' : '' ?>" data-filter="photo">📸 Con Foto / Captura</button>
            <button class="review-filter-btn <?= $default_filter === 'text' ? 'active' : '' ?>" data-filter="text">✍️ Reseñas Escritas</button>
        </div>

        <!-- Grid de Opiniones Mixtas -->
        <div class="reviews-grid fade-in" id="reviews-grid">
            <?php foreach ($opiniones as $rev): ?>
                <?php 
                    $card_type = $rev['type'] ?? 'text';
                    $is_visible = ($default_filter === 'all' || $card_type === $default_filter);
                    $stars = str_repeat('★', (int)($rev['rating'] ?? 5));
                    $text_len = mb_strlen($rev['text'] ?? '');
                ?>
                <?php if ($card_type === 'photo' && !empty($rev['photo'])): ?>
                    <!-- Tarjeta con Foto -->
                    <article class="review-card review-card-photo" 
                             data-id="<?= e($rev['id'] ?? '') ?>"
                             data-type="photo" 
                             data-name="<?= e($rev['name'] ?? '') ?>"
                             data-role="<?= e($rev['role'] ?? '') ?>"
                             data-photo="<?= e($rev['photo'] ?? '') ?>"
                             data-photo-title="<?= e($rev['photo_title'] ?? $rev['name'] ?? '') ?>"
                             data-rating="<?= (int)($rev['rating'] ?? 5) ?>"
                             data-date="<?= e($rev['date'] ?? '') ?>"
                             data-verified="<?= !empty($rev['verified']) ? '1' : '0' ?>"
                             tabindex="0"
                             role="button"
                             aria-label="Ver reseña de <?= e($rev['name'] ?? '') ?>"
                             style="display: <?= $is_visible ? 'flex' : 'none' ?>;">
                        <div class="review-photo-wrapper" data-src="<?= e($rev['photo']) ?>" data-title="<?= e($rev['photo_title'] ?? $rev['name']) ?>">
                            <img src="<?= e($rev['photo']) ?>" alt="<?= e($rev['name']) ?>" loading="lazy" class="review-photo-img" onerror="this.src='photos/orpianesi1.webp'">
                            <div class="review-photo-badge">📸 <?= e($rev['photo_badge'] ?? 'Foto de Lector') ?></div>
                            <div class="review-photo-overlay">
                                <span>🔍 Clic para ampliar</span>
                            </div>
                        </div>
                        <div class="review-content">
                            <div class="review-stars"><?= $stars ?></div>
                            <p class="review-caption review-text-clamped">"<?= e($rev['text']) ?>"</p>
                            <div class="review-read-more-wrapper">
                                <button type="button" class="review-read-more-btn">Ver más →</button>
                            </div>
                            <div class="review-author">
                                <strong><?= e($rev['name']) ?></strong>
                                <span><?= e($rev['role']) ?></span>
                            </div>
                        </div>
                        <div class="review-full-text" style="display: none;"><?= htmlspecialchars($rev['text'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                    </article>
                <?php else: ?>
                    <!-- Tarjeta de Reseña de Texto con Avatar Miniatura si tiene foto -->
                    <article class="review-card review-card-text" 
                             data-id="<?= e($rev['id'] ?? '') ?>"
                             data-type="text" 
                             data-name="<?= e($rev['name'] ?? '') ?>"
                             data-role="<?= e($rev['role'] ?? '') ?>"
                             data-photo="<?= e($rev['photo'] ?? '') ?>"
                             data-rating="<?= (int)($rev['rating'] ?? 5) ?>"
                             data-date="<?= e($rev['date'] ?? '') ?>"
                             data-verified="<?= !empty($rev['verified']) ? '1' : '0' ?>"
                             tabindex="0"
                             role="button"
                             aria-label="Ver reseña de <?= e($rev['name'] ?? '') ?>"
                             style="display: <?= $is_visible ? 'flex' : 'none' ?>;">
                        <div class="review-quote-mark">“</div>
                        <div class="review-card-text-inner">
                            <div class="review-stars"><?= $stars ?></div>
                            <blockquote class="review-body review-text-clamped">
                                "<?= e($rev['text']) ?>"
                            </blockquote>
                            <div class="review-read-more-wrapper">
                                <button type="button" class="review-read-more-btn">Ver más →</button>
                            </div>
                        </div>
                        <div class="review-footer">
                            <?php if (!empty($rev['photo'])): ?>
                                <div class="review-avatar-photo">
                                    <img src="<?= e($rev['photo']) ?>" alt="<?= e($rev['name']) ?>" onerror="this.parentElement.className='review-avatar-text'; this.parentElement.innerText='<?= e(strtoupper(substr($rev['name'], 0, 2))) ?>';">
                                </div>
                            <?php else: ?>
                                <div class="review-avatar-text"><?= e(strtoupper(substr($rev['name'], 0, 2))) ?></div>
                            <?php endif; ?>
                            <div class="review-author">
                                <strong><?= e($rev['name']) ?></strong>
                                <span><?= e($rev['role']) ?></span>
                            </div>
                        </div>
                        <?php if (!empty($rev['verified'])): ?>
                            <div class="review-tag-badge">✓ Compra Verificada</div>
                        <?php endif; ?>
                        <div class="review-full-text" style="display: none;"><?= htmlspecialchars($rev['text'] ?? '', ENT_QUOTES, 'UTF-8') ?></div>
                    </article>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>

        <!-- Paginación de Opiniones Dinámica -->
        <nav class="reviews-pagination blog-pagination" id="reviews-pagination" aria-label="Paginación de opiniones"></nav>

        <!-- Botón para enviar testimonio por WhatsApp -->
        <div class="reviews-cta-box center fade-in">
            <p class="reviews-cta-title">¿Ya leíste el libro o recibiste tu ejemplar?</p>
            <p class="reviews-cta-desc">Envíanos tu foto o testimonio para publicarlo en la web oficial y redes sociales.</p>
            <a href="https://wa.me/5493513886443?text=Hola%20Jorge,%20te%20env%C3%ADo%20mi%20opini%C3%B3n/foto%20sobre%20el%20libro%20de%20El%20Camino%20del%20Samur%C3%A1i" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-whatsapp-cta">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.178.181-.077.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.861.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
                <span>Compartir mi Opinión por WhatsApp</span>
            </a>
        </div>
    </div>

    <!-- Modal Elegante para Ampliar la Opinión Completa -->
    <div class="review-modal" id="review-modal" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="review-modal-backdrop" id="review-modal-backdrop"></div>
        <div class="review-modal-card">
            <button type="button" class="review-modal-close" id="review-modal-close" aria-label="Cerrar reseña">&times;</button>
            
            <div class="review-modal-media" id="review-modal-media" style="display: none;">
                <img src="" alt="Foto de lector" id="review-modal-img">
                <span class="review-modal-badge" id="review-modal-badge">📸 Foto de Lector</span>
            </div>

            <div class="review-modal-content">
                <div class="review-modal-header">
                    <div class="review-stars" id="review-modal-stars">★★★★★</div>
                    <div class="review-tag-badge" id="review-modal-verified" style="display: none;">✓ Compra Verificada</div>
                </div>
                
                <div class="review-modal-quote-mark">“</div>
                <blockquote class="review-modal-body" id="review-modal-body">
                    <!-- Texto completo de la opinión inyectado por JS -->
                </blockquote>

                <div class="review-modal-footer">
                    <div class="review-modal-avatar" id="review-modal-avatar"></div>
                    <div class="review-author">
                        <strong id="review-modal-author"></strong>
                        <span id="review-modal-role"></span>
                    </div>
                    <span class="review-modal-date" id="review-modal-date"></span>
                </div>
            </div>
        </div>
    </div>
</section>
