/* ==========================================================================
   EL CAMINO DEL SAMURAI - GPU & RENDER CONFIGURATION ENGINE
   ========================================================================== */

export const DEFAULT_PRESET = {
    id: "default",
    name: "El Camino del Samurái (Preset Inicial)",
    scope: "global",
    clouds: {
        speed: 1.0,           // Speed multiplier (0.1x - 3.0x)
        direction: 1,         // 1 = Right, -1 = Left
        acceleration: 1.0,    // Acceleration (0.5x - 2.5x)
        opacityBg: 0.28,      // Opacity background clouds
        opacityFg: 0.32,      // Opacity foreground clouds
        volumeCountBg: 14,    // Quantity background particles
        volumeCountFg: 9,     // Quantity foreground particles
        scale: 1.3,           // Bleed scale (1.0x - 1.5x)
    },
    particles: {
        sakuraCount: 50,      // Quantity sakura petals (10 - 150)
        sakuraFallSpeed: 1.0, // Fall speed multiplier
        windSensitivity: 1.0, // Mouse wind force sensitivity
        flip3dEnabled: true,  // 3D tumbling flip toggle
        starCount: 130,       // Star quantity in night mode
        starTwinkleSpeed: 1.0,// Twinkle speed
        shootingStarFreq: 5,  // Shooting star interval (seconds)
    },
    sky: {
        dayGradTop: "#0d1b2a",
        dayGradMid: "#1e3c72",
        dayGradBottom: "#080d1a",
        nightGradTop: "#02040b",
        nightGradMid: "#111a32",
        nightGradBottom: "#07080a",
        sunGlowIntensity: 1.0,
        moonGlowIntensity: 1.0,
        transitionDuration: 1.8
    },
    gpu: {
        renderMode: "gpu2d",  // "gpu2d" | "webgl" | "canvas2d"
        fpsCap: 60,           // 30 | 60 | 120 | 0 (uncapped)
        pixelRatio: 1.0,      // Resolution multiplier
        desynchronized: true,
        willReadFrequently: false,
        blurEffects: true
    }
};

class GpuConfigEngine {
    constructor() {
        this.STORAGE_KEY_CURRENT = "samurai_gpu_config";
        this.STORAGE_KEY_PRESETS = "samurai_gpu_presets";
        this.STORAGE_KEY_SCOPE = "samurai_gpu_scope";
        this.currentConfig = this.loadCurrentConfig();
        this.presets = this.loadPresets();
    }

    loadCurrentConfig() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY_CURRENT);
            if (saved) {
                const parsed = JSON.parse(saved);
                return this.mergeWithDefault(parsed);
            }
        } catch (e) {
            console.warn("GPU Config Engine: Failed to load config, using default", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_PRESET));
    }

    mergeWithDefault(custom) {
        const merged = JSON.parse(JSON.stringify(DEFAULT_PRESET));
        if (!custom) return merged;
        
        if (custom.clouds) Object.assign(merged.clouds, custom.clouds);
        if (custom.particles) Object.assign(merged.particles, custom.particles);
        if (custom.sky) Object.assign(merged.sky, custom.sky);
        if (custom.gpu) Object.assign(merged.gpu, custom.gpu);
        if (custom.name) merged.name = custom.name;
        if (custom.scope) merged.scope = custom.scope;
        return merged;
    }

    loadPresets() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY_PRESETS);
            if (saved) {
                const list = JSON.parse(saved);
                if (Array.isArray(list) && list.length > 0) return list;
            }
        } catch (e) {
            console.warn("GPU Config Engine: Failed to load presets", e);
        }
        return [JSON.parse(JSON.stringify(DEFAULT_PRESET))];
    }

    saveCurrentConfig(config, scope = "user") {
        this.currentConfig = this.mergeWithDefault(config);
        this.currentConfig.scope = scope;
        try {
            localStorage.setItem(this.STORAGE_KEY_CURRENT, JSON.stringify(this.currentConfig));
            localStorage.setItem(this.STORAGE_KEY_SCOPE, scope);
        } catch (e) {
            console.error("GPU Config Engine: Save failed", e);
        }
        return this.currentConfig;
    }

    saveNewPreset(name, config) {
        const newPreset = this.mergeWithDefault(config);
        newPreset.id = "preset_" + Date.now();
        newPreset.name = name || "Preset Custom " + (this.presets.length + 1);
        newPreset.scope = "user";
        
        this.presets.push(newPreset);
        try {
            localStorage.setItem(this.STORAGE_KEY_PRESETS, JSON.stringify(this.presets));
        } catch (e) {
            console.error("GPU Config Engine: Failed to save preset", e);
        }
        return newPreset;
    }

    resetToDefault() {
        this.currentConfig = JSON.parse(JSON.stringify(DEFAULT_PRESET));
        try {
            localStorage.removeItem(this.STORAGE_KEY_CURRENT);
            localStorage.setItem(this.STORAGE_KEY_SCOPE, "global");
        } catch (e) {}
        return this.currentConfig;
    }

    exportPresetJSON(config = this.currentConfig) {
        return JSON.stringify(config, null, 2);
    }

    importPresetJSON(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            return this.saveNewPreset(parsed.name || "Preset Importado", parsed);
        } catch (e) {
            throw new Error("Formato JSON de preset inválido");
        }
    }
}

export const gpuConfig = new GpuConfigEngine();
