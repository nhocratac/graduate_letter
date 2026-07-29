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
  timeStart:   "13:00",
  timeEnd:     "17:00",
  dateLabel:   "8 tháng 8, 2026",
  dayLabel:    "Thứ Bảy",
  timeLabel:   "13:00 — 17:00",

  // Địa điểm
  venue:       "Đại học Văn Lang",
  venueShort:  "VLU — ĐH Văn Lang",
  // TODO(Giang): địa chỉ + cơ sở chính xác nơi làm lễ. Để "Đang cập nhật" thay vì
  // đoán, vì khách sẽ dựa vào dòng này mà tìm đường.
  address:     "Đang cập nhật",
  // TODO(Giang): link Google Maps của đúng cơ sở. Để rỗng -> nút "Xem bản đồ"
  // tự ẩn, tránh dẫn khách đi sai chỗ.
  mapUrl:      "",

  // Liên hệ
  phone:       "0123456678",        // TODO(Giang): thay bằng số thật trước khi gửi khách
  email:       "",                  // TODO(Giang): email liên hệ. Rỗng -> dòng email tự ẩn

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
