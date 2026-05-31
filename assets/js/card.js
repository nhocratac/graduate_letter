// ============================================================================
//  CARD.JS  —  dựng 1 tấm thiệp cá nhân hoá từ ?id=...
// ============================================================================
import { EVENT, EVENT_START, EVENT_END } from "./event-data.js";
import { GUESTS } from "./guests.js";
import { derive, initials } from "./style-engine.js";
import { createScene } from "./scene.js";

const $ = (sel) => document.querySelector(sel);

// ---- lấy khách theo id -----------------------------------------------------
const params = new URLSearchParams(location.search);
const id = params.get("id");
const guest = GUESTS.find((g) => g.id === id) || GUESTS.find((g) => g.id === "preview") || null;

// nếu không tìm thấy: hiện màn hình "không tìm thấy" rồi dừng
if (!guest) {
  document.body.classList.add("not-found");
  $("#notFound").hidden = false;
  $("#stage").hidden = true;
} else {
  renderCard(guest);
}

// ============================================================================
function renderCard(g) {
  const d = derive(g.id, { palette: g.palette, zodiac: g.zodiac });
  const pal = d.palette;

  // --- áp bảng màu vào CSS variables ---
  const root = document.documentElement.style;
  root.setProperty("--accent", pal.accent);
  root.setProperty("--accent-2", pal.accent2);
  root.setProperty("--glow", pal.glow);
  root.setProperty("--planet", pal.planet);

  // --- text nội dung ---
  $("#hudTag").textContent = d.hudTag;
  $("#designator").textContent = d.designator;
  $("#paletteName").textContent = pal.paletteName;
  $("#greeting").textContent = d.greeting;
  $("#guestName").textContent = (g.title ? g.title + " " : "") + g.name;
  $("#occasion").textContent = EVENT.occasion;
  $("#hostName").textContent = EVENT.host;
  $("#className").textContent = EVENT.className;
  $("#classOf").textContent = EVENT.classOf;
  $("#message").textContent = g.message || EVENT.defaultMessage;
  $("#presence").textContent = EVENT.presenceLine;

  // chi tiết
  $("#dateVal").textContent = EVENT.dateLabel;
  $("#dayVal").textContent = EVENT.dayLabel;
  $("#timeVal").textContent = EVENT.timeLabel;
  $("#venueVal").textContent = EVENT.venue;
  $("#addressVal").textContent = EVENT.address;
  $("#zodiacSym").textContent = d.zodiac.sym;
  $("#zodiacName").textContent = d.zodiac.vi;
  $("#coords").textContent =
    `${EVENT.lat.toFixed(4)}°N · ${EVENT.lng.toFixed(4)}°E`;

  // tiêu đề tab
  document.title = `Thiệp mời · ${g.name} — ${EVENT.occasion} ${EVENT.host}`;

  // --- avatar ---
  buildAvatar(g, d);

  // --- liên kết bản đồ + lịch ---
  $("#mapLink").href = EVENT.mapUrl;
  $("#calLink").href = googleCalUrl();

  // --- countdown ---
  startCountdown();

  // --- scene 3D ---
  const lowEnd =
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    window.innerWidth < 600 ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  let scene;
  try {
    scene = createScene($("#bg"), { palette: pal, derived: d, quality: lowEnd ? "low" : "high" });
  } catch (e) {
    console.warn("WebGL không khả dụng, dùng nền tĩnh.", e);
    document.body.classList.add("no-webgl");
  }

  // click vào nền => hiệu ứng hành tinh
  if (scene) {
    $("#bg").addEventListener("click", () => scene.pulsePlanet());
    $("#pulseBtn")?.addEventListener("click", () => scene.pulsePlanet());
  }

  // --- tilt nhẹ tấm thiệp theo chuột (desktop) ---
  setupTilt($("#ticket"));

  // gỡ màn chờ + chạy animation vào
  requestAnimationFrame(() => document.body.classList.add("ready"));
}

// ---- avatar: dùng ảnh hoặc tự vẽ từ chữ cái đầu ---------------------------
function buildAvatar(g, d) {
  const wrap = $("#avatar");
  if (g.photo) {
    const img = new Image();
    img.alt = g.name;
    img.onload = () => { wrap.innerHTML = ""; wrap.appendChild(img); };
    img.onerror = () => drawInitials(wrap, g, d);   // ảnh hỏng -> fallback
    img.src = g.photo;
  } else {
    drawInitials(wrap, g, d);
  }
}
function drawInitials(wrap, g, d) {
  wrap.innerHTML = "";
  const el = document.createElement("div");
  el.className = "avatar-initials";
  el.textContent = initials(g.name);
  el.style.background =
    `radial-gradient(circle at 30% 25%, ${d.palette.glow}, ${d.palette.planet} 60%, #070a14)`;
  wrap.appendChild(el);
}

// ---- countdown -------------------------------------------------------------
function startCountdown() {
  const elD = $("#cdD"), elH = $("#cdH"), elM = $("#cdM"), elS = $("#cdS");
  const box = $("#countdown"), done = $("#cdDone");
  function tick() {
    const diff = EVENT_START.getTime() - Date.now();
    if (diff <= 0) {
      box.hidden = true;
      done.hidden = false;
      // nếu đang diễn ra
      if (Date.now() <= EVENT_END.getTime()) done.textContent = "🎓 Buổi lễ đang diễn ra!";
      return;
    }
    const s = Math.floor(diff / 1000);
    elD.textContent = String(Math.floor(s / 86400)).padStart(2, "0");
    elH.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
    elM.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    elS.textContent = String(s % 60).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

// ---- link Google Calendar --------------------------------------------------
function fmt(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function googleCalUrl() {
  const text = `${EVENT.occasion} — ${EVENT.host}`;
  const details = `Lễ tốt nghiệp lớp ${EVENT.className}. ${EVENT.venue}.`;
  const loc = `${EVENT.venue}, ${EVENT.address}`;
  return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(text)}` +
    `&dates=${fmt(EVENT_START)}/${fmt(EVENT_END)}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(loc)}`;
}

// ---- tilt thẻ theo con trỏ (chỉ desktop, không reduced-motion) ------------
function setupTilt(el) {
  if (!el) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
  window.addEventListener("pointermove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  function loop() {
    rx += (ty * -3 - rx) * 0.08;
    ry += (tx * 4 - ry) * 0.08;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (Math.abs(ty * -3 - rx) > 0.05 || Math.abs(tx * 4 - ry) > 0.05) {
      raf = requestAnimationFrame(loop);
    } else { raf = 0; }
  }
}
