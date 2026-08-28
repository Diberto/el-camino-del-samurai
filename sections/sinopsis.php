<?php
/**
 * SECCIÓN SINOPSIS / EL LIBRO (CON VISOR 3D ORIGINAL INTERACTIVO)
 */
?>
<!-- Sección de Sinopsis / El Libro -->
<section class="section sinopsis-section" id="sinopsis">
    <div class="container grid-2">
        <div class="sinopsis-image fade-in">
            <div class="book-3d-wrapper" id="book-3d-container">
                <div class="tomo-buttons-group">
                    <button class="btn btn-primary tomo-tab active" data-tomo="1">Tomo I: La Ruta del Samurái</button>
                    <button class="btn btn-secondary tomo-tab" data-tomo="2">Tomo II: El Paso de las Luciérnagas</button>
                </div>

                <!-- Tomo 1 Stage -->
                <div class="book-3d-stage tomo-stage active" id="stage-tomo-1">
                    <div class="book-3d-card" id="book-card-1" data-rotated="false">
                        <div class="book-face-front">
                            <img src="assets/book1_front.webp" alt="La Ruta del Samurái - Portada Tomo 1" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-back">
                            <img src="assets/book1_back.webp" alt="La Ruta del Samurái - Contraportada Tomo 1" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-spine spine-tomo1">
                            <span class="spine-kanji">侍</span>
                            <span class="spine-title">LA RUTA DEL SAMURÁI</span>
                            <span class="spine-author">JORGE ORPIANESI</span>
                        </div>
                        <div class="book-face-pages"></div>
                        <div class="book-face-top"></div>
                        <div class="book-face-bottom"></div>
                        <div class="book-3d-shadow"></div>
                    </div>
                </div>

                <!-- Tomo 2 Stage -->
                <div class="book-3d-stage tomo-stage" id="stage-tomo-2" style="display: none;">
                    <div class="book-3d-card" id="book-card-2" data-rotated="false">
                        <div class="book-face-front">
                            <img src="assets/book2_front.webp" alt="El Paso de las Luciérnagas - Portada Tomo 2" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-back">
                            <img src="assets/book2_back.webp" alt="El Paso de las Luciérnagas - Contraportada Tomo 2" decoding="async">
                            <div class="book-shine"></div>
                        </div>
                        <div class="book-face-spine spine-tomo2">
                            <span class="spine-kanji">侍</span>
                            <span class="spine-title">EL PASO DE LAS LUCIÉRNAGAS</span>
                            <span class="spine-author">JORGE ORPIANESI</span>
                        </div>
                        <div class="book-face-pages"></div>
                        <div class="book-face-top"></div>
                        <div class="book-face-bottom"></div>
                        <div class="book-3d-shadow"></div>
                    </div>
                </div>

                <div class="book-3d-controls">
                    <button class="btn btn-primary btn-flip-single" id="btn-flip-single">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                        </svg>
                        <span id="btn-flip-text">Girar a Contraportada</span>
                    </button>
                </div>
                <p class="book-3d-hint">✨ <em>Toca o arrastra con el ratón para rotar libremente en 3D</em></p>
            </div>
        </div>
        
        <div class="sinopsis-content fade-in">
            <span class="section-subtitle">LA OBRA LITERARIA</span>
            <h2 class="section-title">La guía definitiva de Japón para Budokas</h2>
            <p class="text-large">Una aventura literaria y fotográfica que conecta la historia feudal japonesa, las artes marciales y la filosofía de vida de los guerreros eternos.</p>
            
            <div class="philosophy-points">
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div class="point-text">
                        <h3>Viaje al Corazón de Japón</h3>
                        <p>Explora templos budistas, castillos medievales, campos de batalla históricos y la mística del Monte Fuji con fotos y mapas únicos.</p>
                    </div>
                </div>
                
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div class="point-text">
                        <h3>La senda de Miyamoto Musashi</h3>
                        <p>Sigue el itinerario del legendario espadachín y autor de "El Libro de los Cinco Anillos" a través de los parajes donde meditó y luchó.</p>
                    </div>
                </div>
                
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    </div>
                    <div class="point-text">
                        <h3>Filosofía y Valores del Bushido</h3>
                        <p>Reflexiones prácticas sobre el honor, el coraje, la serenidad y la disciplina para aplicar en la vida moderna.</p>
                    </div>
                </div>
            </div>
            
            <div class="sinopsis-actions">
                <a href="#ediciones" class="btn btn-primary">Ver Ediciones Disponibles</a>
                <a href="#autor" class="btn btn-secondary">Conocer al Autor</a>
            </div>
        </div>
    </div>
</section>
