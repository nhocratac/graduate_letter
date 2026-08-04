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
| `timeStart`/`timeEnd` | `15:00` / `17:00` | user (đổi từ 13:00 sau khi Giang chốt lại) |
| `phone` | `0327154165` | user |
| `email` | **chưa có** → ô email tự ẩn trên thiệp | — |
| `address` | Cơ sở Đặng Thùy Trâm, `69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh` | user chốt cơ sở; số nhà mình điền theo trí nhớ, **chưa xác nhận** |
| `classOf` | `CLASS OF 2026` | suy ra từ ngày lễ |

**Địa điểm:** user đã chốt **cơ sở Đặng Thùy Trâm**. Phần tên đường/quận là chắc; **số nhà `69/68` mình điền
theo trí nhớ nên vẫn cần Giang xác nhận**. `mapUrl` dùng link tìm kiếm Google Maps theo tên cơ sở thay vì toạ
độ tự bịa — nút bản đồ sẽ ra đúng trường kể cả khi số nhà sai.

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
- **Journey:** dùng lại các beat type đã có (`intro`/`statement`/`memory`/`photo`/`milestone`), không thêm
  type mới. Có mở thêm **một trường** `big` cho beat `photo` (`journey.js`) để slide vừa có ảnh vừa có "ý
  chính in đậm" theo yêu cầu của Giang — render thành `.b-photo-lead`, cỡ nhỏ hơn `.b-big` vì còn phải
  nhường chỗ cho ảnh. 3 ảnh user gửi lưu vào `assets/img/` và dùng làm beat `photo`: ảnh cúp = beat "vô địch",
  ảnh lễ phục = beat cuối trước khi vào thiệp.

## 5. Intro video

Dựng bằng HyperFrames (render video từ HTML/CSS/JS) → `assets/video/intro-champion.mp4`.

**Giới hạn:** HyperFrames render video từ HTML/CSS/JS nên không tạo được hình người thật. Session này cũng
không có key sinh ảnh (`GEMINI_API_KEY`/`GOOGLE_API_KEY` đều trống) → không sinh được ảnh nào. Người thật
trong intro **phải đến từ file ảnh có sẵn**.

**Bản v1 (đã thay):** silhouette SVG số 10 tự lấy đà và sút. User phản hồi "không thấy được Messi" →
chốt lại: nhân vật trong intro là **chính Giang**, không dùng ảnh Messi (ảnh báo chí có bản quyền, và
mình không tự tải về).

**Bản v2 (đang dùng):** ảnh lễ phục của Giang được tách nền bằng `hyperframes remove-background`
(model `u2net_human_seg`, CoreML). Lưu ý: model chỉ giữ **người** — nó cắt luôn cúp và giấy chứng nhận
trong ảnh, nên tay Giang trong cutout là tay trống. Vì photo tĩnh không thể "sút", choreography đổi thành
*bóng bay vào lưới trước → Giang hiện lên ăn mừng*, thay vì bắt ảnh diễn động tác sút.

Spec: **7.0s**, 1080×1920 portrait (tránh crop trên mobile — xem fix ở commit `61fc72e`), muted, autoplay 1 lần.

| Thời điểm | Shot |
|---|---|
| 0–1.1s | Sân đêm tối; đèn pha bật lần lượt; kẻ vôi + khung thành sáng lên |
| 1.15–1.95s | Bóng bay từ góc dưới trái theo cung vào lưới, có motion trail |
| 1.93–2.5s | Lưới rung (elastic), khung thành rung nhẹ, quầng sáng + confetti bung |
| 2.2–3.4s | **Giang (ảnh thật, tách nền)** dâng lên từ đáy khung, có quầng sáng vàng–xanh sau lưng |
| 3.5–5.9s | Bảng tên: số `10` chìm, **GIANG LÊ** trượt vào, vạch blaugrana, `VĂN LANG · CLASS OF 2026` |
| 6.1–7.0s | Mờ dần sang xanh đêm rồi vào thiệp |

Cơ chế phát: giữ `initIntro()` (`card.js:172`), đổi điều kiện `PRINCESS` → theme champion. Giữ nút "Bỏ qua",
guard timeout 9.5s, tự bỏ intro khi browser chặn autoplay hoặc `prefers-reduced-motion: reduce`.

**Ràng buộc kỹ thuật:**
- `hyperframes` chưa cài trong máy (`npx` báo cần tải `hyperframes@0.7.82`). Cần user cho phép cài khi
  implement.
- Mục tiêu kích thước file **< 2.5 MB** — GitHub Pages không có CDN video. Nếu render ra nặng hơn thì hạ
  bitrate hoặc rút ngắn thời lượng; không đẩy file nặng lên Pages.

**Kết quả thực tế:** render 1080×1920 · 30fps · 7.0s. Bản `-q high` ra 4.8 MB, nén lại bằng
ffmpeg (`libx264 crf 27 preset slow +faststart`) còn **732 KB**. Số 10 chìm trong bảng tên phải vẽ bằng
hình SVG thay vì chữ, vì `hyperframes check` tính contrast cho mọi text và hoạ tiết mờ 0.055 alpha không
thể đạt WCAG 3:1. Frame ở giây 5.0 được crop thành `assets/img/og-cover.png` (1200×630) làm ảnh link
preview — ảnh cũ là cover của Đào Đào, gửi đi sẽ hiện sai người.

## 6. Nội dung & khách mời

- **6 thiệp thật** (Giang gửi nội dung): `lang-xi-trum` · `tay-thanh-futsal` · `dong` · `bao-quynh` ·
  `anh-khoa` · `dan-em-2k7`, cộng thẻ `preview` làm fallback. Thẻ mẫu `demo` (tên giả "Minh Khang") đã xoá.
- **Lời nhắn giữ nguyên văn Giang viết.** Các beat journey chỉ tách ý từ chính câu đó, không thêm chi tiết
  mới — không đặt lời vào miệng Giang.
- Khách chưa có ảnh → avatar tự sinh từ chữ cái đầu. Beat `photo` dùng ảnh của Giang.
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

| Cần | Trạng thái |
|---|---|
| Số điện thoại | ✅ `0327154165` |
| Giờ lễ | ✅ 15:00 — 17:00 (đổi từ 13:00) |
| Địa điểm | ✅ Cơ sở Đặng Thùy Trâm, số nhà `69/68` Giang đã xác nhận. `mapUrl` dùng link tìm kiếm theo tên |
| Danh sách khách | 🔸 11 thiệp thật + `preview`. 4 thiệp (Thùy Trang, Thu Thảo, Minh Thi, Ngọc Mai) dựng theo script từng slide Giang gửi. **Còn tồn:** ảnh Thùy Trang (file gửi về là icon PNG, không phải ảnh) |
| Email liên hệ | ✅ Giang không dùng email → ô email tự ẩn (đã chốt, không phải việc tồn) |
| Cho phép cài `hyperframes` | ✅ đã cài, intro đã render |
