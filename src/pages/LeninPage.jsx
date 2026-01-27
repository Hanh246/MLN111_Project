import { useState } from "react";
import {
  IoPersonSharp,
  IoBookSharp,
  IoStarSharp,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { ImQuotesLeft } from "react-icons/im";
import "./BiographyPage.css";

// Import images
import leninImage from "../Lenin/Lenin.jpg";
import leninImage1 from "../Lenin/tải xuống.jpg";
import leninImage2 from "../Lenin/tải xuống (1).jpg";
import leninImage3 from "../Lenin/tải xuống (2).jpg";
import leninImage4 from "../Lenin/tải xuống (3).jpg";
import leninImage5 from "../Lenin/tải xuống (4).jpg";

const LeninPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [leninImage, leninImage1, leninImage2, leninImage3, leninImage4, leninImage5];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="biography-page">
      <div className="biography-container">
        {/* Header */}
        <div className="bio-header">
          <h1 className="bio-title">Vladimir Lenin</h1>
          <p className="bio-subtitle">
            Nhà cách mạng, lý luận chính trị vĩ đại người Nga
          </p>
        </div>

        {/* Image Carousel */}
        <div className="bio-image-carousel">
          <div className="carousel-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Lenin ${index + 1}`}
                className={`carousel-image ${index === currentImageIndex ? "active" : ""}`}
              />
            ))}
            <button
              className="carousel-button prev"
              onClick={prevImage}
              aria-label="Previous"
            >
              <IoChevronBack />
            </button>
            <button
              className="carousel-button next"
              onClick={nextImage}
              aria-label="Next"
            >
              <IoChevronForward />
            </button>
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Biography Content */}
        <div className="bio-content">
          {/* Personal Info */}
          <div className="bio-card">
            <h2 className="card-title">
              <IoPersonSharp className="card-title-icon" />
              Thông Tin Cá Nhân
            </h2>
            <div className="card-content">
              <ul className="info-list">
                <li>
                  <span className="info-label">Tên đầy đủ:</span>
                  <span className="info-value">Vladimir Ilyich Ulyanov</span>
                </li>
                <li>
                  <span className="info-label">Sinh:</span>
                  <span className="info-value">
                    22/04/1870 tại Simbirsk, Nga
                  </span>
                </li>
                <li>
                  <span className="info-label">Mất:</span>
                  <span className="info-value">
                    21/01/1924 tại Gorki, Liên Xô
                  </span>
                </li>
                <li>
                  <span className="info-label">Nghề nghiệp:</span>
                  <span className="info-value">
                    Nhà cách mạng, chính trị gia, lý luận
                  </span>
                </li>
                <li>
                  <span className="info-label">Chức vụ:</span>
                  <span className="info-value">
                    Chủ tịch Hội đồng Nhân dân ủy viên CHXHCN Liên Xô
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Major Works */}
          <div className="bio-card">
            <h2 className="card-title">
              <IoBookSharp className="card-title-icon" />
              Tác Phẩm Chính
            </h2>
            <div className="card-content">
              <ul className="works-list">
                <li>Nhà nước và cách mạng (1917)</li>
                <li>
                  Chủ nghĩa đế quốc, giai đoạn cao nhất của chủ nghĩa tư bản
                  (1916)
                </li>
                <li>Làm gì? (1902)</li>
                <li>
                  Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán (1909)
                </li>
                <li>Luận cương tháng tư (1917)</li>
                <li>Bệnh trẻ con của chủ nghĩa cộng sản "tả khuynh" (1920)</li>
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="bio-card">
            <h2 className="card-title">
              <IoStarSharp className="card-title-icon" />
              Đóng Góp & Thành Tựu
            </h2>
            <div className="card-content">
              <ul className="works-list">
                <li>Lãnh đạo Cách mạng Tháng Mười Nga năm 1917</li>
                <li>Sáng lập Liên bang Cộng hòa XHCN Xô Viết</li>
                <li>Phát triển chủ nghĩa Marx thành chủ nghĩa Marx-Lenin</li>
                <li>Thành lập Quốc tế Cộng sản (Comintern)</li>
                <li>Đề xuất chính sách Kinh tế mới (NEP)</li>
                <li>Xây dựng đảng kiểu mới của giai cấp công nhân</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="quotes-section">
          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Không có lý luận cách mạng thì không có phong trào cách mạng."
            </p>
            <p className="quote-author">— Vladimir Lenin</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">"Học, học nữa, học mãi."</p>
            <p className="quote-author">— Vladimir Lenin</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Một cuộc cách mạng không đáng gọi là cách mạng nếu nó không biết
              tự vệ."
            </p>
            <p className="quote-author">— Vladimir Lenin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeninPage;
