# Thiết kế — Thiệp mời "hành trình cuộn kể chuyện"

**Ngày:** 2026-05-31
**Trạng thái:** Đã duyệt thiết kế, chờ viết plan
**File chính:** `card.html`, `assets/js/card.js`, `assets/js/journey.js` (mới), `assets/js/scene.js`, `assets/css/card.css`, `assets/js/guests.js`

---

## 1. Mục tiêu

Biến tấm thiệp mời tốt nghiệp từ một thẻ tĩnh thành một **hành trình cuộn (scroll) kể chuyện**, cá nhân hoá theo từng người nhận. Thay vì đọc một card, người nhận cuộn qua từng cột mốc ký ức giữa họ và chủ nhân (Nguyễn Việt Thắng), rồi mới đến lời mời chính thức. Mục tiêu cảm xúc: người nhận thấy **"wow"** và được gợi nhớ kỷ niệm.

**Không thay đổi với người gửi:** link vẫn là `card.html?id=<id>`.

## 2. Quyết định đã chốt

- **Cá nhân hoá theo từng người** — mỗi người cuộn qua chính kỷ niệm của họ. (Không phải hành trình chung.)
- **Số chặng & nội dung tuỳ từng người** — tác giả (Claude) tự soạn beat từ `message` hiện có.
- **Journey DẪN VÀO thiệp, không thay thế.** Cuộn hết các chặng → **tấm thiệp HUD vũ trụ đầy đủ** (avatar, ngày giờ, countdown, bản đồ, thêm lịch, scene 3D) vẫn hiện ở cuối, giữ nguyên chức năng hiện có.

## 3. Kiến trúc luồng

Vẫn là **một trang `card.html`, cuộn dọc**, `scroll-snap` từng màn.

```
┌─ #bg canvas (scene 3D vũ trụ) — CỐ ĐỊNH, xuyên suốt ─────────────┐
│  [Chặng 1]  intro     → gọi tên riêng                            │
│  [Chặng 2]  milestone → cột mốc số/thời gian                     │  cuộn ↓
│  [Chặng 3]  statement → câu khẳng định mạnh                      │  scroll-snap
│  [Chặng …]  memory    → đoạn ký ức (số chặng tuỳ người)          │
│  [Chặng cuối] = #stage = TẤM THIỆP HUD CŨ, đầy đủ chức năng      │
└──────────────────────────────────────────────────────────────────┘
```

- Canvas `#bg` cố định phía sau **tất cả** chặng → nền vũ trụ liên tục, cảm giác "bay xuyên không gian".
- Khối `#journey` (mới) nằm **trên** `#stage`; được JS dựng động từ `guest.journey`.
- `#stage` (tấm thiệp HUD hiện tại) trở thành **chặng cuộn cuối cùng**.

## 4. Mô hình dữ liệu

Thêm trường **tuỳ chọn** `journey: []` vào mỗi object khách trong `guests.js`. **Không đụng** trường `message` cũ (vẫn hiển thị trong thiệp cuối).

```js
{
  id: "phi-long", name: "Lê Phi Long", title: "Anh",
  photo: "assets/img/phi-long.png", zodiac: "scorpio",
  message: "…",                       // GIỮ NGUYÊN
  journey: [
    { type: "intro",     kicker: "Một lời mời dành riêng cho" },
    { type: "milestone", big: "~3 năm", text: "kể từ tô bún ốc giữa trời mưa tầm tã." },
    { type: "statement", kicker: "CLB Lý luận trẻ", lines: ["Người thầy.","Người anh.","Người bạn."] },
    { type: "memory",    kicker: "Hơn cả công nghệ", text: "Anh dạy em code — và cả những châm ngôn sống…" },
  ],
}
```

### 4 kiểu beat (template dựng sẵn)

| type | dùng cho | trường dữ liệu | hiển thị |
|------|----------|----------------|----------|
| `intro` | mở màn | `kicker` (tên tự lấy từ `title`+`name`) | tên lớn gradient + dòng dẫn |
| `milestone` | cột mốc số/thời gian | `big`, `text` | số/nhãn khổng lồ + 1 câu |
| `statement` | câu khẳng định mạnh | `kicker`, `lines[]` | nhiều dòng in đậm, dòng cuối gradient |
| `memory` | đoạn ký ức kể | `kicker`, `text` | 1 đoạn văn lead |

### Fallback (bắt buộc)

- Khách **không có** `journey` (hoặc mảng rỗng) → **bỏ qua** phần cuộn, vào thẳng thiệp HUD như hành vi hiện tại. Không vỡ trang.
- Khách không tồn tại (`id` sai) → giữ nguyên màn 404 hiện có.

## 5. Hệ chuyển động & "wow"

- **Nền liên tục:** truyền `scrollProgress` (0→1) vào `scene.js` qua hàm mới `setScrollProgress(p)`:
  - hành tinh lớn dần / tiến lại gần khi càng gần thiệp cuối ("đang đến đích");
  - parallax nhẹ lớp sao theo hướng cuộn.
- **Reveal beat:** `IntersectionObserver` thêm class `.in` → chữ trượt lên + fade. Các dòng trong `statement` hiện **lệch nhịp (stagger)**.
- **Thiệp cuối:** giữ nguyên animation `cardIn` + tilt theo chuột.
- **Progress rail:** thanh mảnh mép phải, đánh dấu chặng hiện tại / còn lại.
- **Sao băng theo cuộn:** qua mỗi chặng bắn 1 vệt sao băng (tái dùng cơ chế `pulsePlanet`/hiệu ứng sẵn có).
- **Nhịp thở trước cao trào:** câu "Và hôm nay…" fade ra rồi thiệp mới trồi lên.

## 6. Khả năng tiếp cận & thiết bị

- **Nút "Bỏ qua → tới thiệp"** nhỏ, cố định góc trên: cho người vội hoặc mở lại lần 2 (nhảy thẳng tới `#stage`).
- **`prefers-reduced-motion: reduce`:** tắt scroll-snap + parallax + sao băng; beat hiện tức thì; journey xếp chồng đọc như bài viết thường.
- **Mobile:** scroll-snap mượt, chữ co theo `clamp()`, dùng cờ `lowEnd` sẵn có trong `card.js` để giảm tải animation.
- **WebGL không khả dụng:** đã có nhánh `no-webgl` (nền tĩnh) — journey vẫn hoạt động trên nền tĩnh.

## 7. Phạm vi file

| File | Thay đổi |
|------|----------|
| `card.html` | thêm khối `#journey` (rỗng) phía trên `#stage`; nút "Bỏ qua"; progress rail |
| `assets/js/journey.js` *(mới)* | template 4 kiểu beat, dựng DOM, IntersectionObserver reveal, map scroll→progress |
| `assets/js/card.js` | gọi journey trước khi render thiệp; nối `scrollProgress` vào scene; xử lý fallback |
| `assets/js/scene.js` | thêm `setScrollProgress(p)` (parallax + hành tinh); **không phá API cũ** |
| `assets/css/card.css` | style 4 beat + scroll-snap + progress rail + reduced-motion |
| `assets/js/guests.js` | thêm `journey` cho từng người (nội dung do Claude soạn từ `message`) |

## 8. Kế hoạch soạn nội dung `journey`

Soạn beat cho từng khách hiện có, từ `message` của họ (số chặng tuỳ độ giàu ký ức):

- **phi-long** (giàu) → 4 beat: intro · milestone(~3 năm, bún ốc) · statement(thầy/anh/bạn) · memory(code+châm ngôn).
- **dang-quang** (giàu) → 4 beat: intro · statement(thẳng thắn, khẳng khái) · memory(môn chung, thực hành, nói chuyện) · memory(kỷ niệm là phần đáng quý + "mày thì phải đi").
- **hung** (vừa) → 3 beat: intro · statement(ấn tượng năng lượng/khó gần→thân thiện) · memory(ngưỡng mộ, một phần 4 năm).
- **thuy-trang** (vừa) → 3 beat: intro · statement(nàng xuất hiện nhiều nhất) · memory(thông tin tình báo, cầu nối, UIT).
- **mhx2025** (tập thể) → 3 beat: intro · milestone(Mùa Hè Xanh duy nhất) · memory(niềm vui, hẹn gặp lại).
- **nha-uyen** (ngắn) → 2 beat: intro · memory(nàng thơ CXCN, em gái).
- **long-phan** (ngắn) → 2 beat: intro · memory(thằng em shiba).

> Người mới thêm về sau: nếu chưa kịp soạn `journey` → tự động dùng fallback (vào thẳng thiệp).

## 9. Ngoài phạm vi (YAGNI)

- Không thêm nhạc nền/âm thanh.
- Không thêm trình soạn journey trên UI (nội dung viết tay trong `guests.js`).
- Không đổi trang `index.html`, không đổi cách tạo/chia sẻ link.
- Không thêm ảnh/video mới cho từng beat (chỉ chữ + nền vũ trụ + ảnh avatar ở thiệp cuối).

## 10. Tiêu chí thành công

1. Mở `card.html?id=phi-long` → cuộn qua 4 chặng, mỗi chặng một màn, chữ hiện dần, nền vũ trụ liên tục, kết thúc ở thiệp HUD đầy đủ.
2. Khách không có `journey` → vào thẳng thiệp HUD, không lỗi.
3. `id` sai → màn 404 như cũ.
4. Nút "Bỏ qua" nhảy thẳng tới thiệp.
5. `prefers-reduced-motion` → đọc được dạng tĩnh, không snap/parallax.
6. Mobile cuộn mượt; máy yếu/không WebGL vẫn dùng được.
7. `message` cũ của mọi khách vẫn nguyên trong thiệp cuối.
