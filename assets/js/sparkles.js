// ============================================================================
//  SPARKLES — nền "kim tuyến công chúa" cho theme princess
//  Hạt lấp lánh trôi nhẹ + ngôi sao 4 cánh + bong bóng bokeh hồng/vàng.
//  API tương thích với scene.js: shootStar / setScrollProgress / pulsePlanet / dispose
// ============================================================================
export function createSparkles(canvas, opts = {}) {
  const pal = opts.palette || { accent: "#ff8fce", accent2: "#ffd56b", glow: "#ffc8e6" };
  const light = !!opts.light; // nền sáng (editorial) -> dịu, ít hạt, màu pastel đậm hơn
  const colors = light
    ? [pal.accent, pal.accent2, pal.glow, "#e7a8c6", "#f3cf93"]
    : [pal.accent, pal.accent2, pal.glow, "#ffffff", "#ffe9f6"];
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- bokeh: bong bóng mờ trôi lên ---
  const BOKEH = reduce ? 0 : (light ? 14 : 26);
  const bokeh = Array.from({ length: BOKEH }, () => spawnBokeh(true));
  function spawnBokeh(init) {
    return {
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 40,
      r: 6 + Math.random() * 26,
      c: colors[(Math.random() * colors.length) | 0],
      a: light ? 0.04 + Math.random() * 0.08 : 0.05 + Math.random() * 0.18,
      vy: 6 + Math.random() * 16,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.4 + Math.random() * 0.8,
    };
  }

  // --- sparkle: ngôi sao 4 cánh nhấp nháy ---
  const SP = reduce ? 16 : (light ? 34 : 70);
  const sparks = Array.from({ length: SP }, () => spawnSpark(true));
  function spawnSpark(init) {
    return {
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 20,
      s: 1 + Math.random() * 3.2,
      c: colors[(Math.random() * colors.length) | 0],
      vy: 8 + Math.random() * 22,
      tw: Math.random() * Math.PI * 2,      // pha nhấp nháy
      twSpd: 1.5 + Math.random() * 3,
      drift: (Math.random() - 0.5) * 14,
    };
  }

  // ngôi sao 4 cánh
  function drawStar(x, y, s, alpha, color) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = s * 4;
    ctx.beginPath();
    const k = s * 3;
    ctx.moveTo(x, y - k);
    ctx.quadraticCurveTo(x, y, x + k, y);
    ctx.quadraticCurveTo(x, y, x, y + k);
    ctx.quadraticCurveTo(x, y, x - k, y);
    ctx.quadraticCurveTo(x, y, x, y - k);
    ctx.fill();
    ctx.restore();
  }

  let bursts = [];           // cụm kim tuyến khi shootStar/pulse
  function burst(x, y) {
    const cx = x ?? W / 2, cy = y ?? H * 0.4;
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 60 + Math.random() * 180;
      bursts.push({
        x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        s: 1 + Math.random() * 3, c: colors[(Math.random() * colors.length) | 0],
        life: 0.8 + Math.random() * 0.6, t: 0,
      });
    }
  }

  let scrollP = 0;
  let raf = 0, last = performance.now(), running = true;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    ctx.clearRect(0, 0, W, H);

    // bokeh
    for (const b of bokeh) {
      b.y -= b.vy * dt; b.sway += b.swaySpd * dt;
      const x = b.x + Math.sin(b.sway) * 18;
      ctx.globalAlpha = b.a; ctx.fillStyle = b.c;
      ctx.beginPath(); ctx.arc(x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      if (b.y + b.r < -10) Object.assign(b, spawnBokeh(false));
    }
    ctx.globalAlpha = 1;

    // sparkles
    for (const p of sparks) {
      p.y -= (p.vy + scrollP * 30) * dt;
      p.x += p.drift * dt; p.tw += p.twSpd * dt;
      const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.tw));
      drawStar(p.x, p.y, p.s, alpha, p.c);
      if (p.y < -20) Object.assign(p, spawnSpark(false));
    }

    // bursts
    for (let i = bursts.length - 1; i >= 0; i--) {
      const u = bursts[i]; u.t += dt;
      u.x += u.vx * dt; u.y += u.vy * dt; u.vy += 120 * dt; // trọng lực nhẹ
      const k = u.t / u.life;
      drawStar(u.x, u.y, u.s, Math.max(0, 1 - k), u.c);
      if (k >= 1) bursts.splice(i, 1);
    }

    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
  }
  raf = requestAnimationFrame(loop);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(raf); running = false; }
    else if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  });

  return {
    shootStar() { burst(Math.random() * W, Math.random() * H * 0.6); },
    pulsePlanet() { burst(W / 2, H * 0.4); },
    setScrollProgress(p) { scrollP = Math.max(0, Math.min(1, p)); },
    dispose() { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); },
  };
}
