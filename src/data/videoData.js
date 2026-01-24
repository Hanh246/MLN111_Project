const videoData = {
    1: "qw_U8Hb_aK4", // Khái lược về triết học
    2: "HmU6vd-uFOg", // Vật chất là gì?
    3: "nlmtgzotDBc", // Ý thức ra đời từ đâu?
    4: "ig4Sx3ZGLiU", // Hai nguyên lý cơ bản
    5: "wcXvDbS5Ulo", // Các cặp phạm trù
    6: "I7aj5tjiqA4", // Quy luật lượng chất
    7: "Oln9jtLVUw0", // Quy luật mâu thuẫn
    8: "J36bEbLHUJE", // Quy luật phủ định
    9: "6mVL9VQK2ck", // Thực tiễn và chân lý
    10: "OO-DUnhvuU8", // Sản xuất vật chất
    11: "V97efKwPGGo", // CSHT và KTTT
    12: "ko70cExuzZM"  // Ý thức xã hội
};

export const getLessonVideo = (month) => {
    return videoData[month] || "qw_U8Hb_aK4"; // Default video
};

export default videoData;
