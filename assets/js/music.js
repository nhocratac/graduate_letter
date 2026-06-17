// ============================================================================
//  MUSIC BOX — hộp nhạc công chúa tổng hợp bằng Web Audio (giai điệu gốc)
//  Không dùng file nhạc -> không lo bản quyền. Chỉ phát khi người dùng bật.
//  Trả về { toggle(): boolean, playing(): boolean }
// ============================================================================
export function createMusicBox() {
  let ctx, master, playing = false, timer = 0, step = 0, nextTime = 0;

  // âm giai ngũ cung (pentatonic) cho cảm giác trong trẻo, mộng mơ
  const SCALE = [523.25, 587.33, 698.46, 783.99, 880.0, 1046.5, 1174.66]; // C5 D5 F5 G5 A5 C6 D6
  const PATTERN = [
    0, 2, 4, 6, 4, 3, 2, 5,
    0, 2, 4, 5, 4, 2, 1, 4,
    2, 4, 5, 6, 5, 4, 2, 0,
    4, 2, 1, 2, 4, 5, 6, 4,
  ];
  const STEP = 0.34, LOOKAHEAD = 0.12, TICK = 25;

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

  function scheduler() {
    while (nextTime < ctx.currentTime + LOOKAHEAD) {
      const idx = PATTERN[step % PATTERN.length];
      pluck(SCALE[idx], nextTime, 1);
      if (step % 8 === 0) pluck(SCALE[idx] / 2, nextTime, 0.5); // bass ấm mỗi 8 nhịp
      nextTime += STEP; step++;
    }
    timer = setTimeout(scheduler, TICK);
  }

  function ensureCtx() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0001;
    // delay nhẹ tạo lấp lánh "music box"
    const delay = ctx.createDelay(); delay.delayTime.value = 0.28;
    const fb = ctx.createGain(); fb.gain.value = 0.24;
    const wet = ctx.createGain(); wet.gain.value = 0.22;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 4200;
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
        master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
        scheduler();
      }
      return playing;
    },
    playing() { return playing; },
  };
}
