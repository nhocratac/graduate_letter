// ============================================================================
//  INDEX.JS  —  bảng điều khiển: liệt kê khách + link riêng để copy/gửi
// ============================================================================
import { EVENT } from "./event-data.js";
import { GUESTS } from "./guests.js";
import { derive, initials } from "./style-engine.js";

const $ = (s) => document.querySelector(s);

// --- header ---
$("#hostName").textContent = EVENT.host;
$("#className").textContent = EVENT.className;
$("#classOf").textContent = EVENT.classOf;
$("#count").textContent = GUESTS.length;

// --- render lưới khách ---
const grid = $("#grid");
const base = location.href.replace(/index\.html.*$/, "").replace(/\/?$/, "/");

GUESTS.forEach((g, idx) => {
  const d = derive(g.id, { palette: g.palette, zodiac: g.zodiac });
  const pal = d.palette;
  const url = `${base}card.html?id=${encodeURIComponent(g.id)}`;

  const card = document.createElement("article");
  card.className = "guest reveal";
  card.style.setProperty("--accent", pal.accent);
  card.style.setProperty("--accent-2", pal.accent2);
  card.style.setProperty("--glow", pal.glow);
  card.style.setProperty("--planet", pal.planet);
  card.style.setProperty("--i", idx);

  const avatar = g.photo
    ? `<img src="${g.photo}" alt="${esc(g.name)}" onerror="this.replaceWith(document.createTextNode('${initials(g.name)}'))" />`
    : `<span>${initials(g.name)}</span>`;

  card.innerHTML = `
    <div class="g-top">
      <div class="g-avatar">${avatar}</div>
      <div class="g-meta">
        <h3>${g.title ? esc(g.title) + " " : ""}${esc(g.name)}</h3>
        <span class="mono dim">${pal.paletteName} · ${d.zodiac.sym} ${d.zodiac.vi}</span>
      </div>
      <span class="g-no mono">${d.designator}</span>
    </div>
    <code class="g-link mono">card.html?id=${esc(g.id)}</code>
    <div class="g-actions">
      <a class="btn primary" href="${url}" target="_blank" rel="noopener">Mở thiệp ↗</a>
      <button class="btn ghost copy" type="button" data-url="${esc(url)}">Sao chép link</button>
    </div>
  `;
  grid.appendChild(card);
});

// --- copy link ---
grid.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const url = btn.dataset.url;
  try {
    await navigator.clipboard.writeText(url);
    toast("Đã sao chép liên kết ✓");
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = url; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); ta.remove();
    toast("Đã sao chép liên kết ✓");
  }
});

// --- toast ---
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// --- starfield nhẹ cho nền index ---
requestAnimationFrame(() => document.body.classList.add("ready"));
initStars();
function initStars() {
  const c = $("#stars");
  if (!c) return;
  const ctx = c.getContext("2d");
  let w, h, stars;
  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    const n = Math.min(220, Math.floor((w * h) / 9000));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(), s: Math.random() * 0.02 + 0.004,
      vy: Math.random() * 0.08 + 0.02,
    }));
  }
  resize();
  window.addEventListener("resize", resize);
  let raf;
  function draw() {
    raf = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);
    for (const st of stars) {
      st.a += st.s; const tw = 0.4 + Math.abs(Math.sin(st.a)) * 0.6;
      st.y += st.vy; if (st.y > h) { st.y = 0; st.x = Math.random() * w; }
      ctx.globalAlpha = tw;
      ctx.fillStyle = "#cfe6ff";
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  draw();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });
}
