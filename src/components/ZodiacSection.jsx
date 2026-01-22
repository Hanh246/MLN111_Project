import { useState } from 'react';
import zodiacSigns from '../data/zodiacData';
import './ZodiacSection.css';

const ZodiacSection = () => {
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  const handleZodiacClick = (zodiac) => {
    setSelectedZodiac(zodiac);
  };

  const closeModal = () => {
    setSelectedZodiac(null);
  };

  return (
    <div className="zodiac-section">
      <div className="zodiac-header" data-aos="fade-down">
        <h2>12 Cung Hoàng Đạo</h2>
        <p>Khám phá bản thân qua những vì sao</p>
      </div>

      <div className="zodiac-grid">
        {zodiacSigns.map((zodiac, index) => (
          <div
            key={zodiac.id}
            className="zodiac-card"
            onClick={() => handleZodiacClick(zodiac)}
            data-aos="zoom-in"
            data-aos-delay={index * 50}
            style={{ '--zodiac-color': zodiac.color }}
          >
            <div className="zodiac-symbol">{zodiac.symbol}</div>
            <h3 className="zodiac-name">{zodiac.name}</h3>
            <p className="zodiac-dates">{zodiac.dates}</p>
            <p className="zodiac-element">{zodiac.elementVi}</p>
          </div>
        ))}
      </div>

      {/* Zodiac Detail Modal */}
      {selectedZodiac && (
        <div className="zodiac-modal-overlay" onClick={closeModal}>
          <div className="zodiac-modal" onClick={(e) => e.stopPropagation()} style={{ '--zodiac-color': selectedZodiac.color }}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <div className="modal-symbol">{selectedZodiac.symbol}</div>
              <h2>{selectedZodiac.name}</h2>
              <p className="modal-name-en">{selectedZodiac.nameEn}</p>
            </div>

            <div className="modal-body">
              <div className="info-row">
                <span className="info-label">Ngày:</span>
                <span className="info-value">{selectedZodiac.dates}</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Nguyên tố:</span>
                <span className="info-value">{selectedZodiac.elementVi} ({selectedZodiac.element})</span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Hành tinh:</span>
                <span className="info-value">{selectedZodiac.rulingPlanet}</span>
              </div>

              <div className="description-section">
                <h3>Đặc điểm</h3>
                <p>{selectedZodiac.description}</p>
              </div>

              <div className="traits-section">
                <h3>Tính cách</h3>
                <p>{selectedZodiac.traits}</p>
              </div>

              <div className="strengths-weaknesses">
                <div className="strengths">
                  <h4>💪 Điểm mạnh</h4>
                  <p>{selectedZodiac.strengths}</p>
                </div>
                <div className="weaknesses">
                  <h4>⚠️ Điểm yếu</h4>
                  <p>{selectedZodiac.weaknesses}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZodiacSection;
