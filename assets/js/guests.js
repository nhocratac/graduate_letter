// ============================================================================
//  DANH SÁCH KHÁCH MỜI  —  lễ tốt nghiệp của Lê Vĩnh Hoàng Giang (theme champion)
// ----------------------------------------------------------------------------
//  Link gửi cho từng khách:  card.html?id=<id>
//  Các trường: id, name, title?, photo?, message?, journey?[]
//  Lời nhắn (message) là nguyên văn Giang viết — đừng sửa chữ của Giang.
//  Beat cuối của mỗi journey mang NGUYÊN CÂU MỜI đầy đủ, không cắt dở.
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
      { type: "milestone", big: "6", text: "Thắng · Tâm · Kiệt · Khải · Hải · Dũng" },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Nay mới có dịp", text: "Thân mời 6 anh em chí cốt Thắng, Tâm, Kiệt, Khải, Hải, Dũng đến dự lễ tốt nghiệp của tớ nhé." },
    ],
  },
  {
    id: "tay-thanh-futsal",
    name: "Tây Thạnh Futsal",
    title: "Gửi",
    photo: "assets/img/tay-thanh-futsal.jpg",
    message:
      "Coach tụi em đã \"ghi bàn\" quyết định khép lại \"trận bóng\" đời sinh viên rồi những " +
      "người em trai ruột của anh. Thân mời những người em anh quý nhất, hãy đến để ăn mừng và " +
      "nâng cao chức vô địch cùng anh nhé những người em ruột.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Coach của tụi em", lines: ["Đã ghi bàn quyết định.", "Khép lại trận bóng đời sinh viên."] },
      { type: "photo", src: "assets/img/tay-thanh-futsal.jpg", alt: "Đội Tây Thạnh Futsal", kicker: "Tây Thạnh Futsal", text: "Những người em trai ruột của anh." },
      { type: "photo", src: "assets/img/giang-champion.jpg", alt: "Giang cùng chiếc cúp vô địch", kicker: "Và hôm nay", text: "Thân mời những người em anh quý nhất, hãy đến để ăn mừng và nâng cao chức vô địch cùng anh nhé những người em ruột." },
    ],
  },
  {
    id: "dong",
    name: "Đông",
    photo: "assets/img/dong.jpg",
    message:
      "Mới ngày nào tụi mình còn lăn tăn cúp tiết đi đá banh, thế mà giờ đây sắp phải trưởng " +
      "thành rồi. Thân mời Đông hãy đến dự lễ tốt nghiệp của tớ lần này nhé, vì có thể sẽ không " +
      "có thêm lần tốt nghiệp nào nữa đâu kekekeke.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Mới ngày nào", lines: ["Còn lăn tăn cúp tiết.", "Đi đá banh."] },
      { type: "memory", kicker: "Thế mà giờ đây", text: "Sắp phải trưởng thành rồi." },
      { type: "photo", src: "assets/img/dong.jpg", alt: "Đông", kicker: "Và hôm nay", text: "Thân mời Đông hãy đến dự lễ tốt nghiệp của tớ lần này nhé, vì có thể sẽ không có thêm lần tốt nghiệp nào nữa đâu kekekeke." },
    ],
  },
  {
    id: "bao-quynh",
    name: "Bảo Quỳnh",
    photo: "assets/img/bao-quynh.jpg",
    message:
      "Mới ngày nào đưa nhờ hộp Coconino rồi unfollow nhau, thế mà nay đã trưởng thành rồi. " +
      "Thân mời Bảo Quỳnh hãy đến dự lễ tốt nghiệp của tớ vì tớ chỉ có cơ hội mời Bảo Quỳnh " +
      "duy nhất lần này thôi và tớ hứa sẽ không unfollow Bảo Quỳnh thêm lần nào nữa.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Mới ngày nào", text: "Đưa nhờ hộp Coconino rồi unfollow nhau." },
      { type: "statement", kicker: "Thế mà nay", lines: ["Đã trưởng thành rồi."] },
      { type: "photo", src: "assets/img/bao-quynh.jpg", alt: "Bảo Quỳnh", kicker: "Và hôm nay", text: "Thân mời Bảo Quỳnh hãy đến dự lễ tốt nghiệp của tớ vì tớ chỉ có cơ hội mời Bảo Quỳnh duy nhất lần này thôi và tớ hứa sẽ không unfollow Bảo Quỳnh thêm lần nào nữa." },
    ],
  },
  {
    id: "anh-khoa",
    name: "Anh Khoa",
    photo: "assets/img/anh-khoa.jpg",
    message:
      "Khoa à tớ biết cậu đã nghĩ về những buổi học ké của cậu với tớ và nghe hết những câu " +
      "chuyện tâm sự của tớ trong những thời khắc tuyệt vọng nhất. Nay tớ tốt nghiệp rồi hẹ hẹ, " +
      "cậu đến dự chung vui với tớ nhé - Khoa đù.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Những buổi học ké", text: "Cậu đã nghe hết những câu chuyện tâm sự của tớ trong những thời khắc tuyệt vọng nhất." },
      { type: "photo", src: "assets/img/anh-khoa.jpg", alt: "Anh Khoa", kicker: "Và hôm nay", text: "Nay tớ tốt nghiệp rồi hẹ hẹ, cậu đến dự chung vui với tớ nhé - Khoa đù." },
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
      { type: "milestone", big: "5", text: "Thông · Tuấn · Vũ · Lìu · Diệp" },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Và hôm nay", text: "Thân mời 5 người em trai Thông, Tuấn, Vũ, Lìu, Diệp góp mặt tại lễ tốt nghiệp của anh và mang Tây Thạnh đến nhuộm màu và quẩy banh Đại học Văn Lang nhé những người em thân thiết của anh." },
    ],
  },
  {
    id: "thuy-trang",
    name: "Thùy Trang",
    // TODO(Giang): ảnh Thùy Trang chưa gửi được (file nhận về là icon PNG, không phải ảnh).
    // Repo có sẵn assets/img/thuy-trang.jpeg nhưng đó là khách của bản Thắng — chưa chắc
    // cùng người nên KHÔNG dùng. Gửi lại ảnh thì thêm photo + beat ảnh vào đây.
    message:
      "Chào Trang, người bạn mà tớ hay gọi với tên thân thuộc là Trung (khàng). Tớ là Dung " +
      "(không khàng), hay có thể gọi là anh Giang. Sắp tới ngày tốt nghiệp của tụi mình rồi, tớ " +
      "háo hức quá, nhưng cũng buồn không kém vì sắp hết được học chung rồi. Thế nên ngày 8/8 " +
      "này, thân mời Trang dự lễ tốt nghiệp nhé, vì đây có thể là lần cuối Trang được thấy anh " +
      "Giang trong bộ dạng trẻ trâu vì sau ngày hôm đó chắc chắn anh Giang sẽ TRƯỞNG THÀNH.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "statement", kicker: "Tên thân thuộc", lines: ["Trung (khàng).", "Và Dung (không khàng)."] },
      { type: "memory", kicker: "Tớ háo hức quá", text: "Nhưng cũng buồn không kém vì sắp hết được học chung rồi." },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Thế nên ngày 8/8 này", text: "Thân mời Trang dự lễ tốt nghiệp nhé, vì đây có thể là lần cuối Trang được thấy anh Giang trong bộ dạng trẻ trâu vì sau ngày hôm đó chắc chắn anh Giang sẽ TRƯỞNG THÀNH." },
    ],
  },
  {
    id: "thu-thao",
    name: "Thu Thảo",
    message:
      "Dear Thảo, lại là anh Long đây. Đến giờ anh vẫn không tin dù các em chung ngành anh vậy " +
      "mà mãi tới cuối năm 3 mới biết mặt mũi nhau. Hồi đó anh Long hay gánh còng lưng tụi em, " +
      "thế mà giờ đây anh sắp phải bước lên \"sân khấu cuộc đời\", mang trọng trách gánh giang " +
      "sơn trên vai rồi. Thân mời bạn Thu Thảo góp mặt trong buổi lễ tốt nghiệp để cùng diện " +
      "kiến \"anh Long\" khoác lên mình tấm \"long bào\" rực rỡ. Nhân dịp này cũng xin chúc mừng " +
      "Thu Thảo chính thức tốt nghiệp, chúc em gánh vác cuộc đời nhẹ hơn cái thời gánh bài cùng " +
      "anh Long nhé.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Chung ngành mà", text: "Mãi tới cuối năm 3 mới biết mặt mũi nhau — đến giờ anh vẫn không tin." },
      { type: "statement", kicker: "Hồi đó", lines: ["Anh Long hay gánh còng lưng tụi em."] },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Thế mà giờ đây", text: "Thân mời bạn Thu Thảo góp mặt trong buổi lễ tốt nghiệp để cùng diện kiến \"anh Long\" khoác lên mình tấm \"long bào\" rực rỡ." },
      { type: "memory", kicker: "Và chúc mừng em", text: "Chúc Thu Thảo gánh vác cuộc đời nhẹ hơn cái thời gánh bài cùng anh Long nhé." },
    ],
  },
  {
    id: "minh-thi",
    name: "Minh Thi",
    message:
      "Dear Thi, chắc là chưa quên anh Long đâu nhỉ. Mấy nay thấy em post hình rần rần là biết " +
      "chuẩn bị tốt nghiệp rồi. Không biết em lẩn tránh kiểu gì mà tới cuối năm 3 mới thấy mặt " +
      "mũi. Hồi đó hễ có bài khó là: \"Anh Long! Anh Long!\" giờ đây sắp hết có cơ hội gánh các " +
      "em rồi. Thân mời bạn Minh Thi góp mặt trong buổi lễ tốt nghiệp để cùng diện kiến \"anh " +
      "Long\" khoác lên mình tấm \"long bào\" rực rỡ. Từ nay gặp bài khó thì đừng gọi \"Anh Long! " +
      "Anh Long!\" nữa nhé, vì anh Long bận gánh giang sơn rồi, không gánh bài tập được nữa đâu.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Mấy nay thấy em post hình rần rần", text: "Là biết chuẩn bị tốt nghiệp rồi." },
      { type: "statement", kicker: "Hồi đó hễ có bài khó là", lines: ["\"Anh Long! Anh Long!\""] },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Giờ đây", text: "Thân mời bạn Minh Thi góp mặt trong buổi lễ tốt nghiệp để cùng diện kiến \"anh Long\" khoác lên mình tấm \"long bào\" rực rỡ." },
      { type: "memory", kicker: "Từ nay", text: "Gặp bài khó thì đừng gọi \"Anh Long! Anh Long!\" nữa nhé, vì anh Long bận gánh giang sơn rồi, không gánh bài tập được nữa đâu." },
    ],
  },
  {
    id: "quan-thai",
    name: "Quân Thái",
    message:
      "Hi Quân Thái, tui phải confirm không phải do tui quên ông đâu mà là do tui sơ suất nhỏ tí " +
      "thui. Hehe hồi xưa từng ngồi cùng bàn, ông gánh vác tui qua bao thăng trầm điểm số, kéo " +
      "tui từ hạng U40 lên tiệm cận U30, tui còn nhớ rõ. Nay có dịp mời ông đến dự lễ tốt nghiệp, " +
      "mong ông đến và chia vui cùng tui trong ngày tui trưởng thành nhé người bạn cùng bàn.",
    journey: [
      { type: "intro", kicker: "Một lời mời dành riêng cho" },
      { type: "memory", kicker: "Tui phải confirm", text: "Không phải do tui quên ông đâu, mà là do tui sơ suất nhỏ tí thui. Hehe." },
      { type: "milestone", big: "Từ hạng U40 → Hạng U30", text: "Ông gánh vác tui qua bao thăng trầm điểm số, tui còn nhớ rõ." },
      { type: "photo", src: "assets/img/giang-gown.jpg", alt: "Giang trong lễ phục tốt nghiệp", kicker: "Nay có dịp", text: "Mời ông đến dự lễ tốt nghiệp, mong ông đến và chia vui cùng tui trong ngày tui trưởng thành nhé người bạn cùng bàn." },
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
