import { useState, useEffect } from 'react';
import { LOCALE, DATE_FORMAT_OPTIONS } from '../utils/constants';
import './Clock.css';

function Clock() {
  // Fix SSR hydration: initialize as null
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set initial time after mount
    setTime(new Date());
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 11) {
      return { text: 'Chào buổi sáng', emoji: '☀️' };
    } else if (hour >= 11 && hour < 13) {
      return { text: 'Chào buổi trưa', emoji: '🌤️' };
    } else if (hour >= 13 && hour < 18) {
      return { text: 'Chào buổi chiều', emoji: '🌅' };
    } else if (hour >= 18 && hour < 22) {
      return { text: 'Chào buổi tối', emoji: '🌙' };
    } else {
      return { text: 'Chúc ngủ ngon', emoji: '🌃' };
    }
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return { hours, minutes, seconds };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(LOCALE, DATE_FORMAT_OPTIONS.dateLong);
  };

  // Handle null state during SSR/initial render
  if (!time) {
    return (
      <div className="clock-container glass-card">
        <div className="clock-loading">Loading...</div>
      </div>
    );
  }

  const greeting = getGreeting(time.getHours());
  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div className="clock-container glass-card">
      <div className="clock-greeting">
        <span className="greeting-emoji">{greeting.emoji}</span>
        <span className="greeting-text">{greeting.text}</span>
      </div>
      
      <div className="clock-time">
        <span className="time-segment">{hours}</span>
        <span className="clock-separator">:</span>
        <span className="time-segment">{minutes}</span>
        <span className="clock-separator">:</span>
        <span className="time-segment">{seconds}</span>
      </div>
      
      <div className="clock-date">{formatDate(time)}</div>
    </div>
  );
}

export default Clock;