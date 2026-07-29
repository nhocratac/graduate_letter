// ============================================================================
//  MUSIC BOX — nhạc nền tổng hợp bằng Web Audio (giai điệu gốc)
//  Không dùng file nhạc -> không lo bản quyền. Chỉ phát khi người dùng bật.
//
//  createMusicBox({ pattern })
//    "musicbox" (mặc định) — hộp nhạc công chúa, ngũ cung trong trẻo (theme princess)
//    "chant"               — nhịp khán đài: trống + vỗ tay + kèn hô vang (theme champion)
//
//  Trả về { toggle(): boolean, playing(): boolean }
// ============================================================================
export function createMusicBox(opts = {}) {
  const CHANT = opts.pattern === "chant";

  let ctx, master, noiseBuf, playing = false, timer = 0, step = 0, nextTime = 0;

  // ---- hộp nhạc: âm giai ngũ cung, cảm giác trong trẻo mộng mơ -------------
  const SCALE = [523.25, 587.33, 698.46, 783.99, 880.0, 1046.5, 1174.66]; // C5 D5 F5 G5 A5 C6 D6
  const PATTERN = [
    0, 2, 4, 6, 4, 3, 2, 5,
    0, 2, 4, 5, 4, 2, 1, 4,
    2, 4, 5, 6, 5, 4, 2, 0,
    4, 2, 1, 2, 4, 5, 6, 4,
  ];

  // ---- khán đài: motif kèn 16 nhịp, -1 = nghỉ (giữ tiếng ngân) -------------
  const CHANT_SCALE = [196.0, 220.0, 246.94, 293.66, 329.63]; // G3 A3 B3 D4 E4
  const CHANT_MOTIF = [
    4, -1, 3, -1, 2, -1, 3, -1,
    4, -1, 4, -1, 2, -1, -1, -1,
  ];
  const KICK_ON = [0, 4, 8, 12];   // trống lớn
  const CLAP_ON = [2, 6, 10, 14];  // vỗ tay

  const STEP = CHANT ? 0.3 : 0.34, LOOKAHEAD = 0.12, TICK = 25;

  // ---- các nhạc cụ ---------------------------------------------------------
  function pluck(freq, t, gainScale) {
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator();
    const g = ctx.createGain(), g2 = ctx.createGain();
    o1.type = "triangle"; o1.frequency.value = freq;
    o2.type = "sine"; o2.frequency.value = freq * 2.001; g2.gain.value = 0.16;
    o1.connect(g); o2.connect(g2); g2.connect(g);
    const peak = 0.9 * (gainScale || 1);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0006, t + 1.5);
    g.connect(master);
    o1.start(t); o2.start(t); o1.stop(t + 1.6); o2.stop(t + 1.6);
  }

  // kèn hô vang: 2 sawtooth lệch nhau qua lowpass -> chất brass khán đài
  function brass(freq, t, dur) {
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator();
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    o1.type = "sawtooth"; o1.frequency.value = freq;
    o2.type = "sawtooth"; o2.frequency.value = freq * 1.007; // detune cho dày
    lp.type = "lowpass"; lp.frequency.value = 1500; lp.Q.value = 0.7;
    o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.5, t + 0.05);
    g.gain.setValueAtTime(0.5, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0006, t + dur);
    o1.start(t); o2.start(t); o1.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }

  // trống lớn: sine trượt xuống nhanh
  function kick(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(145, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.16);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.95, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0006, t + 0.3);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.34);
  }

  // vỗ tay: nhiễu trắng qua bandpass, tắt rất nhanh
  function clap(t) {
    const src = ctx.createBufferSource(), g = ctx.createGain(), bp = ctx.createBiquadFilter();
    src.buffer = noiseBuf;
    bp.type = "bandpass"; bp.frequency.value = 1600; bp.Q.value = 1.1;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.34, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0006, t + 0.11);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(t); src.stop(t + 0.14);
  }

  // ---- bộ định nhịp --------------------------------------------------------
  function scheduler() {
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      if (CHANT) {
        const i = step % CHANT_MOTIF.length;
        const idx = CHANT_MOTIF[i];
        if (idx >= 0) brass(CHANT_SCALE[idx], nextTime, STEP * 1.7);
        if (KICK_ON.includes(i)) kick(nextTime);
        if (CLAP_ON.includes(i)) clap(nextTime);
      } else {
        const idx = PATTERN[step % PATTERN.length];
        pluck(SCALE[idx], nextTime, 1);
        if (step % 8 === 0) pluck(SCALE[idx] / 2, nextTime, 0.5); // bass ấm mỗi 8 nhịp
      }
      nextTime += STEP; step++;
    }
    timer = setTimeout(scheduler, TICK);
  }

  function ensureCtx() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0001;

    // nhiễu trắng dùng cho tiếng vỗ tay
    if (CHANT) {
      noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.2), ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }

    // delay nhẹ: "music box" thì lấp lánh, "chant" thì như vọng trong sân
    const delay = ctx.createDelay(); delay.delayTime.value = CHANT ? 0.18 : 0.28;
    const fb = ctx.createGain(); fb.gain.value = CHANT ? 0.18 : 0.24;
    const wet = ctx.createGain(); wet.gain.value = CHANT ? 0.16 : 0.22;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = CHANT ? 5200 : 4200;
    master.connect(lp); lp.connect(ctx.destination);
    lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ctx.destination);
  }

  return {
    toggle() {
      ensureCtx();
      if (ctx.state === "suspended") ctx.resume();
      if (playing) {
        playing = false;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        clearTimeout(timer);
      } else {
        playing = true;
        nextTime = ctx.currentTime + 0.06;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(0.0001, ctx.currentTime);
        master.gain.linearRampToValueAtTime(CHANT ? 0.12 : 0.15, ctx.currentTime + 0.5);
        scheduler();
      }
      return playing;
    },
    playing() { return playing; },
  };
}
