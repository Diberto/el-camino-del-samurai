<?php
/**
 * SECCIÓN CONTACTO OFICIAL
 */
$social = $settings['social'] ?? [];
?>
<section id="contacto" class="section contact-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">CANALES DIRECTOS</span>
            <h2 class="section-title">Contacto Oficial</h2>
            <p class="section-desc">Ponte en contacto para consultas literarias, seminarios, charlas o pedidos especiales de libros dedicados.</p>
        </div>

        <div class="contact-cards-grid">
            <!-- Tarjeta Dirección Física -->
            <div class="contact-card">
                <div class="contact-icon loc-icon">📍</div>
                <h3 class="contact-card-title">Sede Central</h3>
                <span class="contact-highlight">Budokan Argentina</span>
                <p class="contact-desc">
                    <?= e($settings['address'] ?? 'Sarmiento 375, Córdoba, República Argentina. CP: 5000') ?>
                </p>
                <a href="https://maps.google.com/?q=<?= urlencode($settings['address'] ?? 'Sarmiento 375, Córdoba, Argentina') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                    Ver en Google Maps
                </a>
            </div>

            <!-- Tarjeta WhatsApp -->
            <div class="contact-card highlight-contact-card">
                <div class="contact-icon wa-icon">💬</div>
                <h3 class="contact-card-title">WhatsApp Directo</h3>
                <span class="contact-highlight"><?= e($settings['whatsapp'] ?? '+549 351 3886443') ?></span>
                <p class="contact-desc">
                    Atención personalizada para consultas sobre la obra, pedidos de libros dedicados y actividades marciales.
                </p>
                <a href="<?= e($settings['whatsapp_url'] ?? 'https://wa.me/5493513886443') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-whatsapp">
                    Enviar mensaje de WhatsApp
                </a>
            </div>

            <!-- Tarjeta Email -->
            <div class="contact-card">
                <div class="contact-icon mail-icon">✉️</div>
                <h3 class="contact-card-title">Correo Electrónico</h3>
                <span class="contact-highlight"><?= e($settings['email'] ?? 'budokanorpianesi@hotmail.com') ?></span>
                <p class="contact-desc">
                    Escríbenos directamente para prensa, entrevistas, seminarios o distribución internacional.
                </p>
                <a href="mailto:<?= e($settings['email'] ?? 'budokanorpianesi@hotmail.com') ?>" class="btn btn-secondary btn-sm">
                    Enviar un Email
                </a>
            </div>
        </div>
    </div>
</section>
