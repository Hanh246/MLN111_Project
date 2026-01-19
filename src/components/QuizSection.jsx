import { useState, memo } from 'react';
import { IoCheckmarkCircle, IoCloseCircle, IoRefresh, IoTrophy } from 'react-icons/io5';
import './QuizSection.css';

const QuizSection = memo(function QuizSection({ quiz, month }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return null;
    }

    const questions = quiz.questions;
    const current = questions[currentQuestion];

    const handleSelectAnswer = (index) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        
        const isCorrect = selectedAnswer === current.correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        
        setAnswered([...answered, { questionIndex: currentQuestion, correct: isCorrect }]);
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizComplete(true);
            // Save result to localStorage
            const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
            quizResults[month] = {
                score,
                total: questions.length,
                completedAt: new Date().toISOString()
            };
            localStorage.setItem('quizResults', JSON.stringify(quizResults));
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setAnswered([]);
        setQuizComplete(false);
    };

    // Quiz Complete Screen
    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="quiz-section">
                <h3 className="quiz-title">
                    <IoTrophy className="section-icon" /> Kết Quả Quiz
                </h3>
                <div className="quiz-complete">
                    <div className={`score-circle ${percentage >= 70 ? 'high' : percentage >= 50 ? 'medium' : 'low'}`}>
                        <span className="score-number">{score}/{questions.length}</span>
                        <span className="score-percent">{percentage}%</span>
                    </div>
                    <p className="score-message">
                        {percentage >= 70 
                            ? '🎉 Xuất sắc! Bạn nắm vững kiến thức!'
                            : percentage >= 50 
                            ? '👍 Khá tốt! Hãy ôn lại bài học nhé!'
                            : '📚 Cần ôn tập thêm! Đọc lại bài học và thử lại!'}
                    </p>
                    <button className="quiz-btn restart-btn" onClick={handleRestart}>
                        <IoRefresh /> Làm Lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-section">
            <h3 className="quiz-title">
                📝 Quiz Kiểm Tra - Tháng {month}
            </h3>
            
            <div className="quiz-progress">
                <span>Câu {currentQuestion + 1}/{questions.length}</span>
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="quiz-question">
                <p className="question-text">{current.question}</p>
                
                <div className="options-list">
                    {current.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${selectedAnswer === index ? 'selected' : ''} 
                                ${showResult && index === current.correctAnswer ? 'correct' : ''}
                                ${showResult && selectedAnswer === index && index !== current.correctAnswer ? 'wrong' : ''}`}
                            onClick={() => handleSelectAnswer(index)}
                            disabled={showResult}
                        >
                            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                            <span className="option-text">{option}</span>
                            {showResult && index === current.correctAnswer && <IoCheckmarkCircle className="result-icon correct" />}
                            {showResult && selectedAnswer === index && index !== current.correctAnswer && <IoCloseCircle className="result-icon wrong" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="quiz-actions">
                {!showResult ? (
                    <button 
                        className="quiz-btn submit-btn" 
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        Trả Lời
                    </button>
                ) : (
                    <button className="quiz-btn next-btn" onClick={handleNext}>
                        {currentQuestion < questions.length - 1 ? 'Câu Tiếp' : 'Xem Kết Quả'}
                    </button>
                )}
            </div>
        </div>
    );
});

export default QuizSection;
