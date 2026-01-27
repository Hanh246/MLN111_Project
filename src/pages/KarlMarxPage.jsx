import { useState } from 'react';
import { IoPersonSharp, IoBookSharp, IoStarSharp, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ImQuotesLeft } from 'react-icons/im';
import './BiographyPage.css';

// Import images
import macImage from '../KarlMarx/mac.jpg';
import imagesMarx from '../KarlMarx/images.jpg';
import mac1 from '../KarlMarx/mac1.jpg';

const KarlMarxPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [macImage, imagesMarx, mac1];

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
          <h1 className="bio-title">Karl Marx</h1>
          <p className="bio-subtitle">Nhà triết học, kinh tế học và xã hội học vĩ đại người Đức</p>
        </div>

        {/* Image Carousel */}
        <div className="bio-image-carousel">
          <div className="carousel-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Karl Marx ${index + 1}`}
                className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
            <button className="carousel-button prev" onClick={prevImage} aria-label="Previous">
              <IoChevronBack />
            </button>
            <button className="carousel-button next" onClick={nextImage} aria-label="Next">
              <IoChevronForward />
            </button>
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
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
                  <span className="info-value">Karl Heinrich Marx</span>
                </li>
                <li>
                  <span className="info-label">Sinh:</span>
                  <span className="info-value">05/05/1818 tại Trier, Phổ</span>
                </li>
                <li>
                  <span className="info-label">Mất:</span>
                  <span className="info-value">14/03/1883 tại London, Anh</span>
                </li>
                <li>
                  <span className="info-label">Nghề nghiệp:</span>
                  <span className="info-value">Nhà triết học, kinh tế học, xã hội học</span>
                </li>
                <li>
                  <span className="info-label">Học vị:</span>
                  <span className="info-value">Tiến sĩ Triết học, Đại học Jena</span>
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
                <li>Tuyên ngôn của Đảng Cộng sản (1848) - cùng Engels</li>
                <li>Tư bản - Das Kapital (Quyển I: 1867, II & III xuất bản sau khi mất)</li>
                <li>Bản thảo kinh tế - triết học năm 1844</li>
                <li>Luận cương về Feuerbach (1845)</li>
                <li>Ý thức hệ Đức (1845) - cùng Engels</li>
                <li>Góp phần phê phán kinh tế chính trị học (1859)</li>
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
                <li>Sáng lập chủ nghĩa duy vật lịch sử và chủ nghĩa duy vật biện chứng</li>
                <li>Phát triển học thuyết về giá trị thặng dư</li>
                <li>Phân tích bản chất của chủ nghĩa tư bản</li>
                <li>Đặt nền móng cho chủ nghĩa xã hội khoa học</li>
                <li>Thành lập Hiệp hội Công nhân Quốc tế (Quốc tế thứ nhất)</li>
                <li>Ảnh hưởng sâu sắc đến lịch sử thế kỷ 20</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="quotes-section">
          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Lịch sử của mọi xã hội cho đến nay là lịch sử của đấu tranh giai cấp."
            </p>
            <p className="quote-author">— Karl Marx</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Những nhà triết học chỉ giải thích thế giới theo nhiều cách khác nhau, nhưng vấn đề là phải cải tạo nó."
            </p>
            <p className="quote-author">— Karl Marx</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Người công nhân toàn thế giới, đoàn kết lại!"
            </p>
            <p className="quote-author">— Karl Marx</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarlMarxPage;
