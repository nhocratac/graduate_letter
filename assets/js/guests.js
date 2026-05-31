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
    id: "minh-an",
    name: "Minh An",
    title: "Người bạn thân",
    photo: null,
    message: "An ơi, chặng đường vừa qua có cậu đồng hành thật may mắn. " +
             "Ngày tớ tốt nghiệp nhất định phải có cậu nhé!",
  },
  {
    id: "thuy-linh",
    name: "Thuỳ Linh",
    photo: null,
  },
  {
    id: "gia-bao",
    name: "Gia Bảo",
    title: "Anh",
    photo: null,
    zodiac: "leo",
  },
  {
    id: "ngoc-han",
    name: "Ngọc Hân",
    photo: null,
    palette: 4,
  },
  {
    id: "quang-huy",
    name: "Quang Huy",
    photo: null,
    message: "Cảm ơn ông vì những đêm code cùng nhau. Hẹn gặp ở lễ tốt nghiệp!",
  },
];
