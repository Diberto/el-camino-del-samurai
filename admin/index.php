<?php
/**
 * PANEL ADMIN - DASHBOARD PRINCIPAL Y ANALÍTICAS
 */
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/analytics.php';
require_admin_auth();

$opiniones = get_json_data('opiniones.json', []);
$posts = get_json_data('blog.json', []);
$galeria = get_json_data('galeria.json', []);
$analytics = get_analytics_summary();

// Procesar los últimos 14 días para la gráfica visual
$last_14_days = [];
for ($i = 13; $i >= 0; $i--) {
    $d = date('Y-m-d', strtotime("-$i days"));
    $short_label = date('d/m', strtotime("-$i days"));
    $views = $analytics['daily_stats'][$d]['views'] ?? 0;
    $uniques = $analytics['daily_stats'][$d]['unique_count'] ?? 0;
    $last_14_days[] = [
        'date' => $d,
        'label' => $short_label,
        'views' => $views,
        'uniques' => $uniques
    ];
}

$max_views = max(array_column($last_14_days, 'views'));
if ($max_views < 10) $max_views = 10;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración | La Ruta del Samurái</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=3.0">
    <style>
        .analytics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        .analytics-card {
            background: linear-gradient(145deg, #171b26 0%, #12151f 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .analytics-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: var(--admin-primary);
        }
        .analytics-card.gold::before {
            background: var(--admin-gold);
        }
        .analytics-card.blue::before {
            background: #38bdf8;
        }
        .analytics-card.green::before {
            background: #22c55e;
        }
        .analytics-num {
            font-family: var(--font-title);
            font-size: 2.2rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.1;
            margin: 0.4rem 0 0.25rem 0;
        }
        .analytics-title {
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--admin-text-muted);
            font-weight: 600;
        }
        .analytics-desc {
            font-size: 0.78rem;
            color: var(--admin-gold);
            margin-top: 0.35rem;
        }

        /* Gráfico de Barras CSS */
        .chart-container {
            margin-top: 1.5rem;
            display: flex;
            align-items: flex-end;
            gap: 8px;
            height: 180px;
            padding: 1rem 0.5rem 0 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .chart-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: flex-end;
            position: relative;
        }
        .chart-bar {
            width: 100%;
            max-width: 32px;
            background: linear-gradient(to top, var(--admin-primary), #ef233c);
            border-radius: 4px 4px 0 0;
            transition: height 0.6s ease;
            position: relative;
            cursor: pointer;
        }
        .chart-bar:hover {
            filter: brightness(1.2);
            box-shadow: 0 0 12px var(--admin-primary);
        }
        .chart-bar-tooltip {
            position: absolute;
            top: -28px;
            left: 50%;
            transform: translateX(-50%);
            background: #000;
            color: #fff;
            font-size: 0.72rem;
            padding: 2px 6px;
            border-radius: 3px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.2s ease;
            pointer-events: none;
        }
        .chart-col:hover .chart-bar-tooltip {
            opacity: 1;
        }
        .chart-label {
            font-size: 0.68rem;
            color: var(--admin-text-muted);
            margin-top: 6px;
        }

        .breakdown-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 1.5rem;
        }
        @media (max-width: 900px) {
            .breakdown-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body class="admin-body">
    <div class="admin-layout">
        <!-- Barra Lateral -->
        <aside class="admin-sidebar">
            <div class="admin-brand">
                <img src="../assets/kanji_stamp.webp" alt="Sello" class="admin-brand-icon">
                <div class="admin-brand-text">
                    <h3>La Ruta del Samurái</h3>
                    <span>Panel de Control</span>
                </div>
            </div>

            <nav class="admin-nav">
                <a href="index.php" class="admin-nav-item active">📊 Dashboard & Analíticas</a>
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
                <a href="medios.php" class="admin-nav-item">📁 Biblioteca de Medios</a>
                <a href="settings.php" class="admin-nav-item">⚙️ Configuración & Redes</a>
            </nav>

            <div class="admin-sidebar-footer">
                <a href="../index.php" target="_blank" class="admin-nav-item">🌐 Ver Sitio Web</a>
                <a href="logout.php" class="admin-nav-item logout-link">🚪 Cerrar Sesión</a>
            </div>
        </aside>

        <!-- Contenido Principal -->
        <main class="admin-main">
            <header class="admin-topbar">
                <h2>Panel de Control y Analíticas en Tiempo Real</h2>
                <span class="admin-user-badge">Conectado como <strong>admin</strong></span>
            </header>

            <div class="admin-content">
                
                <!-- MÉTRICAS DE TRÁFICO Y VISITAS -->
                <div class="analytics-grid">
                    <div class="analytics-card blue">
                        <span class="analytics-title">👁️ Visitas Totales</span>
                        <span class="analytics-num"><?= number_format($analytics['total_views']) ?></span>
                        <span class="analytics-desc">Páginas vistas acumuladas</span>
                    </div>

                    <div class="analytics-card green">
                        <span class="analytics-title">👥 Visitantes Hoy</span>
                        <span class="analytics-num"><?= number_format($analytics['today_uniques']) ?></span>
                        <span class="analytics-desc"><?= $analytics['today_views'] ?> páginas vistas hoy</span>
                    </div>

                    <div class="analytics-card gold">
                        <span class="analytics-title">📅 Visitas Este Mes</span>
                        <span class="analytics-num"><?= number_format($analytics['month_views']) ?></span>
                        <span class="analytics-desc">Mes de <?= date('F Y') ?></span>
                    </div>

                    <div class="analytics-card">
                        <span class="analytics-title">📝 Artículos & Reseñas</span>
                        <span class="analytics-num"><?= count($posts) + count($opiniones) ?></span>
                        <span class="analytics-desc"><?= count($posts) ?> artículos · <?= count($opiniones) ?> opiniones</span>
                    </div>
                </div>

                <!-- GRÁFICA DE VISITAS (ÚLTIMOS 14 DÍAS) -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h3>📈 Tendencia de Visitas Diarias (Últimos 14 Días)</h3>
                        <span style="font-size: 0.8rem; color: var(--admin-text-muted);">Actualizado automáticamente</span>
                    </div>
                    <div class="admin-card-body">
                        <div class="chart-container">
                            <?php foreach ($last_14_days as $day): ?>
                                <?php 
                                    $height_pct = round(($day['views'] / $max_views) * 100);
                                    if ($height_pct < 4 && $day['views'] > 0) $height_pct = 6;
                                ?>
                                <div class="chart-col">
                                    <span class="chart-bar-tooltip"><?= $day['views'] ?> vistas (<?= $day['uniques'] ?> únicos)</span>
                                    <div class="chart-bar" style="height: <?= max(4, $height_pct) ?>%;"></div>
                                    <span class="chart-label"><?= $day['label'] ?></span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <!-- DESGLOSE: PÁGINAS MÁS VISTAS Y DISPOSITIVOS -->
                <div class="breakdown-grid">
                    <!-- Páginas Más Populares -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3>🔥 Páginas y Artículos Más Leídos</h3>
                        </div>
                        <div class="admin-card-body p-0">
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Página / Artículo</th>
                                        <th class="text-right">Visitas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (empty($analytics['top_pages'])): ?>
                                        <tr><td colspan="2" class="text-center py-3">Aún no hay visitas registradas.</td></tr>
                                    <?php else: ?>
                                        <?php foreach ($analytics['top_pages'] as $page_title => $views): ?>
                                            <tr>
                                                <td><strong><?= e($page_title) ?></strong></td>
                                                <td class="text-right"><span class="badge badge-primary"><?= number_format($views) ?></span></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Dispositivos y Fuentes -->
                    <div class="admin-card">
                        <div class="admin-card-header">
                            <h3>📱 Dispositivos & Fuentes</h3>
                        </div>
                        <div class="admin-card-body">
                            <h4 style="font-size: 0.85rem; color: var(--admin-gold); text-transform: uppercase; margin-bottom: 0.75rem;">Dispositivos</h4>
                            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                                <div style="flex:1; background: #12151f; padding: 0.75rem; border-radius: 6px; text-align: center;">
                                    <span style="font-size: 1.4rem;">💻</span>
                                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">Desktop</div>
                                    <strong><?= $analytics['devices']['desktop'] ?></strong>
                                </div>
                                <div style="flex:1; background: #12151f; padding: 0.75rem; border-radius: 6px; text-align: center;">
                                    <span style="font-size: 1.4rem;">📱</span>
                                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">Móvil</div>
                                    <strong><?= $analytics['devices']['mobile'] ?></strong>
                                </div>
                                <div style="flex:1; background: #12151f; padding: 0.75rem; border-radius: 6px; text-align: center;">
                                    <span style="font-size: 1.4rem;">📟</span>
                                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">Tablet</div>
                                    <strong><?= $analytics['devices']['tablet'] ?></strong>
                                </div>
                            </div>

                            <h4 style="font-size: 0.85rem; color: var(--admin-gold); text-transform: uppercase; margin-bottom: 0.75rem;">Principales Orígenes de Tráfico</h4>
                            <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                                <?php if (empty($analytics['referrers'])): ?>
                                    <li style="color: var(--admin-text-muted);">Directo / Navegador</li>
                                <?php else: ?>
                                    <?php foreach ($analytics['referrers'] as $source => $count): ?>
                                        <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.35rem;">
                                            <span>🌐 <?= e($source) ?></span>
                                            <strong><?= $count ?></strong>
                                        </li>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- ACCIONES RÁPIDAS -->
                <div class="admin-card" style="margin-top: 1.5rem;">
                    <h3>Acciones Rápidas</h3>
                    <div class="quick-actions-bar">
                        <a href="blog.php?action=new" class="btn btn-primary">➕ Nuevo Artículo de Blog</a>
                        <a href="opiniones.php?action=new" class="btn btn-primary">➕ Nueva Opinión de Lector</a>
                        <a href="galeria.php?action=new" class="btn btn-primary">➕ Subir Foto a Galería</a>
                        <a href="medios.php" class="btn btn-secondary">📁 Ver Biblioteca de Medios</a>
                        <a href="settings.php" class="btn btn-secondary">⚙️ Editar Teléfono y Redes</a>
                    </div>
                </div>

            </div>
        </main>
    </div>
</body>
</html>
