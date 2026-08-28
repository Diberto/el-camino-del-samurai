<?php
/**
 * BLOG OFICIAL - EL CAMINO DEL SAMURÁI
 * Soporta listado general y vista de artículo individual por ?slug=...
 */

require_once __DIR__ . '/config/settings.php';

$posts = get_json_data('blog.json', []);
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$current_post = null;

if (!empty($slug)) {
    foreach ($posts as $p) {
        if (($p['slug'] ?? '') === $slug) {
            $current_post = $p;
            break;
        }
    }
}

if ($current_post) {
    $custom_title = $current_post['title'];
    $custom_desc = $current_post['excerpt'];
} else {
    $custom_title = 'Blog del Budo y Filosofía Samurái';
    $custom_desc = 'Artículos, reflexiones y crónicas sobre la historia feudal japonesa y las artes marciales.';
}

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<main class="blog-main-page">
    <div class="container">
        <?php if ($current_post): ?>
            <!-- Vista de Artículo Individual -->
            <article class="single-post-container">
                <a href="blog.php" class="back-to-blog-btn">&larr; Volver al listado de artículos</a>
                
                <header class="single-post-header">
                    <span class="single-post-date"><?= format_date($current_post['created_at']) ?></span>
                    <h1 class="single-post-title"><?= e($current_post['title']) ?></h1>
                    <div class="single-post-author">Por <strong><?= e($current_post['author'] ?? 'Jorge Orpianesi') ?></strong></div>
                </header>

                <?php if (!empty($current_post['cover_image'])): ?>
                    <div class="single-post-cover">
                        <img src="<?= e($current_post['cover_image']) ?>" alt="<?= e($current_post['title']) ?>" onerror="this.src='photos/castillo_sengoku.webp'">
                    </div>
                <?php endif; ?>

                <div class="single-post-content typography-body">
                    <?= $current_post['content'] ?>
                </div>

                <footer class="single-post-footer">
                    <div class="share-box">
                        <span>Comparte este artículo:</span>
                        <a href="https://api.whatsapp.com/send?text=<?= urlencode($current_post['title'] . ' - ' . (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Compartir por WhatsApp</a>
                    </div>
                </footer>
            </article>
        <?php else: ?>
            <!-- Listado Completo de Artículos -->
            <div class="section-header text-center blog-header-space">
                <span class="section-subtitle">ENSAYOS & CRÓNICAS</span>
                <h1 class="section-title">Blog del Budo y la Filosofía Samurái</h1>
                <p class="section-desc">Reflexiones de Jorge Orpianesi sobre el entrenamiento marcial, la historia feudal y las lecciones de Miyamoto Musashi.</p>
            </div>

            <div class="blog-grid">
                <?php foreach ($posts as $post): ?>
                    <article class="blog-card">
                        <div class="blog-card-thumb">
                            <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['title']) ?>" loading="lazy" onerror="this.src='photos/castillo_sengoku.webp'">
                            <span class="blog-date-badge"><?= format_date($post['created_at']) ?></span>
                        </div>
                        <div class="blog-card-body">
                            <h2 class="blog-card-title">
                                <a href="blog.php?slug=<?= urlencode($post['slug']) ?>"><?= e($post['title']) ?></a>
                            </h2>
                            <p class="blog-card-excerpt"><?= e($post['excerpt']) ?></p>
                            <div class="blog-card-footer">
                                <span class="blog-author">Por <?= e($post['author'] ?? 'Jorge Orpianesi') ?></span>
                                <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-read-more">Leer artículo completo &rarr;</a>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
