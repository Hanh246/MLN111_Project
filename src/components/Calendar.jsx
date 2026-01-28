import { useState, useEffect, useMemo, useCallback } from 'react';
import DayCell from './DayCell';
import { MONTH_NAMES, DAY_NAMES } from '../utils/constants';
import './Calendar.css';

/**
 * Calendar Component - Optimized with Hash Map Lookup
 * 
 * @param {Array} quotes - Array of quote objects
 * @param {Function} onMonthChange - Callback when month changes
 * @param {Array} favorites - Array of favorite quote objects
 * @param {Function} onToggleFavorite - Callback to toggle favorite status
 */
function Calendar({ quotes, onMonthChange, favorites = [], onToggleFavorite }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Notify parent when month changes
    useEffect(() => {
        if (onMonthChange) {
            onMonthChange(currentDate.getMonth() + 1); // 1-12
        }
    }, [currentDate, onMonthChange]);

    // PERFORMANCE OPTIMIZATION: Create Hash Map for O(1) quote lookup
    // Instead of using .find() in every render (O(N)), we build a lookup table once
    const quotesMap = useMemo(() => {
        const map = {};
        quotes.forEach(quote => {
            const key = `${quote.month}-${quote.day}`;
            map[key] = quote;
        });
        return map;
    }, [quotes]);

    // PERFORMANCE OPTIMIZATION: Create Set for O(1) favorite lookup
    const favoritesSet = useMemo(() => {
        const set = new Set();
        favorites.forEach(fav => {
            // Create unique key from quote properties
            const key = `${fav.month}-${fav.day}-${fav.author}`;
            set.add(key);
        });
        return set;
    }, [favorites]);

    // Check if a quote is favorited - O(1) lookup
    const isFavorite = useCallback((quote) => {
        if (!quote) return false;
        const key = `${quote.month}-${quote.day}-${quote.author}`;
        return favoritesSet.has(key);
    }, [favoritesSet]);

    // Memoize expensive date calculations
    const days = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const result = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < startingDayOfWeek; i++) {
            result.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            result.push(day);
        }

        return result;
    }, [currentDate]);

    const goToPreviousMonth = useCallback(() => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    }, []);

    const goToNextMonth = useCallback(() => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    }, []);

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    // OPTIMIZED: O(1) quote lookup using hash map
    const getQuoteForDay = useCallback((day) => {
        if (!day) return null;
        const month = currentDate.getMonth() + 1; // 1-12
        const key = `${month}-${day}`;
        return quotesMap[key] || null;
    }, [currentDate, quotesMap]);

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return (
        <div className="calendar-container glass-card">
            <div className="calendar-header">
                <button
                    className="nav-button"
                    onClick={goToPreviousMonth}
                    aria-label="Tháng trước"
                >
                    ‹
                </button>
                <h2 className="calendar-title">
                    {MONTH_NAMES[month]} {year}
                </h2>
                <button
                    className="nav-button"
                    onClick={goToNextMonth}
                    aria-label="Tháng sau"
                >
                    ›
                </button>
            </div>

            <div className="calendar-grid">
                {DAY_NAMES.map((dayName) => (
                    <div key={dayName} className="day-name">
                        {dayName}
                    </div>
                ))}

                {days.map((day, index) => {
                    const quote = getQuoteForDay(day);
                    return (
                        <DayCell
                            key={index}
                            day={day}
                            isToday={isToday(day)}
                            quote={quote}
                            isFavorite={quote ? isFavorite(quote) : false}
                            onToggleFavorite={onToggleFavorite}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
