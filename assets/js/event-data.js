// ============================================================================
//  CẤU HÌNH SỰ KIỆN  —  chỉnh ở đây là đổi cho TẤT CẢ thiệp
// ============================================================================
export const EVENT = {
  host:        "Nguyễn Việt Thắng",
  occasion:    "Lễ Tốt Nghiệp",
  className:   "CNTT2022.2",
  classOf:     "CLASS OF 2026",

  // Thời gian (dùng cho countdown + nút thêm vào lịch). Múi giờ VN (+07:00)
  dateISO:     "2026-06-11",
  timeStart:   "12:30",
  timeEnd:     "16:00",
  dateLabel:   "11 tháng 6, 2026",      // hiển thị
  dayLabel:    "Thứ Năm",
  timeLabel:   "12:30 — 16:00",

  // Địa điểm
  venue:       "Trường Đại học Công nghệ Thông tin",
  venueShort:  "UIT — ĐH CNTT",
  address:     "Phường Linh Trung, TP. Thủ Đức, TP.HCM",

  // Liên hệ (hiện trên mọi thiệp để mọi người dễ liên lạc)
  phone:       "0397154698",
  email:       "nguyenvietthang010@gmail.com",
  // Toạ độ UIT (dùng làm chi tiết HUD + link bản đồ)
  lat:         10.8700,
  lng:         106.8031,
  mapUrl:      "https://maps.google.com/?q=10.8700,106.8031",

  // Thông điệp mặc định (khi 1 khách không có message riêng trong guests.js)
  defaultMessage:
    "Sự hiện diện của bạn sẽ là một vì sao sáng trong ngày trọng đại này của mình. " +
    "Mình thật lòng mong được gặp và đón bạn tại buổi lễ!",

  // Dòng "mong có mặt" — luôn hiển thị ở mọi thiệp, ngay cả khi có message riêng
  presenceLine:
    "Rất mong bạn sắp xếp thời gian đến chung vui — có bạn ở đó mới trọn vẹn.",
};

// Tính chuỗi datetime đầy đủ cho countdown / lịch (giờ VN +07:00)
export const EVENT_START = new Date(`${EVENT.dateISO}T${EVENT.timeStart}:00+07:00`);
export const EVENT_END   = new Date(`${EVENT.dateISO}T${EVENT.timeEnd}:00+07:00`);
