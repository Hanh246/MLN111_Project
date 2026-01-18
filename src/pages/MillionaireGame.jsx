import { useState } from 'react';
import gameQuestions from '../data/gameQuestions';
import './MillionaireGame.css';

function MillionaireGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askAudience: true,
    phoneMarx: true
  });
  const [eliminatedAnswers, setEliminatedAnswers] = useState([]);
  const [audienceVotes, setAudienceVotes] = useState(null);
  const [marxAnswer, setMarxAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  const question = gameQuestions[currentQuestion];
  const moneyTree = gameQuestions.map(q => q.prize).reverse();

  // Helper functions
  const handleAnswerClick = (answerId) => {
    if (isAnswerLocked || selectedAnswer) return;
    setSelectedAnswer(answerId);
  };

  const handleFinalAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerLocked(true);

    const correct = question.answers.find(a => a.id === selectedAnswer)?.correct;
    
    setTimeout(() => {
      if (correct) {
        if (currentQuestion === gameQuestions.length - 1) {
          setGameStatus('won');
        } else {
          // Next question
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsAnswerLocked(false);
          setEliminatedAnswers([]);
          setAudienceVotes(null);
          setMarxAnswer(null);
        }
      } else {
        setGameStatus('lost');
      }
    }, 2000);
  };

  // Lifeline: 50:50
  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty) return;
    
    const correctAnswer = question.answers.find(a => a.correct);
    const wrongAnswers = question.answers.filter(a => !a.correct);
    const toEliminate = wrongAnswers.slice(0, 2).map(a => a.id);
    
    setEliminatedAnswers(toEliminate);
    setLifelines({ ...lifelines, fiftyFifty: false });
  };

  // Lifeline: Ask Audience
  const useAskAudience = () => {
    if (!lifelines.askAudience) return;
    
    const correctAnswer = question.answers.find(a => a.correct);
    // Simulate audience votes (correct answer gets most votes)
    const votes = {};
    question.answers.forEach(answer => {
      if (answer.correct) {
        votes[answer.id] = 60 + Math.random() * 30; // 60-90%
      } else {
        votes[answer.id] = Math.random() * 15; // 0-15%
      }
    });
    
    // Normalize to 100%
    const total = Object.values(votes).reduce((a, b) => a + b, 0);
    Object.keys(votes).forEach(key => {
      votes[key] = Math.round((votes[key] / total) * 100);
    });
    
    setAudienceVotes(votes);
    setLifelines({ ...lifelines, askAudience: false });
  };

  // Lifeline: Phone Marx
  const usePhoneMarx = () => {
    if (!lifelines.phoneMarx) return;
    
    const correctAnswer = question.answers.find(a => a.correct);
    const hints = [
      `Đồng chí ơi, tôi khá chắc đáp án là ${correctAnswer.id}. Tin tôi đi!`,
      `Theo lý thuyết của tôi, câu trả lời phải là ${correctAnswer.id}.`,
      `Tôi đã nghiên cứu vấn đề này, tôi nghĩ là ${correctAnswer.id}!`,
      `${correctAnswer.id} chính là đáp án đúng, tôi 90% chắc chắn!`
    ];
    
    setMarxAnswer(hints[Math.floor(Math.random() * hints.length)]);
    setLifelines({ ...lifelines, phoneMarx: false });
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setGameStatus('playing');
    setLifelines({ fiftyFifty: true, askAudience: true, phoneMarx: true });
    setEliminatedAnswers([]);
    setAudienceVotes(null);
    setMarxAnswer(null);
    setIsAnswerLocked(false);
  };

  // Render win/lose screens
  if (gameStatus === 'won') {
    return (
      <div className="millionaire-game">
        <div className="game-result won">
          <h1>🎉 CHÚC MỪNG! 🎉</h1>
          <h2>Bạn đã chiến thắng!</h2>
          <p className="prize-won">500,000,000 VNĐ</p>
          <p className="result-message">Bạn là bậc thầy triết học Mác-Lênin!</p>
          <button className="restart-btn" onClick={resetGame}>
            Chơi lại
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    const prizeWon = currentQuestion > 0 ? gameQuestions[currentQuestion - 1].prize : '0 VNĐ';
    return (
      <div className="millionaire-game">
        <div className="game-result lost">
          <h1>😢 TIẾC QUÁ!</h1>
          <h2>Câu trả lời không chính xác</h2>
          <p className="prize-won">{prizeWon}</p>
          <p className="result-message">Hãy học thêm và thử lại nhé!</p>
          <button className="restart-btn" onClick={resetGame}>
            Chơi lại
          </button>
        </div>
      </div>
    );
  }

  // Main game screen
  return (
    <div className="millionaire-game">
      <div className="game-container">
        {/* Money Tree */}
        <div className="money-tree">
          <h3>THANG ĐIỂM</h3>
          {moneyTree.map((prize, idx) => {
            const level = moneyTree.length - idx;
            const isCurrent = level === currentQuestion + 1;
            const isPassed = level < currentQuestion + 1;
            return (
              <div 
                key={level}
                className={`money-level ${isCurrent ? 'current' : ''} ${isPassed ? 'passed' : ''}`}
              >
                <span className="level-number">{level}</span>
                <span className="level-prize">{prize}</span>
              </div>
            );
          })}
        </div>

        {/* Main Game Area */}
        <div className="game-area">
          {/* Question */}
          <div className="question-container">
            <div className="question-number">
              Câu {currentQuestion + 1}/15
            </div>
            <div className="question-text">
              {question.question}
            </div>
          </div>

          {/* Answers */}
          <div className="answers-grid">
            {question.answers.map(answer => {
              const isEliminated = eliminatedAnswers.includes(answer.id);
              const isSelected = selectedAnswer === answer.id;
              const showCorrect = isAnswerLocked && answer.correct;
              const showWrong = isAnswerLocked && isSelected && !answer.correct;

              return (
                <button
                  key={answer.id}
                  className={`answer-btn ${isEliminated ? 'eliminated' : ''} ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                  onClick={() => handleAnswerClick(answer.id)}
                  disabled={isEliminated || isAnswerLocked}
                >
                  <span className="answer-letter">{answer.id}</span>
                  <span className="answer-text">{answer.text}</span>
                  {audienceVotes && (
                    <span className="audience-vote">{audienceVotes[answer.id]}%</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Lifelines */}
          <div className="lifelines">
            <button 
              className={`lifeline-btn ${!lifelines.fiftyFifty ? 'used' : ''}`}
              onClick={useFiftyFifty}
              disabled={!lifelines.fiftyFifty || isAnswerLocked}
              title="50:50 - Loại bỏ 2 đáp án sai"
            >
              50:50
            </button>
            <button 
              className={`lifeline-btn ${!lifelines.askAudience ? 'used' : ''}`}
              onClick={useAskAudience}
              disabled={!lifelines.askAudience || isAnswerLocked}
              title="Hỏi khán giả"
            >
              👥 Khán giả
            </button>
            <button 
              className={`lifeline-btn ${!lifelines.phoneMarx ? 'used' : ''}`}
              onClick={usePhoneMarx}
              disabled={!lifelines.phoneMarx || isAnswerLocked}
              title="Gọi cho Marx"
            >
              📞 Marx
            </button>
          </div>

          {/* Marx Answer Display */}
          {marxAnswer && (
            <div className="marx-answer">
              <div className="marx-avatar">📞 Karl Marx:</div>
              <div className="marx-text">{marxAnswer}</div>
            </div>
          )}

          {/* Final Answer Button */}
          <button 
            className="final-answer-btn"
            onClick={handleFinalAnswer}
            disabled={!selectedAnswer || isAnswerLocked}
          >
            Chốt đáp án
          </button>
        </div>
      </div>
    </div>
  );
}

export default MillionaireGame;
