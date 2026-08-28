<?php
/**
 * SECCIÓN CAPÍTULOS Y EDICIONES DISPONIBLES (ENLACES OFICIALES ACTUALIZADOS)
 */
$amazon_url = $settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi&crid=6E5AFU50XWPW&sprefix=jorge+orpianesi%2Caps%2C237&ref=nb_sb_noss';
$budokan_tomo1 = $settings['budokan_tomo1_url'] ?? 'https://www.budokanweb.com/tienda/libros/la-ruta-del-samurai-formato-libro/';
$budokan_tomo2 = $settings['budokan_tomo2_url'] ?? 'https://www.budokanweb.com/tienda/destacados/el-paso-de-las-luciernagas-la-ruta-del-samurai-2/';
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
                <!-- Edición 1: Digital y Físico (Amazon Global) -->
                <div class="edition-card">
                    <div class="edition-badge">AMAZON GLOBAL</div>
                    <h3 class="edition-title">Desde el Exterior</h3>
                    <p class="edition-format">Todos los títulos · Envíos Internacionales</p>
                    <div class="edition-price">Internacional</div>
                    <ul class="edition-benefits">
                        <li>Disponible en formato eBook Kindle para descarga inmediata</li>
                        <li>Edición impresa en tapa blanda y tapa dura</li>
                        <li>Envíos a todo el mundo con la garantía de Amazon</li>
                        <li>Acceso completo a fotos y mapas de las rutas</li>
                    </ul>
                    <a href="<?= e($amazon_url) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Ver Títulos en Amazon Global</a>
                </div>
                
                <!-- Edición 2: Físico para Argentina (Budokan & WhatsApp) -->
                <div class="edition-card premium">
                    <div class="edition-badge gold">ARGENTINA</div>
                    <h3 class="edition-title">Compras en Argentina</h3>
                    <p class="edition-format">Tienda Oficial Budokan & Ejemplar Firmado</p>
                    <div class="edition-price">Envíos Nacionales</div>
                    <ul class="edition-benefits">
                        <li>Envíos a todas las provincias de la República Argentina</li>
                        <li>Papel ahuesado premium con más de 200 fotografías a color</li>
                        <li>9 mapas detallados de los recorridos por Japón</li>
                        <li>Opción de ejemplar firmado y dedicado por Jorge Orpianesi</li>
                    </ul>
                    <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                        <a href="<?= e($budokan_tomo1) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Comprar Tomo 1 (Budokan Web)</a>
                        <a href="<?= e($budokan_tomo2) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-blue block text-center">Comprar Tomo 2 (Budokan Web)</a>
                        <a href="https://wa.me/5493513886443?text=Hola%20Jorge,%20quiero%20adquirir%20el%20libro%20f%C3%ADsico%20firmado%20en%20Argentina" target="_blank" rel="noopener noreferrer" class="btn btn-secondary block text-center">Pedir firmado por WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
