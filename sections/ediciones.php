<?php
/**
 * SECCIÓN CAPÍTULOS Y EDICIONES DISPONIBLES (DISEÑO ORIGINAL)
 */
?>
<!-- Sección de Capítulos y Ediciones -->
<section class="section chapters-section" id="capitulos">
    <div class="container grid-2">
        <div class="chapters-content fade-in">
            <span class="section-subtitle">CONTENIDO EXCLUSIVO</span>
            <h2 class="section-title">Las Obras del Autor</h2>
            <p class="section-desc">Dos tomos excepcionales que plasman un viaje sin precedentes por la historia feudal y las artes marciales de Japón.</p>
            
            <div class="chapters-list">
                <div class="chapter-item">
                    <div class="chapter-num">I</div>
                    <div class="chapter-info">
                        <h3>La Ruta del Samurái: Japón para Budokas</h3>
                        <p>Un recorrido geográfico detallado por castillos, cementerios históricos y dojos antiguos, sirviendo como guía de viajes para todo cultor de artes marciales.</p>
                    </div>
                </div>
                
                <div class="chapter-item">
                    <div class="chapter-num">II</div>
                    <div class="chapter-info">
                        <h3>El Paso de las Luciérnagas</h3>
                        <p>La segunda parte de esta gran expedición, que profundiza en las leyendas de combates épicos, templos escondidos y el legado samurái en la modernidad.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="editions-wrapper fade-in" id="ediciones">
            <span class="section-subtitle text-center block">ELIGE TU FORMATO</span>
            <h2 class="section-title text-center">Ediciones Disponibles</h2>
            
            <div class="editions-cards">
                <!-- Edición 1: Digital y Físico (Amazon) -->
                <div class="edition-card">
                    <div class="edition-badge">AMAZON GLOBAL</div>
                    <h3 class="edition-title">Digital y Físico</h3>
                    <p class="edition-format">Envío Internacional por Amazon</p>
                    <div class="edition-price">Internacional</div>
                    <ul class="edition-benefits">
                        <li>Disponible en formato eBook Kindle para descarga inmediata</li>
                        <li>Edición impresa en tapa blanda y tapa dura</li>
                        <li>Envíos a todo el mundo con la garantía de Amazon</li>
                        <li>Acceso completo a fotos y mapas de las rutas</li>
                    </ul>
                    <a href="<?= e($settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Comprar en Amazon</a>
                </div>
                
                <!-- Edición 2: Físico para Argentina -->
                <div class="edition-card premium">
                    <div class="edition-badge gold">ARGENTINA</div>
                    <h3 class="edition-title">Físico para Argentina</h3>
                    <p class="edition-format">Ejemplar Directo & Tienda Budokan</p>
                    <div class="edition-price">Envíos Nacionales</div>
                    <ul class="edition-benefits">
                        <li>Envíos a todas las provincias de la República Argentina</li>
                        <li>Ejemplar firmado y dedicado por Jorge Orpianesi</li>
                        <li>Papel ahuesado premium con más de 200 fotografías a color</li>
                        <li>9 mapas detallados de los recorridos por Japón</li>
                    </ul>
                    <a href="<?= e($settings['budokan_url'] ?? 'https://www.budokanweb.com/categoria-producto/libros/') ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center" style="margin-bottom: 0.75rem;">Comprar en Budokan Web</a>
                    <a href="https://wa.me/5493513886443?text=Hola%20Jorge,%20quiero%20adquirir%20el%20libro%20f%C3%ADsico%20firmado%20en%20Argentina" target="_blank" rel="noopener noreferrer" class="btn btn-secondary block text-center">Pedir firmado por WhatsApp</a>
                </div>
            </div>
        </div>
    </div>
</section>
