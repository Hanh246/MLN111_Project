import { useState, useMemo } from 'react';
import { Solar } from 'lunar-javascript';
import { DAY_NAMES } from '../utils/constants';
import quotes from '../data/quotes';
import './MiniCalendar.css';

function MiniCalendar({ currentDate, setCurrentDate }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredDay, setHoveredDay] = useState(null);

    // Navigation functions
    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    // Memoize week days calculation
    const weekDays = useMemo(() => {
        const week = [];
        const today = currentDate.getDay(); // 0-6 (Sunday-Saturday)

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - today + i);
            week.push(date);
        }

        return week;
    }, [currentDate]);

    // Get all days in the current month
    const monthDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push(date);
        }

        return days;
    }, [currentDate]);

    const todayDate = currentDate.getDate();

    // Convert to lunar date using lunar-javascript
    const getLunarDate = (date) => {
        try {
            const solar = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate());
            const lunar = solar.getLunar();
            return `${lunar.getDay()}/${lunar.getMonth()}`;
        } catch (error) {
            console.error('Lunar conversion error:', error);
            return '--/--';
        }
    };

    const currentLunar = getLunarDate(currentDate);

    // Get quote for a specific date
    const getQuoteForDate = (date) => {
        if (!date) return null;
        const month = date.getMonth() + 1; // 1-12
        const day = date.getDate();
        return quotes.find(q => q.month === month && q.day === day);
    };

    return (
        <div className="mini-calendar">
            <div className="mini-calendar-header">
                <div className="current-date">
                    <div className="solar-date">{currentDate.getDate()}</div>
                    <div className="month-year">
                        Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
                    </div>
                    <div className="lunar-date">🌙 Âm lịch: {currentLunar}</div>
                </div>
                
                {/* Navigation buttons */}
                <div className="nav-buttons">
                    <button 
                        className="nav-btn"
                        onClick={isExpanded ? goToPreviousMonth : goToPreviousWeek}
                        title={isExpanded ? "Tháng trước" : "Tuần trước"}
                    >
                        ‹
                    </button>
                    <button 
                        className="nav-btn"
                        onClick={isExpanded ? goToNextMonth : goToNextWeek}
                        title={isExpanded ? "Tháng sau" : "Tuần sau"}
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Week View - Always visible */}
            <div className="week-view">
                {weekDays.map((date, index) => {
                    const isToday = date.getDate() === todayDate &&
                        date.getMonth() === currentDate.getMonth();
                    const lunar = getLunarDate(date);
                    const quote = getQuoteForDate(date);
                    const dayKey = `week-${date.getTime()}`;
                    const isHovered = hoveredDay === dayKey;

                    return (
                        <div
                            key={index}
                            className={`day-item ${isToday ? 'today' : ''} ${quote ? 'has-quote' : ''}`}
                            onMouseEnter={() => setHoveredDay(dayKey)}
                            onMouseLeave={() => setHoveredDay(null)}
                        >
                            <div className="day-name">{DAY_NAMES[index]}</div>
                            <div className="day-number">{date.getDate()}</div>
                            <div className="day-lunar">{lunar}</div>
                            
                            {quote && isHovered && (
                                <div className="quote-tooltip">
                                    <div className="quote-text">"{quote.quote}"</div>
                                    <div className="quote-author">— {quote.author}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Expand/Collapse Button */}
            <button 
                className="expand-btn-simple"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Thu gọn" : "Xem thêm"}
            >
                {isExpanded ? '▲' : '▼'}
            </button>

            {/* Full Month View - Expandable */}
            <div className={`month-view ${isExpanded ? 'expanded' : ''}`}>
                <div className="month-grid-header">
                    {DAY_NAMES.map((dayName, idx) => (
                        <div key={idx} className="grid-day-name">{dayName}</div>
                    ))}
                </div>
                <div className="month-grid">
                    {monthDays.map((date, index) => {
                        if (!date) {
                            return <div key={index} className="grid-day-item empty"></div>;
                        }

                        const isToday = date.getDate() === todayDate &&
                            date.getMonth() === currentDate.getMonth();
                        const lunar = getLunarDate(date);
                        const quote = getQuoteForDate(date);
                        const dayKey = `month-${date.getTime()}`;
                        const isHovered = hoveredDay === dayKey;

                        return (
                            <div
                                key={index}
                                className={`grid-day-item ${isToday ? 'today' : ''} ${quote ? 'has-quote' : ''}`}
                                onMouseEnter={() => setHoveredDay(dayKey)}
                                onMouseLeave={() => setHoveredDay(null)}
                            >
                                <div className="grid-day-number">{date.getDate()}</div>
                                <div className="grid-day-lunar">{lunar}</div>
                                
                                {quote && isHovered && (
                                    <div className="quote-tooltip">
                                        <div className="quote-text">"{quote.quote}"</div>
                                        <div className="quote-author">— {quote.author}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MiniCalendar;
