/* ==========================================================================
   EL CAMINO DEL SAMURAI - GPU PANEL LOGIC & LIVE PREVIEW CONTROLLER
   ========================================================================== */

import { gpuConfig, DEFAULT_PRESET } from './gpu-config.js';
import cloudTexture1 from './assets/cloud_texture_1.webp';
import cloudTexture2 from './assets/cloud_texture_2.webp';
import cloudTexture3 from './assets/cloud_texture_3.webp';
import sakuraPetal1 from './assets/sakura_petal_1.webp';
import sakuraPetal2 from './assets/sakura_petal_2.webp';
import sakuraPetal3 from './assets/sakura_petal_3.webp';

document.addEventListener('DOMContentLoaded', () => {
    let cfg = JSON.parse(JSON.stringify(gpuConfig.currentConfig));

    // UI Input Elements
    const inputCloudSpeed = document.getElementById('input-cloud-speed');
    const valCloudSpeed = document.getElementById('val-cloud-speed');

    const inputCloudDir = document.getElementById('input-cloud-dir');
    const valCloudDir = document.getElementById('val-cloud-dir');

    const inputCloudAcc = document.getElementById('input-cloud-acc');
    const valCloudAcc = document.getElementById('val-cloud-acc');

    const inputCloudCountBg = document.getElementById('input-cloud-count-bg');
    const valCloudCountBg = document.getElementById('val-cloud-count-bg');

    const inputCloudCountFg = document.getElementById('input-cloud-count-fg');
    const valCloudCountFg = document.getElementById('val-cloud-count-fg');

    const inputSakuraCount = document.getElementById('input-sakura-count');
    const valSakuraCount = document.getElementById('val-sakura-count');

    const inputSakuraSpeed = document.getElementById('input-sakura-speed');
    const valSakuraSpeed = document.getElementById('val-sakura-speed');

    const inputWindSens = document.getElementById('input-wind-sens');
    const valWindSens = document.getElementById('val-wind-sens');

    const inputStarCount = document.getElementById('input-star-count');
    const valStarCount = document.getElementById('val-star-count');

    const inputShootingFreq = document.getElementById('input-shooting-freq');
    const valShootingFreq = document.getElementById('val-shooting-freq');

    const inputDayTop = document.getElementById('input-day-top');
    const inputDayMid = document.getElementById('input-day-mid');
    const inputDayBottom = document.getElementById('input-day-bottom');

    const inputNightTop = document.getElementById('input-night-top');
    const inputNightMid = document.getElementById('input-night-mid');
    const inputNightBottom = document.getElementById('input-night-bottom');

    const inputRenderMode = document.getElementById('input-render-mode');
    const inputFpsCap = document.getElementById('input-fps-cap');
    const inputScopeSelect = document.getElementById('input-scope-select');
    const inputPresetSelect = document.getElementById('input-preset-select');

    const btnSaveConfig = document.getElementById('btn-save-config');
    const btnSaveNewPreset = document.getElementById('btn-save-new-preset');
    const btnExportPreset = document.getElementById('btn-export-preset');
    const btnResetDefault = document.getElementById('btn-reset-default');
    const scopeIndicator = document.getElementById('scope-indicator');
    const previewThemeToggle = document.getElementById('preview-theme-toggle');

    // Populate UI with current config values
    function updateUIFromConfig() {
        if (inputCloudSpeed) { inputCloudSpeed.value = cfg.clouds.speed; valCloudSpeed.textContent = cfg.clouds.speed + 'x'; }
        if (inputCloudDir) { inputCloudDir.value = cfg.clouds.direction; valCloudDir.textContent = cfg.clouds.direction == 1 ? 'Derecha ➡️' : 'Izquierda ⬅️'; }
        if (inputCloudAcc) { inputCloudAcc.value = cfg.clouds.acceleration; valCloudAcc.textContent = cfg.clouds.acceleration + 'x'; }
        if (inputCloudCountBg) { inputCloudCountBg.value = cfg.clouds.volumeCountBg; valCloudCountBg.textContent = cfg.clouds.volumeCountBg; }
        if (inputCloudCountFg) { inputCloudCountFg.value = cfg.clouds.volumeCountFg; valCloudCountFg.textContent = cfg.clouds.volumeCountFg; }

        if (inputSakuraCount) { inputSakuraCount.value = cfg.particles.sakuraCount; valSakuraCount.textContent = cfg.particles.sakuraCount; }
        if (inputSakuraSpeed) { inputSakuraSpeed.value = cfg.particles.sakuraFallSpeed; valSakuraSpeed.textContent = cfg.particles.sakuraFallSpeed + 'x'; }
        if (inputWindSens) { inputWindSens.value = cfg.particles.windSensitivity; valWindSens.textContent = cfg.particles.windSensitivity + 'x'; }

        if (inputStarCount) { inputStarCount.value = cfg.particles.starCount; valStarCount.textContent = cfg.particles.starCount; }
        if (inputShootingFreq) { inputShootingFreq.value = cfg.particles.shootingStarFreq; valShootingFreq.textContent = cfg.particles.shootingStarFreq + 's'; }

        if (inputDayTop) inputDayTop.value = cfg.sky.dayGradTop;
        if (inputDayMid) inputDayMid.value = cfg.sky.dayGradMid;
        if (inputDayBottom) inputDayBottom.value = cfg.sky.dayGradBottom;

        if (inputNightTop) inputNightTop.value = cfg.sky.nightGradTop;
        if (inputNightMid) inputNightMid.value = cfg.sky.nightGradMid;
        if (inputNightBottom) inputNightBottom.value = cfg.sky.nightGradBottom;

        if (inputRenderMode) inputRenderMode.value = cfg.gpu.renderMode;
        if (inputFpsCap) inputFpsCap.value = cfg.gpu.fpsCap;
        if (inputScopeSelect) inputScopeSelect.value = cfg.scope || 'user';

        if (scopeIndicator) {
            scopeIndicator.textContent = cfg.scope === 'global' ? 'MODO GLOBAL' : 'MODO USUARIO';
            scopeIndicator.style.borderColor = cfg.scope === 'global' ? 'var(--accent-gold)' : 'var(--accent-red)';
            scopeIndicator.style.color = cfg.scope === 'global' ? 'var(--accent-gold)' : 'var(--accent-red)';
        }

        updatePresetDropdown();
        applySkyGradients();
    }

    function updatePresetDropdown() {
        if (!inputPresetSelect) return;
        inputPresetSelect.innerHTML = '';
        gpuConfig.presets.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.name + (p.id === cfg.id ? ' (Activo)' : '');
            inputPresetSelect.appendChild(opt);
        });
    }

    function applySkyGradients() {
        const skyDay = document.getElementById('preview-sky-day');
        const skyNight = document.getElementById('preview-sky-night');
        if (skyDay) {
            skyDay.style.background = `linear-gradient(180deg, ${cfg.sky.dayGradTop} 0%, ${cfg.sky.dayGradMid} 50%, ${cfg.sky.dayGradBottom} 100%)`;
        }
        if (skyNight) {
            skyNight.style.background = `linear-gradient(180deg, ${cfg.sky.nightGradTop} 0%, ${cfg.sky.nightGradMid} 50%, ${cfg.sky.nightGradBottom} 100%)`;
        }
    }

    // Event Listeners for Input Changes
    if (inputCloudSpeed) {
        inputCloudSpeed.addEventListener('input', (e) => {
            cfg.clouds.speed = parseFloat(e.target.value);
            valCloudSpeed.textContent = cfg.clouds.speed + 'x';
        });
    }

    if (inputCloudDir) {
        inputCloudDir.addEventListener('change', (e) => {
            cfg.clouds.direction = parseInt(e.target.value);
            valCloudDir.textContent = cfg.clouds.direction == 1 ? 'Derecha ➡️' : 'Izquierda ⬅️';
        });
    }

    if (inputCloudAcc) {
        inputCloudAcc.addEventListener('input', (e) => {
            cfg.clouds.acceleration = parseFloat(e.target.value);
            valCloudAcc.textContent = cfg.clouds.acceleration + 'x';
        });
    }

    if (inputCloudCountBg) {
        inputCloudCountBg.addEventListener('input', (e) => {
            cfg.clouds.volumeCountBg = parseInt(e.target.value);
            valCloudCountBg.textContent = cfg.clouds.volumeCountBg;
            initLiveClouds();
        });
    }

    if (inputCloudCountFg) {
        inputCloudCountFg.addEventListener('input', (e) => {
            cfg.clouds.volumeCountFg = parseInt(e.target.value);
            valCloudCountFg.textContent = cfg.clouds.volumeCountFg;
            initLiveClouds();
        });
    }

    if (inputSakuraCount) {
        inputSakuraCount.addEventListener('input', (e) => {
            cfg.particles.sakuraCount = parseInt(e.target.value);
            valSakuraCount.textContent = cfg.particles.sakuraCount;
            initLiveSakura();
        });
    }

    if (inputSakuraSpeed) {
        inputSakuraSpeed.addEventListener('input', (e) => {
            cfg.particles.sakuraFallSpeed = parseFloat(e.target.value);
            valSakuraSpeed.textContent = cfg.particles.sakuraFallSpeed + 'x';
        });
    }

    if (inputWindSens) {
        inputWindSens.addEventListener('input', (e) => {
            cfg.particles.windSensitivity = parseFloat(e.target.value);
            valWindSens.textContent = cfg.particles.windSensitivity + 'x';
        });
    }

    if (inputStarCount) {
        inputStarCount.addEventListener('input', (e) => {
            cfg.particles.starCount = parseInt(e.target.value);
            valStarCount.textContent = cfg.particles.starCount;
            initLiveStars();
        });
    }

    if (inputShootingFreq) {
        inputShootingFreq.addEventListener('input', (e) => {
            cfg.particles.shootingStarFreq = parseInt(e.target.value);
            valShootingFreq.textContent = cfg.particles.shootingStarFreq + 's';
        });
    }

    [inputDayTop, inputDayMid, inputDayBottom].forEach(el => {
        if (el) el.addEventListener('input', () => {
            cfg.sky.dayGradTop = inputDayTop.value;
            cfg.sky.dayGradMid = inputDayMid.value;
            cfg.sky.dayGradBottom = inputDayBottom.value;
            applySkyGradients();
        });
    });

    [inputNightTop, inputNightMid, inputNightBottom].forEach(el => {
        if (el) el.addEventListener('input', () => {
            cfg.sky.nightGradTop = inputNightTop.value;
            cfg.sky.nightGradMid = inputNightMid.value;
            cfg.sky.nightGradBottom = inputNightBottom.value;
            applySkyGradients();
        });
    });

    if (inputScopeSelect) {
        inputScopeSelect.addEventListener('change', (e) => {
            cfg.scope = e.target.value;
            updateUIFromConfig();
        });
    }

    if (previewThemeToggle) {
        previewThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-night');
        });
    }

    // Action Buttons
    if (btnSaveConfig) {
        btnSaveConfig.addEventListener('click', () => {
            gpuConfig.saveCurrentConfig(cfg, cfg.scope);
            alert(`✅ Configuración guardada exitosamente (${cfg.scope === 'global' ? 'Ámbito Global' : 'Ámbito Mi Usuario'}).`);
        });
    }

    if (btnSaveNewPreset) {
        btnSaveNewPreset.addEventListener('click', () => {
            const name = prompt("Escribe un nombre para tu nuevo Preset:", "Mi Preset " + (gpuConfig.presets.length + 1));
            if (name) {
                const p = gpuConfig.saveNewPreset(name, cfg);
                cfg = p;
                updateUIFromConfig();
                alert(`✨ Preset '${p.name}' guardado correctamente.`);
            }
        });
    }

    if (btnExportPreset) {
        btnExportPreset.addEventListener('click', () => {
            const json = gpuConfig.exportPresetJSON(cfg);
            navigator.clipboard.writeText(json).then(() => {
                alert("📋 Preset exportado en formato JSON al portapapeles.");
            }).catch(() => {
                alert("JSON Exportado:\n\n" + json);
            });
        });
    }

    if (btnResetDefault) {
        btnResetDefault.addEventListener('click', () => {
            if (confirm("¿Restablecer la configuración al Preset por Defecto del sitio?")) {
                cfg = gpuConfig.resetToDefault();
                updateUIFromConfig();
                initLiveClouds();
                initLiveStars();
                initLiveSakura();
                alert("🔄 Restablecido al Preset Inicial predeterminado.");
            }
        });
    }

    // --- LIVE PREVIEW ENGINE (NUBES, ESTRELLAS Y SAKURA EN TIEMPO REAL) ---
    let bgClouds = [], fgClouds = [];
    let bgCtx = null, fgCtx = null;
    let cloudWidth = 0, cloudHeight = 0;

    const img1 = new Image(); img1.src = cloudTexture1;
    const img2 = new Image(); img2.src = cloudTexture2;
    const img3 = new Image(); img3.src = cloudTexture3;
    const cloudTextures = [img1, img2, img3];

    function initLiveClouds() {
        const bgCanvas = document.getElementById('clouds-bg-canvas');
        const fgCanvas = document.getElementById('clouds-fg-canvas');
        if (!bgCanvas || !fgCanvas) return;

        bgCtx = bgCanvas.getContext('2d', { alpha: true });
        fgCtx = fgCanvas.getContext('2d', { alpha: true });

        const frame = document.getElementById('gpu-preview-frame');
        cloudWidth = bgCanvas.width = fgCanvas.width = Math.ceil(frame.clientWidth * 1.3);
        cloudHeight = bgCanvas.height = fgCanvas.height = Math.ceil(frame.clientHeight * 1.3);

        bgClouds = [];
        fgClouds = [];

        for (let i = 0; i < cfg.clouds.volumeCountBg; i++) {
            bgClouds.push({
                x: Math.random() * (cloudWidth + 400) - 200,
                y: Math.random() * (cloudHeight * 0.45) - 30,
                texture: cloudTextures[Math.floor(Math.random() * cloudTextures.length)],
                scaleX: Math.random() * 0.7 + 0.7,
                scaleY: Math.random() * 0.5 + 0.5,
                speedX: Math.random() * 0.35 + 0.15,
                opacity: Math.random() * 0.25 + 0.2,
                swayOffset: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.008 + 0.003
            });
        }

        for (let i = 0; i < cfg.clouds.volumeCountFg; i++) {
            fgClouds.push({
                x: Math.random() * (cloudWidth + 600) - 300,
                y: Math.random() * (cloudHeight * 0.40) + 10,
                texture: cloudTextures[Math.floor(Math.random() * cloudTextures.length)],
                scaleX: Math.random() * 0.8 + 0.7,
                scaleY: Math.random() * 0.4 + 0.5,
                speedX: Math.random() * 0.6 + 0.3,
                opacity: Math.random() * 0.3 + 0.25,
                swayOffset: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.012 + 0.004
            });
        }
    }

    let cloudTime = 0;
    function renderLiveClouds() {
        if (bgCtx && fgCtx) {
            cloudTime += 0.016;
            bgCtx.clearRect(0, 0, cloudWidth, cloudHeight);
            fgCtx.clearRect(0, 0, cloudWidth, cloudHeight);

            const mult = cfg.clouds.speed * cfg.clouds.direction * cfg.clouds.acceleration;

            bgClouds.forEach(c => {
                c.x += c.speedX * mult;
                const swayY = Math.sin(cloudTime * c.swaySpeed + c.swayOffset) * 6;

                if (mult > 0 && c.x > cloudWidth + 300) c.x = -400;
                if (mult < 0 && c.x < -400) c.x = cloudWidth + 300;

                if (c.texture.complete && c.texture.naturalWidth > 0) {
                    bgCtx.save();
                    bgCtx.globalAlpha = c.opacity;
                    bgCtx.translate(c.x, c.y + swayY);
                    bgCtx.scale(c.scaleX, c.scaleY);
                    bgCtx.drawImage(c.texture, -c.texture.width / 2, -c.texture.height / 2);
                    bgCtx.restore();
                }
            });

            fgClouds.forEach(c => {
                c.x += c.speedX * mult;
                const swayY = Math.sin(cloudTime * c.swaySpeed + c.swayOffset) * 10;

                if (mult > 0 && c.x > cloudWidth + 400) c.x = -500;
                if (mult < 0 && c.x < -500) c.x = cloudWidth + 400;

                if (c.texture.complete && c.texture.naturalWidth > 0) {
                    fgCtx.save();
                    fgCtx.globalAlpha = c.opacity;
                    fgCtx.translate(c.x, c.y + swayY);
                    fgCtx.scale(c.scaleX, c.scaleY);
                    fgCtx.drawImage(c.texture, -c.texture.width / 2, -c.texture.height / 2);
                    fgCtx.restore();
                }
            });
        }
        requestAnimationFrame(renderLiveClouds);
    }

    // LIVE STARFIELD ENGINE
    let stars = [];
    let starCtx = null;
    let starWidth = 0, starHeight = 0;

    function initLiveStars() {
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        starCtx = canvas.getContext('2d');
        const frame = document.getElementById('gpu-preview-frame');
        starWidth = canvas.width = frame.clientWidth;
        starHeight = canvas.height = frame.clientHeight;

        stars = [];
        for (let i = 0; i < cfg.particles.starCount; i++) {
            stars.push({
                x: Math.random() * starWidth,
                y: Math.random() * (starHeight * 0.75),
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random(),
                speed: (Math.random() * 0.02 + 0.005) * cfg.particles.starTwinkleSpeed,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function renderLiveStars() {
        if (starCtx && document.body.classList.contains('theme-night')) {
            starCtx.clearRect(0, 0, starWidth, starHeight);
            stars.forEach(s => {
                s.alpha += s.speed * s.direction;
                if (s.alpha >= 1 || s.alpha <= 0.1) s.direction *= -1;
                starCtx.beginPath();
                starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                starCtx.fillStyle = `rgba(225, 235, 255, ${s.alpha})`;
                starCtx.fill();
            });
        }
        requestAnimationFrame(renderLiveStars);
    }

    // LIVE SAKURA PETALS ENGINE (LAYER 7 & 8 TEXTURES)
    const p1 = new Image(); p1.src = sakuraPetal1;
    const p2 = new Image(); p2.src = sakuraPetal2;
    const p3 = new Image(); p3.src = sakuraPetal3;
    const sakuraTextures = [p1, p2, p3];

    let sakuraPetals = [];
    let sakuraCtx = null;
    let sakuraWidth = 0, sakuraHeight = 0;

    function initLiveSakura() {
        const canvas = document.getElementById('sakura-canvas');
        if (!canvas) return;
        sakuraCtx = canvas.getContext('2d');
        const frame = document.getElementById('gpu-preview-frame');
        sakuraWidth = canvas.width = frame.clientWidth;
        sakuraHeight = canvas.height = frame.clientHeight;

        sakuraPetals = [];
        for (let i = 0; i < cfg.particles.sakuraCount; i++) {
            sakuraPetals.push({
                x: Math.random() * sakuraWidth,
                y: Math.random() * sakuraHeight,
                size: Math.random() * 7 + 4,
                speedX: (Math.random() * -0.8 - 0.3) * cfg.particles.sakuraFallSpeed,
                speedY: (Math.random() * 0.6 + 0.4) * cfg.particles.sakuraFallSpeed,
                alpha: Math.random() * 0.45 + 0.45,
                angle: Math.random() * Math.PI * 2,
                spinSpeed: Math.random() * 0.025 - 0.012,
                flip: Math.random() * Math.PI * 2,
                flipSpeed: Math.random() * 0.03 + 0.01,
                texture: sakuraTextures[Math.floor(Math.random() * sakuraTextures.length)]
            });
        }
    }

    function renderLiveSakura() {
        if (sakuraCtx) {
            sakuraCtx.clearRect(0, 0, sakuraWidth, sakuraHeight);
            sakuraPetals.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.angle += p.spinSpeed;
                p.flip += p.flipSpeed;

                if (p.y > sakuraHeight + 20 || p.x < -20 || p.x > sakuraWidth + 20) {
                    p.x = Math.random() * (sakuraWidth + 100);
                    p.y = -20;
                }

                sakuraCtx.save();
                sakuraCtx.translate(p.x, p.y);
                sakuraCtx.rotate(p.angle);
                sakuraCtx.scale(Math.cos(p.flip), 1);
                sakuraCtx.globalAlpha = p.alpha;

                if (p.texture.complete && p.texture.naturalWidth > 0) {
                    const drawSize = p.size * 2.4;
                    sakuraCtx.drawImage(p.texture, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
                } else {
                    sakuraCtx.beginPath();
                    sakuraCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
                    sakuraCtx.fillStyle = `rgba(230, 57, 70, ${p.alpha})`;
                    sakuraCtx.fill();
                }
                sakuraCtx.restore();
            });
        }
        requestAnimationFrame(renderLiveSakura);
    }

    // Initialize Everything
    updateUIFromConfig();
    setTimeout(() => {
        initLiveClouds();
        initLiveStars();
        initLiveSakura();
        renderLiveClouds();
        renderLiveStars();
        renderLiveSakura();
    }, 150);
});
