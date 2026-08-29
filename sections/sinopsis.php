<?php
/**
 * SECCIÓN SINOPSIS / LA OBRA LITERARIA (CON VISOR 3D DINÁMICO DE LIBROS)
 */
$libros_catalogo = get_json_data('libros.json', []);
if (empty($libros_catalogo)) {
    $libros_catalogo = [
        [
            'id' => 'tomo1',
            'title' => 'La Ruta del Samurái',
            'subtitle' => 'Japón para Budokas',
            'tab_label' => 'Tomo I: La Ruta del Samurái',
            'cover_front' => 'assets/book1_front.webp',
            'cover_back' => 'assets/book1_back.webp'
        ],
        [
            'id' => 'tomo2',
            'title' => 'El Paso de las Luciérnagas',
            'subtitle' => 'La Ruta del Samurái 2',
            'tab_label' => 'Tomo II: El Paso de las Luciérnagas',
            'cover_front' => 'assets/book2_front.webp',
            'cover_back' => 'assets/book2_back.webp'
        ],
        [
            'id' => 'tomo3',
            'title' => "Along the Samurai's Route",
            'subtitle' => 'Japan for budokas',
            'tab_label' => 'English: Along the Samurai\'s Route',
            'cover_front' => 'assets/book3_front.webp',
            'cover_back' => 'assets/book3_back.webp'
        ]
    ];
}
?>
<!-- Sección de Sinopsis / La Obra Literaria -->
<section class="section sinopsis-section" id="sinopsis">
    <div class="container grid-2">
        <div class="sinopsis-image fade-in">
            <div class="book-3d-wrapper" id="book-3d-container">
                <div class="tomo-buttons-group">
                    <?php foreach ($libros_catalogo as $idx => $libro): ?>
                        <button class="btn <?= $idx === 0 ? 'btn-primary active' : 'btn-secondary' ?> tomo-tab" data-tomo="<?= $idx + 1 ?>">
                            <?= e($libro['tab_label'] ?? $libro['title']) ?>
                        </button>
                    <?php endforeach; ?>
                </div>

                <?php foreach ($libros_catalogo as $idx => $libro): ?>
                    <!-- Stage Tomo <?= $idx + 1 ?> -->
                    <div class="book-3d-stage tomo-stage <?= $idx === 0 ? 'active' : '' ?>" id="stage-tomo-<?= $idx + 1 ?>" style="<?= $idx > 0 ? 'display: none;' : '' ?>">
                        <div class="book-3d-card" id="book-card-<?= $idx + 1 ?>" data-rotated="false">
                            <div class="book-face-front">
                                <img src="<?= e($libro['cover_front']) ?>" alt="<?= e($libro['title']) ?> - Portada" decoding="async">
                                <div class="book-shine"></div>
                            </div>
                            <div class="book-face-back">
                                <img src="<?= e($libro['cover_back']) ?>" alt="<?= e($libro['title']) ?> - Contraportada" decoding="async">
                                <div class="book-shine"></div>
                            </div>
                            <div class="book-face-spine spine-tomo<?= ($idx % 2) + 1 ?>">
                                <span class="spine-kanji">侍</span>
                                <span class="spine-title"><?= e(strtoupper($libro['title'])) ?></span>
                                <span class="spine-author">JORGE ORPIANESI</span>
                            </div>
                            <div class="book-face-pages"></div>
                            <div class="book-face-top"></div>
                            <div class="book-face-bottom"></div>
                            <div class="book-3d-shadow"></div>
                        </div>
                    </div>
                <?php endforeach; ?>

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
            <h2 class="section-title">La guía definitiva de Japón para los amantes de la historia samurái.</h2>
            <p class="text-large">Una aventura literaria y fotográfica que conecta la historia, las artes marciales, la cultura y la filosofía de Japón a través de entretenidas narrativas de viajes por los lugares icónicos del Japón samurái.</p>
            
            <div class="philosophy-points">
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div class="point-text">
                        <h3>Viaje al Japón profundo</h3>
                        <p>Explora templos y santuarios, antiguos poblados, caminos centenarios, castillos, cementerios, campos de batalla, escuelas samuráis y hasta el sagrado Monte Fuji acompañado de mapas, fotos a color, dibujos y pinturas históricas.</p>
                    </div>
                </div>
                
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div class="point-text">
                        <h3>La vida de los grandes samuráis de la historia</h3>
                        <p>Conoce la vida y obra de los grandes nombres de la historia samurái a través de textos antiguos, cartas personales, partes de batalla y de historias reales o noveladas de guerreros de la talla de Miyamoto Musashi, Tokugawa Ieyasu, Toyotomi Hideyoshi, Kato Kiyomasa, Todo Takatora, Honda Tadakatsu, Oda Nobunaga y ¡muchos más!</p>
                    </div>
                </div>
                
                <div class="point-item">
                    <div class="point-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div class="point-text">
                        <h3>Cultura y filosofía</h3>
                        <p>Sumérgete en la sociedad japonesa actual a través de sus valores, creencias, costumbres y tradiciones que fueron heredadas de los grandes guerreros samurái que gobernaron el país durante casi ¡siete siglos!</p>
                    </div>
                </div>
            </div>
            
            <a href="#ediciones" class="btn btn-primary btn-margin">Adquirir Ejemplar</a>
        </div>
    </div>
</section>
