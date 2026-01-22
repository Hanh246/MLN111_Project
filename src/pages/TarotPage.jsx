import { useState, useEffect } from 'react';
import tarotCards from '../data/tarotData';
import TarotCard from '../components/TarotCard';
import ZodiacSection from '../components/ZodiacSection';
import { IoSparkles, IoRefresh } from 'react-icons/io5';
import './TarotPage.css';

const TarotPage = () => {
  const [activeTab, setActiveTab] = useState('tarot'); // 'tarot' or 'zodiac'
  const [selectedCards, setSelectedCards] = useState([null, null, null]);
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  useEffect(() => {
    checkTodayReading();
  }, []);

  const checkTodayReading = () => {
    const today = new Date().toDateString();
    const lastReading = localStorage.getItem('tarotLastReading');
    const savedCards = localStorage.getItem('tarotTodayCards');

    if (lastReading === today && savedCards) {
      setHasDrawnToday(true);
      const cards = JSON.parse(savedCards);
      setSelectedCards(cards);
      setRevealedCards([true, true, true]);
    }
  };

  const getRandomCards = () => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1], shuffled[2]];
  };

  const handleDrawCards = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    setRevealedCards([false, false, false]);
    
    // Simulate card shuffling
    setTimeout(() => {
      const cards = getRandomCards();
      setSelectedCards(cards);
      setIsDrawing(false);
      
      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem('tarotLastReading', today);
      localStorage.setItem('tarotTodayCards', JSON.stringify(cards));
      setHasDrawnToday(true);
    }, 1000);
  };

  const handleRevealCard = (index) => {
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
  };

  const handleReset = () => {
    localStorage.removeItem('tarotLastReading');
    localStorage.removeItem('tarotTodayCards');
    setSelectedCards([null, null, null]);
    setRevealedCards([false, false, false]);
    setHasDrawnToday(false);
  };

  const allCardsRevealed = revealedCards.every(r => r);

  return (
    <div className="tarot-page">
      <div className="tarot-container">
        {/* Header */}
        <div className="tarot-header" data-aos="fade-down">
          <h1 className="tarot-title">
            <IoSparkles className="title-icon" />
            Bói Bài Tarot
            <IoSparkles className="title-icon" />
          </h1>
          <p className="tarot-subtitle">Khám phá vận mệnh qua những lá bài huyền bí</p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher" data-aos="fade-up">
          <button
            className={`tab-btn ${activeTab === 'tarot' ? 'active' : ''}`}
            onClick={() => setActiveTab('tarot')}
          >
            🔮 Tarot
          </button>
          <button
            className={`tab-btn ${activeTab === 'zodiac' ? 'active' : ''}`}
            onClick={() => setActiveTab('zodiac')}
          >
            ⭐ Cung Hoàng Đạo
          </button>
        </div>

        {/* Content */}
        {activeTab === 'tarot' ? (
          <div className="tarot-content">
            {/* Instructions */}
            {selectedCards[0] === null && (
              <div className="instructions" data-aos="fade-up">
                <h3>Cách Rút Bài</h3>
                <p>Bạn sẽ rút 3 lá bài để xem vận may trong:</p>
                <ul>
                  <li>🍀 <strong>May Mắn</strong> - Vận may chung trong cuộc sống</li>
                  <li>💖 <strong>Tình Yêu</strong> - Tình cảm và các mối quan hệ</li>
                  <li>💼 <strong>Sự Nghiệp</strong> - Công việc và học tập</li>
                </ul>
                <p className="note">✨ Hãy tập trung suy nghĩ về câu hỏi của bạn trước khi rút bài</p>
              </div>
            )}

            {/* Draw Button */}
            {selectedCards[0] === null && (
              <button
                className="draw-btn"
                onClick={handleDrawCards}
                disabled={isDrawing}
                data-aos="zoom-in"
              >
                {isDrawing ? (
                  <>
                    <div className="spinner"></div>
                    Đang xáo bài...
                  </>
                ) : (
                  <>
                    <IoSparkles />
                    Rút Bài
                  </>
                )}
              </button>
            )}

            {/* Cards Display */}
            {selectedCards[0] !== null && (
              <>
                <div className="cards-container">
                  {selectedCards.map((card, index) => (
                    <TarotCard
                      key={index}
                      card={card}
                      position={index}
                      isRevealed={revealedCards[index]}
                      onReveal={() => handleRevealCard(index)}
                    />
                  ))}
                </div>

                {/* Reset Button */}
                {allCardsRevealed && (
                  <div className="action-buttons" data-aos="fade-up">
                    <button className="reset-btn" onClick={handleReset}>
                      <IoRefresh />
                      Rút Lại
                    </button>
                    {hasDrawnToday && (
                      <p className="daily-note">
                        💫 Bạn đã rút bài hôm nay. Kết quả đã được lưu!
                      </p>
                    )}
                  </div>
                )}

                {!allCardsRevealed && (
                  <div className="reveal-hint" data-aos="fade-up">
                    <p>👆 Click vào từng lá bài để xem kết quả</p>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <ZodiacSection />
        )}
      </div>
    </div>
  );
};

export default TarotPage;
