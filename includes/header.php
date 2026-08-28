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
<html lang="es" class="theme-night">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title><?= e($page_title) ?></title>
    <meta name="description" content="<?= e($page_desc) ?>">
    <meta name="author" content="Jorge Orpianesi">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Redes Sociales -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= e($page_title) ?>">
    <meta property="og:description" content="<?= e($page_desc) ?>">
    <meta property="og:image" content="assets/logo_typography_dark.webp">
    
    <!-- Favicon -->
    <link rel="icon" type="image/webp" href="assets/kanji_stamp.webp">
    <link rel="shortcut icon" href="public/favicon.ico">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- Hojas de Estilo -->
    <link rel="stylesheet" href="css/styles.css?v=2.0">
</head>
<body class="theme-night">
