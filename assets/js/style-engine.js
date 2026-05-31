// ============================================================================
//  STYLE ENGINE — biến 1 id (chuỗi) thành "danh tính hình ảnh" ổn định:
//  bảng màu neon, kiểu hành tinh, cung hoàng đạo, lời chào, thông số quỹ đạo.
//  Cùng id  =>  luôn ra cùng kết quả (deterministic).
// ============================================================================

// --- Hash chuỗi -> uint32 (FNV-1a) -----------------------------------------
function hashStr(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// --- PRNG mulberry32 -> hàm trả [0,1) --------------------------------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================================
//  BẢNG MÀU NEON  (mỗi bảng: accent chính / phụ / màu lõi hành tinh)
// ============================================================================
export const PALETTES = [
  { name: "Ion Cyan",   accent: "#3df0ff", accent2: "#ff5fd2", planet: "#2b7bff", glow: "#6df6ff" },
  { name: "Plasma",     accent: "#ff5fd2", accent2: "#7c5cff", planet: "#b13bff", glow: "#ff7ae0" },
  { name: "Aurora",     accent: "#5dff9f", accent2: "#39d0ff", planet: "#1fb6a6", glow: "#7dffbd" },
  { name: "Solar Gold", accent: "#ffd166", accent2: "#ff7a59", planet: "#ff8c3b", glow: "#ffe39e" },
  { name: "Nebula",     accent: "#9b8cff", accent2: "#46e0ff", planet: "#6a4cff", glow: "#b9aaff" },
  { name: "Coral Tech", accent: "#ff6b6b", accent2: "#ffd166", planet: "#ff4d6d", glow: "#ff9a8b" },
  { name: "Mint Ray",   accent: "#5ffbc1", accent2: "#a0ff5d", planet: "#10c98a", glow: "#9bffe0" },
  { name: "Violet Net", accent: "#c77dff", accent2: "#5de4ff", planet: "#8b2fd6", glow: "#e0b3ff" },
];

// ============================================================================
//  CUNG HOÀNG ĐẠO  — tên VN + biểu tượng + chòm sao (toạ độ chuẩn hoá -1..1)
//  stars: các điểm sao ; lines: cặp chỉ số nối thành chòm
// ============================================================================
export const ZODIACS = {
  aries:       { vi: "Bạch Dương",  sym: "♈", stars: [[-.6,.4],[-.2,.1],[.2,-.1],[.6,-.3]], lines: [[0,1],[1,2],[2,3]] },
  taurus:      { vi: "Kim Ngưu",    sym: "♉", stars: [[-.6,-.3],[-.2,0],[.1,.3],[.4,.1],[.6,-.3],[0,-.4]], lines: [[0,1],[1,2],[1,3],[3,4],[1,5]] },
  gemini:      { vi: "Song Tử",     sym: "♊", stars: [[-.4,.5],[-.4,-.5],[.4,.5],[.4,-.5],[-.4,0],[.4,0]], lines: [[0,4],[4,1],[2,5],[5,3],[4,5]] },
  cancer:      { vi: "Cự Giải",     sym: "♋", stars: [[-.5,.2],[-.1,-.1],[.3,.1],[.6,-.3],[-.1,.4]], lines: [[0,1],[1,2],[2,3],[1,4]] },
  leo:         { vi: "Sư Tử",       sym: "♌", stars: [[-.6,-.2],[-.3,.1],[0,.3],[.3,.2],[.5,-.1],[.4,-.4],[.1,-.4]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  virgo:       { vi: "Xử Nữ",       sym: "♍", stars: [[-.6,.3],[-.3,.1],[0,.2],[.3,0],[.6,.2],[0,-.3]], lines: [[0,1],[1,2],[2,3],[3,4],[2,5]] },
  libra:       { vi: "Thiên Bình",  sym: "♎", stars: [[-.5,-.2],[0,.1],[.5,-.2],[-.3,.4],[.3,.4]], lines: [[0,1],[1,2],[1,3],[1,4]] },
  scorpio:     { vi: "Bọ Cạp",      sym: "♏", stars: [[-.6,.3],[-.3,.1],[0,0],[.3,-.1],[.5,-.3],[.6,0],[.4,.3]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  sagittarius: { vi: "Nhân Mã",     sym: "♐", stars: [[-.5,-.3],[-.1,0],[.3,.3],[.1,-.4],[.5,.1]], lines: [[0,1],[1,2],[1,3],[1,4]] },
  capricorn:   { vi: "Ma Kết",      sym: "♑", stars: [[-.6,.2],[-.2,.4],[.2,.1],[.5,-.3],[0,-.3]], lines: [[0,1],[1,2],[2,3],[3,4],[4,0]] },
  aquarius:    { vi: "Bảo Bình",    sym: "♒", stars: [[-.6,.1],[-.3,-.1],[0,.1],[.3,-.1],[.6,.1]], lines: [[0,1],[1,2],[2,3],[3,4]] },
  pisces:      { vi: "Song Ngư",    sym: "♓", stars: [[-.6,.3],[-.3,0],[0,.2],[.3,0],[.6,.3],[0,-.3]], lines: [[0,1],[1,2],[2,3],[3,4],[2,5]] },
};
const ZODIAC_KEYS = Object.keys(ZODIACS);

// --- Các biến thể lời chào (VN) --------------------------------------------
const GREETINGS = [
  "Trân trọng kính mời",
  "Thân ái kính mời",
  "Hân hạnh kính mời",
  "Trân trọng gửi tới",
];

// --- Nhãn HUD vui mắt (tiếng Anh, kiểu terminal) ---------------------------
const HUD_TAGS = [
  "STELLAR PASS", "MISSION INVITE", "ORBITAL TICKET",
  "DEEP-SPACE PASS", "LAUNCH MANIFEST", "STARGATE ENTRY",
];

// ============================================================================
//  derive(id, overrides) -> mọi thuộc tính hình ảnh cho 1 khách
// ============================================================================
export function derive(id, overrides = {}) {
  const seed = hashStr(id || "guest");
  const rnd = mulberry32(seed);

  const palIdx = Number.isInteger(overrides.palette)
    ? overrides.palette % PALETTES.length
    : Math.floor(rnd() * PALETTES.length);
  const palette = PALETTES[palIdx];

  const zodKey = overrides.zodiac && ZODIACS[overrides.zodiac]
    ? overrides.zodiac
    : ZODIAC_KEYS[Math.floor(rnd() * ZODIAC_KEYS.length)];

  const greeting = GREETINGS[Math.floor(rnd() * GREETINGS.length)];
  const hudTag   = HUD_TAGS[Math.floor(rnd() * HUD_TAGS.length)];

  return {
    seed,
    rnd,                              // dùng tiếp trong scene để random ổn định
    palette,
    paletteName: palette.name,
    zodiacKey: zodKey,
    zodiac: ZODIACS[zodKey],
    greeting,
    hudTag,
    // thông số scene 3D (ổn định theo id)
    planetTilt:   (rnd() - 0.5) * 0.9,
    ringTilt:     0.4 + rnd() * 0.9,
    starSeed:     Math.floor(rnd() * 1e9),
    orbitOffset:  rnd() * Math.PI * 2,
    bugCount:     1 + Math.floor(rnd() * 2),
    designator:   "GR-" + String(seed % 9000 + 1000),  // mã vé giả "GR-XXXX"
  };
}

// --- Tiện ích: avatar từ chữ cái đầu (khi không có ảnh) --------------------
export function initials(name) {
  const parts = (name || "?").trim().split(/\s+/);
  const a = parts[0]?.[0] || "?";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}
