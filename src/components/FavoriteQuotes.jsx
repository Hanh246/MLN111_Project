import { memo } from 'react';
import { IoStar, IoTrash } from 'react-icons/io5';
import './FavoriteQuotes.css';

/**
 * Component to display user's favorite quotes
 */
const FavoriteQuotes = memo(function FavoriteQuotes({ favorites, onRemove }) {
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-section">
        <h3><IoStar className="section-icon" /> Câu Tâm Đắc</h3>
        <p className="no-favorites">Chưa có câu nào được lưu. Hãy nháy đúp ngày trên lịch để ⭐!</p>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <h3><IoStar className="section-icon" /> Câu Tâm Đắc ({favorites.length})</h3>
      <div className="favorites-grid">
        {favorites.map((quote, index) => (
          <div key={`${quote.month}-${quote.day}-${index}`} className="favorite-card">
            <div className="favorite-content">
              <p className="favorite-quote">"{quote.quote}"</p>
              <p className="favorite-author">— {quote.author}</p>
              <p className="favorite-date">Ngày {quote.day}/{quote.month}</p>
            </div>
            <button 
              className="remove-favorite-btn"
              onClick={() => onRemove(quote)}
              title="Xóa khỏi danh sách"
            >
              <IoTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FavoriteQuotes;
