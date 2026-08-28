<?php
/**
 * PANEL ADMIN - DASHBOARD PRINCIPAL
 */
require_once __DIR__ . '/../config/auth.php';
require_admin_auth();

$opiniones = get_json_data('opiniones.json', []);
$posts = get_json_data('blog.json', []);
$galeria = get_json_data('galeria.json', []);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración | La Ruta del Samurái</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/admin.css?v=2.0">
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
                <a href="index.php" class="admin-nav-item active">📊 Dashboard</a>
                <a href="opiniones.php" class="admin-nav-item">💬 Opiniones de Lectores</a>
                <a href="blog.php" class="admin-nav-item">📝 Artículos del Blog</a>
                <a href="galeria.php" class="admin-nav-item">🖼️ Galería de Fotos</a>
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
                <h2>Resumen General</h2>
                <span class="admin-user-badge">Conectado como <strong>admin</strong></span>
            </header>

            <div class="admin-content">
                <!-- Métricas Rápidas -->
                <div class="stats-grid">
                    <div class="stat-box">
                        <span class="stat-box-num"><?= count($opiniones) ?></span>
                        <span class="stat-box-title">Opiniones de Lectores</span>
                        <a href="opiniones.php" class="stat-box-link">Gestionar opiniones &rarr;</a>
                    </div>

                    <div class="stat-box">
                        <span class="stat-box-num"><?= count($posts) ?></span>
                        <span class="stat-box-title">Artículos en Blog</span>
                        <a href="blog.php" class="stat-box-link">Gestionar artículos &rarr;</a>
                    </div>

                    <div class="stat-box">
                        <span class="stat-box-num"><?= count($galeria) ?></span>
                        <span class="stat-box-title">Fotos en Galería</span>
                        <a href="galeria.php" class="stat-box-link">Gestionar galería &rarr;</a>
                    </div>
                </div>

                <!-- Enlaces Directos -->
                <div class="admin-card">
                    <h3>Acciones Rápidas</h3>
                    <div class="quick-actions-bar">
                        <a href="opiniones.php?action=new" class="btn btn-admin-primary">➕ Nueva Opinión de Lector</a>
                        <a href="blog.php?action=new" class="btn btn-admin-primary">➕ Nuevo Artículo de Blog</a>
                        <a href="galeria.php?action=new" class="btn btn-admin-primary">➕ Subir Foto a Galería</a>
                        <a href="settings.php" class="btn btn-admin-secondary">⚙️ Editar Teléfono y Redes</a>
                    </div>
                </div>

                <!-- Últimas Opiniones -->
                <div class="admin-card">
                    <h3>Últimas Opiniones de Lectores</h3>
                    <div class="table-responsive">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Lector</th>
                                    <th>Tipo</th>
                                    <th>Calificación</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach (array_slice($opiniones, 0, 5) as $rev): ?>
                                    <tr>
                                        <td>
                                            <strong><?= e($rev['name']) ?></strong><br>
                                            <small><?= e($rev['role']) ?></small>
                                        </td>
                                        <td><span class="badge badge-<?= $rev['type'] ?>"><?= $rev['type'] === 'photo' ? 'Foto' : 'Texto' ?></span></td>
                                        <td><?= str_repeat('★', (int)$rev['rating']) ?></td>
                                        <td><?= e($rev['date']) ?></td>
                                        <td>
                                            <a href="opiniones.php?action=edit&id=<?= urlencode($rev['id']) ?>" class="btn-sm btn-edit">Editar</a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
