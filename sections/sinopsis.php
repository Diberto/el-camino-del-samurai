<?php
/**
 * SECCIÓN EL LIBRO / SINOPSIS DE LA OBRA
 */
?>
<section id="sinopsis" class="section sinopsis-section">
    <div class="container">
        <div class="grid-2">
            <!-- Portadas y Selector de Tomos -->
            <div class="books-showcase-box">
                <div class="tomo-tabs-container">
                    <button class="btn tomo-tab active" data-tomo="1">Tomo I: La Ruta del Samurái</button>
                    <button class="btn tomo-tab" data-tomo="2">Tomo II: El Paso de las Luciérnagas</button>
                </div>

                <!-- Tomo 1 Display -->
                <div class="book-card-display" id="display-tomo-1">
                    <div class="book-cover-frame">
                        <img src="assets/book1_front.webp" alt="La Ruta del Samurái - Tomo 1" class="book-cover-img" id="tomo1-img" loading="lazy">
                    </div>
                    <div class="book-flip-action">
                        <button class="btn btn-secondary btn-flip-cover" data-target="tomo1-img" data-front="assets/book1_front.webp" data-back="assets/book1_back.webp">
                            🔄 Ver Contraportada
                        </button>
                    </div>
                </div>

                <!-- Tomo 2 Display -->
                <div class="book-card-display" id="display-tomo-2" style="display: none;">
                    <div class="book-cover-frame">
                        <img src="assets/book2_front.webp" alt="El Paso de las Luciérnagas - Tomo 2" class="book-cover-img" id="tomo2-img" loading="lazy">
                    </div>
                    <div class="book-flip-action">
                        <button class="btn btn-secondary btn-flip-cover" data-target="tomo2-img" data-front="assets/book2_front.webp" data-back="assets/book2_back.webp">
                            🔄 Ver Contraportada
                        </button>
                    </div>
                </div>
            </div>

            <!-- Contenido y Puntos Filosóficos -->
            <div class="sinopsis-text-box">
                <span class="section-subtitle">LA OBRA LITERARIA</span>
                <h2 class="section-title">La guía definitiva de Japón para Budokas</h2>
                <p class="text-large">
                    Una aventura literaria y fotográfica que conecta la historia feudal japonesa, las artes marciales y la filosofía de vida de los guerreros eternos.
                </p>

                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-icon">🏯</div>
                        <div class="feature-info">
                            <h3>Viaje al Corazón de Japón</h3>
                            <p>Explora templos budistas, castillos medievales, campos de batalla y la mística del Monte Fuji con fotos y mapas únicos.</p>
                        </div>
                    </div>

                    <div class="feature-item">
                        <div class="feature-icon">⚔️</div>
                        <div class="feature-info">
                            <h3>La senda de Miyamoto Musashi</h3>
                            <p>Sigue el itinerario del legendario espadachín y autor de "El Libro de los Cinco Anillos" a través de los parajes donde meditó y combatió.</p>
                        </div>
                    </div>

                    <div class="feature-item">
                        <div class="feature-icon">🥋</div>
                        <div class="feature-info">
                            <h3>Cultura Budoka y Tradición</h3>
                            <p>Descubre el Kobudo, Iaido y Karate-Do desde su origen espiritual y su aplicación práctica para templar el carácter actual.</p>
                        </div>
                    </div>
                </div>

                <div class="sinopsis-cta">
                    <a href="#ediciones" class="btn btn-primary">Ver Ediciones Disponibles</a>
                </div>
            </div>
        </div>
    </div>
</section>
