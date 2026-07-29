// ============================================================================
//  DANH SÁCH KHÁCH MỜI  —  lễ tốt nghiệp của Lê Vĩnh Hoàng Giang (theme champion)
// ----------------------------------------------------------------------------
//  Link gửi cho từng khách:  card.html?id=<id>
//  Các trường: id, name, title?, photo?, message?, journey?[]  (xem mẫu dưới)
//  => ĐÂY LÀ NỘI DUNG MẪU để Giang xem trước. Giang tự thêm khách thật vào mảng này.
// ============================================================================
export const GUESTS = [
  {
    // thiệp mẫu chính — journey dùng ảnh của Giang
    id: "demo",
    name: "Minh Khang",
    title: "Người bạn thân",
    photo: "assets/img/giang-portrait.jpg",
    message:
      "Cảm ơn cậu vì đã ở đây suốt bốn năm — những đêm chạy deadline, những buổi tập bóng, " +
      "những lần thắng cùng nhau và cả những lần thua cùng nhau. Nay tớ tốt nghiệp ngành " +
      "Quan hệ Công chúng – Truyền thông rồi, tớ mời cậu đến chung vui trong ngày trọng đại này nhé",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Bốn năm", lines: ["Một mùa giải dài.", "Và tụi mình đã đi hết."] },
      { type: "milestone", big: "No. 10", text: "Số áo, và cũng là cách tớ chọn để chơi trận đời mình." },
      { type: "photo", src: "assets/img/giang-champion.jpg", alt: "Giang cùng chiếc cúp vô địch", kicker: "Đội vô địch", text: "Hội thao sinh viên Văn Lang — chiếc cúp tụi mình mang về." },
      { type: "memory", kicker: "Cảm ơn cậu", text: "Vì đã có mặt ở cả những trận thắng và những lần tớ vấp. Bạn tốt là người ở lại sau tiếng còi kết thúc." },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Và hôm nay", text: "Tớ tốt nghiệp rồi. Đến dự ngày trọng đại của tớ nhé" },
    ],
  },
  {
    // thiệp dự phòng (khi link thiếu id -> hiện thiệp này)
    id: "preview",
    name: "Khách quý",
    title: "Gửi",
    journey: [
      { type: "intro", kicker: "Trân trọng kính mời" },
      { type: "statement", kicker: "Một lời mời", lines: ["Ngắn gọn.", "Và thật lòng."] },
      { type: "memory", kicker: "Hôm nay", text: "Mình tốt nghiệp rồi — rất mong có bạn đến chung vui trong ngày đặc biệt này" },
    ],
  },
];
