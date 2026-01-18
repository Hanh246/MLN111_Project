// Câu hỏi cho game "Ai Là Triệu Phú Triết Học"
// 15 câu hỏi, độ khó tăng dần

const gameQuestions = [
  // Câu 1-5: Dễ (200 - 3,000)
  {
    id: 1,
    question: "Ai là người sáng lập chủ nghĩa Mác?",
    answers: [
      { id: "A", text: "Vladimir Lenin", correct: false },
      { id: "B", text: "Karl Marx", correct: true },
      { id: "C", text: "Friedrich Engels", correct: false },
      { id: "D", text: "Hồ Chí Minh", correct: false }
    ],
    level: 1,
    prize: "200,000 VNĐ"
  },
  {
    id: 2,
    question: "Tác phẩm nào là của Karl Marx?",
    answers: [
      { id: "A", text: "Tư bản luận", correct: true },
      { id: "B", text: "Nhà nước và cách mạng", correct: false },
      { id: "C", text: "Nhật ký trong tù", correct: false },
      { id: "D", text: "Đường kách mệnh", correct: false }
    ],
    level: 2,
    prize: "400,000 VNĐ"
  },
  {
    id: 3,
    question: "Chủ nghĩa duy vật biện chứng là gì?",
    answers: [
      { id: "A", text: "Học thuyết về vật chất", correct: false },
      { id: "B", text: "Phương pháp nhận thức thế giới", correct: true },
      { id: "C", text: "Lý thuyết kinh tế", correct: false },
      { id: "D", text: "Học thuyết chính trị", correct: false }
    ],
    level: 3,
    prize: "600,000 VNĐ"
  },
  {
    id: 4,
    question: "Lenin sinh năm nào?",
    answers: [
      { id: "A", text: "1818", correct: false },
      { id: "B", text: "1850", correct: false },
      { id: "C", text: "1870", correct: true },
      { id: "D", text: "1890", correct: false }
    ],
    level: 4,
    prize: "1,000,000 VNĐ"
  },
  {
    id: 5,
    question: "Ai được gọi là 'Thầy của cách mạng thế giới'?",
    answers: [
      { id: "A", text: "Engels", correct: false },
      { id: "B", text: "Lenin", correct: true },
      { id: "C", text: "Stalin", correct: false },
      { id: "D", text: "Mao Trạch Đông", correct: false }
    ],
    level: 5,
    prize: "3,000,000 VNĐ"
  },

  // Câu 6-10: Trung bình (6,000 - 60,000)
  {
    id: 6,
    question: "Học thuyết nào khẳng định 'Tồn tại xã hội quyết định ý thức xã hội'?",
    answers: [
      { id: "A", text: "Chủ nghĩa duy tâm", correct: false },
      { id: "B", text: "Chủ nghĩa duy vật lịch sử", correct: true },
      { id: "C", text: "Chủ nghĩa thực dụng", correct: false },
      { id: "D", text: "Chủ nghĩa kinh nghiệm", correct: false }
    ],
    level: 6,
    prize: "6,000,000 VNĐ"
  },
  {
    id: 7,
    question: "Cách mạng tháng Mười Nga thành công năm nào?",
    answers: [
      { id: "A", text: "1905", correct: false },
      { id: "B", text: "1917", correct: true },
      { id: "C", text: "1920", correct: false },
      { id: "D", text: "1945", correct: false }
    ],
    level: 7,
    prize: "10,000,000 VNĐ"
  },
  {
    id: 8,
    question: "Giai cấp công nhân ra đời từ đâu?",
    answers: [
      { id: "A", text: "Nông dân", correct: false },
      { id: "B", text: "Tiểu tư sản", correct: false },
      { id: "C", text: "Cách mạng công nghiệp", correct: true },
      { id: "D", text: "Phong kiến tan rã", correct: false }
    ],
    level: 8,
    prize: "14,000,000 VNĐ"
  },
  {
    id: 9,
    question: "Ai viết 'Tuyên ngôn của Đảng Cộng sản'?",
    answers: [
      { id: "A", text: "Chỉ có Marx", correct: false },
      { id: "B", text: "Marx và Engels", correct: true },
      { id: "C", text: "Chỉ có Lenin", correct: false },
      { id: "D", text: "Lenin và Stalin", correct: false }
    ],
    level: 9,
    prize: "22,000,000 VNĐ"
  },
  {
    id: 10,
    question: "Giá trị thặng dư là gì?",
    answers: [
      { id: "A", text: "Lợi nhuận của nhà tư bản", correct: false },
      { id: "B", text: "Phần giá trị do công nhân tạo ra nhưng bị tư bản chiếm đoạt", correct: true },
      { id: "C", text: "Tiền lương thêm giờ", correct: false },
      { id: "D", text: "Thuế thu nhập", correct: false }
    ],
    level: 10,
    prize: "60,000,000 VNĐ"
  },

  // Câu 11-15: Khó (85,000 - 150,000)
  {
    id: 11,
    question: "Quy luật nào là quy luật cơ bản của chủ nghĩa duy vật biện chứng?",
    answers: [
      { id: "A", text: "Quy luật lượng chất", correct: false },
      { id: "B", text: "Quy luật phủ định của phủ định", correct: false },
      { id: "C", text: "Quy luật thống nhất và đấu tranh của các mặt đối lập", correct: true },
      { id: "D", text: "Quy luật nhân quả", correct: false }
    ],
    level: 11,
    prize: "85,000,000 VNĐ"
  },
  {
    id: 12,
    question: "Hồ Chí Minh đọc 'Sơ thảo lần thứ nhất Luận cương về vấn đề dân tộc và thuộc địa' của Lenin ở đâu?",
    answers: [
      { id: "A", text: "Việt Nam", correct: false },
      { id: "B", text: "Pháp", correct: true },
      { id: "C", text: "Liên Xô", correct: false },
      { id: "D", text: "Trung Quốc", correct: false }
    ],
    level: 12,
    prize: "125,000,000 VNĐ"
  },
  {
    id: 13,
    question: "Động lực của sự phát triển xã hội là gì?",
    answers: [
      { id: "A", text: "Khoa học công nghệ", correct: false },
      { id: "B", text: "Mâu thuẫn giữa lực lượng sản xuất và quan hệ sản xuất", correct: true },
      { id: "C", text: "Ý chí của giai cấp thống trị", correct: false },
      { id: "D", text: "Dân số tăng trưởng", correct: false }
    ],
    level: 13,
    prize: "150,000,000 VNĐ"
  },
  {
    id: 14,
    question: "Chủ nghĩa xã hội khoa học khác chủ nghĩa xã hội không tưởng ở điểm nào?",
    answers: [
      { id: "A", text: "Có cơ sở khoa học, thực tiễn", correct: true },
      { id: "B", text: "Có lý tưởng đẹp đẽ hơn", correct: false },
      { id: "C", text: "Được nhiều người ủng hộ hơn", correct: false },
      { id: "D", text: "Xuất hiện sớm hơn", correct: false }
    ],
    level: 14,
    prize: "250,000,000 VNĐ"
  },
  {
    id: 15,
    question: "Theo Marx, nhà nước sẽ biến mất khi nào?",
    answers: [
      { id: "A", text: "Khi giai cấp thống trị muốn", correct: false },
      { id: "B", text: "Khi không còn giai cấp, xã hội không giai cấp", correct: true },
      { id: "C", text: "Khi kinh tế phát triển cao", correct: false },
      { id: "D", text: "Nhà nước sẽ không bao giờ biến mất", correct: false }
    ],
    level: 15,
    prize: "500,000,000 VNĐ"
  }
];

export default gameQuestions;
