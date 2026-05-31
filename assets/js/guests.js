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
    zodiac: "scorpio", // sinh 20/11/2001 — Bọ Cạp
    message:
      "Mới đó mà đã gần 3 năm kể từ hôm ăn bún ốc giữa trời mưa tầm tã. " +
      "Với em, anh vừa là người thầy, người anh, cũng là người bạn suốt những năm " +
      "đại học — kể từ ngày em bước vào CLB Lý luận trẻ. Anh đã chỉ dạy và chia sẻ " +
      "cho em rất nhiều, không chỉ về công nghệ mà còn là những châm ngôn sống. " +
      "Những buổi chơi game, những buổi học tiếng Anh, những lời động viên… cứ thế " +
      "khắc ghi trong ký ức của em. Em trân trọng mời anh đến dự lễ tốt nghiệp của em.",
  },
  {
    id: "hung",
    name: "Hưng",
    title: "Anh",
    photo: "assets/img/hung.png",
    message:
      "Ngay từ lần đầu gặp mặt, em đã ấn tượng với nguồn năng lượng và vẻ ngoài của anh. " +
      "Em từng nghĩ anh là người khó gần, nhưng thật ra anh lại rất thân thiện. Em ngưỡng mộ " +
      "tài năng và sự cố gắng của anh trong cả học tập lẫn công việc. Có lẽ với anh, em không " +
      "phải là một người bạn quá thân thiết, nhưng với em, anh là một trong những người bạn " +
      "đáng quý của 4 năm đại học. Cảm ơn anh vì đã là một phần trong quãng thời gian ấy. " +
      "Em trân trọng mời anh đến dự lễ tốt nghiệp của em.",
  },
  {
    id: "thuy-trang",
    name: "Lê Thuỳ Trang",
    title: "Bạn",
    photo: "assets/img/thuy-trang.jpeg",
    message:
      "Người con gái xuất hiện nhiều nhất trong 4 năm đại học của mình. Trang học rất giỏi, " +
      "chăm chỉ và luôn cố gắng. Trang hài hước, lúc nào cũng nắm trong tay những 'thông tin " +
      "tình báo' quan trọng, và là cầu nối giúp mình quen biết, kết nối với bao nhiêu người " +
      "trong trường. Cảm ơn Trang vì đã đồng hành cùng mình suốt những năm tháng tại UIT. " +
      "Mình trân trọng mời Trang đến dự lễ tốt nghiệp.",
  },
  {
    id: "mhx2025",
    name: "MHX2025 · Chuyến Xe Công Nghệ",
    title: "Tập thể",
    photo: "assets/img/mhx2025.jpeg",
    message:
      "Mùa Hè Xanh duy nhất mà mình tham gia — và cũng là một mùa hè không thể nào quên. " +
      "Sự hiện diện của các em, các bạn chính là niềm vui lớn của anh trong suốt chiến dịch. " +
      "Cảm ơn cả tập thể MHX2025 – Chuyến Xe Công Nghệ vì những ngày tháng ý nghĩa ấy. " +
      "Rất mong được gặp lại mọi người trong buổi lễ tốt nghiệp của mình.",
  },
];
