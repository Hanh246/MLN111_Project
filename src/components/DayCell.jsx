import { useState, memo, useRef, useCallback } from 'react';
import QuoteTooltip from './QuoteTooltip';
import './DayCell.css';

/**
 * DayCell Component - Optimized with Mobile Support
 * 
 * Features:
 * - Hover for desktop (mouse)
 * - Click/tap for mobile (touch)
 * - Double-click to toggle favorite
 * - Proper z-index handling when active
 */
const DayCell = memo(function DayCell({ day, isToday, quote, isFavorite, onToggleFavorite }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false); // For click/touch
    const hideTimeoutRef = useRef(null);

    if (!day) {
        return <div className="day-cell empty"></div>;
    }

    // Desktop: Mouse hover handlers
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

    // Mobile: Click/Touch handler
    const handleClick = useCallback((e) => {
        if (!quote) return;
        
        // Prevent double-click from triggering click
        if (e.detail === 2) return;
        
        // Toggle active state for mobile
        setIsActive(prev => !prev);
    }, [quote]);

    // Double-click to toggle favorite
    const handleDoubleClick = useCallback(() => {
        if (quote && onToggleFavorite) {
            onToggleFavorite(quote);
        }
    }, [quote, onToggleFavorite]);

    // Determine if tooltip should be shown (hover OR active)
    const showTooltip = quote && (isHovered || isActive);

    return (
        <div
            className={`day-cell 
                ${isToday ? 'today' : ''} 
                ${quote ? 'has-quote' : ''} 
                ${isFavorite ? 'favorited' : ''}
                ${showTooltip ? 'active' : ''}
            `.trim()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            title={quote ? "Click để xem, Double click để lưu/bỏ lưu" : ""}
            role={quote ? "button" : undefined}
            tabIndex={quote ? 0 : undefined}
            aria-label={quote ? `Ngày ${day}, có câu nói` : `Ngày ${day}`}
        >
            <div className="day-number">{day}</div>

            {showTooltip && (
                <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside tooltip
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
