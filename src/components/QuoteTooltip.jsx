import { memo } from 'react';

/**
 * Reusable tooltip component for displaying quotes
 * Now includes favorite star button
 */
const QuoteTooltip = memo(function QuoteTooltip({ quote, isFavorite, onToggleFavorite }) {
  if (!quote) return null;

  const handleStarClick = (e) => {
    e.stopPropagation(); // Prevent tooltip from closing
    if (onToggleFavorite) {
      onToggleFavorite(quote);
    }
  };

  return (
    <div className="quote-tooltip">
      {onToggleFavorite && (
        <button 
          className="favorite-btn" 
          onClick={handleStarClick}
          title={isFavorite ? "Bỏ lưu" : "Lưu câu này"}
          aria-label={isFavorite ? "Bỏ lưu câu này" : "Lưu câu này"}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      )}
      <div className="quote-text">"{quote.quote}"</div>
      <div className="quote-author">— {quote.author}</div>
    </div>
  );
});

export default QuoteTooltip;
