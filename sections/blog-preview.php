<?php
/**
 * SECCIÓN BLOG SAMURAI (DISEÑO COMPACTO Y ELEGANTE CON PAGINACIÓN)
 */
$posts = get_json_data('blog.json', []);
$blog_limit = (int)($settings['home_blog_limit'] ?? 0);
$per_page = ($blog_limit > 0) ? $blog_limit : 3;
$featured_posts = $posts; // Preservar todos los artículos para paginación completa en Home
?>
<!-- Sección Blog Samurai -->
<section class="section blog-section" id="blog">
    <div class="container">
        <div class="section-header text-center fade-in">
            <span class="section-subtitle">Artículos y Reflexiones</span>
            <h2 class="section-title">Blog Samurái</h2>
            <p class="section-desc">Artículos, recuerdos, anécdotas y entrevistas escritas por Jorge Orpianesi</p>
        </div>

        <div id="home-blog-posts-grid" class="blog-compact-grid fade-in" data-per-page="<?= $per_page ?>" style="margin-top: 2rem; margin-bottom: 2.5rem;">
            <?php foreach ($featured_posts as $index => $post): ?>
                <?php 
                    $read_time = max(1, ceil(str_word_count(strip_tags($post['content'] ?? '')) / 180));
                    $cover = !empty($post['cover_image']) ? $post['cover_image'] : 'photos/castillo_sengoku.webp';
                    $is_initially_visible = ($index < $per_page);
                ?>
                <article class="blog-compact-card blog-home-card" style="display: <?= $is_initially_visible ? 'flex' : 'none' ?>;">
                    <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-compact-thumb">
                        <img src="<?= e($cover) ?>" alt="<?= e($post['title']) ?>" loading="lazy" decoding="async" onerror="this.src='photos/castillo_sengoku.webp'">
                        <span class="blog-compact-date"><?= format_date($post['created_at']) ?></span>
                    </a>
                    <div class="blog-compact-body">
                        <div class="blog-compact-meta">
                            <span>⏱️ <?= $read_time ?> min de lectura</span>
                            <span>•</span>
                            <span><?= e($post['author'] ?? 'Jorge Orpianesi') ?></span>
                        </div>
                        <h3 class="blog-compact-title">
                            <a href="blog.php?slug=<?= urlencode($post['slug']) ?>"><?= e($post['title']) ?></a>
                        </h3>
                        <p class="blog-compact-excerpt">
                            <?= e(mb_strimwidth($post['excerpt'] ?? strip_tags($post['content'] ?? ''), 0, 120, '...')) ?>
                        </p>
                        <div class="blog-compact-footer">
                            <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-compact-link">
                                Leer artículo completo <span>→</span>
                            </a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <!-- Controles de Paginación Dinámica del Blog en Home -->
        <nav class="home-blog-pagination blog-pagination" id="home-blog-pagination" aria-label="Paginación de artículos del blog" style="margin-bottom: 2.5rem;"></nav>

        <div class="text-center" style="margin-top: 1rem;">
            <a href="blog.php" class="btn btn-secondary">Ver Todos los Artículos</a>
        </div>
    </div>
</section>

