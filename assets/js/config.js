/* =====================================================================
   CẤU HÌNH THIỆP MỜI — bạn chỉ cần sửa file này
   ---------------------------------------------------------------------
   • Giữ nguyên dấu ngoặc kép "..." và dấu phẩy cuối mỗi dòng.
   • Sửa xong, lưu file rồi tải lại trang để xem.
   ===================================================================== */
window.INVITE = {

  /* ---------- Người tốt nghiệp ---------- */
  graduate: {
    name: "Nguyễn Thục Vin",
    degree: "Cử nhân Kinh doanh thể thao & Tổ chức sự kiện",           // để "" nếu không muốn hiện
    // Ảnh chân dung tỉ lệ 3:4 (vd 600x800). Bỏ ảnh vào assets/img/ rồi đổi tên ở đây.
    photo: "assets/img/photo.jpg",           // vd: "assets/img/photo.jpg"
  },

  /* ---------- Thời gian (giờ Việt Nam, +07:00) ---------- */
  event: {
    start: "2026-10-17T16:00:00+07:00",      // NĂM-THÁNG-NGÀY T GIỜ:PHÚT:GIÂY
    end:   "2026-10-17T17:30:00+07:00",
    timezone: "Asia/Ho_Chi_Minh",            // thứ/ngày/giờ trên thiệp luôn tính theo múi giờ này
  },

  /* ---------- Địa điểm ---------- */
  venue: {
    name: "Trường Đại học Tôn Đức Thắng",
    hall: "Sân Quốc Phòng toà M (đối diện Nhà Thi Đấu)",     // để "" nếu không cần
    address: "19 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh",
    // Từ khóa để Google Maps tìm đúng chỗ: tên trường, địa chỉ, hoặc tọa độ "21.0285,105.8542".
    mapQuery: "Đại học Tôn Đức Thắng, 19 Nguyễn Hữu Thọ, Quận 7",
    showMap: true,                           // false = ẩn khung bản đồ, chỉ giữ nút "Chỉ đường"
    // Sơ đồ khuôn viên trường, có ghim điểm hẹn (vị trí ghim chỉnh trong index.html). Để "" = ẩn.
    campusMap: "assets/img/campus-map-tdtu.jpg",
    // Ảnh lớn hiện khi chạm vào sơ đồ, có khoanh vùng điểm hẹn (vị trí vòng khoanh chỉnh trong index.html).
    campusMapFull: "assets/img/campus-map-tdtu.jpg",
  },

  /* ---------- Nhạc nền ---------- */
  music: {
    // Bỏ file .mp3 của bạn vào assets/music/ và đặt tên music.mp3 (hoặc đổi đường dẫn ở đây).
    // Nhạc bắt đầu phát khi khách chạm vào cánh cửa. Không có file thì nút nhạc tự ẩn.
    src: "assets/music/music.mp3",
    volume: 0.6,                             // 0 → 1
  },

  /* ---------- Liên hệ ---------- */
  contact: {
    // Số điện thoại: hiện nút "Gọi" và "Zalo". Để "" = ẩn cả mục Liên hệ.
    phone: "0385379366",
  },

  /* ---------- Xác nhận tham gia (RSVP) ---------- */
  rsvp: {
    enabled: true,
    // Dán URL Web App của Google Apps Script (xem README, mục 3). Để "" = chế độ demo, không lưu.
    endpoint: "https://script.google.com/macros/s/AKfycbztrD-qKOer8yjnkVmZLade2hOcAccPlhoGDU23kSNEkKFpuR2axqVX04Q653rx3lRNIQ/exec",
    askGuests: true,                         // hỏi số người đi cùng
    askMessage: true,                        // ô gửi lời chúc
    showStats: true,                         // hiện tỉ lệ % sau khi gửi (giống video mẫu)
  },

  /* ---------- Chữ trên thiệp ---------- */
  text: {
    eyebrow: "Thư mời tham dự",
    title: ["Lễ", "Tốt", "Nghiệp"],          // mỗi phần tử là một dòng
    tapHint: "Chạm vào cánh cửa để mở thiệp",
    inviteLine: "Thân mời bạn đến dự",
    ceremony: ["Graduation", "Ceremony"],
    message: "Thân yêu ơi có mặt trong khoảng 16h - 17h30 nha vì 17h30 mình phải trả lễ phục rùiii.\nKhông nên tới trễ sau 17h nhé nhưng mình vẫn sẽ ráng đợi mọi người tới 18h.\nXin chân thành cảm ơn và hẹn gặp mọi người vào Thứ Bảy để cùng nhau lưu giữ thật nhiều khoảnh khắc!\n❤ LOVE YOU ❤",   // mục "Lời nhắn" ngay sau thiệp; \n = xuống dòng; để "" = ẩn
    closing: "Sự hiện diện của tất cả mọi người là vinh hạnh và là kỉ niệm đáng nhớ của TZ 🫶🏻🎓",

    // Mục "Lưu ý" (sau Địa điểm). Mỗi lưu ý gồm tiêu đề ngắn + nội dung. Để notes: [] = ẩn cả mục.
    notesIntro: "Để buổi gặp mặt được diễn ra trọn vẹn và thoải mái, TZ gửi gắm lưu ý nho nhỏ: 🫶🏻🎓",
    notes: [
      { title: "Thủ tục vào trường", body: "Mọi người vui lòng mang theo CCCD trong trường hợp bảo vệ bắt xuất trình nhé." },
      { title: "Điểm gửi xe", body: "Chạy vào cổng 7 của trường nằm ở đường D6 và gửi xe theo hướng dẫn của lực lượng điều phối nhaa." },
      { title: "Liên lạc", body: "Sóng wifi cả ngày chắc chắn sẽ yếu lắm nên nếu có gấp thì gọi trực tiếp vào sđt của TZ để trên thiệp nhé! 💝" },
    ],
  },
};
