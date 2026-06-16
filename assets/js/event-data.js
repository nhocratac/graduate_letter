// ============================================================================
//  CẤU HÌNH SỰ KIỆN  —  chỉnh ở đây là đổi cho TẤT CẢ thiệp
//  (branch main = lễ tốt nghiệp của Đào Đào · theme "princess")
// ============================================================================
export const EVENT = {
  theme:       "princess",          // "princess" -> style công chúa / lấp lánh

  host:        "Đào Đào",
  occasion:    "Lễ Tốt Nghiệp",
  className:   "Báo Chí",
  classOf:     "CLASS OF 2026",

  // Thời gian (countdown + thêm vào lịch). Múi giờ VN (+07:00)
  dateISO:     "2026-07-01",
  timeStart:   "10:00",
  timeEnd:     "12:00",
  dateLabel:   "1 tháng 7, 2026",
  dayLabel:    "Thứ Tư",
  timeLabel:   "10:00 — 12:00",

  // Địa điểm
  venue:       "ĐH Khoa học Xã hội & Nhân văn",
  venueShort:  "USSH — ĐHQG-HCM",
  address:     "10–12 Đinh Tiên Hoàng, P. Bến Nghé, Quận 1, TP.HCM",
  lat:         10.7876,
  lng:         106.7008,
  mapUrl:      "https://maps.google.com/?q=10.7876,106.7008",

  // Liên hệ (MẪU — Đào thay bằng thông tin thật sau)
  phone:       "0900 000 000",
  email:       "daodao@example.com",

  // Thông điệp mặc định (khi 1 khách không có message riêng)
  defaultMessage:
    "Sự hiện diện của bạn sẽ là ánh lấp lánh đẹp nhất trong ngày trọng đại của mình. " +
    "Mình thật lòng mong được gặp và đón bạn tại buổi lễ nhé!",

  presenceLine:
    "Rất mong bạn sắp xếp thời gian đến chung vui — có bạn, ngày của mình mới thật trọn vẹn ✨",
};

// Tính chuỗi datetime đầy đủ cho countdown / lịch (giờ VN +07:00)
export const EVENT_START = new Date(`${EVENT.dateISO}T${EVENT.timeStart}:00+07:00`);
export const EVENT_END   = new Date(`${EVENT.dateISO}T${EVENT.timeEnd}:00+07:00`);
