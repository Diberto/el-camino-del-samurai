/* ==========================================================================
   EL CAMINO DEL SAMURAI - TRADITIONAL JAPANESE SHAKUHACHI FLUTE AUDIO ENGINE
   ========================================================================== */

class JapaneseFluteAudioEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.reverbNode = null;
        this.isPlaying = false;
        this.isMuted = true;
        this.timerId = null;

        // Traditional Japanese Hirajoshi & Insen Pentatonic Scales (Frequencies in Hz)
        // Root: D3 (146.83 Hz) to D5 (587.33 Hz)
        this.pentatonicScale = [
            146.83, // D3
            155.56, // Eb3
            196.00, // G3
            220.00, // A3
            233.08, // Bb3
            293.66, // D4
            311.13, // Eb4
            392.00, // G4
            440.00, // A4
            466.16, // Bb4
            587.33  // D5
        ];

        this.savedState = localStorage.getItem('samurai_audio_active');
    }

    init() {
        if (this.ctx) return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        
        this.ctx = new AudioCtx();
        
        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

        // Reverb / Echo Delay Node (Simulates Zen Temple Acoustics)
        this.delayNode = this.ctx.createDelay();
        this.delayNode.delayTime.value = 0.45;

        this.delayFeedback = this.ctx.createGain();
        this.delayFeedback.gain.value = 0.35;

        this.delayFilter = this.ctx.createBiquadFilter();
        this.delayFilter.type = 'lowpass';
        this.delayFilter.frequency.value = 1800;

        // Connect Delay Loop
        this.delayNode.connect(this.delayFilter);
        this.delayFilter.connect(this.delayFeedback);
        this.delayFeedback.connect(this.delayNode);
        this.delayNode.connect(this.masterGain);

        // Master output
        this.masterGain.connect(this.ctx.destination);
    }

    // Play a soft meditative Shakuhachi Flute Note with pitch bends & breath noise
    playFluteNote(freq, duration = 3.5) {
        if (!this.ctx || this.isMuted) return;

        const now = this.ctx.currentTime;

        // 1. Primary Flute Tone (Sine + Triangle blend for warm bamboo wood resonance)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 1.002, now); // Gentle chorus/detune

        // Pitch Bend (Shakuhachi "Meri/Kari" technique: slide up slightly at note start)
        const initialFreq = freq * (0.96 + Math.random() * 0.03);
        osc1.frequency.setValueAtTime(initialFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

        // Vibrato (Shakuhachi "Yuri" technique)
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 4.2 + Math.random() * 0.8; // 4.5 Hz vibrato
        lfoGain.gain.value = freq * 0.012;
        lfo.connect(osc1.frequency);
        lfo.start(now + 0.6);

        // Filter for bamboo warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        // Note Envelope
        const noteGain = this.ctx.createGain();
        noteGain.gain.setValueAtTime(0.001, now);
        // Soft slow attack
        noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.7);
        // Sustained breathing decay
        noteGain.gain.linearRampToValueAtTime(0.10, now + duration * 0.7);
        // Gentle release
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        // Connect Tone Signal Path
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);
        noteGain.connect(this.delayNode);

        // 2. Bamboo Breath Wind Noise Layer
        this.playBreathNoise(now, duration, noteGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration + 0.1);
        osc2.stop(now + duration + 0.1);
        lfo.stop(now + duration + 0.1);
    }

    // White Noise Buffer filtered for realistic bamboo wind breath
    playBreathNoise(startTime, duration, destination) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(850, startTime);
        noiseFilter.Q.value = 3.0;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.001, startTime);
        noiseGain.gain.linearRampToValueAtTime(0.025, startTime + 0.5);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(destination);

        noise.start(startTime);
        noise.stop(startTime + duration);
    }

    // Melodic Melody Loop (Generates tranquil Zen phrases)
    scheduleNextMelodyPhrase() {
        if (!this.isPlaying || this.isMuted) return;

        const noteIndex = Math.floor(Math.random() * this.pentatonicScale.length);
        const freq = this.pentatonicScale[noteIndex];
        const duration = 2.8 + Math.random() * 2.2; // 3 to 5 seconds per note

        this.playFluteNote(freq, duration);

        // Pause between phrases (Zen silence / Ma space)
        const nextDelay = (duration + Math.random() * 2.5 + 1.2) * 1000;
        this.timerId = setTimeout(() => this.scheduleNextMelodyPhrase(), nextDelay);
    }

    start() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        this.isMuted = false;
        this.isPlaying = true;
        
        if (this.masterGain) {
            this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
            this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
            this.masterGain.gain.exponentialRampToValueAtTime(0.65, this.ctx.currentTime + 2.0); // 2s smooth fade-in
        }

        clearTimeout(this.timerId);
        this.scheduleNextMelodyPhrase();
        localStorage.setItem('samurai_audio_active', 'true');
    }

    stop() {
        if (!this.ctx || !this.masterGain) return;
        
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2); // 1.2s smooth fade-out

        setTimeout(() => {
            this.isMuted = true;
            this.isPlaying = false;
            clearTimeout(this.timerId);
        }, 1200);

        localStorage.setItem('samurai_audio_active', 'false');
    }

    toggle() {
        if (this.isPlaying && !this.isMuted) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }
}

export const japaneseFluteAudio = new JapaneseFluteAudioEngine();
