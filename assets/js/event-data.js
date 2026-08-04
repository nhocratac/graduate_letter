// ============================================================================
//  CẤU HÌNH SỰ KIỆN  —  chỉnh ở đây là đổi cho TẤT CẢ thiệp
//  (branch main = lễ tốt nghiệp của Lê Vĩnh Hoàng Giang · theme "champion")
//  Các event trước được đóng băng ở branch: `daodao`, `vietthang`
// ============================================================================
export const EVENT = {
  theme:       "champion",          // "champion" -> style sân cỏ / cúp vàng

  host:        "Lê Vĩnh Hoàng Giang",
  occasion:    "Lễ Tốt Nghiệp",
  className:   "Quan hệ Công chúng – Truyền thông",
  classOf:     "CLASS OF 2026",

  // Thời gian (countdown + thêm vào lịch). Múi giờ VN (+07:00)
  dateISO:     "2026-08-08",
  timeStart:   "16:00",
  timeEnd:     "18:00",
  dateLabel:   "8 tháng 8, 2026",
  dayLabel:    "Thứ Bảy",
  timeLabel:   "16:00 — 18:00",

  // Địa điểm
  venue:       "ĐH Văn Lang — Cơ sở Đặng Thùy Trâm",
  venueShort:  "VLU — ĐH Văn Lang",
  // Giang đã xác nhận số nhà 69/68.
  address:     "69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, TP.HCM",
  // Dùng link tìm kiếm theo tên thay vì toạ độ tự bịa — Maps tự tìm đúng cơ sở.
  mapUrl:      "https://www.google.com/maps/search/?api=1&query=" +
               encodeURIComponent("Đại học Văn Lang cơ sở Đặng Thùy Trâm"),

  // Liên hệ
  phone:       "0327154165",
  email:       "",                  // Giang không dùng email -> ô email tự ẩn trên thiệp

  // Thông điệp mặc định (khi 1 khách không có message riêng)
  defaultMessage:
    "Bốn năm vừa rồi với mình giống một mùa giải dài — có những bàn thắng, có cả những " +
    "lần vấp. Nay mình đã tới vạch đích, và mình muốn có bạn ở đó khi mình nhận tấm bằng.",

  presenceLine:
    "Rất mong bạn sắp xếp thời gian đến chung vui — có bạn trên khán đài, ngày này mới thật trọn vẹn",
};

// Tính chuỗi datetime đầy đủ cho countdown / lịch (giờ VN +07:00)
export const EVENT_START = new Date(`${EVENT.dateISO}T${EVENT.timeStart}:00+07:00`);
export const EVENT_END   = new Date(`${EVENT.dateISO}T${EVENT.timeEnd}:00+07:00`);
