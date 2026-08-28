<?php
/**
 * SECCIÓN REDES SOCIALES Y COMUNIDAD OFICIAL (MACRO ENLACES ORIGINALES)
 */
$social = $settings['social'] ?? [];
?>
<!-- Sección Redes Sociales y Comunidad Oficial (Macro Enlaces) -->
<section class="section social-section" id="redes" aria-label="Redes Sociales y Comunidad Oficial">
    <div class="container text-center">
        <div class="section-header fade-in">
            <span class="section-subtitle">COMUNIDAD Y CONTENIDO EXCLUSIVO</span>
            <h2 class="section-title">Sigue la ruta del samurái en las redes</h2>
            <p class="section-desc">Acompáñanos en nuestras expediciones documentales por Japón, análisis históricos del Bushido, videos técnicos y novedades literarias.</p>
        </div>

        <div class="social-macro-grid fade-in">
            <!-- Tarjeta YouTube -->
            <a href="<?= e($social['youtube']['url'] ?? 'https://www.youtube.com/@larutadelsamurai') ?>" target="_blank" rel="noopener noreferrer" class="social-macro-card youtube-macro-card" aria-label="Canal Oficial de YouTube">
                <div class="social-macro-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </div>
                <div class="social-macro-content">
                    <span class="social-macro-platform">CANAL OFICIAL</span>
                    <h3 class="social-macro-title">YouTube</h3>
                    <p class="social-macro-handle"><?= e($social['youtube']['handle'] ?? '@larutadelsamurai') ?></p>
                    <p class="social-macro-desc"><?= e($social['youtube']['desc'] ?? 'Documentales in situ por castillos, templos y campos de batalla de Japón, entrevistas y técnicas de artes marciales tradicionales.') ?></p>
                    <span class="social-macro-btn">Ver Videos y Suscribirse &rarr;</span>
                </div>
            </a>

            <!-- Tarjeta Instagram -->
            <a href="<?= e($social['instagram']['url'] ?? 'https://www.instagram.com/la.ruta.del.samurai/') ?>" target="_blank" rel="noopener noreferrer" class="social-macro-card instagram-macro-card" aria-label="Instagram Oficial">
                <div class="social-macro-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </div>
                <div class="social-macro-content">
                    <span class="social-macro-platform">FOTOGRAFÍA & HISTORIAS</span>
                    <h3 class="social-macro-title">Instagram</h3>
                    <p class="social-macro-handle"><?= e($social['instagram']['handle'] ?? '@la.ruta.del.samurai') ?></p>
                    <p class="social-macro-desc"><?= e($social['instagram']['desc'] ?? 'Fotografías diarias de expediciones, dojos ancestrales, arquitectura samurai y el día a día de Jorge Orpianesi en Japón.') ?></p>
                    <span class="social-macro-btn">Seguir en Instagram &rarr;</span>
                </div>
            </a>

            <!-- Tarjeta Facebook -->
            <a href="<?= e($social['facebook']['url'] ?? 'https://www.facebook.com/jorgeorpianesi') ?>" target="_blank" rel="noopener noreferrer" class="social-macro-card facebook-macro-card" aria-label="Página de Facebook Oficial">
                <div class="social-macro-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </div>
                <div class="social-macro-content">
                    <span class="social-macro-platform">COMUNIDAD OFICIAL</span>
                    <h3 class="social-macro-title">Facebook</h3>
                    <p class="social-macro-handle"><?= e($social['facebook']['handle'] ?? 'Jorge Orpianesi / La Ruta del Samurái') ?></p>
                    <p class="social-macro-desc"><?= e($social['facebook']['desc'] ?? 'Punto de encuentro para lectores, debates marciales, presentaciones de libros, transmisiones en vivo y eventos especiales.') ?></p>
                    <span class="social-macro-btn">Unirse a la Comunidad &rarr;</span>
                </div>
            </a>
        </div>
    </div>
</section>
