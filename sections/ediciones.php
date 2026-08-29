<?php
/**
 * SECCIÓN LAS OBRAS DEL AUTOR & EDICIONES DISPONIBLES
 */
$amazon_url = $settings['amazon_url'] ?? 'https://www.amazon.com/s?k=jorge+orpianesi&crid=6E5AFU50XWPW&sprefix=jorge+orpianesi%2Caps%2C237&ref=nb_sb_noss';
$budokan_tomo1 = $settings['budokan_tomo1_url'] ?? 'https://www.budokanweb.com/tienda/libros/la-ruta-del-samurai-formato-libro/';
$budokan_tomo2 = $settings['budokan_tomo2_url'] ?? 'https://www.budokanweb.com/tienda/destacados/el-paso-de-las-luciernagas-la-ruta-del-samurai-2/';
?>
<!-- Sección de Las Obras del Autor y Ediciones -->
<section class="section chapters-section" id="ediciones">
    <div class="container grid-2">
        <div class="chapters-content fade-in">
            <span class="section-subtitle">Contenido exclusivo</span>
            <h2 class="section-title">Las obras del autor</h2>
            <p class="section-desc">Libros excepcionales que plasman los viajes del autor por todo el territorio japonés en busca de aquellos lugares donde se sucedieron los hechos históricos.</p>
            
            <div class="chapters-list">
                <div class="chapter-item">
                    <div class="chapter-num">1</div>
                    <div class="chapter-info">
                        <h3>La Ruta del Samurái</h3>
                        <p>Un recorrido geográfico por los lugares más famosos relacionados con los samuráis siguiendo los pasos del famoso duelista Miyamoto Musashi mientras el lector descubre las maravillas de Japón.</p>
                    </div>
                </div>
                
                <div class="chapter-item">
                    <div class="chapter-num">2</div>
                    <div class="chapter-info">
                        <h3>El Paso de las Luciérnagas</h3>
                        <p>La segunda expedición del autor por tierras japonesas buscando los antiguos caminos que recorrían los samuráis durante el período Edo. Jorge Orpianesi emula los recorridos hechos por el artista Utagawa Hiroshige en el siglo XIX a través de la ruta Tokaido uniendo la antigua Edo con Kioto y el regreso por la ruta Nakasendo mientras hace una comparativa entre las imágenes que va tomando en su camino con las pinturas que realizó Hiroshige en la época de los samuráis.</p>
                    </div>
                </div>

                <div class="chapter-item">
                    <div class="chapter-num">3</div>
                    <div class="chapter-info">
                        <h3>Along the Samurai´s Route</h3>
                        <p>A geographical journey through the most famous places related to the samurai, following in the footsteps of the famous duelist Miyamoto Musashi, while the reader discovers the wonders of Japan.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="editions-wrapper fade-in">
            <span class="section-subtitle text-center block">ELIGE TU FORMATO</span>
            <h2 class="section-title text-center">Ediciones Disponibles</h2>
            
            <div class="editions-cards">
                <!-- a) Amazon Global -->
                <div class="edition-card">
                    <div class="edition-badge">AMAZON GLOBAL</div>
                    <h3 class="edition-title">Desde el exterior</h3>
                    <p class="edition-format">Todos los títulos – Envíos internacionales</p>
                    <div class="edition-price">INTERNACIONAL</div>
                    <ul class="edition-benefits">
                        <li>Disponible en formatos e-book Kindle para descarga inmediata</li>
                        <li>Edicion impresa en tapa blanda</li>
                        <li>Envíos a todo el mundo con la garantía de Amazon</li>
                        <li>Acceso completo a los mapas, fotografías y dibujos de todas las obras</li>
                    </ul>
                    <a href="<?= e($amazon_url) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary block text-center">Ver Títulos en Amazon Global</a>
                </div>
                
                <!-- b) Envios nacionales -->
                <div class="edition-card premium">
                    <div class="edition-badge gold">ARGENTINA</div>
                    <h3 class="edition-title">Envios nacionales</h3>
                    <p class="edition-format">Tienda Oficial Budokan & Ejemplar Dedicado</p>
                    <div class="edition-price" style="font-size: 1.1rem; line-height: 1.3;">Envíos a todas las provincias de la República Argentina</div>
                    <ul class="edition-benefits">
                        <li>Papel ahuesado premium con cientos de fotografías a color, mapas y dibujos históricos</li>
                        <li>Se puede solicitar el ejemplar firmado por el autor</li>
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
