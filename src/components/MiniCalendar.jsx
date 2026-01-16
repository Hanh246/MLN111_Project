import { useState } from 'react';
import { Solar } from 'lunar-javascript';
import './MiniCalendar.css';

function MiniCalendar() {
    const [currentDate] = useState(new Date());

    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    // Get current week days
    const getWeekDays = () => {
        const week = [];
        const today = currentDate.getDay(); // 0-6 (Sunday-Saturday)

        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - today + i);
            week.push(date);
        }

        return week;
    };

    const weekDays = getWeekDays();
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
            </div>

            <div className="week-view">
                {weekDays.map((date, index) => {
                    const isToday = date.getDate() === todayDate &&
                        date.getMonth() === currentDate.getMonth();
                    const lunar = getLunarDate(date);

                    return (
                        <div
                            key={index}
                            className={`day-item ${isToday ? 'today' : ''}`}
                        >
                            <div className="day-name">{dayNames[index]}</div>
                            <div className="day-number">{date.getDate()}</div>
                            <div className="day-lunar">{lunar}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MiniCalendar;
