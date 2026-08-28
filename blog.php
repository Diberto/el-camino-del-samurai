<?php
/**
 * BLOG OFICIAL - EL CAMINO DEL SAMURÁI
 * Soporta listado general compacto en cuadrícula, paginación y vista de artículo individual por ?slug=...
 */

require_once __DIR__ . '/config/settings.php';
require_once __DIR__ . '/config/analytics.php';

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
    track_page_view('Blog: ' . $current_post['title']);
    $custom_title = $current_post['title'];
    $custom_desc = $current_post['excerpt'];
} else {
    track_page_view('Blog: Listado General');
    $custom_title = 'Blog del Budo y Filosofía Samurái';
    $custom_desc = 'Artículos, reflexiones y crónicas sobre la historia feudal japonesa y las artes marciales.';
}

// Configuración de Paginación para el listado general
$per_page = 6; // Artículos por página para diseño equilibrado y rápido
$total_posts = count($posts);
$total_pages = max(1, (int)ceil($total_posts / $per_page));
$current_page_num = isset($_GET['page']) ? max(1, min((int)$_GET['page'], $total_pages)) : 1;
$offset = ($current_page_num - 1) * $per_page;
$paged_posts = array_slice($posts, $offset, $per_page);

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<main class="blog-main-page" style="padding-top: 6.5rem; min-height: 85vh;">
    <div class="container">
        <?php if ($current_post): ?>
            <!-- VISTA DE ARTÍCULO INDIVIDUAL -->
            <article class="single-post-container" style="max-width: 860px; margin: 0 auto 4rem auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
                <a href="blog.php" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 1.5rem;">
                    &larr; Volver al listado de artículos
                </a>
                
                <header class="single-post-header" style="margin-bottom: 2rem;">
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap;">
                        <span class="badge badge-tag" style="background: rgba(216, 17, 36, 0.15); color: var(--accent-red); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600;">
                            <?= format_date($current_post['created_at']) ?>
                        </span>
                        <span style="font-size: 0.82rem; color: var(--text-muted);">
                            ⏱️ <?= max(1, ceil(str_word_count(strip_tags($current_post['content'] ?? '')) / 180)) ?> min de lectura
                        </span>
                    </div>
                    <h1 class="single-post-title" style="font-family: var(--font-title); font-size: 2.2rem; line-height: 1.3; color: var(--text-primary); margin-bottom: 1rem;">
                        <?= e($current_post['title']) ?>
                    </h1>
                    <div class="single-post-author" style="font-size: 0.95rem; color: var(--accent-gold);">
                        Por <strong><?= e($current_post['author'] ?? 'Jorge Orpianesi') ?></strong>
                    </div>
                </header>

                <?php if (!empty($current_post['cover_image'])): ?>
                    <div class="single-post-cover" style="margin-bottom: 2.5rem; border-radius: 10px; overflow: hidden; max-height: 480px; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
                        <img src="<?= e($current_post['cover_image']) ?>" alt="<?= e($current_post['title']) ?>" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='photos/castillo_sengoku.webp'">
                    </div>
                <?php endif; ?>

                <div class="single-post-content typography-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
                    <?= $current_post['content'] ?>
                </div>

                <footer class="single-post-footer" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <a href="blog.php" class="btn btn-secondary btn-sm">&larr; Ver más artículos</a>
                    <div class="share-box" style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-size: 0.88rem; color: var(--text-muted);">Compartir:</span>
                        <a href="https://api.whatsapp.com/send?text=<?= urlencode($current_post['title'] . ' - ' . (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ?>" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            📱 Compartir en WhatsApp
                        </a>
                    </div>
                </footer>
            </article>

        <?php else: ?>

            <!-- LISTADO DE ARTÍCULOS EN CUADRÍCULA COMPACTA -->
            <div class="section-header text-center blog-header-space" style="margin-bottom: 2.5rem;">
                <span class="section-subtitle">ENSAYOS & CRÓNICAS</span>
                <h1 class="section-title">Blog del Budo y la Filosofía Samurái</h1>
                <p class="section-desc">Artículos, historia feudal, meditaciones sobre el Bushido y relatos de expediciones en Japón por Jorge Orpianesi.</p>
                <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">
                    Mostrando <strong><?= count($paged_posts) ?></strong> de <strong><?= $total_posts ?></strong> artículos publicados
                </div>
            </div>

            <!-- Grilla Compacta y Elegante -->
            <div class="blog-compact-grid">
                <?php foreach ($paged_posts as $post): ?>
                    <?php 
                        $read_time = max(1, ceil(str_word_count(strip_tags($post['content'] ?? '')) / 180));
                    ?>
                    <article class="blog-compact-card">
                        <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-compact-thumb">
                            <img src="<?= e($post['cover_image']) ?>" alt="<?= e($post['title']) ?>" loading="lazy" decoding="async" onerror="this.src='photos/castillo_sengoku.webp'">
                            <span class="blog-compact-date"><?= format_date($post['created_at']) ?></span>
                        </a>
                        <div class="blog-compact-body">
                            <div class="blog-compact-meta">
                                <span>⏱️ <?= $read_time ?> min</span>
                                <span>•</span>
                                <span><?= e($post['author'] ?? 'Jorge Orpianesi') ?></span>
                            </div>
                            <h2 class="blog-compact-title">
                                <a href="blog.php?slug=<?= urlencode($post['slug']) ?>"><?= e($post['title']) ?></a>
                            </h2>
                            <p class="blog-compact-excerpt">
                                <?= e(mb_strimwidth($post['excerpt'] ?? strip_tags($post['content'] ?? ''), 0, 110, '...')) ?>
                            </p>
                            <div class="blog-compact-footer">
                                <a href="blog.php?slug=<?= urlencode($post['slug']) ?>" class="blog-compact-link">
                                    Leer artículo <span>→</span>
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>

            <!-- CONTROLES DE PAGINACIÓN -->
            <?php if ($total_pages > 1): ?>
                <nav class="blog-pagination" aria-label="Navegación de páginas">
                    <ul class="pagination-list">
                        <?php if ($current_page_num > 1): ?>
                            <li>
                                <a href="blog.php?page=<?= $current_page_num - 1 ?>" class="pagination-link prev" aria-label="Página anterior">
                                    &larr; Anterior
                                </a>
                            </li>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                            <li>
                                <a href="blog.php?page=<?= $i ?>" class="pagination-link <?= $i === $current_page_num ? 'active' : '' ?>">
                                    <?= $i ?>
                                </a>
                            </li>
                        <?php endfor; ?>

                        <?php if ($current_page_num < $total_pages): ?>
                            <li>
                                <a href="blog.php?page=<?= $current_page_num + 1 ?>" class="pagination-link next" aria-label="Página siguiente">
                                    Siguiente &rarr;
                                </a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            <?php endif; ?>

        <?php endif; ?>
    </div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
