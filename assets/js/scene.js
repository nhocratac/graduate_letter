// ============================================================================
//  SCENE 3D  (Three.js)  —  vũ trụ + công nghệ cho mỗi thiệp
//  Hành tinh xoay · vành đai · mũ tốt nghiệp · bug phát sáng · ký tự code
//  · chòm sao hoàng đạo · sao băng · parallax theo chuột.
// ============================================================================
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// ---- tiện ích màu ----------------------------------------------------------
const C = (hex) => new THREE.Color(hex);

// ---- texture radial-gradient (cho nebula / glow / planet) ------------------
function radialTexture(inner, outer, size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---- texture bề mặt hành tinh (gradient + đốm + đường kinh tuyến) ----------
function planetTexture(base, glow) {
  const w = 512, h = 256;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, glow);
  g.addColorStop(0.5, base);
  g.addColorStop(1, "#05070f");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // dải mây / vân ngang
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = i % 2 ? glow : "#000";
    const y = Math.random() * h;
    ctx.fillRect(0, y, w, 1 + Math.random() * 3);
  }
  // đốm sáng (thành phố / cực quang)
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = glow;
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = Math.random() * 1.4;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---- sprite ký tự code (billboard) ----------------------------------------
function glyphSprite(text, color) {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  ctx.font = "bold 64px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(text, s / 2, s / 2 + 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(0.7, 0.7, 0.7);
  return spr;
}

// ============================================================================
//  Factory các mô hình 3D nhỏ (low-poly cho nhẹ)
// ============================================================================
function buildGradCap(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: "#0b1020", metalness: 0.4, roughness: 0.4, emissive: C(color), emissiveIntensity: 0.25 });
  const edge = new THREE.MeshBasicMaterial({ color });
  // đế mũ
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.3, 16), mat);
  base.position.y = -0.12; g.add(base);
  // tấm vuông trên đỉnh
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.95), mat);
  board.position.y = 0.06; g.add(board);
  const boardEdge = new THREE.LineSegments(new THREE.EdgesGeometry(board.geometry), edge);
  boardEdge.position.copy(board.position); g.add(boardEdge);
  // núm + dây tua
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), edge);
  knob.position.y = 0.1; g.add(knob);
  const tasselPts = [new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(0.32, 0.05, 0.32), new THREE.Vector3(0.36, -0.25, 0.36)];
  const tassel = new THREE.Line(new THREE.BufferGeometry().setFromPoints(tasselPts), edge);
  g.add(tassel);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), edge);
  tip.position.set(0.36, -0.27, 0.36); g.add(tip);
  return g;
}

function buildBug(color) {
  const g = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color: "#0b1020", emissive: C(color), emissiveIntensity: 0.6, metalness: 0.3, roughness: 0.5 });
  const abdomen = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), body);
  abdomen.scale.set(1, 0.8, 1.3); g.add(abdomen);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), body);
  head.position.z = 0.24; g.add(head);
  // mắt phát sáng
  const eyeMat = new THREE.MeshBasicMaterial({ color });
  for (const sx of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), eyeMat);
    eye.position.set(0.05 * sx, 0.04, 0.3); g.add(eye);
  }
  // chân
  const legMat = new THREE.MeshBasicMaterial({ color });
  for (let i = 0; i < 3; i++) {
    for (const sx of [-1, 1]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 5), legMat);
      leg.position.set(0.16 * sx, 0, -0.1 + i * 0.12);
      leg.rotation.z = Math.PI / 2.5 * sx;
      g.add(leg);
    }
  }
  // ăng-ten
  for (const sx of [-1, 1]) {
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 5), legMat);
    ant.position.set(0.04 * sx, 0.12, 0.3);
    ant.rotation.z = 0.4 * sx; g.add(ant);
  }
  return g;
}

function buildKeyboard(color) {
  const g = new THREE.Group();
  const baseMat = new THREE.MeshStandardMaterial({ color: "#0a0f1e", metalness: 0.5, roughness: 0.4, emissive: C(color), emissiveIntensity: 0.12 });
  const keyMat = new THREE.MeshStandardMaterial({ color: "#121a30", metalness: 0.3, roughness: 0.6, emissive: C(color), emissiveIntensity: 0.3 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.4), baseMat);
  g.add(base);
  const cols = 6, rows = 3, kw = 0.12, gap = 0.025;
  const startX = -((cols - 1) * (kw + gap)) / 2;
  const startZ = -((rows - 1) * (kw + gap)) / 2;
  for (let r = 0; r < rows; r++) {
    for (let cI = 0; cI < cols; cI++) {
      const k = new THREE.Mesh(new THREE.BoxGeometry(kw, 0.05, kw), keyMat);
      k.position.set(startX + cI * (kw + gap), 0.05, startZ + r * (kw + gap));
      g.add(k);
    }
  }
  return g;
}

// ---- chòm sao hoàng đạo (đặt lùi xa, mờ) -----------------------------------
function buildConstellation(zodiac, color) {
  const g = new THREE.Group();
  const scale = 3.2;
  const pts = zodiac.stars.map(([x, y]) => new THREE.Vector3(x * scale, y * scale, 0));
  // các sao
  const starGeo = new THREE.BufferGeometry().setFromPoints(pts);
  const starMat = new THREE.PointsMaterial({ color, size: 0.16, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
  g.add(new THREE.Points(starGeo, starMat));
  // đường nối
  const linePts = [];
  for (const [a, b] of zodiac.lines) { linePts.push(pts[a], pts[b]); }
  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending });
  g.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(linePts), lineMat));
  return g;
}

// ============================================================================
//  CƠ CHẾ CHÍNH
// ============================================================================
export function createScene(canvas, opts) {
  const { palette, derived, quality = "high" } = opts;
  const lowEnd = quality === "low";

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowEnd, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070f, 0.018);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  // ---- ánh sáng ----
  scene.add(new THREE.AmbientLight(0x4060ff, 0.5));
  const key = new THREE.PointLight(C(palette.glow), 2.4, 50);
  key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.PointLight(C(palette.accent2), 1.6, 50);
  rim.position.set(-6, -3, 2); scene.add(rim);
  const dir = new THREE.DirectionalLight(0xffffff, 0.4);
  dir.position.set(-3, 4, 5); scene.add(dir);

  // ---- starfield ----
  const starCount = lowEnd ? 900 : 2200;
  const sPos = new Float32Array(starCount * 3);
  const sCol = new Float32Array(starCount * 3);
  const cA = C(palette.accent), cB = C(palette.accent2), cW = C("#ffffff");
  for (let i = 0; i < starCount; i++) {
    const r = 14 + Math.random() * 30;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    sPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    sPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    sPos[i * 3 + 2] = r * Math.cos(ph) - 6;
    const pick = Math.random();
    const col = pick < 0.6 ? cW : pick < 0.8 ? cA : cB;
    sCol[i * 3] = col.r; sCol[i * 3 + 1] = col.g; sCol[i * 3 + 2] = col.b;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.07, vertexColors: true, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  }));
  scene.add(stars);

  // ---- nebula (sprite additive lớn) ----
  const nebGroup = new THREE.Group();
  const nebData = [
    { tex: radialTexture(palette.accent + "aa", "#00000000"), x: -6, y: 3, z: -10, s: 14 },
    { tex: radialTexture(palette.accent2 + "99", "#00000000"), x: 7, y: -4, z: -12, s: 16 },
    { tex: radialTexture(palette.glow + "66", "#00000000"), x: 2, y: 5, z: -14, s: 12 },
  ];
  for (const n of nebData) {
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: n.tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.6 }));
    spr.position.set(n.x, n.y, n.z); spr.scale.set(n.s, n.s, 1);
    nebGroup.add(spr);
  }
  scene.add(nebGroup);

  // ---- chòm sao ----
  const constel = buildConstellation(derived.zodiac, palette.accent);
  constel.position.set(0, 0, -8);
  scene.add(constel);

  // ---- HÀNH TINH ----
  const planetGroup = new THREE.Group();
  planetGroup.position.set(0, 0.3, 0);
  planetGroup.rotation.z = derived.planetTilt;
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 48, 48),
    new THREE.MeshStandardMaterial({
      map: planetTexture(palette.planet, palette.glow),
      emissive: C(palette.planet), emissiveIntensity: 0.12,
      metalness: 0.2, roughness: 0.85,
    })
  );
  planetGroup.add(planet);
  // khí quyển (sphere lớn hơn, BackSide, additive)
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.78, 48, 48),
    new THREE.MeshBasicMaterial({ color: C(palette.glow), transparent: true, opacity: 0.18, side: THREE.BackSide, blending: THREE.AdditiveBlending })
  );
  planetGroup.add(atmo);
  // glow halo phía sau
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialTexture(palette.glow + "cc", "#00000000"), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7 }));
  halo.scale.set(6, 6, 1); halo.position.z = -1;
  planetGroup.add(halo);
  // vành đai
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.06, 12, 80),
    new THREE.MeshBasicMaterial({ color: C(palette.accent), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })
  );
  ring.rotation.x = derived.ringTilt;
  planetGroup.add(ring);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.0, 0.02, 8, 80),
    new THREE.MeshBasicMaterial({ color: C(palette.accent2), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })
  );
  ring2.rotation.x = derived.ringTilt + 0.2;
  ring2.rotation.y = 0.3;
  planetGroup.add(ring2);
  scene.add(planetGroup);

  // ---- VẬT THỂ QUỸ ĐẠO (IT + grad) ----
  const orbiters = [];
  const addOrbiter = (mesh, radius, speed, phase, ySwing, scale) => {
    mesh.scale.setScalar(scale);
    scene.add(mesh);
    orbiters.push({ mesh, radius, speed, phase, ySwing, spin: (Math.random() - 0.5) * 1.2 });
  };
  addOrbiter(buildGradCap(palette.accent),  3.4, 0.32, derived.orbitOffset,            0.5, 1.0);
  addOrbiter(buildKeyboard(palette.accent2), 4.1, -0.24, derived.orbitOffset + 2.1,     0.7, 0.85);
  for (let i = 0; i < derived.bugCount; i++) {
    addOrbiter(buildBug(palette.glow), 2.9 + i * 0.6, 0.45 + i * 0.1, derived.orbitOffset + 1 + i * 2, 0.9, 0.9);
  }
  // ký tự code bay
  ["</>", "{ }", "( )", "01", "fn", "#!"].forEach((t, i) => {
    addOrbiter(glyphSprite(t, palette.accent), 3.6 + (i % 3) * 0.5, 0.18 + i * 0.05, i * 1.05, 1.2, 1);
  });

  // ---- sao băng ----
  const shooters = [];
  function spawnShooter() {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1.6, -0.5, 0)]);
    const mat = new THREE.LineBasicMaterial({ color: C(palette.glow), transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    const line = new THREE.Line(geo, mat);
    line.position.set(6 + Math.random() * 4, 4 + Math.random() * 3, -4 - Math.random() * 4);
    scene.add(line);
    shooters.push({ line, t: 0, life: 0.9 + Math.random() * 0.5, vx: -10 - Math.random() * 4, vy: -3 - Math.random() * 2 });
  }

  // ---- tương tác con trỏ ----
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  function onPointer(e) {
    const t = e.touches ? e.touches[0] : e;
    target.x = (t.clientX / window.innerWidth - 0.5);
    target.y = (t.clientY / window.innerHeight - 0.5);
  }
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("touchmove", onPointer, { passive: true });

  // ---- resize ----
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onResize);

  // ---- tiến độ cuộn (0 = đầu hành trình, 1 = tới tấm thiệp) ----
  let scrollP = 0, scrollCur = 0;

  // ---- vòng lặp ----
  let raf = 0, last = performance.now(), elapsed = 0, shooterTimer = 0, running = true;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now; elapsed += dt;

    // parallax mượt
    cur.x += (target.x - cur.x) * 0.05;
    cur.y += (target.y - cur.y) * 0.05;
    // dolly mượt theo tiến độ cuộn: càng gần thiệp, càng tiến lại gần hành tinh
    scrollCur += (scrollP - scrollCur) * 0.06;
    camera.position.x = cur.x * 2.2;
    camera.position.y = -cur.y * 1.6;
    camera.position.z = 8.5 - scrollCur * 2.6;
    camera.lookAt(0, 0.2, 0);

    planet.rotation.y += dt * 0.12;
    atmo.rotation.y -= dt * 0.05;
    planetGroup.rotation.y = cur.x * 0.3;
    ring.rotation.z += dt * 0.05;
    ring2.rotation.z -= dt * 0.04;
    stars.rotation.y += dt * 0.006;
    nebGroup.rotation.z += dt * 0.004;
    constel.rotation.z = Math.sin(elapsed * 0.1) * 0.05;
    constel.children[0].material.opacity = 0.6 + Math.sin(elapsed * 1.5) * 0.3; // sao nhấp nháy

    for (const o of orbiters) {
      const a = elapsed * o.speed + o.phase;
      o.mesh.position.set(
        Math.cos(a) * o.radius,
        Math.sin(a * 1.3) * o.ySwing + 0.3,
        Math.sin(a) * o.radius * 0.6
      );
      if (o.mesh.isSprite) continue;          // sprite tự billboard
      o.mesh.rotation.y += dt * o.spin + dt * 0.4;
      o.mesh.rotation.x += dt * o.spin * 0.5;
    }

    // sao băng
    shooterTimer -= dt;
    if (shooterTimer <= 0) { spawnShooter(); shooterTimer = 2.5 + Math.random() * 4; }
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.t += dt;
      s.line.position.x += s.vx * dt;
      s.line.position.y += s.vy * dt;
      const k = s.t / s.life;
      s.line.material.opacity = Math.sin(Math.min(k, 1) * Math.PI) * 0.9;
      if (s.t >= s.life) { scene.remove(s.line); s.line.geometry.dispose(); s.line.material.dispose(); shooters.splice(i, 1); }
    }

    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(loop);

  // tạm dừng khi tab ẩn (tiết kiệm pin)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { cancelAnimationFrame(raf); running = false; }
    else if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  });

  // API trả về
  return {
    pulsePlanet() {
      // hiệu ứng khi click hành tinh: nở nhẹ rồi co lại
      const t0 = performance.now();
      (function anim() {
        const k = (performance.now() - t0) / 450;
        if (k >= 1) { planetGroup.scale.setScalar(1); return; }
        planetGroup.scale.setScalar(1 + Math.sin(k * Math.PI) * 0.12);
        requestAnimationFrame(anim);
      })();
      for (let i = 0; i < 3; i++) spawnShooter();
    },
    // bắn 1 vệt sao băng (dùng khi cuộn qua mỗi chặng hành trình)
    shootStar() { spawnShooter(); },
    // cập nhật tiến độ cuộn 0..1 (card.js gọi khi scroll)
    setScrollProgress(p) { scrollP = Math.max(0, Math.min(1, p)); },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      renderer.dispose();
    },
  };
}
