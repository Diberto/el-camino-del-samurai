<?php
/**
 * SECCIÓN EDICIONES DISPONIBLES
 */
?>
<section id="ediciones" class="section editions-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">ADQUIRIR LA OBRA</span>
            <h2 class="section-title">Ediciones Disponibles</h2>
            <p class="section-desc">Consigue los libros en formato físico o digital a nivel internacional o recíbelos en Argentina firmados y dedicados.</p>
        </div>

        <div class="editions-grid">
            <!-- Opción 1: Digital y Físico (Amazon Global) -->
            <div class="edition-card">
                <div class="edition-badge">ENVÍO INTERNACIONAL</div>
                <div class="edition-icon">🌍</div>
                <h3 class="edition-title">Digital y Físico</h3>
                <span class="edition-subtitle">Disponible en Amazon Global</span>
                <p class="edition-desc">
                    Adquiere la versión eBook para Kindle o la edición en papel con tapa blanda/dura con entrega rápida en todo el mundo.
                </p>
                <ul class="edition-features">
                    <li>✓ Formato Kindle y Tapa Blanda / Dura</li>
                    <li>✓ Entrega global garantizada por Amazon</li>
                    <li>✓ Tomo I y Tomo II disponibles</li>
                </ul>
                <a href="<?= e($settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
                    Comprar en Amazon Global
                </a>
            </div>

            <!-- Opción 2: Físico para Argentina (Budokan Web + WhatsApp) -->
            <div class="edition-card featured-edition">
                <div class="edition-badge badge-gold">ARGENTINA DIRECTO</div>
                <div class="edition-icon">🇦🇷</div>
                <h3 class="edition-title">Físico para Argentina</h3>
                <span class="edition-subtitle">Tienda Budokan & Ejemplar Firmado</span>
                <p class="edition-desc">
                    Compra tu libro directamente en la tienda oficial de Budokan Web o pídelo por WhatsApp para recibirlo firmado y dedicado por Jorge Orpianesi.
                </p>
                <ul class="edition-features">
                    <li>✓ Ejemplar impreso de alta calidad</li>
                    <li>✓ Opción de dedicatoria y firma del autor</li>
                    <li>✓ Envíos a todo el territorio argentino</li>
                </ul>
                <div class="edition-actions">
                    <a href="<?= e($settings['budokan_url'] ?? 'https://www.budokanweb.com/categoria-producto/libros/') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block btn-budokan">
                        🛒 Comprar en Budokan Web
                    </a>
                    <a href="<?= e($settings['whatsapp_url'] ?? 'https://wa.me/5493513886443') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-block">
                        ✍️ Pedir firmado por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
