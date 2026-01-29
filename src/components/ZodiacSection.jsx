import { useState } from 'react';
import zodiacSigns from '../data/zodiacData';
import { IoSparkles, IoClose } from 'react-icons/io5';
import './ZodiacSection.css';

const ZodiacSection = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [searchDate, setSearchDate] = useState('');

  const handleCardClick = (sign) => {
    setSelectedSign(sign);
  };

  const closeModal = () => {
    setSelectedSign(null);
  };

  const findSignByDate = (dateStr) => {
    if (!dateStr) return null;
    
    const [month, day] = dateStr.split('-').map(Number);
    
    return zodiacSigns.find(sign => {
      const [startDate, endDate] = sign.dates.split(' - ');
      const [startDay, startMonth] = startDate.split('/').map(Number);
      const [endDay, endMonth] = endDate.split('/').map(Number);
      
      if (startMonth === endMonth) {
        return month === startMonth && day >= startDay && day <= endDay;
      } else {
        return (month === startMonth && day >= startDay) || 
               (month === endMonth && day <= endDay);
      }
    });
  };

  const handleSearch = () => {
    const foundSign = findSignByDate(searchDate);
    if (foundSign) {
      setSelectedSign(foundSign);
    }
  };

  const getElementColor = (element) => {
    const colors = {
      'Fire': 'linear-gradient(135deg, #FF6B6B, #F4A261)',
      'Earth': 'linear-gradient(135deg, #2A9D8F, #4ECDC4)',
      'Air': 'linear-gradient(135deg, #3498DB, #FFE66D)',
      'Water': 'linear-gradient(135deg, #A8DADC, #9D4EDD)'
    };
    return colors[element] || colors['Fire'];
  };

  return (
    <div className="zodiac-section">
      {/* Header */}
      <div className="zodiac-intro" data-aos="fade-up">
        <h2 className="zodiac-section-title">
          <IoSparkles className="section-icon" />
          12 Cung Hoàng Đạo
        </h2>
        <p className="zodiac-description">
          Khám phá đặc điểm tính cách, điểm mạnh và điểm yếu của từng cung hoàng đạo
        </p>
      </div>

      {/* Date Finder */}
      <div className="date-finder" data-aos="fade-up" data-aos-delay="100">
        <h3>Tìm cung hoàng đạo của bạn</h3>
        <div className="date-input-group">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="date-input"
          />
          <button onClick={handleSearch} className="search-btn">
            <IoSparkles />
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Zodiac Grid */}
      <div className="zodiac-grid">
        {zodiacSigns.map((sign, index) => (
          <div
            key={sign.id}
            className="zodiac-card"
            onClick={() => handleCardClick(sign)}
            data-aos="zoom-in"
            data-aos-delay={index * 50}
            style={{ '--card-color': sign.color }}
          >
            <div className="zodiac-card-header">
              <div className="zodiac-symbol" style={{ color: sign.color }}>
                {sign.symbol}
              </div>
              <div className="zodiac-element" style={{ 
                background: getElementColor(sign.element)
              }}>
                {sign.elementVi}
              </div>
            </div>
            
            <h3 className="zodiac-name">{sign.name}</h3>
            <p className="zodiac-name-en">{sign.nameEn}</p>
            <p className="zodiac-dates">{sign.dates}</p>
            
            <div className="zodiac-preview">
              <p>{sign.traits}</p>
            </div>

            <div className="card-shine"></div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSign && (
        <div className="zodiac-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <IoClose />
            </button>

            <div className="modal-header" style={{
              background: getElementColor(selectedSign.element)
            }}>
              <div className="modal-symbol">{selectedSign.symbol}</div>
              <h2>{selectedSign.name}</h2>
              <p className="modal-name-en">{selectedSign.nameEn}</p>
              <p className="modal-dates">{selectedSign.dates}</p>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>🌟 Giới thiệu</h3>
                <p>{selectedSign.description}</p>
              </div>

              <div className="modal-grid">
                <div className="modal-section">
                  <h3>🔥 Nguyên tố</h3>
                  <div className="element-badge" style={{
                    background: getElementColor(selectedSign.element)
                  }}>
                    {selectedSign.elementVi} ({selectedSign.element})
                  </div>
                </div>

                <div className="modal-section">
                  <h3>🪐 Hành tinh cầm quyền</h3>
                  <p className="planet-name">{selectedSign.rulingPlanet}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3>✨ Đặc điểm chính</h3>
                <p className="traits-text">{selectedSign.traits}</p>
              </div>

              <div className="modal-grid">
                <div className="modal-section strengths-section">
                  <h3>💪 Điểm mạnh</h3>
                  <p>{selectedSign.strengths}</p>
                </div>

                <div className="modal-section weaknesses-section">
                  <h3>⚠️ Điểm yếu</h3>
                  <p>{selectedSign.weaknesses}</p>
                </div>
              </div>

              <div className="modal-footer">
                <div className="color-indicator">
                  <span>Màu đại diện:</span>
                  <div className="color-box" style={{ background: selectedSign.color }}></div>
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
