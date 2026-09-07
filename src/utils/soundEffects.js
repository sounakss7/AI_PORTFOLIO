// Web Audio API lightweight sound effects synthesizer
// Completely zero-dependency, generated dynamically in browser

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.isMuted = true; // Muted by default to respect user privacy
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted && !this.audioCtx) {
      this.init();
    }
    return !this.isMuted;
  }

  playBeep(freq = 600, type = 'sine', duration = 0.06, gainLevel = 0.05) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  click() {
    this.playBeep(900, 'sine', 0.05, 0.04);
  }

  hover() {
    this.playBeep(450, 'triangle', 0.04, 0.02);
  }

  terminalKey() {
    this.playBeep(800 + Math.random() * 200, 'sine', 0.03, 0.02);
  }

  success() {
    if (this.isMuted) return;
    this.playBeep(523.25, 'sine', 0.08, 0.05);
    setTimeout(() => this.playBeep(659.25, 'sine', 0.08, 0.05), 80);
    setTimeout(() => this.playBeep(783.99, 'sine', 0.12, 0.05), 160);
  }

  modal() {
    this.playBeep(320, 'sine', 0.12, 0.05);
  }
}

export const sounds = new SoundController();
