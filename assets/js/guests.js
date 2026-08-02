// ============================================================================
//  DANH SÁCH KHÁCH MỜI  —  lễ tốt nghiệp của Lê Vĩnh Hoàng Giang (theme champion)
// ----------------------------------------------------------------------------
//  Link gửi cho từng khách:  card.html?id=<id>
//  Các trường: id, name, title?, photo?, message?, journey?[]
//  Lời nhắn (message) là nguyên văn Giang viết — đừng sửa chữ của Giang.
// ============================================================================
export const GUESTS = [
  {
    id: "lang-xi-trum",
    name: "Làng Xì Trum",
    title: "Hội anh em",
    message:
      "Từ những cư dân bộ tộc Xì Trum xa xứ bằng một cách thần kỳ nào đó tớ lại được chung " +
      "làng với các cậu dù các cậu chửi tớ rất nhiều. Chơi, quậy, ăn, nằm với nhau cũng đã lâu, " +
      "nay mới có dịp mời các cậu đến dự lễ tốt nghiệp. Thân mời 6 anh em chí cốt Thắng, Tâm, " +
      "Kiệt, Khải, Hải, Dũng đến dự lễ tốt nghiệp của tớ nhé.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Bộ tộc Xì Trum", lines: ["Chơi.", "Quậy.", "Ăn, nằm với nhau."] },
      { type: "memory", kicker: "Dù các cậu chửi tớ rất nhiều", text: "Bằng một cách thần kỳ nào đó, tớ lại được chung làng với các cậu." },
      { type: "milestone", big: "6", text: "Thắng · Tâm · Kiệt · Khải · Hải · Dũng — sáu anh em chí cốt." },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Nay mới có dịp", text: "Mời các cậu đến dự lễ tốt nghiệp của tớ nhé." },
    ],
  },
  {
    id: "tay-thanh-futsal",
    name: "Tây Thạnh Futsal",
    title: "Gửi",
    message:
      "Coach tụi em đã \"ghi bàn\" quyết định khép lại \"trận bóng\" đời sinh viên rồi những " +
      "người em trai ruột của anh. Thân mời những người em anh quý nhất, hãy đến để ăn mừng và " +
      "nâng cao chức vô địch cùng anh nhé những người em ruột.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Coach của tụi em", lines: ["Đã ghi bàn quyết định.", "Khép lại trận bóng đời sinh viên."] },
      { type: "photo", src: "assets/img/giang-champion.jpg", alt: "Giang cùng chiếc cúp vô địch", kicker: "Chức vô địch", text: "Hãy đến để ăn mừng và nâng cao cùng anh nhé." },
      { type: "memory", kicker: "Những người em anh quý nhất", text: "Những người em trai ruột của anh." },
    ],
  },
  {
    id: "dong",
    name: "Đông",
    message:
      "Mới ngày nào tụi mình còn lăn tăn cúp tiết đi đá banh, thế mà giờ đây sắp phải trưởng " +
      "thành rồi. Thân mời Đông hãy đến dự lễ tốt nghiệp của tớ lần này nhé, vì có thể sẽ không " +
      "có thêm lần tốt nghiệp nào nữa đâu kekekeke.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Mới ngày nào", lines: ["Còn lăn tăn cúp tiết.", "Đi đá banh."] },
      { type: "memory", kicker: "Thế mà giờ đây", text: "Sắp phải trưởng thành rồi." },
      { type: "memory", kicker: "Đến lần này nhé", text: "Vì có thể sẽ không có thêm lần tốt nghiệp nào nữa đâu kekekeke." },
    ],
  },
  {
    id: "bao-quynh",
    name: "Bảo Quỳnh",
    message:
      "Mới ngày nào đưa nhờ hộp Coconino rồi unfollow nhau, thế mà nay đã trưởng thành rồi. " +
      "Thân mời Bảo Quỳnh hãy đến dự lễ tốt nghiệp của tớ vì tớ chỉ có cơ hội mời Bảo Quỳnh " +
      "duy nhất lần này thôi và tớ hứa sẽ không unfollow Bảo Quỳnh thêm lần nào nữa.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Mới ngày nào", text: "Đưa nhờ hộp Coconino rồi unfollow nhau." },
      { type: "statement", kicker: "Thế mà nay", lines: ["Đã trưởng thành rồi."] },
      { type: "memory", kicker: "Và tớ hứa", text: "Sẽ không unfollow Bảo Quỳnh thêm lần nào nữa." },
    ],
  },
  {
    id: "anh-khoa",
    name: "Anh Khoa",
    message:
      "Khoa à tớ biết cậu đã nghĩ về những buổi học ké của cậu với tớ và nghe hết những câu " +
      "chuyện tâm sự của tớ trong những thời khắc tuyệt vọng nhất. Nay tớ tốt nghiệp rồi hẹ hẹ, " +
      "cậu đến dự chung vui với tớ nhé - Khoa đù.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Những buổi học ké", text: "Cậu đã nghe hết những câu chuyện tâm sự của tớ trong những thời khắc tuyệt vọng nhất." },
      { type: "statement", kicker: "Nay tớ tốt nghiệp rồi hẹ hẹ", lines: ["Cậu đến dự chung vui với tớ nhé."] },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Hẹn gặp cậu", text: "— Khoa đù." },
    ],
  },
  {
    id: "dan-em-2k7",
    name: "Đàn em ruột 2k7",
    title: "Gửi",
    message:
      "Chào những người em ruột của anh, anh muốn nói các em rằng anh đã tốt nghiệp rồi. Thân " +
      "mời 5 người em trai Thông, Tuấn, Vũ, Lìu, Diệp góp mặt tại lễ tốt nghiệp của anh và mang " +
      "Tây Thạnh đến nhuộm màu và quẩy banh Đại học Văn Lang nhé những người em thân thiết của anh.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Chào những người em ruột", lines: ["Anh đã tốt nghiệp rồi."] },
      { type: "milestone", big: "5", text: "Thông · Tuấn · Vũ · Lìu · Diệp — góp mặt tại lễ tốt nghiệp của anh." },
      { type: "memory", kicker: "Và mang Tây Thạnh đến", text: "Nhuộm màu và quẩy banh Đại học Văn Lang nhé những người em thân thiết của anh." },
    ],
  },
  {
    // thiệp dự phòng (khi link thiếu id hoặc gõ sai -> hiện thiệp này)
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
