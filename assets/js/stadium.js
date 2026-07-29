// ============================================================================
//  STADIUM — nền "sân đêm dưới đèn pha" cho theme champion
//  Đèn pha quét chậm + kẻ vôi sân cỏ (parallax theo scroll) + confetti rơi.
//  API tương thích với scene.js / sparkles.js:
//    shootStar / pulsePlanet / setScrollProgress / dispose
// ============================================================================
export function createStadium(canvas, opts = {}) {
  const pal = opts.palette || { accent: "#EDBB00", accent2: "#A50044", glow: "#FFDD66", planet: "#004D98" };
  const CONFETTI_COLORS = [pal.accent, pal.accent2, pal.planet, pal.glow, "#ffffff"];

  const ctx = canvas.getContext("2d");
  let W = 0, H = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- đèn pha: 3 cột sáng quét qua lại rất chậm -----------------------------
  const LIGHTS = [
    { at: 0.18, phase: 0.0, spd: 0.09, spread: 0.30 },
    { at: 0.52, phase: 2.1, spd: 0.07, spread: 0.42 },
    { at: 0.86, phase: 4.3, spd: 0.11, spread: 0.28 },
  ];

  function drawLight(L, t) {
    const x0 = L.at * W;
    const sway = reduce ? 0 : Math.sin(t * L.spd + L.phase) * (W * 0.13);
    const xEnd = x0 + sway;
    const yEnd = H * 1.05;
    const halfTop = W * 0.02;
    const halfBottom = W * L.spread;

    const g = ctx.createLinearGradient(x0, -H * 0.1, xEnd, yEnd);
    g.addColorStop(0, "rgba(215, 232, 255, 0.20)");
    g.addColorStop(0.45, "rgba(180, 210, 255, 0.06)");
    g.addColorStop(1, "rgba(160, 200, 255, 0)");

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x0 - halfTop, -H * 0.1);
    ctx.lineTo(x0 + halfTop, -H * 0.1);
    ctx.lineTo(xEnd + halfBottom, yEnd);
    ctx.lineTo(xEnd - halfBottom, yEnd);
    ctx.closePath();
    ctx.fill();

    // bóng đèn: quầng sáng nhỏ ở đỉnh cột
    const hg = ctx.createRadialGradient(x0, 0, 0, x0, 0, W * 0.10);
    hg.addColorStop(0, "rgba(235, 245, 255, 0.34)");
    hg.addColorStop(1, "rgba(235, 245, 255, 0)");
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.arc(x0, 0, W * 0.10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // --- kẻ vôi sân cỏ: các đường ngang phối cảnh + vòng tròn giữa sân --------
  //  scrollP dịch nhẹ cả khối -> cảm giác đang tiến vào sân.
  function drawPitch(scrollP) {
    const horizon = H * 0.58;                    // đường chân trời
    const shift = scrollP * H * 0.10;
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.055)";
    ctx.lineWidth = 1;

    // các đường ngang giãn dần về phía dưới (phối cảnh)
    for (let i = 1; i <= 7; i++) {
      const k = i / 7;
      const y = horizon + (H - horizon) * k * k + shift;
      if (y < horizon || y > H + 2) continue;
      const inset = W * 0.5 * (1 - k) * 0.8;
      ctx.beginPath();
      ctx.moveTo(inset, y);
      ctx.lineTo(W - inset, y);
      ctx.stroke();
    }

    // hai đường biên chạy về điểm tụ
    ctx.beginPath();
    ctx.moveTo(W * 0.5 - W * 0.02, horizon);
    ctx.lineTo(-W * 0.15, H + shift);
    ctx.moveTo(W * 0.5 + W * 0.02, horizon);
    ctx.lineTo(W * 1.15, H + shift);
    ctx.stroke();

    // vòng tròn giữa sân (ellipse do phối cảnh)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
    ctx.beginPath();
    ctx.ellipse(W * 0.5, horizon + (H - horizon) * 0.34 + shift, W * 0.30, H * 0.055, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // --- confetti rơi ----------------------------------------------------------
  const N = reduce ? 0 : (window.innerWidth < 600 ? 22 : 40);
  const bits = Array.from({ length: N }, () => spawn(true));
  function spawn(init) {
    return {
      x: Math.random() * W,
      y: init ? Math.random() * H : -20,
      w: 3 + Math.random() * 5,
      h: 6 + Math.random() * 9,
      c: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      a: 0.25 + Math.random() * 0.5,
      vy: 22 + Math.random() * 48,
      rot: Math.random() * Math.PI,
      rotSpd: (Math.random() - 0.5) * 2.6,
      sway: Math.random() * Math.PI * 2,
      swaySpd: 0.6 + Math.random() * 1.1,
    };
  }

  function drawBit(b, x) {
    ctx.save();
    ctx.globalAlpha = b.a;
    ctx.fillStyle = b.c;
    ctx.translate(x, b.y);
    ctx.rotate(b.rot);
    // scaleY theo cos(rot) -> cảm giác mảnh giấy lật
    ctx.scale(1, Math.max(0.25, Math.abs(Math.cos(b.rot))));
    ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
    ctx.restore();
  }

  // --- burst: "tiếng còi khai cuộc" — confetti bung ra từ 1 điểm ------------
  let bursts = [];
  function burst(x, y, count) {
    const cx = x ?? W / 2, cy = y ?? H * 0.42;
    const n = count ?? 30;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 90 + Math.random() * 260;
      bursts.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60,
        w: 3 + Math.random() * 5, h: 6 + Math.random() * 8,
        c: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        rot: Math.random() * Math.PI, rotSpd: (Math.random() - 0.5) * 7,
        life: 1.1 + Math.random() * 0.8, t: 0,
      });
    }
  }

  let scrollP = 0;
  let raf = 0, last = performance.now(), t = 0, running = true;

  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05); last = now; t += dt;
    ctx.clearRect(0, 0, W, H);

    for (const L of LIGHTS) drawLight(L, t);
    drawPitch(scrollP);

    for (const b of bits) {
      b.y += (b.vy + scrollP * 40) * dt;
      b.rot += b.rotSpd * dt;
      b.sway += b.swaySpd * dt;
      drawBit(b, b.x + Math.sin(b.sway) * 16);
      if (b.y - b.h > H + 10) Object.assign(b, spawn(false));
    }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const u = bursts[i];
      u.t += dt;
      u.x += u.vx * dt; u.y += u.vy * dt;
      u.vy += 340 * dt;            // trọng lực
      u.vx *= 1 - 1.1 * dt;        // cản gió
      u.rot += u.rotSpd * dt;
      const k = u.t / u.life;
      drawBit({ ...u, a: Math.max(0, 1 - k) }, u.x);
      if (k >= 1) bursts.splice(i, 1);
    }

    ctx.globalAlpha = 1;
  }
  raf = requestAnimationFrame(loop);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(raf); running = false; }
    else if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  });

  return {
    // mỗi chặng journey hiện ra -> một cơn confetti nhỏ ở nửa trên màn hình
    shootStar() { burst(Math.random() * W, Math.random() * H * 0.5, 14); },
    // click nền / nút -> tiếng còi khai cuộc, confetti bung giữa sân
    pulsePlanet() { burst(W / 2, H * 0.45, 46); },
    setScrollProgress(p) { scrollP = Math.max(0, Math.min(1, p)); },
    dispose() { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); },
  };
}
