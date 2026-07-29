# Thiệp mời tốt nghiệp Lê Vĩnh Hoàng Giang — theme "Champion"

**Ngày:** 2026-07-29
**Trạng thái:** đã được duyệt, chờ implementation plan

---

## 1. Bối cảnh

Repo `grad_invite` đang phục vụ event thứ hai của nó:

| Branch | Event | Theme |
|---|---|---|
| `vietthang` | Lễ tốt nghiệp Nguyễn Việt Thắng (UIT, 11/06/2026) | cosmic / neon tech, Three.js |
| `main` (hiện tại) | Lễ tốt nghiệp Đào Đào (USSH, 01/07/2026) | `princess` — Pastel Dream Editorial |

Lễ của Đào Đào đã diễn ra. Bây giờ làm bản thứ ba: **Lê Vĩnh Hoàng Giang** — trước đây là khách mời `giang-le`
trong bản `vietthang` (bạn thân thời học trò của Thắng), nay là người tốt nghiệp.

Precedent đã có ở commit `bb8a58b` ("repurpose main for Đào Đào... Vietthang graduation preserved on branch
`vietthang`"): mỗi event = một branch đóng băng, `main` luôn là event đang chạy.

## 2. Dữ liệu event

Xác nhận từ user + đọc được từ 3 ảnh user gửi (giấy chứng nhận + cúp vô địch):

| Trường | Giá trị | Nguồn |
|---|---|---|
| `host` | `Lê Vĩnh Hoàng Giang` | user chọn (tên đầy đủ, không dùng nickname "Giang Lê") |
| `className` | `Quan hệ Công chúng – Truyền thông` | đọc từ giấy chứng nhận trong ảnh |
| Trường | Đại học Văn Lang | user |
| `dateISO` | `2026-08-08` | user |
| `dayLabel` | `Thứ Bảy` | tính từ `date -j` — 08/08/2026 là Saturday |
| `timeStart`/`timeEnd` | `13:00` / `17:00` | user |
| `phone` | `0123456678` | user — **placeholder**, gắn `// TODO: số thật` |
| `email` | **chưa có** — placeholder `giang@example.com` + TODO | — |
| `address` | **chưa có** — placeholder + TODO | — |
| `classOf` | `CLASS OF 2026` | suy ra từ ngày lễ |

**Assumption chưa kiểm chứng:** lễ có thể diễn ra ở Cơ sở 3 Văn Lang (Đặng Thùy Trâm, Bình Thạnh) — đây là
phỏng đoán, KHÔNG ghi vào code như sự thật. `venue`/`address`/`lat`/`lng`/`mapUrl` để placeholder gắn cờ TODO
cho tới khi user xác nhận. Không đặt toạ độ bịa vào `mapUrl` vì nút bản đồ sẽ dẫn khách đi sai chỗ.

### Chân dung để chọn hướng thẩm mỹ

- Vô địch bóng đá Hội thao sinh viên Văn Lang (cúp + giấy chứng nhận đội vô địch trong ảnh).
- Fan **Messi / Barcelona** (user xác nhận; lưu ý thiệp cũ ghi "một Manucian" là Thắng tự nói về mình,
  không phải Giang).
- Ngành PR – Truyền thông.

## 3. Kiến trúc

Giữ nguyên khung đang chạy tốt, không refactor đầu cơ.

- `git branch daodao` tại commit hiện tại (`98efb75`) + push → đóng băng bản Đào Đào.
- `main` được sửa thành bản Giang. GitHub Pages deploy như cũ, **không sửa** `.github/workflows/deploy.yml`.
- Thêm theme key thứ ba: `theme: "champion"` trong `event-data.js`. Cơ chế nhận diện theo đúng pattern hiện
  có (`card.js:12-13`, `index.js:10-11`) nhưng thay hằng boolean `PRINCESS` bằng hằng chuỗi
  `const THEME = EVENT.theme` rồi set class `theme-${THEME}` lên `<html>`; các chỗ đang kiểm tra `PRINCESS`
  đổi sang so sánh `THEME === "princess"` / `=== "champion"`. Vẫn là nhánh `if` đơn giản — **không** xây theme
  registry / plugin system.
- File mới: `assets/js/stadium.js` — nền động cho theme này, cùng interface với `sparkles.js`/`scene.js`
  (`{ pulsePlanet(), shootStar(), setScrollProgress(p) }`) để `card.js` không phải đổi cấu trúc.
- `sparkles.js`, `scene.js`, `music.js` **giữ nguyên**, không xoá — branch `daodao` và `vietthang` vẫn cần.
- Xoá `assets/video/intro-princess.mp4` khỏi `main` (đã có trên `daodao`) để repo không phình.

### Ranh giới các unit

| Unit | Làm gì | Phụ thuộc |
|---|---|---|
| `event-data.js` | Dữ liệu event + theme key | — |
| `guests.js` | Danh sách khách + journey từng người | — |
| `stadium.js` | Nền động sân vận động, expose 3 method như trên | palette truyền vào |
| `music.js` | Hộp nhạc; thêm pattern `chant` cạnh pattern hiện có, chọn qua tham số | — |
| `card.js` | Điều phối: theme detection, dựng thiệp, intro, journey | tất cả các unit trên |

`card.js` là chỗ duy nhất biết về theme. `stadium.js` không biết theme là gì — chỉ nhận palette.

## 4. Theme "Champion"

- **Palette:** xanh `#004D98`, garnet `#A50044`, vàng cúp `#EDBB00`; nền tối kiểu sân đêm dưới đèn pha.
- **Typography:** condensed in hoa cho tên/số (chất áo đấu); sans cho body. Bỏ Playfair của bản pastel.
- **Nền động (`stadium.js`):** đèn pha quét chậm + confetti vàng rơi thưa. Click nền = burst confetti
  ("tiếng còi khai cuộc") — map vào `pulsePlanet()` để không đổi contract.
- **Motif:** số **10**; kẻ vôi sân cỏ (trắng mờ); khung avatar hình khiên thay vương miện.
- **Không dùng** logo/crest FC Barcelona hay hình ảnh Messi thật — hình ảnh có bản quyền. Chỉ màu blaugrana
  + số 10.
- **Journey:** dùng lại nguyên các beat type đã có (`intro`/`statement`/`memory`/`photo`/`milestone`), không
  thêm type mới. 3 ảnh user gửi lưu vào `assets/img/` và dùng làm beat `photo`: ảnh cúp = beat "vô địch",
  ảnh lễ phục = beat cuối trước khi vào thiệp.

## 5. Intro video

Dựng bằng HyperFrames (render video từ HTML/CSS/JS) → `assets/video/intro-champion.mp4`.

**Giới hạn đã thống nhất với user:** HyperFrames không tạo được footage thật của Messi. Intro là bản **cách
điệu**: silhouette cầu thủ số 10. Nếu user muốn footage thật thì phải tự cung cấp clip.

Spec: ~6.5s, 1080×1920 portrait (tránh crop trên mobile — xem fix ở commit `61fc72e`), muted, autoplay 1 lần.

| Thời điểm | Shot |
|---|---|
| 0–1.2s | Sân đêm tối; đèn pha bật lần lượt; kẻ vôi sáng lên |
| 1.2–2.6s | Silhouette số 10 lấy đà và sút; bóng bay theo cung, có motion trail |
| 2.6–3.4s | Bóng vào lưới; lưới rung (SVG mesh biến dạng); khung hình rung nhẹ; confetti vàng bung |
| 3.4–5.5s | Chữ **GIANG LÊ** hiện kiểu bảng đội hình: số `10` lớn phía sau, tên trượt vào, dòng dưới `VĂN LANG · CLASS OF 2026` |
| 5.5–6.5s | Fade sang blaugrana rồi mờ dần vào thiệp |

Cơ chế phát: giữ `initIntro()` (`card.js:172`), đổi điều kiện `PRINCESS` → theme champion. Giữ nút "Bỏ qua",
guard timeout 9.5s, tự bỏ intro khi browser chặn autoplay hoặc `prefers-reduced-motion: reduce`.

**Ràng buộc kỹ thuật:**
- `hyperframes` chưa cài trong máy (`npx` báo cần tải `hyperframes@0.7.82`). Cần user cho phép cài khi
  implement.
- Mục tiêu kích thước file **< 2.5 MB** — GitHub Pages không có CDN video. Nếu render ra nặng hơn thì hạ
  bitrate hoặc rút ngắn thời lượng; không đẩy file nặng lên Pages.

**Kết quả thực tế:** render 1080×1920 · 30fps · 195 frame · 6.5s. Bản `-q high` ra 3.1 MB, nén lại bằng
ffmpeg (`libx264 crf 27 preset slow +faststart`) còn **555 KB**. Số 10 chìm trong bảng tên phải vẽ bằng
hình SVG thay vì chữ, vì `hyperframes check` tính contrast cho mọi text và hoạ tiết mờ 0.055 alpha không
thể đạt WCAG 3:1. Frame ở giây 5.0 được crop thành `assets/img/og-cover.png` (1200×630) làm ảnh link
preview — ảnh cũ là cover của Đào Đào, gửi đi sẽ hiện sai người.

## 6. Nội dung & khách mời

- `guests.js` giữ 2 thẻ: `demo` (thẻ mẫu để Giang xem trước — journey viết theo chất bóng đá + PR) và
  `preview` (fallback khi link thiếu `id`). Đúng cách bản Đào Đào khởi đầu ở `bb8a58b`.
- **Không bịa khách của Giang.** Giang tự thêm khách theo hướng dẫn README.
- Lời nhắn mặc định (`defaultMessage`) và `presenceLine` viết lại theo giọng champion, bỏ từ ngữ "lấp lánh /
  kim tuyến" của bản princess.

## 7. Âm thanh

`music.js` hiện chỉ có một pattern pentatonic mộng mơ (`SCALE` + `PATTERN`, dòng 10–16). Thêm pattern thứ hai
"khán đài": nhịp trống + hợp âm hô vang, vẫn synth thuần Web Audio (không dùng file nhạc → không vướng bản
quyền). `createMusicBox()` nhận tham số chọn pattern; mặc định giữ nguyên hành vi cũ để branch `daodao`
không bị ảnh hưởng nếu có ai merge qua lại. Nút bật/tắt hiển thị ở cả hai theme.

## 8. README

README hiện mô tả bản cosmic của Thắng — đã lệch 2 đời theme (vẫn ghi "chủ đề vũ trụ & công nghệ", Three.js,
UIT 11/06). Cập nhật đúng những phần lệch: event, theme, bảng branch, danh sách file (thêm `stadium.js`,
`journey.js`, `music.js`, `sparkles.js` — 4 file đang thiếu trong cây thư mục ở README). Không viết lại toàn
bộ README.

## 9. Kiểm thử

Repo là static site, không có test runner. Verify bằng cách chạy thật:

1. `python3 -m http.server 8000`, mở `card.html?id=demo` — kiểm tra: intro phát rồi mờ dần; journey cuộn đủ
   beat; progress rail chạy; thiệp hiện đúng ngày 08/08/2026 Thứ Bảy 13:00–17:00; countdown đếm đúng.
2. `card.html` không có `?id` → phải ra thẻ `preview`, không phải màn "không tìm thấy".
3. `card.html?id=khong-ton-tai` → cũng ra thẻ `preview`. **Đã kiểm chứng bằng browser:** logic
   ở `card.js:20` fallback mọi id lạ về `preview`, nên màn "không tìm thấy" chỉ xuất hiện khi
   `guests.js` không có thẻ `preview`. Dự đoán ban đầu của spec (ra màn 404) là **sai**; giữ
   hành vi hiện tại vì khách gõ sai link vẫn thấy thiệp tử tế.
4. Portrait mobile (Playwright, 390×844): intro không bị crop; nút "Bỏ qua" và progress rail ẩn khi tới thiệp
   (regression của `61fc72e`).
5. `prefers-reduced-motion: reduce` → không có intro, không animation nền.
6. Chặn autoplay → intro tự bỏ qua, không kẹt màn đen.
7. `index.html` (dashboard) hiển thị đúng theme champion và link từng khách.

## 10. Ngoài phạm vi

- Không refactor thành hệ thống multi-event / multi-tenant.
- Không sửa `.github/workflows/deploy.yml`.
- Không xoá `scene.js` / `sparkles.js`.
- Không thêm backend, RSVP form, hay analytics.
- Không tự tạo danh sách khách mời của Giang.

## 11. Việc còn chờ user

| Cần | Xử lý tạm |
|---|---|
| Email liên hệ | placeholder + `// TODO` |
| Địa chỉ / cơ sở Văn Lang làm lễ | placeholder + `// TODO`; `mapUrl` để trống chứ không bịa toạ độ |
| Số điện thoại thật | giữ `0123456678` + `// TODO` |
| Cho phép cài `hyperframes` | chặn bước render intro; các bước khác chạy trước được |
