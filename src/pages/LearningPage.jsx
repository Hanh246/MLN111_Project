import { useState, useCallback, useMemo } from 'react';
import Clock from '../components/Clock';
import MiniCalendar from '../components/MiniCalendar';
import FavoriteQuotes from '../components/FavoriteQuotes';
import QuizSection from '../components/QuizSection';
import FlashcardDeck from '../components/FlashcardDeck';
import ChatBot from '../components/ChatBot';
import VideoWidget from '../components/VideoWidget';
import monthlyLessons from '../data/monthlyLessons';
import monthlyQuizzes from '../data/monthlyQuizzes';
import { useFavorites } from '../hooks/useFavorites';
import './LearningPage.css';

function LearningPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const selectedMonth = currentDate.getMonth() + 1; // 1-12, derived from currentDate
    
    // Favorites hook
    const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();

    // Memoize lesson lookup
    const lesson = useMemo(
        () => monthlyLessons.find(l => l.month === selectedMonth) || monthlyLessons[0],
        [selectedMonth]
    );

    // Memoize quiz lookup
    const quiz = useMemo(
        () => monthlyQuizzes.find(q => q.month === selectedMonth),
        [selectedMonth]
    );

    // Handle month button clicks
    const handleMonthSelect = useCallback((month) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(month - 1);
        setCurrentDate(newDate);
    }, [currentDate]);

    return (
        <div className="learning-page">
            {/* MSN-style Gradient Background */}
            <div className="learning-background"></div>

            {/* Shooting Stars */}
            <div className="shooting-stars">
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
                <div className="shooting-star"></div>
            </div>

            <div className="learning-content">
                {/* Header with Title and Clock */}
                <header className="learning-header">
                    <h1 className="learning-title">365 Ngày Với Mác-Lênin</h1>
                    <p className="learning-subtitle">Nhóm 11</p>
                    <Clock />
                </header>

                {/* Month Selector */}
                <div className="month-selector">
                    {monthlyLessons.map((l) => (
                        <button
                            key={l.month}
                            className={`month-btn ${selectedMonth === l.month ? 'active' : ''}`}
                            onClick={() => handleMonthSelect(l.month)}
                        >
                            Tháng {l.month}
                        </button>
                    ))}
                </div>

                {/* Mini Calendar with Lunar Dates */}
                <div data-aos="fade">
                    <MiniCalendar 
                        currentDate={currentDate} 
                        setCurrentDate={setCurrentDate}
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                    />
                </div>

                {/* Lesson Content */}
                <div className="lesson-container">
                    {/* Theme Title */}
                    <div className="theme-card" data-aos="fade">
                        <h2 className="theme-title">{lesson.theme}</h2>
                        <p className="theme-intro">{lesson.introduction}</p>
                    </div>

                    {/* Concept Cards */}
                    <div className="concepts-grid">
                        {lesson.concepts.map((concept, index) => (
                            <div key={index} className="concept-card" data-aos="fade">
                                <h3 className="concept-title">
                                    <span className="concept-number">{index + 1}</span>
                                    {concept.title}
                                </h3>

                                <div className="concept-definition">
                                    <strong>Định nghĩa:</strong>
                                    <p>{concept.definition}</p>
                                </div>

                                <div className="concept-examples">
                                    <strong>Ví dụ:</strong>
                                    <ul>
                                        {concept.examples.map((example, idx) => (
                                            <li key={idx}>{example}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="summary-card" data-aos="fade">
                        <h3>Tóm tắt</h3>
                        <p>{lesson.summary}</p>
                    </div>
                </div>

                {/* Quiz Section - After Summary */}
                <div data-aos="fade">
                    <QuizSection quiz={quiz} month={selectedMonth} />
                </div>

                {/* Favorite Quotes Section */}
                <div data-aos="fade">
                    <FavoriteQuotes 
                        favorites={favorites}
                        onRemove={removeFavorite}
                    />
                </div>

                {/* Flashcards Section */}
                <div data-aos="fade">
                    <FlashcardDeck month={selectedMonth} />
                </div>
            </div>

            {/* AI ChatBot - Floating */}
            <ChatBot />

            {/* Video Widget - Floating */}
            {/*<VideoWidget month={selectedMonth} />*/}
        </div>
    );
}

export default LearningPage;
