import { useState, useEffect } from 'react';
import { LOCALE, DATE_FORMAT_OPTIONS } from '../utils/constants';
import './Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString(LOCALE, DATE_FORMAT_OPTIONS.time);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(LOCALE, DATE_FORMAT_OPTIONS.dateLong);
  };

  return (
    <div className="clock-container glass-card">
      <div className="clock-time">{formatTime(time)}</div>
      <div className="clock-date">{formatDate(time)}</div>
    </div>
  );
}

export default Clock;
