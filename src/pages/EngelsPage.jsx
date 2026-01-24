import { useState } from 'react';
import { IoPersonSharp, IoBookSharp, IoStarSharp, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ImQuotesLeft } from 'react-icons/im';
import './BiographyPage.css';

// Import images
import engelsPortrait from '../Friedrich Engels/Friedrich_Engels_portrait_(cropped).jpg';
import engelsPhoto from '../Friedrich Engels/Engels.jpg';

const EngelsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [engelsPortrait, engelsPhoto];

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
          <h1 className="bio-title">Friedrich Engels</h1>
          <p className="bio-subtitle">Nhà triết học, nhà kinh tế và cộng sự thân thiết của Karl Marx</p>
        </div>

        {/* Image Carousel */}
        <div className="bio-image-carousel">
          <div className="carousel-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Friedrich Engels ${index + 1}`}
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
                  <span className="info-value">Friedrich Engels</span>
                </li>
                <li>
                  <span className="info-label">Sinh:</span>
                  <span className="info-value">28/11/1820 tại Barmen, Phổ</span>
                </li>
                <li>
                  <span className="info-label">Mất:</span>
                  <span className="info-value">05/08/1895 tại London, Anh</span>
                </li>
                <li>
                  <span className="info-label">Nghề nghiệp:</span>
                  <span className="info-value">Nhà triết học, kinh tế học, doanh nhân</span>
                </li>
                <li>
                  <span className="info-label">Vai trò:</span>
                  <span className="info-value">Đồng sáng lập chủ nghĩa xã hội khoa học</span>
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
                <li>Tuyên ngôn của Đảng Cộng sản (1848) - cùng Marx</li>
                <li>Hoàn cảnh của giai cấp công nhân ở Anh (1845)</li>
                <li>Nguồn gốc của gia đình, của chế độ tư hữu và của Nhà nước (1884)</li>
                <li>Chống Dühring (1878)</li>
                <li>Biện chứng của tự nhiên (1883)</li>
                <li>Ludwig Feuerbach và sự cáo chung của triết học cổ điển Đức (1888)</li>
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
                <li>Hợp tác chặt chẽ với Marx trong việc phát triển học thuyết XHKH</li>
                <li>Hoàn thành và xuất bản Tư Bản quyển II và III sau khi Marx mất</li>
                <li>Nghiên cứu sâu về biện chứng tự nhiên và xã hội</li>
                <li>Phân tích nguồn gốc của nhà nước và gia đình</li>
                <li>Hỗ trợ tài chính cho Marx trong suốt cuộc đời</li>
                <li>Đóng góp quan trọng vào phong trào công nhân quốc tế</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="quotes-section">
          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Lao động đã tạo ra bản thân con người."
            </p>
            <p className="quote-author">— Friedrich Engels</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Tự do không phải là trong một mơ tưởng độc lập với những quy luật tự nhiên, mà là nhận thức những quy luật đó."
            </p>
            <p className="quote-author">— Friedrich Engels</p>
          </div>

          <div className="quote-card">
            <ImQuotesLeft className="quote-icon" />
            <p className="quote-text">
              "Nhà nước không phải tồn tại từ thuở xa xưa. Đã có những xã hội không có nhà nước."
            </p>
            <p className="quote-author">— Friedrich Engels</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngelsPage;
