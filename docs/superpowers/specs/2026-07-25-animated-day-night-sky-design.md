# Technical Design Specification: Animated Day/Night Sky & Landscape System

## 1. Overview
This feature introduces an interactive, multi-layered Day/Night sky system for *La Ruta del Samurái* landing page. The background transitions dynamically between a warm, golden-hour Japanese sunset with drifting clouds and a deep indigo night sky with twinkling stars, nebulae glow, and shooting stars over Mount Fuji.

## 2. Key Architecture & Components

### 2.1 HTML Structure (`index.html`)
- **Sky Container (`.sky-container`)**: Absolute background container behind the hero/landscape parallax layers.
  - **Day Sky Layer (`.sky-layer.sky-day`)**:
    - Animated drifting clouds (`.cloud-layer`)
    - Glowing Sun element behind Mount Fuji (`.sun-glow`)
  - **Night Sky Layer (`.sky-layer.sky-night`)**:
    - Starfield canvas (`#starfield-canvas`) for real-time twinkling stars and shooting stars
    - Glowing Moon / Crimson aura
  - **Day/Night Toggle Button (`.theme-toggle-btn`)**:
    - Integrated into the centered navbar header.
    - Displays a sleek Sun/Moon icon pair with smooth hover animations.

### 2.2 CSS Design & Animation System (`styles.css`)
- **Day Mode Color Palette**:
  - Gradient: `linear-gradient(180deg, #1f1d2b 0%, #d94e34 35%, #f4a261 70%, #07080a 100%)`
  - Cloud animations: Smooth horizontal keyframes (`@keyframes driftClouds`) with varying opacities and speeds (45s, 70s).
- **Night Mode Color Palette**:
  - Gradient: `linear-gradient(180deg, #050811 0%, #0b1326 40%, #151a2e 75%, #07080a 100%)`
- **Smooth Transition**:
  - `transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), filter 1.8s ease;` applied to sky layers and landscape brightness/saturation adjustment.

### 2.3 JavaScript Controller (`script.js`)
- **Theme Manager (`initDayNightCycle`)**:
  - Local Storage persistence (`theme_mode: 'day' | 'night'`).
  - Auto-detection based on user local time (Day between 6:00 AM and 7:00 PM, Night between 7:00 PM and 6:00 AM if no preference saved).
  - Smooth DOM class toggling (`document.body.classList.toggle('theme-night')`).
- **Starfield Canvas Animation (`initStarfield`)**:
  - Generates 120 twinkling stars with randomized radius, pulsation speed, and alpha.
  - Periodic shooting star animation spawning every 4-8 seconds.
- **Clouds Animation (`initClouds`)**:
  - Pure CSS keyframe driven with JS resize observer for high efficiency.

## 3. Verification & Quality Gates
- **Performance**: High frame rate (60 FPS) canvas rendering with requestAnimationFrame, using non-blocking passive listeners.
- **Responsiveness**: Fully responsive across Mobile, Tablet, and Desktop displays.
- **Build Cleanliness**: Zero TypeScript/JavaScript console errors; verified via Vite production build (`npm run build`).
