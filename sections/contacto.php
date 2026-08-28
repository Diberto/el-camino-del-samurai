<?php
/**
 * SECCIÓN DE CONTACTO OFICIAL Y REDES (DISEÑO ORIGINAL)
 */
?>
<!-- Sección de Contacto Oficial -->
<section class="section contact-section" id="contacto" aria-label="Contacto Oficial y Redes">
    <div class="container">
        <div class="section-header text-center fade-in">
            <span class="section-subtitle">CANALES DIRECTOS</span>
            <h2 class="section-title">Contacto Oficial</h2>
            <p class="section-desc">Ponte en contacto directo con Jorge Orpianesi para pedidos de libros dedicados en Argentina, consultas sobre seminarios y presentaciones.</p>
        </div>

        <div class="contact-cards-grid fade-in">
            <!-- Tarjeta 1: WhatsApp -->
            <div class="contact-card highlight-card">
                <div class="contact-icon whatsapp-icon">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.178.181-.077.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.861.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
                    </svg>
                </div>
                <h3>WhatsApp Directo</h3>
                <p class="contact-highlight"><?= e($settings['whatsapp'] ?? '+549 351 3886443') ?></p>
                <p class="contact-desc">Atención rápida para consultas, pedidos de libros dedicados y envíos en toda Argentina.</p>
                <a href="<?= e($settings['whatsapp_url'] ?? 'https://wa.me/5493513886443?text=Hola%20Jorge,%20me%20comunico%20desde%20la%20web%20de%20El%20Camino%20del%20Samur%C3%A1i') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Enviar WhatsApp</a>
            </div>

            <!-- Tarjeta 2: Dirección Física -->
            <div class="contact-card">
                <div class="contact-icon location-icon">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </div>
                <h3>Dirección & Dojo</h3>
                <p class="contact-highlight">Budokan Argentina</p>
                <p class="contact-desc"><?= e($settings['address'] ?? 'Sarmiento 375, Córdoba, República Argentina.') ?><br><strong>Código Postal:</strong> 5000</p>
                <a href="https://maps.google.com/?q=<?= urlencode($settings['address'] ?? 'Sarmiento 375, Córdoba, Argentina') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-secondary block text-center">Ver en Google Maps</a>
            </div>

            <!-- Tarjeta 3: Correo Electrónico -->
            <div class="contact-card">
                <div class="contact-icon email-icon">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
                <h3>Correo Electrónico</h3>
                <p class="contact-highlight"><?= e($settings['email'] ?? 'budokanorpianesi@hotmail.com') ?></p>
                <p class="contact-desc">Para correspondencia oficial, prensa, invitaciones a seminarios y eventos internacionales.</p>
                <a href="mailto:<?= e($settings['email'] ?? 'budokanorpianesi@hotmail.com') ?>" class="btn btn-secondary block text-center">Enviar Correo</a>
            </div>
        </div>

        <!-- Repetir Redes Sociales en Contacto -->
        <div class="contact-social-repeater center fade-in">
            <h4 class="social-repeater-title">Nuestras Redes Sociales</h4>
            <div class="social-repeater-links">
                <a href="https://www.youtube.com/@larutadelsamurai" target="_blank" rel="noopener noreferrer" class="social-pill-btn youtube-pill">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span>YouTube Oficial</span>
                </a>
                <a href="https://www.instagram.com/la.ruta.del.samurai/" target="_blank" rel="noopener noreferrer" class="social-pill-btn instagram-pill">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span>Instagram Oficial</span>
                </a>
                <a href="https://www.facebook.com/jorgeorpianesi" target="_blank" rel="noopener noreferrer" class="social-pill-btn facebook-pill">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span>Facebook Oficial</span>
                </a>
            </div>
        </div>
    </div>
</section>
