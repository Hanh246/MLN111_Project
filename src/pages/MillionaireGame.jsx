import { useState, useMemo, useCallback } from 'react';
import GameAnswer from '../components/GameAnswer';
import gameQuestions from '../data/gameQuestions';
import {
  GAME_CONSTANTS,
  getHintFromHelper,
  simulateAudienceVotes,
  getFiftyFiftyAnswers,
} from '../utils/gameHelpers';
import './MillionaireGame.css';

function MillionaireGame() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askAudience: true,
    phoneMarx: true,
    phoneLenin: true,
    phoneEngels: true
  });
  const [eliminatedAnswers, setEliminatedAnswers] = useState([]);
  const [audienceVotes, setAudienceVotes] = useState(null);
  const [helperAnswer, setHelperAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  const question = gameQuestions[currentQuestion];
  
  // Memoize money tree to avoid recreating on every render
  const moneyTree = useMemo(
    () => gameQuestions.map(q => q.prize).reverse(),
    []
  );

  // Event handlers with useCallback
  const handleAnswerClick = useCallback((answerId) => {
    if (isAnswerLocked) return;
    setSelectedAnswer(answerId);
  }, [isAnswerLocked]);

  const handleFinalAnswer = useCallback(() => {
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
          setHelperAnswer(null);
        }
      } else {
        setGameStatus('lost');
      }
    }, GAME_CONSTANTS.ANSWER_FEEDBACK_DELAY);
  }, [selectedAnswer, question, currentQuestion]);

  // Lifeline: 50:50
  const useFiftyFifty = useCallback(() => {
    if (!lifelines.fiftyFifty) return;
    
    const toEliminate = getFiftyFiftyAnswers(question.answers);
    setEliminatedAnswers(toEliminate);
    setLifelines({ ...lifelines, fiftyFifty: false });
  }, [lifelines, question]);

  // Lifeline: Ask Audience
  const useAskAudience = useCallback(() => {
    if (!lifelines.askAudience) return;
    
    const votes = simulateAudienceVotes(question.answers);
    setAudienceVotes(votes);
    setLifelines({ ...lifelines, askAudience: false });
  }, [lifelines, question]);

  // Unified phone helper function
  const usePhoneHelper = useCallback((helperKey, lifelineKey) => {
    if (!lifelines[lifelineKey]) return;
    
    const correctAnswer = question.answers.find(a => a.correct);
    const hint = getHintFromHelper(helperKey, correctAnswer.id);
    
    setHelperAnswer(hint);
    setLifelines({ ...lifelines, [lifelineKey]: false });
  }, [lifelines, question]);

  // Individual helper functions
  const usePhoneMarx = useCallback(() => usePhoneHelper('marx', 'phoneMarx'), [usePhoneHelper]);
  const usePhoneLenin = useCallback(() => usePhoneHelper('lenin', 'phoneLenin'), [usePhoneHelper]);
  const usePhoneEngels = useCallback(() => usePhoneHelper('engels', 'phoneEngels'), [usePhoneHelper]);

  const startGame = useCallback(() => {
    setShowIntro(false);
  }, []);

  const resetGame = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setGameStatus('playing');
    setLifelines({ 
      fiftyFifty: true, 
      askAudience: true, 
      phoneMarx: true,
      phoneLenin: true,
      phoneEngels: true 
    });
    setEliminatedAnswers([]);
    setAudienceVotes(null);
    setHelperAnswer(null);
    setIsAnswerLocked(false);
    setShowIntro(false);
  }, []);

  // Render intro screen
  if (showIntro) {
    return (
      <div className="millionaire-game">
        <div className="game-intro">
          <h1 className="intro-title">
            <span className="title-icon">💰</span>
            Ai Là Triệu Phú
            <span className="title-icon">💰</span>
          </h1>
          <h2 className="intro-subtitle">Triết Học Mác-Lênin</h2>
          
          <div className="game-rules">
            <h3>📋 Luật Chơi</h3>
            <ul>
              <li>🎯 <strong>15 câu hỏi</strong> với độ khó tăng dần</li>
              <li>💵 Mỗi câu trả lời đúng sẽ tăng tiền thưởng</li>
              <li>❌ Trả lời sai → Kết thúc game</li>
              <li>🎁 Trả lời đúng hết 15 câu → Chiến thắng <strong>500 triệu VNĐ</strong></li>
            </ul>
            
            <h3>🆘 Quyền Trợ Giúp (5 quyền)</h3>
            <ul>
              <li><strong>50:50</strong> - Loại bỏ 2 đáp án sai</li>
              <li><strong>👥 Hỏi Khán Giả</strong> - Xem phần trăm bình chọn</li>
              <li><strong>📞 Gọi Marx</strong> - Nhận gợi ý từ Karl Marx</li>
              <li><strong>📞 Gọi Lenin</strong> - Nhận gợi ý từ Vladimir Lenin</li>
              <li><strong>📞 Gọi Engels</strong> - Nhận gợi ý từ Friedrich Engels</li>
            </ul>
            
            <div className="rules-note">
              💡 <em>Mỗi quyền trợ giúp chỉ dùng được 1 lần!</em>
            </div>
          </div>
          
          <button className="start-game-btn" onClick={startGame}>
            🎮 Bắt Đầu Chơi
          </button>
        </div>
      </div>
    );
  }

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
                <GameAnswer
                  key={answer.id}
                  answer={answer}
                  isEliminated={isEliminated}
                  isSelected={isSelected}
                  showCorrect={showCorrect}
                  showWrong={showWrong}
                  audienceVote={audienceVotes?.[answer.id]}
                  onClick={handleAnswerClick}
                  disabled={isEliminated || isAnswerLocked}
                />
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
            <button 
              className={`lifeline-btn ${!lifelines.phoneLenin ? 'used' : ''}`}
              onClick={usePhoneLenin}
              disabled={!lifelines.phoneLenin || isAnswerLocked}
              title="Gọi cho Lenin"
            >
              📞 Lenin
            </button>
            <button 
              className={`lifeline-btn ${!lifelines.phoneEngels ? 'used' : ''}`}
              onClick={usePhoneEngels}
              disabled={!lifelines.phoneEngels || isAnswerLocked}
              title="Gọi cho Engels"
            >
              📞 Engels
            </button>
          </div>

          {/* Helper Answer Display */}
          {helperAnswer && (
            <div className="helper-answer">
              <div className="helper-avatar">📞 {helperAnswer.name}:</div>
              <div className="helper-text">{helperAnswer.text}</div>
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
