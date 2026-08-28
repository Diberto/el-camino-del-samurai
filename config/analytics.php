<?php
/**
 * LA RUTA DEL SAMURÁI - MOTOR DE ANALÍTICAS Y CONTADOR DE VISITAS
 * Almacenamiento ultraligero y privado en data/analytics.json (Sin dependencias externas)
 */

function track_page_view(string $page_name = 'Inicio') {
    // No contar visitas de administradores logueados para no falsear estadísticas
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (!empty($_SESSION['admin_logged_in'])) {
        return;
    }

    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Ignorar rastreadores/bots automáticos
    if (preg_match('/bot|crawl|spider|slurp|facebookexternalhit|whatsapp/i', $user_agent)) {
        return;
    }

    $analytics_file = ROOT_DIR . '/data/analytics.json';
    $data = [
        'total_views' => 0,
        'daily_stats' => [],
        'pages' => [],
        'devices' => ['desktop' => 0, 'mobile' => 0, 'tablet' => 0],
        'referrers' => []
    ];

    if (file_exists($analytics_file)) {
        $content = file_get_contents($analytics_file);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $data = array_merge($data, $decoded);
        }
    }

    // 1. Contador total
    $data['total_views']++;

    // 2. Contador por fecha y visitantes únicos (hash anónimo de IP + fecha)
    $today = date('Y-m-d');
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $ip_hash = substr(md5($ip . $today . 'samurai_salt_2026'), 0, 10);

    if (!isset($data['daily_stats'][$today])) {
        $data['daily_stats'][$today] = [
            'views' => 0,
            'uniques' => [],
            'unique_count' => 0
        ];
    }

    $data['daily_stats'][$today]['views']++;
    if (!in_array($ip_hash, $data['daily_stats'][$today]['uniques'])) {
        $data['daily_stats'][$today]['uniques'][] = $ip_hash;
        $data['daily_stats'][$today]['unique_count'] = count($data['daily_stats'][$today]['uniques']);
    }

    // Mantener solo los últimos 60 días para mantener el archivo ultra liviano
    if (count($data['daily_stats']) > 60) {
        $data['daily_stats'] = array_slice($data['daily_stats'], -60, null, true);
    }

    // 3. Contador por página / artículo
    $page_key = substr(trim($page_name), 0, 100);
    $data['pages'][$page_key] = ($data['pages'][$page_key] ?? 0) + 1;

    // 4. Tipo de dispositivo
    $is_mobile = preg_match('/(android|iphone|ipad|ipod|blackberry|windows phone)/i', $user_agent);
    $is_tablet = preg_match('/(ipad|tablet|(android(?!.*mobile)))/i', $user_agent);
    
    if ($is_tablet) {
        $data['devices']['tablet']++;
    } elseif ($is_mobile) {
        $data['devices']['mobile']++;
    } else {
        $data['devices']['desktop']++;
    }

    // 5. Origen del tráfico (Referrer)
    $referrer = $_SERVER['HTTP_REFERER'] ?? '';
    $ref_source = 'Directo / Favoritos';
    if (!empty($referrer)) {
        $host = parse_url($referrer, PHP_URL_HOST);
        if ($host) {
            if (strpos($host, 'instagram.com') !== false) $ref_source = 'Instagram';
            elseif (strpos($host, 'youtube.com') !== false) $ref_source = 'YouTube';
            elseif (strpos($host, 'facebook.com') !== false) $ref_source = 'Facebook';
            elseif (strpos($host, 'google.') !== false) $ref_source = 'Google';
            elseif (strpos($host, 'larutadelsamurai.com') !== false) $ref_source = 'Interno';
            else $ref_source = $host;
        }
    }
    $data['referrers'][$ref_source] = ($data['referrers'][$ref_source] ?? 0) + 1;

    file_put_contents($analytics_file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

function get_analytics_summary() {
    $analytics_file = ROOT_DIR . '/data/analytics.json';
    if (!file_exists($analytics_file)) {
        return [
            'total_views' => 0,
            'today_views' => 0,
            'today_uniques' => 0,
            'month_views' => 0,
            'daily_stats' => [],
            'top_pages' => [],
            'devices' => ['desktop' => 0, 'mobile' => 0, 'tablet' => 0],
            'referrers' => []
        ];
    }

    $data = json_decode(file_get_contents($analytics_file), true) ?? [];
    $today = date('Y-m-d');
    $current_month = date('Y-m');

    $today_views = $data['daily_stats'][$today]['views'] ?? 0;
    $today_uniques = $data['daily_stats'][$today]['unique_count'] ?? 0;

    $month_views = 0;
    foreach (($data['daily_stats'] ?? []) as $date => $stats) {
        if (strpos($date, $current_month) === 0) {
            $month_views += ($stats['views'] ?? 0);
        }
    }

    arsort($data['pages']);
    $top_pages = array_slice($data['pages'] ?? [], 0, 6, true);

    arsort($data['referrers']);
    $top_referrers = array_slice($data['referrers'] ?? [], 0, 5, true);

    return [
        'total_views' => $data['total_views'] ?? 0,
        'today_views' => $today_views,
        'today_uniques' => $today_uniques,
        'month_views' => $month_views,
        'daily_stats' => $data['daily_stats'] ?? [],
        'top_pages' => $top_pages,
        'devices' => $data['devices'] ?? ['desktop' => 0, 'mobile' => 0, 'tablet' => 0],
        'referrers' => $top_referrers
    ];
}
