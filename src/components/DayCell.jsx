import { useState } from 'react';
import './DayCell.css';

function DayCell({ day, isToday, quote }) {
    const [isHovered, setIsHovered] = useState(false);

    if (!day) {
        return <div className="day-cell empty"></div>;
    }

    return (
        <div
            className={`day-cell ${isToday ? 'today' : ''} ${quote ? 'has-quote' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="day-number">{day}</div>

            {quote && isHovered && (
                <div className="quote-tooltip">
                    <div className="quote-text">"{quote.quote}"</div>
                    <div className="quote-author">— {quote.author}</div>
                </div>
            )}
        </div>
    );
}

export default DayCell;
