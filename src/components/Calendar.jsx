import { useState, useEffect, useMemo, useCallback } from 'react';
import DayCell from './DayCell';
import { MONTH_NAMES, DAY_NAMES } from '../utils/constants';
import './Calendar.css';

function Calendar({ quotes, onMonthChange }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Notify parent when month changes
    useEffect(() => {
        if (onMonthChange) {
            onMonthChange(currentDate.getMonth() + 1); // 1-12
        }
    }, [currentDate, onMonthChange]);

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

    const getQuoteForDay = useCallback((day) => {
        if (!day) return null;
        const month = currentDate.getMonth() + 1; // 1-12
        return quotes.find(q => q.month === month && q.day === day);
    }, [currentDate, quotes]);

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

                {days.map((day, index) => (
                    <DayCell
                        key={index}
                        day={day}
                        isToday={isToday(day)}
                        quote={getQuoteForDay(day)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Calendar;
