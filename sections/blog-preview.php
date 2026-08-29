<?php
/**
 * SECCIÓN BLOG SAMURAI (DISEÑO ORIGINAL)
 */
$posts = get_json_data('blog.json', []);
$featured_posts = array_slice($posts, 0, 3);
?>
<!-- Sección Blog Samurai -->
<section class="section blog-section" id="blog">
    <div class="container">
        <div class="section-header text-center fade-in">
            <span class="section-subtitle">Artículos y Reflexiones</span>
            <h2 class="section-title">Blog Samurái</h2>
            <p class="section-desc">Artículos, recuerdos, anécdotas y entrevistas escritas por Jorge Orpianesi</p>
        </div>

        <div id="home-blog-posts-grid" class="blog-grid fade-in" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
            <?php foreach ($featured_posts as $post): ?>
                <article class="blog-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: var(--transition-smooth); box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                    <?php if (!empty($post['cover_image'])): ?>
                        <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" style="display:block; height: 200px; overflow: hidden;">
                            <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['title']) ?>" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" loading="lazy" onerror="this.src='photos/castillo_sengoku.webp'">
                        </a>
                    <?php endif; ?>
                    <div style="padding: 1.5rem; display: flex; flex-direction: column; flex: 1;">
                        <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 600; margin-bottom: 0.4rem;"><?= format_date($post['created_at']) ?></span>
                        <h3 style="font-family: var(--font-title); font-size: 1.15rem; color: var(--text-primary); margin: 0 0 0.8rem 0; line-height: 1.4;">
                            <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" style="color: inherit; text-decoration: none;"><?= e($post['title']) ?></a>
                        </h3>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.2rem; flex: 1; line-height: 1.6;"><?= e($post['excerpt']) ?></p>
                        <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="btn btn-secondary" style="align-self: start; font-size: 0.85rem; padding: 0.5rem 1rem;">Leer Artículo completo →</a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="text-center" style="margin-top: 2.5rem;">
            <a href="blog.php" class="btn btn-secondary">Ver Todos los Artículos</a>
        </div>
    </div>
</section>
