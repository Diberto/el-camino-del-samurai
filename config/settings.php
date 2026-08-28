<?php
/**
 * EL CAMINO DEL SAMURÁI - CONFIGURACIÓN Y FUNCIONES DEL SISTEMA
 * Compatible con PHP 7.4+ y PHP 8.x
 */

// Iniciar sesión segura si no está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Definición de rutas base absolutas
define('ROOT_DIR', realpath(__DIR__ . '/..'));
define('DATA_DIR', ROOT_DIR . '/data');
define('UPLOADS_DIR', ROOT_DIR . '/photos');

// Helper para leer archivos JSON de datos
function get_json_data(string $filename, $default = []) {
    $path = DATA_DIR . '/' . $filename;
    if (!file_exists($path)) {
        return $default;
    }
    $content = file_get_contents($path);
    $decoded = json_decode($content, true);
    return is_array($decoded) ? $decoded : $default;
}

// Helper para guardar datos JSON
function save_json_data(string $filename, $data): bool {
    $path = DATA_DIR . '/' . $filename;
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    return file_put_contents($path, $encoded) !== false;
}

// Cargar configuración global del sitio
$site_config = get_json_data('config.json', [
    'settings' => [
        'site_title' => 'La Ruta del Samurái - Jorge Orpianesi',
        'site_subtitle' => 'La Senda de la Historia y el Budo',
        'site_description' => 'Un fascinante viaje por la geografía, templos y castillos feudales del Japón tradicional.',
        'address' => 'Budokan Argentina - Sarmiento 375, Córdoba, República Argentina. CP: 5000',
        'whatsapp' => '+549 351 3886443',
        'whatsapp_url' => 'https://wa.me/5493513886443',
        'email' => 'budokanorpianesi@hotmail.com',
        'amazon_url' => 'https://www.amazon.com/s?k=jorge+orpianesi',
        'budokan_url' => 'https://www.budokanweb.com/categoria-producto/libros/',
        'social' => [
            'youtube' => [
                'title' => 'YouTube',
                'url' => 'https://www.youtube.com/@larutadelsamurai',
                'handle' => '@larutadelsamurai'
            ],
            'instagram' => [
                'title' => 'Instagram',
                'url' => 'https://www.instagram.com/la.ruta.del.samurai/',
                'handle' => '@la.ruta.del.samurai'
            ],
            'facebook' => [
                'title' => 'Facebook',
                'url' => 'https://www.facebook.com/jorgeorpianesi',
                'handle' => 'Jorge Orpianesi'
            ]
        ]
    ]
]);

$settings = $site_config['settings'] ?? [];

// Helper para escapar cadenas en HTML (XSS prevention)
function e($str): string {
    return htmlspecialchars((string)($str ?? ''), ENT_QUOTES, 'UTF-8');
}

// Helper para formatear fechas amigables
function format_date(string $date_str): string {
    if (empty($date_str)) return '';
    $timestamp = strtotime($date_str);
    if (!$timestamp) return $date_str;
    $meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    $dia = date('d', $timestamp);
    $mes = $meses[(int)date('m', $timestamp) - 1];
    $anio = date('Y', $timestamp);
    return "$dia $mes, $anio";
}
