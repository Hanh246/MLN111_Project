import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Solar } from "lunar-javascript";
import { DAY_NAMES, MONTH_NAMES } from "../utils/constants";
import quotes from "../data/quotes";
import QuoteTooltip from "./QuoteTooltip";
import "./MiniCalendar.css";

function MiniCalendar({
  currentDate,
  setCurrentDate,
  isFavorite,
  onToggleFavorite,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth());
  const [displayYear, setDisplayYear] = useState(currentDate.getFullYear());
  const todayRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Convert to lunar date using lunar-javascript
  const getLunarDate = useCallback((date) => {
    try {
      const solar = Solar.fromYmd(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
      );
      const lunar = solar.getLunar();
      return `${lunar.getDay()}/${lunar.getMonth()}`;
    } catch (error) {
      console.error("Lunar conversion error:", error);
      return "--/--";
    }
  }, []);

  // Memoize current lunar date
  const currentLunar = useMemo(
    () => getLunarDate(currentDate),
    [currentDate, getLunarDate],
  );

  // Create extended day list (60 days before and after today)
  const extendedDays = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = -60; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  }, []);

  // Auto-scroll to today on mount
  useEffect(() => {
    if (todayRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const todayElement = todayRef.current;

      // Calculate center position
      const containerWidth = container.offsetWidth;
      const elementWidth = todayElement.offsetWidth;
      const elementLeft = todayElement.offsetLeft;

      // Scroll to center the today element
      container.scrollLeft =
        elementLeft - containerWidth / 2 + elementWidth / 2;
    }
  }, []);

  // Handle scroll to detect center day and update month
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const centerPosition = scrollLeft + containerWidth / 2;

    // Find which day is at the center
    const dayElements = container.querySelectorAll(".day-item");
    let centerDay = null;

    dayElements.forEach((element, index) => {
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const elementCenter = elementLeft + elementWidth / 2;

      if (Math.abs(elementCenter - centerPosition) < elementWidth / 2) {
        centerDay = extendedDays[index];
      }
    });

    if (centerDay) {
      const month = centerDay.getMonth();
      const year = centerDay.getFullYear();

      if (month !== displayMonth || year !== displayYear) {
        setDisplayMonth(month);
        setDisplayYear(year);
      }
    }
  }, [extendedDays, displayMonth, displayYear]);

  // Get all days in the current month for expanded view
  const monthDays = useMemo(() => {
    const year = displayYear;
    const month = displayMonth;
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
  }, [displayMonth, displayYear]);

  // Get quote for a specific date - memoized
  const getQuoteForDate = useCallback((date) => {
    if (!date) return null;
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();
    return quotes.find((q) => q.month === month && q.day === day);
  }, []);


  const today = new Date();
  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <div className="current-date">
          <div className="solar-date">{currentDate.getDate()}</div>
          <div className="month-year">
            {MONTH_NAMES[displayMonth]}, {displayYear}
          </div>
          <div className="lunar-date">🌙 Âm lịch: {currentLunar}</div>
        </div>
      </div>

      {/* Horizontal Scrollable Week View */}
      <div
        className="week-view-horizontal"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {extendedDays.map((date, index) => {
          const isTodayDate = isToday(date);
          const lunar = getLunarDate(date);
          const quote = getQuoteForDate(date);
          const dayKey = `day-${date.getTime()}`;
          const isHovered = hoveredDay === dayKey;
          const isFav = quote && isFavorite ? isFavorite(quote) : false;

          return (
            <div
              key={index}
              ref={isTodayDate ? todayRef : null}
              className={`day-item ${isTodayDate ? "today" : ""} ${quote ? "has-quote" : ""} ${isFav ? "favorited" : ""}`}
              onMouseEnter={() => setHoveredDay(dayKey)}
              onMouseLeave={() => setHoveredDay(null)}
              onDoubleClick={() =>
                quote && onToggleFavorite && onToggleFavorite(quote)
              }
              title={quote ? "Double click để lưu/bỏ lưu" : ""}
            >
              <div className="day-name">{DAY_NAMES[date.getDay()]}</div>
              <div className="day-number">{date.getDate()}</div>
              <div className="day-lunar">{lunar}</div>

              {quote && isHovered && (
                <QuoteTooltip
                  quote={quote}
                  isFavorite={isFav}
                  onToggleFavorite={onToggleFavorite}
                />
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
        {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
      </button>

      {/* Full Month View - Expandable */}
      <div className={`month-view ${isExpanded ? "expanded" : ""}`}>
        <div className="month-grid-header">
          {DAY_NAMES.map((dayName, idx) => (
            <div key={idx} className="grid-day-name">
              {dayName}
            </div>
          ))}
        </div>
        <div className="month-grid">
          {monthDays.map((date, index) => {
            if (!date) {
              return <div key={index} className="grid-day-item empty"></div>;
            }

            const isTodayDate = isToday(date);
            const lunar = getLunarDate(date);
            const quote = getQuoteForDate(date);
            const dayKey = `month-${date.getTime()}`;
            const isHovered = hoveredDay === dayKey;
            const isFav = quote && isFavorite ? isFavorite(quote) : false;

            return (
              <div
                key={index}
                className={`grid-day-item ${isTodayDate ? "today" : ""} ${quote ? "has-quote" : ""} ${isFav ? "favorited" : ""}`}
                onMouseEnter={() => setHoveredDay(dayKey)}
                onMouseLeave={() => setHoveredDay(null)}
                onDoubleClick={() =>
                  quote && onToggleFavorite && onToggleFavorite(quote)
                }
                title={quote ? "Double click để lưu/bỏ lưu" : ""}
              >
                <div className="grid-day-number">{date.getDate()}</div>
                <div className="grid-day-lunar">{lunar}</div>

                {quote && isHovered && (
                  <QuoteTooltip
                    quote={quote}
                    isFavorite={isFav}
                    onToggleFavorite={onToggleFavorite}
                  />
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
