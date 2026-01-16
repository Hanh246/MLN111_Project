// 12 Monthly Philosophy Themes
const monthlyThemes = [
    {
        month: 1,
        theme: "Khái lược về triết học và vai trò của nó trong đời sống xã hội"
    },
    {
        month: 2,
        theme: "Vật chất là gì? Vận động, đứng im, không gian, thời gian là gì?"
    },
    {
        month: 3,
        theme: "Ý thức ra đời từ đâu? Bản chất của nó là gì? Ý thức bao gồm những thành tố nào?"
    },
    {
        month: 4,
        theme: "Nguyên lý mối liên hệ phổ biến, nguyên lý phát triển, cái chung – cái riêng"
    },
    {
        month: 5,
        theme: "Nguyên nhân và kết quả, nội dung hình thức, bản chất hiện tượng"
    },
    {
        month: 6,
        theme: "Quy luật lượng – chất (quy luật chuyển hoá từ những sự thay đổi về lượng dẫn đến những sự thay đổi về chất và ngược lại)"
    },
    {
        month: 7,
        theme: "Quy luật mâu thuẫn (quy luật thống nhất và đấu tranh giữa các mặt đối lập)"
    },
    {
        month: 8,
        theme: "Quy luật phủ định của phủ định"
    },
    {
        month: 9,
        theme: "Thực tiễn và chân lý là gì? Nhận thức có những giai đoạn nào?"
    },
    {
        month: 10,
        theme: "Sản xuất vật chất, Lực lượng sản xuất và quan hệ sản xuất"
    },
    {
        month: 11,
        theme: "Cơ sở hạ tầng và kiến trúc thượng tầng"
    },
    {
        month: 12,
        theme: "Ý thức xã hội: Phong tục, tập quán, sinh hoạt ở các vùng miền khác nhau"
    }
];

export const getThemeForMonth = (month) => {
    const themeData = monthlyThemes.find(t => t.month === month);
    return themeData ? themeData.theme : "";
};

export default monthlyThemes;
