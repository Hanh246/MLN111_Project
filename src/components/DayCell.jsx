import { useState, memo, useRef, useCallback } from 'react';
import QuoteTooltip from './QuoteTooltip';
import './DayCell.css';

const DayCell = memo(function DayCell({ day, isToday, quote, isFavorite, onToggleFavorite }) {
    const [isHovered, setIsHovered] = useState(false);
    const hideTimeoutRef = useRef(null);

    if (!day) {
        return <div className="day-cell empty"></div>;
    }

    const handleMouseEnter = useCallback(() => {
        // Cancel any pending hide
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        // Delay hiding to allow mouse to move to tooltip
        hideTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 200); // 200ms delay
    }, []);

    const handleDoubleClick = useCallback(() => {
        if (quote && onToggleFavorite) {
            onToggleFavorite(quote);
        }
    }, [quote, onToggleFavorite]);

    return (
        <div
            className={`day-cell ${isToday ? 'today' : ''} ${quote ? 'has-quote' : ''} ${isFavorite ? 'favorited' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            title={quote ? "Double click để lưu/bỏ lưu" : ""}
        >
            <div className="day-number">{day}</div>

            {quote && isHovered && (
                <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <QuoteTooltip 
                        quote={quote} 
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                </div>
            )}
        </div>
    );
});

export default DayCell;
