import { useState } from 'react';
import Clock from '../components/Clock';
import MiniCalendar from '../components/MiniCalendar';
import monthlyLessons from '../data/monthlyLessons';
import './LearningPage.css';

function LearningPage() {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const lesson = monthlyLessons.find(l => l.month === selectedMonth) || monthlyLessons[0];

    return (
        <div className="learning-page">
            {/* MSN-style Gradient Background */}
            <div className="learning-background"></div>

            <div className="learning-content">
                {/* Header with Title and Clock */}
                <header className="learning-header">
                    <h1 className="learning-title">Lịch Triết Học Mác-Lênin</h1>
                    <p className="learning-subtitle">Khóa học 12 tháng</p>
                    <Clock />
                </header>

                {/* Month Selector */}
                <div className="month-selector">
                    {monthlyLessons.map((l) => (
                        <button
                            key={l.month}
                            className={`month-btn ${selectedMonth === l.month ? 'active' : ''}`}
                            onClick={() => setSelectedMonth(l.month)}
                        >
                            Tháng {l.month}
                        </button>
                    ))}
                </div>

                {/* Mini Calendar with Lunar Dates */}
                <MiniCalendar />

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
