<?php
/**
 * CABECERA GLOBAL DEL SITIO - EL CAMINO DEL SAMURÁI
 */
if (!isset($settings)) {
    require_once __DIR__ . '/../config/settings.php';
}

$page_title = isset($custom_title) ? $custom_title . ' | ' . $settings['site_title'] : $settings['site_title'];
$page_desc = $custom_desc ?? $settings['site_description'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#07080a">
    <title><?= e($page_title) ?></title>
    <meta name="description" content="<?= e($page_desc) ?>">
    <meta name="keywords" content="samurai, bushido, libro, jorge orpianesi, la ruta del samurai, el paso de las luciernagas, japon para budokas, artes marciales, japon, miyamoto musashi">
    <meta name="author" content="Jorge Orpianesi">
    <link rel="canonical" href="https://larutadelsamurai.com/">
    <link rel="icon" type="image/webp" href="assets/kanji_stamp.webp">
    <link rel="shortcut icon" href="assets/kanji_stamp.webp">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Redes Sociales -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= e($page_title) ?>">
    <meta property="og:description" content="<?= e($page_desc) ?>">
    <meta property="og:image" content="https://larutadelsamurai.com/assets/logo_typography_dark.webp">
    <meta property="og:url" content="https://larutadelsamurai.com/">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= e($page_title) ?>">
    <meta name="twitter:description" content="<?= e($page_desc) ?>">
    <meta name="twitter:image" content="https://larutadelsamurai.com/assets/logo_typography_dark.webp">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Hojas de Estilo -->
    <link rel="stylesheet" href="css/styles.css?v=3.3">
</head>
<body data-theme-default="<?= e($settings['theme_default'] ?? 'day') ?>" data-reviews-filter="<?= e($settings['reviews_default_filter'] ?? 'text') ?>">

    <!-- Canvas para pétalos de sakura -->
    <canvas id="sakura-canvas"></canvas>
