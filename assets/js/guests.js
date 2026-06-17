// ============================================================================
//  DANH SÁCH KHÁCH MỜI  —  lễ tốt nghiệp của Đào Đào (theme công chúa)
// ----------------------------------------------------------------------------
//  Link gửi cho từng khách:  card.html?id=<id>
//  Các trường: id, name, title?, photo?, message?, journey?[]  (xem mẫu dưới)
//  => ĐÂY LÀ NỘI DUNG MẪU để demo. Đào thay tên/ảnh/lời nhắn thật sau.
// ============================================================================
export const GUESTS = [
  {
    // thiệp mẫu chính (ảnh = ảnh Đào)
    id: "demo",
    name: "Quỳnh Anh",
    title: "Cậu bạn thân",
    photo: "assets/img/dao-dao.png",
    message:
      "Cảm ơn cậu vì đã cùng tớ đi qua cả một quãng thanh xuân lấp lánh — những deadline trắng đêm, " +
      "những buổi tác nghiệp, những lần cười đến chảy nước mắt. Nay tớ tốt nghiệp ngành Báo chí rồi, " +
      "tớ mời cậu đến chung vui trong ngày trọng đại của tớ nhé, công chúa ơi",
    journey: [
      { type: "intro", kicker: "Một tấm thiệp lấp lánh gửi" },
      { type: "statement", kicker: "Suốt 4 năm", lines: ["Cùng nhau cười.", "Cùng nhau khóc.", "Cùng nhau lớn lên."] },
      { type: "photo", src: "assets/img/dao-dao.png", alt: "Đào Đào", kicker: "Một thanh xuân rực rỡ", text: "…và cậu đã luôn ở trong đó." },
      { type: "memory", kicker: "Cảm ơn cậu", text: "Vì đã luôn ở bên tớ suốt quãng đời sinh viên đáng nhớ này — qua từng bài báo, từng chuyến đi, từng giấc mơ." },
      { type: "memory", kicker: "Và hôm nay", text: "Tớ tốt nghiệp ngành Báo chí rồi! Đến dự ngày trọng đại của tớ nhé, mình cùng nhau toả sáng" },
    ],
  },
  {
    // thiệp dự phòng (khi link thiếu id -> hiện thiệp này)
    id: "preview",
    name: "Khách quý",
    title: "Gửi",
    journey: [
      { type: "intro", kicker: "Trân trọng kính mời" },
      { type: "statement", kicker: "Một lời mời", lines: ["Nhỏ xinh.", "Và lấp lánh."] },
      { type: "memory", kicker: "Hôm nay", text: "Mình tốt nghiệp rồi — rất mong có bạn đến chung vui trong ngày đặc biệt này" },
    ],
  },
];
