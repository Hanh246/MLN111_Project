import { useState, useEffect } from 'react';
import DayCell from './DayCell';
import './Calendar.css';

function Calendar({ quotes, onMonthChange }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư',
        'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
        'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'
    ];

    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    // Notify parent when month changes
    useEffect(() => {
        if (onMonthChange) {
            onMonthChange(currentDate.getMonth() + 1); // 1-12
        }
    }, [currentDate, onMonthChange]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
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
            days.push(day);
        }

        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const getQuoteForDay = (day) => {
        if (!day) return null;
        const month = currentDate.getMonth() + 1; // 1-12
        return quotes.find(q => q.month === month && q.day === day);
    };

    const days = getDaysInMonth(currentDate);
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
                    {monthNames[month]} {year}
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
                {dayNames.map((dayName) => (
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
