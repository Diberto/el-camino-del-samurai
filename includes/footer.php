<?php
/**
 * PIE DE PÁGINA GLOBAL
 */
$social = $settings['social'] ?? [];
?>
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="footer-logo">
                    <img src="assets/kanji_stamp.webp" alt="Sello Kanji" class="footer-logo-stamp">
                    <span class="footer-logo-text">LA RUTA DEL SAMURÁI</span>
                </div>
                <p class="footer-tagline">La senda de la historia, las artes marciales y la filosofía de los guerreros eternos.</p>
                <p class="footer-address">
                    📍 <strong><?= e($settings['address'] ?? 'Budokan Argentina - Sarmiento 375, Córdoba, Argentina') ?></strong>
                </p>
            </div>

            <div class="footer-links">
                <h4 class="footer-title">Navegación</h4>
                <ul>
                    <li><a href="index.php#inicio">Inicio</a></li>
                    <li><a href="index.php#sinopsis">El Libro</a></li>
                    <li><a href="index.php#opiniones">Opiniones de Lectores</a></li>
                    <li><a href="index.php#redes">Redes Sociales</a></li>
                    <li><a href="index.php#ediciones">Ediciones</a></li>
                    <li><a href="index.php#autor">El Autor</a></li>
                    <li><a href="blog.php">Blog del Budo</a></li>
                    <li><a href="index.php#contacto">Contacto</a></li>
                </ul>
            </div>

            <div class="footer-social-col">
                <h4 class="footer-title">Sigue la Ruta</h4>
                <p class="footer-social-desc">Acompáñanos en las redes oficiales para descubrir documentales, fotos de Japón y debates marciales.</p>
                <div class="footer-social-icons">
                    <?php if (!empty($social['youtube']['url'])): ?>
                        <a href="<?= e($social['youtube']['url']) ?>" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($social['instagram']['url'])): ?>
                        <a href="<?= e($social['instagram']['url']) ?>" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($social['facebook']['url'])): ?>
                        <a href="<?= e($social['facebook']['url']) ?>" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($settings['whatsapp_url'])): ?>
                        <a href="<?= e($settings['whatsapp_url']) ?>" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?= date('Y') ?> La Ruta del Samurái - Jorge Orpianesi. Todos los derechos reservados.</p>
        </div>
    </div>
</footer>

<!-- Botón Flotante Scroll to Top -->
<button id="scroll-top" class="scroll-top-btn" aria-label="Volver arriba">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
</button>

<!-- Lightbox Modal Global para Fotos de Lectores y Galería -->
<div id="samurai-lightbox" class="gallery-lightbox" aria-hidden="true" role="dialog">
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-container">
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Cerrar">&times;</button>
        <img src="" alt="Vista previa ampliada" id="lightbox-zoom-img">
        <div class="lightbox-info">
            <span class="lightbox-tag" id="lightbox-zoom-tag">📸 Fotografía</span>
            <h3 class="lightbox-title" id="lightbox-zoom-title"></h3>
        </div>
    </div>
</div>

<!-- JavaScript Ligero y Universal -->
<script src="js/main.js?v=2.0"></script>
</body>
</html>
