<?php
/**
 * SECCIÓN BLOG PREVIEW / ARTÍCULOS DESTACADOS
 */
$posts = get_json_data('blog.json', []);
$featured_posts = array_slice($posts, 0, 3);
?>
<section id="blog" class="section blog-section">
    <div class="container">
        <div class="section-header text-center">
            <span class="section-subtitle">REFLEXIONES & BUDO</span>
            <h2 class="section-title">Artículos del Blog</h2>
            <p class="section-desc">Ensayos, crónicas de viaje y reflexiones sobre la filosofía samurái y su vigencia en el mundo actual.</p>
        </div>

        <div class="blog-grid">
            <?php foreach ($featured_posts as $post): ?>
                <article class="blog-card">
                    <div class="blog-card-thumb">
                        <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['title']) ?>" loading="lazy" onerror="this.src='photos/castillo_sengoku.webp'">
                        <span class="blog-date-badge"><?= format_date($post['created_at']) ?></span>
                    </div>
                    <div class="blog-card-body">
                        <h3 class="blog-card-title">
                            <a href="blog.php?slug=<?= urlencode($post['slug']) ?>"><?= e($post['title']) ?></a>
                        </h3>
                        <p class="blog-card-excerpt"><?= e($post['excerpt']) ?></p>
                        <div class="blog-card-footer">
                            <span class="blog-author">Por <?= e($post['author'] ?? 'Jorge Orpianesi') ?></span>
                            <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-read-more">Leer artículo &rarr;</a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="blog-all-cta text-center">
            <a href="blog.php" class="btn btn-secondary">Ver todos los artículos</a>
        </div>
    </div>
</section>
