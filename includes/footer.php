<?php
/**
 * PIE DE PÁGINA GLOBAL (DISEÑO ORIGINAL)
 */
$social = $settings['social'] ?? [];
?>
    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.php#inicio" class="footer-logo">
                        <img src="assets/kanji_stamp.webp" alt="Sello Kanji La Ruta del Samurái" class="footer-logo-stamp">
                        <span>La Ruta del Samurái</span>
                    </a>
                    <p>Viajes históricos y crónicas por la senda de los guerreros budoka de Japón.</p>
                    <div class="footer-social-icons">
                        <a href="https://www.instagram.com/la.ruta.del.samurai/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@larutadelsamurai" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/jorgeorpianesi" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="index.php#inicio">Inicio</a></li>
                        <li><a href="index.php#sinopsis">El Libro</a></li>
                        <li><a href="index.php#opiniones">Opiniones</a></li>
                        <li><a href="index.php#redes">Redes Sociales</a></li>
                        <li><a href="index.php#ediciones">Ediciones</a></li>
                        <li><a href="index.php#autor">Autor</a></li>
                        <li><a href="index.php#galeria">Galería</a></li>
                        <li><a href="blog.php">Blog</a></li>
                        <li><a href="index.php#contacto">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Contacto & Dojo</h4>
                    <ul>
                        <li><a href="https://wa.me/5493513886443" target="_blank" rel="noopener">WhatsApp: +549 351 3886443</a></li>
                        <li><a href="mailto:budokanorpianesi@hotmail.com">budokanorpianesi@hotmail.com</a></li>
                        <li><span>Budokan: Sarmiento 375, Córdoba</span></li>
                        <li><span>República Argentina · CP: 5000</span></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?= date('Y') ?> La Ruta del Samurái. Todos los derechos reservados. Libros oficiales de Jorge Orpianesi.</p>
            </div>
        </div>
    </footer>

    <!-- Lightbox Modal para la Galería -->
    <div class="gallery-lightbox" id="gallery-lightbox" aria-hidden="true" role="dialog">
        <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
        <div class="lightbox-container">
            <button class="lightbox-close" id="lightbox-close" aria-label="Cerrar vista">&times;</button>
            <img src="" alt="Vista ampliada" id="lightbox-img">
            <div class="lightbox-info">
                <span class="lightbox-tag" id="lightbox-tag"></span>
                <h3 class="lightbox-title" id="lightbox-title"></h3>
            </div>
        </div>
    </div>

    <!-- Botón Flotante Scroll to Top -->
    <button id="scroll-top" aria-label="Volver arriba">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    </button>

    <!-- JS Link -->
    <script src="js/main.js?v=3.0"></script>
</body>
</html>
