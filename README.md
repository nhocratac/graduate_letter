# 🎓 graduate_letter — Thiệp mời tốt nghiệp (vũ trụ & công nghệ)

Bộ thiệp mời **Lễ Tốt Nghiệp** của **Nguyễn Việt Thắng** — lớp **CNTT2022.2**, chủ đề
*deep space + neon tech*. Mỗi khách có một thiệp cá nhân hoá (tên, lời nhắn, ảnh) với
hành tinh / cung hoàng đạo / bảng màu riêng, dựng bằng **Three.js**. Toàn bộ là file
tĩnh — deploy thẳng lên **GitHub Pages**.

```
📅 11/06/2026 · 12:30–16:00  ·  🏫 Trường ĐH CNTT (UIT), Linh Trung, Thủ Đức
```

---

## 🗂️ Cấu trúc

```
.
├── index.html            ← BẢNG ĐIỀU KHIỂN: danh sách khách + link để copy/gửi (chỉ bạn dùng)
├── card.html             ← TEMPLATE thiệp, đọc ?id=<id> để hiện đúng người (khách nhận link này)
├── .nojekyll             ← để GitHub Pages phục vụ thư mục assets/ nguyên trạng
├── .github/workflows/deploy.yml   ← tự deploy lên Pages mỗi khi push lên main
└── assets/
    ├── css/  base.css · card.css · index.css
    ├── js/
    │   ├── event-data.js   ← ⭐ THÔNG TIN SỰ KIỆN (sửa ở đây)
    │   ├── guests.js       ← ⭐ DANH SÁCH KHÁCH (thêm/sửa khách ở đây)
    │   ├── style-engine.js ← sinh màu/cung hoàng đạo/ngẫu nhiên ổn định theo id
    │   ├── scene.js        ← scene 3D Three.js
    │   ├── card.js         ← dựng nội dung 1 thiệp
    │   └── index.js        ← dựng bảng điều khiển
    └── img/                ← (tuỳ chọn) bỏ ảnh khách vào đây
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
  message: "Lời nhắn riêng...",   // tuỳ chọn — bỏ trống thì dùng thông điệp mặc định
  // zodiac: "leo",               // tuỳ chọn — ép cung hoàng đạo
  // palette: 3,                  // tuỳ chọn — ép bảng màu (0..7)
}
```

Phần lớn chỉ cần `id` + `name` — màu sắc, hành tinh, cung hoàng đạo sẽ **tự sinh ổn định
theo `id`** (mỗi người một vẻ, mở lại vẫn y nguyên).

Link gửi cho khách:  `https://<user>.github.io/graduate_letter/card.html?id=khanh-vy`

### Đổi thông tin sự kiện
Sửa trong `assets/js/event-data.js` (tên, ngày giờ, địa điểm, thông điệp mặc định...).

### Thêm ảnh thật
Bỏ file ảnh vào `assets/img/`, rồi trỏ `photo:` tới đường dẫn đó trong `guests.js`.

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

🛰️ *Made with Three.js · chủ đề vũ trụ & công nghệ.*
