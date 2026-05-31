// ============================================================================
//  DANH SÁCH KHÁCH MỜI
// ----------------------------------------------------------------------------
//  Mỗi khách = 1 object. Link gửi cho họ:  card.html?id=<id>
//
//  Các trường:
//    id       (bắt buộc) : chuỗi không dấu, không khoảng trắng. Dùng trong URL.
//    name     (bắt buộc) : tên hiển thị "Gửi tới ..."
//    photo    (tuỳ chọn) : đường dẫn ảnh, vd "assets/img/an.jpg".
//                          Bỏ trống / null  -> tự sinh avatar từ chữ cái đầu.
//    message  (tuỳ chọn) : lời nhắn riêng. Bỏ trống -> dùng EVENT.defaultMessage.
//    title    (tuỳ chọn) : danh xưng đứng trước tên, vd "Người anh em", "Cô".
//    zodiac   (tuỳ chọn) : ép cung hoàng đạo (aries|taurus|gemini|cancer|leo|
//                          virgo|libra|scorpio|sagittarius|capricorn|aquarius|
//                          pisces). Bỏ trống -> tự bốc ngẫu nhiên theo id.
//    palette  (tuỳ chọn) : ép bảng màu 0..(n-1). Bỏ trống -> tự chọn theo id.
//
//  => Phần lớn chỉ cần id + name. Mọi yếu tố hình ảnh sẽ tự sinh & ổn định
//     theo id (mỗi người một hành tinh / màu / chòm sao riêng).
// ============================================================================
export const GUESTS = [
  {
    id: "phi-long",
    name: "Lê Phi Long",
    title: "Anh",
    photo: "assets/img/phi-long.png",
    message:
      "Mới đó mà đã gần 3 năm kể từ hôm ăn bún ốc giữa trời mưa tầm tã. " +
      "Với em, anh vừa là người thầy, người anh, cũng là người bạn suốt những năm " +
      "đại học — kể từ ngày em bước vào CLB Lý luận trẻ. Anh đã chỉ dạy và chia sẻ " +
      "cho em rất nhiều, không chỉ về công nghệ mà còn là những châm ngôn sống. " +
      "Những buổi chơi game, những buổi học tiếng Anh, những lời động viên… cứ thế " +
      "khắc ghi trong ký ức của em. Em trân trọng mời anh đến dự lễ tốt nghiệp của em.",
  },
];
