// Quiz questions for each month's lesson
const monthlyQuizzes = [
    {
        month: 1,
        questions: [
            {
                question: "Triết học nghiên cứu vấn đề cơ bản nào?",
                options: [
                    "Mối quan hệ giữa con người và tự nhiên",
                    "Mối quan hệ giữa vật chất và ý thức",
                    "Mối quan hệ giữa khoa học và nghệ thuật",
                    "Mối quan hệ giữa lý thuyết và thực tiễn"
                ],
                correctAnswer: 1
            },
            {
                question: "Triết học Mác-Lênin ra đời như thế nào?",
                options: [
                    "Là sự kế thừa đơn thuần triết học cổ điển Đức",
                    "Là một cuộc cách mạng trong lịch sử triết học",
                    "Là sự phủ định hoàn toàn các trường phái trước",
                    "Là sự tổng hợp các tôn giáo phương Đông"
                ],
                correctAnswer: 1
            },
            {
                question: "Vai trò chính của triết học là gì?",
                options: [
                    "Giải thích các hiện tượng siêu nhiên",
                    "Cung cấp thế giới quan và phương pháp luận",
                    "Thay thế cho các môn khoa học cụ thể",
                    "Phục vụ cho mục đích tôn giáo"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 2,
        questions: [
            {
                question: "Theo triết học Mác-Lênin, vật chất là gì?",
                options: [
                    "Những thứ có thể cầm nắm được",
                    "Thực tại khách quan được phản ánh bởi ý thức",
                    "Nguyên tử và phân tử",
                    "Những gì mắt thường nhìn thấy"
                ],
                correctAnswer: 1
            },
            {
                question: "Vận động trong triết học được hiểu là:",
                options: [
                    "Chỉ sự di chuyển trong không gian",
                    "Mọi sự biến đổi nói chung",
                    "Sự thay đổi về số lượng",
                    "Chuyển động của vật thể"
                ],
                correctAnswer: 1
            },
            {
                question: "Có mấy hình thức vận động cơ bản của vật chất?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 2
            }
        ]
    },
    {
        month: 3,
        questions: [
            {
                question: "Ý thức có nguồn gốc từ đâu?",
                options: [
                    "Thần linh ban cho con người",
                    "Sự phát triển lâu dài của vật chất",
                    "Tự có từ khi sinh ra",
                    "Học hỏi từ sách vở"
                ],
                correctAnswer: 1
            },
            {
                question: "Cơ quan vật chất của ý thức là:",
                options: [
                    "Tim", "Não bộ", "Toàn bộ cơ thể", "Hệ thần kinh trung ương"
                ],
                correctAnswer: 1
            },
            {
                question: "Cấu trúc của ý thức bao gồm:",
                options: [
                    "Tri thức, tình cảm, ý chí",
                    "Trí nhớ, tưởng tượng, giấc mơ",
                    "Bản năng, ham muốn, sợ hãi",
                    "Lý trí, cảm xúc, hành động"
                ],
                correctAnswer: 0
            }
        ]
    },
    {
        month: 4,
        questions: [
            {
                question: "Nguyên lý mối liên hệ phổ biến cho rằng:",
                options: [
                    "Chỉ một số sự vật có liên hệ với nhau",
                    "Mọi sự vật đều có mối liên hệ với nhau",
                    "Các sự vật tồn tại độc lập",
                    "Chỉ sự vật cùng loại mới liên hệ"
                ],
                correctAnswer: 1
            },
            {
                question: "Phát triển là:",
                options: [
                    "Sự thay đổi bất kỳ",
                    "Sự vận động đi lên từ thấp đến cao",
                    "Sự tăng về số lượng",
                    "Sự thay đổi bên ngoài"
                ],
                correctAnswer: 1
            },
            {
                question: "Cái chung tồn tại ở đâu?",
                options: [
                    "Tách rời cái riêng",
                    "Trong cái riêng",
                    "Trên cái riêng",
                    "Bên cạnh cái riêng"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 5,
        questions: [
            {
                question: "Mối quan hệ nhân quả có tính chất gì?",
                options: [
                    "Nguyên nhân luôn có trước kết quả",
                    "Kết quả có trước nguyên nhân",
                    "Nguyên nhân và kết quả xảy ra đồng thời",
                    "Không có mối liên hệ thời gian"
                ],
                correctAnswer: 0
            },
            {
                question: "Nội dung và hình thức có mối quan hệ:",
                options: [
                    "Tách rời nhau",
                    "Thống nhất với nhau",
                    "Đối lập nhau",
                    "Không liên quan"
                ],
                correctAnswer: 1
            },
            {
                question: "Bản chất và hiện tượng khác nhau ở chỗ:",
                options: [
                    "Bản chất ổn định, hiện tượng dễ biến đổi",
                    "Bản chất biến đổi, hiện tượng ổn định",
                    "Cả hai đều ổn định",
                    "Cả hai đều biến đổi"
                ],
                correctAnswer: 0
            }
        ]
    },
    {
        month: 6,
        questions: [
            {
                question: "Quy luật lượng-chất giải thích:",
                options: [
                    "Tại sao sự vật phát triển",
                    "Cơ chế của sự phát triển",
                    "Khuynh hướng phát triển",
                    "Nguồn gốc của phát triển"
                ],
                correctAnswer: 1
            },
            {
                question: "Khi nước đạt 100°C sẽ xảy ra hiện tượng gì?",
                options: [
                    "Không thay đổi",
                    "Thay đổi về lượng",
                    "Thay đổi về chất (lỏng → hơi)",
                    "Đông đặc lại"
                ],
                correctAnswer: 2
            },
            {
                question: "Điểm nút là:",
                options: [
                    "Điểm bắt đầu",
                    "Giới hạn sự thay đổi lượng dẫn tới thay đổi chất",
                    "Điểm kết thúc",
                    "Điểm giữa"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 7,
        questions: [
            {
                question: "Quy luật mâu thuẫn được gọi là:",
                options: [
                    "Quy luật cơ bản",
                    "Quy luật hạt nhân của phép biện chứng",
                    "Quy luật phổ biến",
                    "Quy luật đặc thù"
                ],
                correctAnswer: 1
            },
            {
                question: "Động lực của sự phát triển là:",
                options: [
                    "Sự thống nhất",
                    "Đấu tranh giữa các mặt đối lập",
                    "Sự hòa hợp",
                    "Sự đồng nhất"
                ],
                correctAnswer: 1
            },
            {
                question: "Các mặt đối lập trong sự vật:",
                options: [
                    "Loại trừ nhau hoàn toàn",
                    "Vừa thống nhất vừa đấu tranh",
                    "Tồn tại độc lập",
                    "Không liên quan"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 8,
        questions: [
            {
                question: "Phủ định biện chứng khác phủ định siêu hình ở chỗ:",
                options: [
                    "Phủ định hoàn toàn, không kế thừa",
                    "Có kế thừa yếu tố tích cực",
                    "Không có sự phủ định",
                    "Giữ nguyên cái cũ"
                ],
                correctAnswer: 1
            },
            {
                question: "Phát triển diễn ra theo đường:",
                options: [
                    "Đường thẳng",
                    "Vòng tròn",
                    "Xoắn ốc",
                    "Ngoằn ngoèo"
                ],
                correctAnswer: 2
            },
            {
                question: "Ví dụ về phủ định của phủ định:",
                options: [
                    "Hạt → Cây → Hạt mới",
                    "Ngày → Đêm",
                    "Nước → Đá",
                    "Trẻ → Già"
                ],
                correctAnswer: 0
            }
        ]
    },
    {
        month: 9,
        questions: [
            {
                question: "Thực tiễn đối với nhận thức có vai trò:",
                options: [
                    "Cản trở nhận thức",
                    "Là cơ sở, động lực và mục đích",
                    "Không liên quan",
                    "Làm sai lệch nhận thức"
                ],
                correctAnswer: 1
            },
            {
                question: "Chân lý được kiểm nghiệm bằng:",
                options: [
                    "Lý thuyết",
                    "Thực tiễn",
                    "Đa số ý kiến",
                    "Niềm tin"
                ],
                correctAnswer: 1
            },
            {
                question: "Nhận thức cảm tính bao gồm:",
                options: [
                    "Khái niệm, phán đoán",
                    "Cảm giác, tri giác, biểu tượng",
                    "Suy lý, tổng hợp",
                    "Phân tích, so sánh"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 10,
        questions: [
            {
                question: "Yếu tố quan trọng nhất của lực lượng sản xuất là:",
                options: [
                    "Công cụ lao động",
                    "Đối tượng lao động",
                    "Con người lao động",
                    "Máy móc thiết bị"
                ],
                correctAnswer: 2
            },
            {
                question: "Quan hệ sản xuất bao gồm:",
                options: [
                    "Quan hệ sở hữu, trao đổi, phân phối",
                    "Quan hệ gia đình, bạn bè",
                    "Quan hệ chính trị, xã hội",
                    "Quan hệ văn hóa, giáo dục"
                ],
                correctAnswer: 0
            },
            {
                question: "LLSX và QHSX có mối quan hệ:",
                options: [
                    "QHSX quyết định LLSX",
                    "LLSX quyết định QHSX",
                    "Không liên quan",
                    "Bình đẳng"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 11,
        questions: [
            {
                question: "Cơ sở hạ tầng là:",
                options: [
                    "Đường xá, cầu cống",
                    "Tổng hòa các quan hệ sản xuất",
                    "Nhà nước, luật pháp",
                    "Văn hóa, giáo dục"
                ],
                correctAnswer: 1
            },
            {
                question: "Kiến trúc thượng tầng bao gồm:",
                options: [
                    "Chỉ nhà nước",
                    "Quan điểm chính trị, pháp luật, đạo đức và các thiết chế",
                    "Chỉ kinh tế",
                    "Chỉ sản xuất"
                ],
                correctAnswer: 1
            },
            {
                question: "Mối quan hệ CS hạ tầng - KT thượng tầng:",
                options: [
                    "KT thượng tầng quyết định CS hạ tầng",
                    "CS hạ tầng quyết định KT thượng tầng",
                    "Không có mối liên hệ",
                    "Phát triển độc lập"
                ],
                correctAnswer: 1
            }
        ]
    },
    {
        month: 12,
        questions: [
            {
                question: "Ý thức xã hội phản ánh:",
                options: [
                    "Ý thức cá nhân",
                    "Đời sống vật chất xã hội (tồn tại xã hội)",
                    "Tư tưởng của lãnh đạo",
                    "Sách vở, lý thuyết"
                ],
                correctAnswer: 1
            },
            {
                question: "Sự đa dạng phong tục tập quán vùng miền do:",
                options: [
                    "Ngẫu nhiên",
                    "Sự khác biệt về điều kiện tự nhiên, lịch sử, kinh tế",
                    "Ý thức hệ khác nhau",
                    "Chính sách nhà nước"
                ],
                correctAnswer: 1
            },
            {
                question: "Tồn tại xã hội và ý thức xã hội:",
                options: [
                    "Ý thức quyết định tồn tại",
                    "Tồn tại quyết định ý thức",
                    "Phát triển độc lập",
                    "Không liên quan"
                ],
                correctAnswer: 1
            }
        ]
    }
];

export default monthlyQuizzes;
