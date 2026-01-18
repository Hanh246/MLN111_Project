import { useState } from 'react';
import Clock from '../components/Clock';
import MiniCalendar from '../components/MiniCalendar';
import monthlyLessons from '../data/monthlyLessons';
import './LearningPage.css';

function LearningPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const selectedMonth = currentDate.getMonth() + 1; // 1-12, derived from currentDate

    const lesson = monthlyLessons.find(l => l.month === selectedMonth) || monthlyLessons[0];

    // Handle month button clicks
    const handleMonthSelect = (month) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(month - 1);
        setCurrentDate(newDate);
    };

    return (
        <div className="learning-page">
            {/* MSN-style Gradient Background */}
            <div className="learning-background"></div>

            <div className="learning-content">
                {/* Header with Title and Clock */}
                <header className="learning-header">
                    <h1 className="learning-title">365 Ngày Với Mác-Lênin</h1>
                    <p className="learning-subtitle">Một Năm Hành Trình Triết Học Cách Mạng</p>
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
                <MiniCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} />

                {/* Lesson Content */}
                <div className="lesson-container">
                    {/* Theme Title */}
                    <div className="theme-card">
                        <h2 className="theme-title">{lesson.theme}</h2>
                        <p className="theme-intro">{lesson.introduction}</p>
                    </div>

                    {/* Concept Cards */}
                    <div className="concepts-grid">
                        {lesson.concepts.map((concept, index) => (
                            <div key={index} className="concept-card">
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
                    <div className="summary-card">
                        <h3>Tóm tắt</h3>
                        <p>{lesson.summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningPage;
