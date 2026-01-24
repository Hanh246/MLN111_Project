const mindMapData = [
  {
    month: 1,
    topic: "Khái lược về triết học và vai trò trong xã hội",
    data: {
      id: "root",
      label: "Khái lược về Triết học",
      children: [
        {
          id: "1_1",
          label: "Triết học là gì?",
          children: [
            { id: "1_1_1", label: "Hệ thống quan điểm lý luận chung nhất về thế giới" },
            { id: "1_1_2", label: "Khoa học về quy luật phổ biến của tự nhiên, xã hội, tư duy" }
          ]
        },
        {
          id: "1_2",
          label: "Vấn đề cơ bản của triết học",
          children: [
            { id: "1_2_1", label: "Mối quan hệ giữa Vật chất và Ý thức" },
            { id: "1_2_2", label: "Mặt thứ nhất: Cái nào có trước, cái nào quyết định?" },
            { id: "1_2_3", label: "Mặt thứ hai: Con người có nhận thức được thế giới không?" }
          ]
        },
        {
          id: "1_3",
          label: "Biện chứng và Siêu hình",
          children: [
            { id: "1_3_1", label: "Biện chứng: Xem xét trong mối liên hệ, vận động" },
            { id: "1_3_2", label: "Siêu hình: Xem xét cô lập, tĩnh tại" }
          ]
        },
        {
          id: "1_4",
          label: "Vai trò của triết học Mác-Lênin",
          children: [
            { id: "1_4_1", label: "Thế giới quan khoa học" },
            { id: "1_4_2", label: "Phương pháp luận cách mạng" }
          ]
        }
      ]
    }
  },
  {
    month: 2,
    topic: "Vật chất - Vận động - Không gian - Thời gian",
    data: {
      id: "root",
      label: "Vật chất và Phương thức tồn tại",
      children: [
        {
          id: "2_1",
          label: "Vật chất",
          children: [
            { id: "2_1_1", label: "Thực tại khách quan" },
            { id: "2_1_2", label: "Tồn tại độc lập với ý thức" },
            { id: "2_1_3", label: "Được ý thức phản ánh" }
          ]
        },
        {
          id: "2_2",
          label: "Vận động",
          children: [
            { id: "2_2_1", label: "Phương thức tồn tại của vật chất" },
            { id: "2_2_2", label: "Tuyệt đối, vĩnh viễn" },
            { id: "2_2_3", label: "5 hình thức vận động cơ bản (Cơ->Xã hội)" }
          ]
        },
        {
          id: "2_3",
          label: "Đứng im",
          children: [
            { id: "2_3_1", label: "Tương đối, tạm thời" },
            { id: "2_3_2", label: "Chỉ xảy ra trong một hệ quy chiếu nhất định" }
          ]
        },
        {
          id: "2_4",
          label: "Không gian và Thời gian",
          children: [
            { id: "2_4_1", label: "Hình thức tồn tại của vật chất" },
            { id: "2_4_2", label: "Tính khách quan, vô tận, vĩnh cửu" }
          ]
        }
      ]
    }
  },
  {
    month: 3,
    topic: "Nguồn gốc và Bản chất của Ý thức",
    data: {
      id: "root",
      label: "Ý thức",
      children: [
        {
          id: "3_1",
          label: "Nguồn gốc tự nhiên",
          children: [
            { id: "3_1_1", label: "Bộ óc người (cơ quan vật chất)" },
            { id: "3_1_2", label: "Sự phản ánh thế giới khách quan" }
          ]
        },
        {
          id: "3_2",
          label: "Nguồn gốc xã hội",
          children: [
            { id: "3_2_1", label: "Lao động (yếu tố quyết định)" },
            { id: "3_2_2", label: "Ngôn ngữ (vỏ vật chất của tư duy)" }
          ]
        },
        {
          id: "3_3",
          label: "Bản chất",
          children: [
            { id: "3_3_1", label: "Hình ảnh chủ quan của thế giới khách quan" },
            { id: "3_3_2", label: "Phản ánh tích cực, tự giác, sáng tạo" },
            { id: "3_3_3", label: "Mang bản chất xã hội" }
          ]
        },
        {
          id: "3_4",
          label: "Kết cấu",
          children: [
            { id: "3_4_1", label: "Tri thức (quan trọng nhất)" },
            { id: "3_4_2", label: "Tình cảm" },
            { id: "3_4_3", label: "Ý chí" }
          ]
        }
      ]
    }
  },
  {
    month: 4,
    topic: "Hai nguyên lý cơ bản của phép biện chứng",
    data: {
      id: "root",
      label: "Hai Nguyên lý Cơ bản",
      children: [
        {
          id: "4_1",
          label: "Nguyên lý Mối liên hệ phổ biến",
          children: [
            { id: "4_1_1", label: "Mọi sự vật đều liên hệ, tác động qua lại" },
            { id: "4_1_2", label: "Tính khách quan, phổ biến, đa dạng" },
            { id: "4_1_3", label: "PPL: Quan điểm toàn diện, lịch sử - cụ thể" }
          ]
        },
        {
          id: "4_2",
          label: "Nguyên lý về Sự phát triển",
          children: [
            { id: "4_2_1", label: "Khuynh hướng đi lên (thấp -> cao)" },
            { id: "4_2_2", label: "Tính kế thừa, quanh co, phức tạp" },
            { id: "4_2_3", label: "PPL: Quan điểm phát triển" }
          ]
        },
        {
          id: "4_3",
          label: "Cái chung và Cái riêng",
          children: [
             { id: "4_3_1", label: "Cái chung chỉ tồn tại trong Cái riêng" },
             { id: "4_3_2", label: "Cái riêng phong phú hơn Cái chung" }
          ]
        }
      ]
    }
  },
  {
    month: 5,
    topic: "Các cặp phạm trù cơ bản",
    data: {
      id: "root",
      label: "Các Cặp Phạm trù",
      children: [
        {
          id: "5_1",
          label: "Nguyên nhân - Kết quả",
          children: [
            { id: "5_1_1", label: "Nguyên nhân sinh ra kết quả" },
            { id: "5_1_2", label: "Có thể chuyển hóa lẫn nhau" }
          ]
        },
        {
          id: "5_2",
          label: "Nội dung - Hình thức",
          children: [
            { id: "5_2_1", label: "Nội dung quyết định hình thức" },
            { id: "5_2_2", label: "Hình thức tác động trở lại nội dung" }
          ]
        },
        {
          id: "5_3",
          label: "Bản chất - Hiện tượng",
          children: [
            { id: "5_3_1", label: "Bản chất là cái bên trong, ổn định" },
            { id: "5_3_2", label: "Hiện tượng là biểu hiện bên ngoài" }
          ]
        },
        {
          id: "5_4",
          label: "Tất nhiên - Ngẫu nhiên",
          children: [
             { id: "5_4_1", label: "Tất nhiên vạch đường đi qua vô số ngẫu nhiên" }
          ]
        },
        {
          id: "5_5",
          label: "Khả năng - Hiện thực",
          children: [
             { id: "5_5_1", label: "Khả năng biến thành hiện thực trong điều kiện nhất định" }
          ]
        }
      ]
    }
  },
  {
    month: 6,
    topic: "Quy luật Lượng - Chất",
    data: {
      id: "root",
      label: "Quy luật Lượng - Chất",
      children: [
        {
          id: "6_1",
          label: "Khái niệm",
          children: [
            { id: "6_1_1", label: "Chất: Tính quy định khách quan vốn có" },
            { id: "6_1_2", label: "Lượng: Con số, quy mô, trình độ" }
          ]
        },
        {
          id: "6_2",
          label: "Cơ chế hoạt động",
          children: [
            { id: "6_2_1", label: "Lượng đổi dẫn đến Chất đổi" },
            { id: "6_2_2", label: "Độ: Giới hạn lượng chưa làm thay đổi chất" },
            { id: "6_2_3", label: "Điểm nút: Thời điểm chuyển hóa chất" },
            { id: "6_2_4", label: "Bước nhảy: Quá trình thay đổi chất" }
          ]
        },
        {
          id: "6_3",
          label: "Ý nghĩa phương pháp luận",
          children: [
            { id: "6_3_1", label: "Kiên trì tích lũy về lượng" },
            { id: "6_3_2", label: "Tránh nôn nóng (tả khuynh) hoặc bảo thủ (hữu khuynh)" }
          ]
        }
      ]
    }
  },
  {
    month: 7,
    topic: "Quy luật Mâu thuẫn",
    data: {
      id: "root",
      label: "Quy luật Mâu thuẫn",
      children: [
        {
          id: "7_1",
          label: "Khái niệm",
          children: [
            { id: "7_1_1", label: "Mặt đối lập: Khuynh hướng trái ngược nhau" },
            { id: "7_1_2", label: "Mâu thuẫn: Sự liên hệ, tác động của mặt đối lập" }
          ]
        },
        {
          id: "7_2",
          label: "Quá trình vận động",
          children: [
            { id: "7_2_1", label: "Thống nhất: Nương tựa, làm tiền đề cho nhau" },
            { id: "7_2_2", label: "Đấu tranh: Bài trừ, gạt bỏ nhau" },
            { id: "7_2_3", label: "Chuyển hóa: Giải quyết mâu thuẫn -> Cái mới ra đời" }
          ]
        },
        {
          id: "7_3",
          label: "Vai trò",
          children: [
            { id: "7_3_1", label: "Nguồn gốc, động lực của sự phát triển" }
          ]
        },
        {
          id: "7_4",
          label: "Ý nghĩa",
          children: [
             { id: "7_4_1", label: "Tôn trọng và phát hiện mâu thuẫn" },
             { id: "7_4_2", label: "Giải quyết mâu thuẫn bằng đấu tranh" }
          ]
        }
      ]
    }
  },
  {
    month: 8,
    topic: "Quy luật Phủ định của Phủ định",
    data: {
      id: "root",
      label: "Phủ định của Phủ định",
      children: [
        {
          id: "8_1",
          label: "Phủ định biện chứng",
          children: [
            { id: "8_1_1", label: "Tự thân phủ định" },
            { id: "8_1_2", label: "Tính kế thừa (giữ lại yếu tố tích cực)" }
          ]
        },
        {
          id: "8_2",
          label: "Hình thức phát triển",
          children: [
            { id: "8_2_1", label: "Đường xoắn ốc" },
            { id: "8_2_2", label: "Lặp lại cái cũ trên cơ sở cao hơn" }
          ]
        },
        {
          id: "8_3",
          label: "Ý nghĩa",
          children: [
            { id: "8_3_1", label: "Tin tưởng vào tương lai (cái mới tất thắng)" },
            { id: "8_3_2", label: "Biết kế thừa có chọn lọc" }
          ]
        }
      ]
    }
  },
  {
    month: 9,
    topic: "Lý luận nhận thức",
    data: {
      id: "root",
      label: "Lý luận Nhận thức",
      children: [
        {
          id: "9_1",
          label: "Thực tiễn",
          children: [
            { id: "9_1_1", label: "Hoạt động vật chất, lịch sử - xã hội" },
            { id: "9_1_2", label: "Cơ sở, động lực, mục đích của nhận thức" },
            { id: "9_1_3", label: "Tiêu chuẩn kiểm tra chân lý" }
          ]
        },
        {
          id: "9_2",
          label: "Con đường nhận thức",
          children: [
            { id: "9_2_1", label: "Nhận thức cảm tính (Cảm giác, Tri giác, Biểu tượng)" },
            { id: "9_2_2", label: "Nhận thức lý tính (Khái niệm, Phán đoán, Suy luận)" },
            { id: "9_2_3", label: "Từ trực quan sinh động -> Tư duy trừu tượng -> Thực tiễn" }
          ]
        },
        {
          id: "9_3",
          label: "Chân lý",
          children: [
            { id: "9_3_1", label: "Khách quan, Cụ thể, Tương đối/Tuyệt đối" }
          ]
        }
      ]
    }
  },
  {
    month: 10,
    topic: "Hình thái kinh tế - xã hội",
    data: {
      id: "root",
      label: "Hình thái Kinh tế - Xã hội",
      children: [
        {
          id: "10_1",
          label: "Sản xuất vật chất",
          children: [
            { id: "10_1_1", label: "Nền tảng của sự vận động xã hội" }
          ]
        },
        {
          id: "10_2",
          label: "Biện chứng LLSX và QHSX",
          children: [
            { id: "10_2_1", label: "LLSX quyết định QHSX" },
            { id: "10_2_2", label: "QHSX tác động trở lại (phù hợp/kìm hãm)" },
            { id: "10_2_3", label: "Quy luật về sự phù hợp của QHSX với trình độ LLSX" }
          ]
        },
        {
          id: "10_3",
          label: "Cấu trúc xã hội",
          children: [
            { id: "10_3_1", label: "Lực lượng sản xuất" },
            { id: "10_3_2", label: "Quan hệ sản xuất (Cơ sở hạ tầng)" },
            { id: "10_3_3", label: "Kiến trúc thượng tầng" }
          ]
        }
      ]
    }
  },
  {
    month: 11,
    topic: "Cơ sở hạ tầng và Kiến trúc thượng tầng",
    data: {
      id: "root",
      label: "CS Hạ tầng & KT Thượng tầng",
      children: [
        {
          id: "11_1",
          label: "Cơ sở hạ tầng (CSHT)",
          children: [
            { id: "11_1_1", label: "Toàn bộ QHSX hợp thành cơ cấu kinh tế" },
            { id: "11_1_2", label: "Quyết định Kiến trúc thượng tầng" }
          ]
        },
        {
          id: "11_2",
          label: "Kiến trúc thượng tầng (KTTT)",
          children: [
            { id: "11_2_1", label: "Hệ tư tưởng và thiết chế chính trị - xã hội" },
            { id: "11_2_2", label: "Tác động trở lại CSHT (bảo vệ/phá hoại)" }
          ]
        },
        {
          id: "11_3",
          label: "Mối quan hệ biện chứng",
          children: [
            { id: "11_3_1", label: "CSHT sinh ra KTTT tương ứng" },
            { id: "11_3_2", label: "KTTT có tính độc lập tương đối" }
          ]
        }
      ]
    }
  },
  {
    month: 12,
    topic: "Ý thức xã hội",
    data: {
      id: "root",
      label: "Tồn tại XH & Ý thức XH",
      children: [
        {
          id: "12_1",
          label: "Tồn tại xã hội",
          children: [
            { id: "12_1_1", label: "Điều kiện tự nhiên, Dân số, Phương thức sx" },
            { id: "12_1_2", label: "Quyết định Ý thức xã hội" }
          ]
        },
        {
          id: "12_2",
          label: "Ý thức xã hội",
          children: [
            { id: "12_2_1", label: "Phản ánh Tồn tại xã hội" },
            { id: "12_2_2", label: "Tính độc lập tương đối" },
            { id: "12_2_3", label: "Thường lạc hậu hơn TTXH" },
            { id: "12_2_4", label: "Có thể vượt trước TTXH (khoa học)" },
            { id: "12_2_5", label: "Tính kế thừa và tác động qua lại" }
          ]
        },
        {
          id: "12_3",
          label: "Vấn đề con người",
          children: [
            { id: "12_3_1", label: "Con người là thực thể sinh học - xã hội" },
            { id: "12_3_2", label: "Bản chất con người là tổng hòa quan hệ xã hội" }
          ]
        }
      ]
    }
  }
];

export default mindMapData;
