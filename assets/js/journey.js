// ============================================================================
//  JOURNEY  —  dựng "hành trình cuộn kể chuyện" trước tấm thiệp
// ----------------------------------------------------------------------------
//  Đọc guest.journey (mảng beat) và dựng từng màn cuộn (.beat-screen).
//  4 kiểu beat: intro · milestone · statement · memory  (xem guests.js).
//  Nếu guest không có journey -> trả {count:0}, card.js vào thẳng tấm thiệp.
// ============================================================================

const esc = (s) =>
  String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

// ---- render HTML cho 1 beat theo type ------------------------------------
function renderBeat(b, guest) {
  switch (b.type) {
    case "intro": {
      const who = (guest.title ? guest.title + " " : "") + guest.name;
      return (
        `<div class="b-kicker">${esc(b.kicker || "Một lời mời dành riêng cho")}</div>` +
        `<h1 class="b-name grad">${esc(who)}</h1>` +
        (b.text ? `<p class="b-sub">${esc(b.text)}</p>` : "")
      );
    }
    case "milestone":
      return (
        `<div class="b-big grad">${esc(b.big)}</div>` +
        (b.text ? `<p class="b-lead">${esc(b.text)}</p>` : "")
      );
    case "statement": {
      const lines = (b.lines || []).map((ln, i, arr) => {
        const cls = i === arr.length - 1 ? "b-line grad" : "b-line";
        return `<span class="${cls}" style="--l:${i}">${esc(ln)}</span>`;
      }).join("");
      return (
        (b.kicker ? `<div class="b-kicker">${esc(b.kicker)}</div>` : "") +
        `<h2 class="b-statement">${lines}</h2>`
      );
    }
    case "memory":
    default:
      return (
        (b.kicker ? `<div class="b-kicker">${esc(b.kicker)}</div>` : "") +
        `<p class="b-lead">${esc(b.text)}</p>`
      );
  }
}

// ---- dựng toàn bộ hành trình ----------------------------------------------
//  mount  : phần tử chứa (#journey)
//  guest  : object khách
//  hooks  : { onBeatEnter() }  — gọi khi 1 chặng lần đầu hiện ra
export function buildJourney(mount, guest, hooks = {}) {
  const beats = Array.isArray(guest.journey) ? guest.journey : [];
  if (!beats.length) return { count: 0 };

  const frag = document.createDocumentFragment();
  beats.forEach((b, i) => {
    const sec = document.createElement("section");
    sec.className = "beat-screen";
    const inner = document.createElement("div");
    inner.className = "beat";
    inner.innerHTML = renderBeat(b, guest);
    sec.appendChild(inner);
    // gợi ý cuộn ở chặng đầu
    if (i === 0) {
      const hint = document.createElement("div");
      hint.className = "scrollhint";
      hint.textContent = "cuộn xuống ↓";
      sec.appendChild(hint);
    }
    frag.appendChild(sec);
  });
  mount.appendChild(frag);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = mount.querySelectorAll(".beat");
  if (reduce) {
    items.forEach((el) => el.classList.add("in")); // hiện ngay, không hiệu ứng
  } else {
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          if (!seen.has(e.target)) {
            seen.add(e.target);
            hooks.onBeatEnter && hooks.onBeatEnter();
          }
        });
      },
      { threshold: 0.45 }
    );
    items.forEach((el) => io.observe(el));
  }

  return { count: beats.length };
}
