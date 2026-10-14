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
    degree: "Cử nhân Tổ chức sự kiện",                  // để "" nếu không muốn hiện
    // Ảnh chân dung tỉ lệ 3:4 (vd 600x800). Bỏ ảnh vào assets/img/ rồi đổi tên ở đây.
    photo: "assets/img/photo.jpg",           // vd: "assets/img/photo.jpg"
  },

  /* ---------- Thời gian (giờ Việt Nam, +07:00) ---------- */
  event: {
    start: "2026-12-19T09:00:00+07:00",      // TẠM: chưa có ngày chính thức — nhớ sửa!      // NĂM-THÁNG-NGÀY T GIỜ:PHÚT:GIÂY
    end:   "2026-12-19T11:00:00+07:00",      // TẠM
    timezone: "Asia/Ho_Chi_Minh",            // thứ/ngày/giờ trên thiệp luôn tính theo múi giờ này
  },

  /* ---------- Địa điểm ---------- */
  venue: {
    name: "Trường Đại học Tôn Đức Thắng",
    hall: "Điểm hẹn: khu cỏ trước Tòa G",     // để "" nếu không cần
    address: "19 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh",
    // Từ khóa để Google Maps tìm đúng chỗ: tên trường, địa chỉ, hoặc tọa độ "21.0285,105.8542".
    mapQuery: "Đại học Tôn Đức Thắng, 19 Nguyễn Hữu Thọ, Quận 7",
    showMap: true,                           // false = ẩn khung bản đồ, chỉ giữ nút "Chỉ đường"
    // Sơ đồ khuôn viên trường, có ghim điểm hẹn (vị trí ghim chỉnh trong index.html). Để "" = ẩn.
    campusMap: "assets/img/campus-map.jpg",
    // Ảnh lớn hiện khi chạm vào sơ đồ, có khoanh vùng điểm hẹn (vị trí vòng khoanh chỉnh trong index.html).
    campusMapFull: "assets/img/campus-map-full.jpg",
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
    phone: "0123456789"                     // TẠM: số mock,
  },

  /* ---------- Xác nhận tham gia (RSVP) ---------- */
  rsvp: {
    enabled: true,
    // Dán URL Web App của Google Apps Script (xem README, mục 3). Để "" = chế độ demo, không lưu.
    endpoint: "",                            // chưa có Google Sheet riêng → chế độ demo
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
    message: "Bao nhiêu năm đứng sau cánh gà lo cho sự kiện của người khác, lần này đến lượt Vin được bước ra sân khấu rồi 🎤✨\nKịch bản đã duyệt, sân khấu đã dựng, chỉ còn thiếu khách mời quan trọng nhất là bạn 💙\nMình không cần hoa thật to hay quà thật nhiều, chỉ mong được thấy bạn ở đó, cười cùng mình và lưu lại một tấm hình thật đẹp. Vì có những khoảnh khắc chỉ đến một lần trong đời, và mình mong có bạn trong khoảnh khắc ấy 🫶🏻🎓\nEvent: Graduation. Status: Completed ✅",   // mục "Lời nhắn" ngay sau thiệp; \n = xuống dòng; để "" = ẩn
    closing: "Cảm ơn bạn đã đọc thiệp của Vin. Hẹn gặp bạn vào ngày tốt nghiệp nhé!",
  },
};
