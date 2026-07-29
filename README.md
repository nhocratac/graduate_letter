# 🎓 grad_invite — Thiệp mời tốt nghiệp (theme "champion")

Bộ thiệp mời **Lễ Tốt Nghiệp** của **Lê Vĩnh Hoàng Giang** — ngành **Quan hệ Công chúng –
Truyền thông**, ĐH Văn Lang. Chủ đề *sân đêm & cúp vàng* (blaugrana + số 10). Mỗi khách có
một thiệp cá nhân hoá (tên, lời nhắn, ảnh) với **hành trình cuộn kể chuyện** trước khi tới
tấm thiệp. Toàn bộ là file tĩnh — deploy thẳng lên **GitHub Pages**.

```
📅 08/08/2026 (Thứ Bảy) · 13:00–17:00  ·  🏫 ĐH Văn Lang
```

## 🌿 Mỗi lễ tốt nghiệp = một branch

`main` luôn là event đang chạy. Các event trước được đóng băng:

| Branch      | Event                                  | Theme                        |
| ----------- | -------------------------------------- | ---------------------------- |
| `main`      | Lê Vĩnh Hoàng Giang · Văn Lang, 08/08/2026 | `champion` — sân đêm & cúp vàng |
| `daodao`    | Đào Đào · USSH, 01/07/2026             | `princess` — Pastel Dream Editorial |
| `vietthang` | Nguyễn Việt Thắng · UIT, 11/06/2026    | cosmic / neon tech (Three.js) |

Đổi theme = sửa `theme:` trong `assets/js/event-data.js` (`champion` · `princess` · bỏ trống
để về cosmic). `card.js` gắn class `theme-<tên>` lên `<html>`, CSS và nền động chọn theo đó.

---

## 🗂️ Cấu trúc

```
.
├── index.html            ← BẢNG ĐIỀU KHIỂN: danh sách khách + link để copy/gửi (chỉ bạn dùng)
├── card.html             ← TEMPLATE thiệp, đọc ?id=<id> để hiện đúng người (khách nhận link này)
├── .nojekyll             ← để GitHub Pages phục vụ thư mục assets/ nguyên trạng
├── .github/workflows/deploy.yml   ← tự deploy lên Pages mỗi khi push lên main
└── assets/
    ├── css/  base.css · card.css · index.css     (mỗi file có 1 block cho từng theme)
    ├── js/
    │   ├── event-data.js   ← ⭐ THÔNG TIN SỰ KIỆN + theme (sửa ở đây)
    │   ├── guests.js       ← ⭐ DANH SÁCH KHÁCH (thêm/sửa khách ở đây)
    │   ├── card.js         ← dựng 1 thiệp: theme, journey, intro video, countdown
    │   ├── index.js        ← dựng bảng điều khiển
    │   ├── journey.js      ← dựng các màn cuộn kể chuyện từ guest.journey
    │   ├── style-engine.js ← sinh màu/cung hoàng đạo ổn định theo id
    │   ├── stadium.js      ← nền động theme champion (đèn pha + confetti)
    │   ├── sparkles.js     ← nền động theme princess (kim tuyến)
    │   ├── scene.js        ← nền động 3D theme cosmic (Three.js)
    │   └── music.js        ← nhạc nền tổng hợp Web Audio (nhịp khán đài / hộp nhạc)
    ├── img/                ← ảnh khách + ảnh link preview (og-cover.png)
    └── video/              ← intro-champion.mp4 (cú sút mở đầu, phát 1 lần)
```

> ⚠️ Thiệp (`card.html`) **không** chứa link sang thiệp khác. Chỉ `index.html` mới thấy
> toàn bộ danh sách — đừng gửi link `index.html` cho khách, chỉ gửi link `card.html?id=...`.

---

## ➕ Thêm / sửa khách mời

Mở `assets/js/guests.js`, thêm một object vào mảng `GUESTS`:

```js
{
  id: "khanh-vy",                 // bắt buộc — không dấu, không khoảng trắng (dùng trong URL)
  name: "Khánh Vy",               // bắt buộc
  title: "Cô",                    // tuỳ chọn — danh xưng trước tên
  photo: "assets/img/vy.jpg",     // tuỳ chọn — bỏ trống thì tự tạo avatar từ chữ cái đầu
  message: "Lời nhắn riêng...",   // tuỳ chọn — bỏ trống thì dùng EVENT.defaultMessage
  journey: [                      // tuỳ chọn — các màn cuộn trước khi tới thiệp
    { type: "intro",     kicker: "Một lời mời dành riêng cho" },
    { type: "statement", kicker: "Bốn năm", lines: ["Một mùa giải dài.", "Và tụi mình đã đi hết."] },
    { type: "milestone", big: "No. 10", text: "Số áo, và cách tớ chọn để chơi trận đời mình." },
    { type: "photo",     src: "assets/img/giang-champion.jpg", kicker: "Đội vô địch", text: "..." },
    { type: "memory",    kicker: "Cảm ơn cậu", text: "..." },
  ],
}
```

Phần lớn chỉ cần `id` + `name`. Bỏ `journey` thì khách vào thẳng tấm thiệp.

Link gửi cho khách:  `https://<user>.github.io/graduate_letter/card.html?id=khanh-vy`

### Đổi thông tin sự kiện
Sửa trong `assets/js/event-data.js`. Vài chỗ tự xử lý khi còn trống:
- `email: ""` → ô email trên thiệp tự ẩn.
- `mapUrl: ""` → nút "Xem bản đồ" tự ẩn (không dẫn khách tới link rỗng).

### Đổi intro video
Thay `assets/video/intro-champion.mp4`. Thiếu file hoặc trình duyệt chặn autoplay thì JS
tự bỏ qua intro, không kẹt màn đen. Thiết bị bật `prefers-reduced-motion` cũng không thấy intro.

---

## 🚀 Chạy thử & Deploy

**Chạy local** (cần server tĩnh vì dùng ES modules):

```bash
python3 -m http.server 8000
# mở http://localhost:8000/index.html
```

**Deploy GitHub Pages:** đã có sẵn workflow. Sau khi push lên `main`:
`Settings → Pages → Build and deployment → Source = GitHub Actions`. Mỗi lần push, site
tự build & deploy.

---

⚽ *Thiết kế theo chất sân cỏ — vì Giang là fan Messi.*
