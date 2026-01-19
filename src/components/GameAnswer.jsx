import { memo } from 'react';

/**
 * Individual answer button component for the Millionaire game
 * Memoized to prevent unnecessary re-renders
 */
const GameAnswer = memo(function GameAnswer({
  answer,
  isEliminated,
  isSelected,
  showCorrect,
  showWrong,
  audienceVote,
  onClick,
  disabled,
}) {
  const className = [
    'answer-btn',
    isEliminated && 'eliminated',
    isSelected && 'selected',
    showCorrect && 'correct',
    showWrong && 'wrong',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      onClick={() => onClick(answer.id)}
      disabled={disabled}
    >
      <span className="answer-letter">{answer.id}</span>
      <span className="answer-text">{answer.text}</span>
      {audienceVote !== null && audienceVote !== undefined && (
        <span className="audience-vote">{audienceVote}%</span>
      )}
    </button>
  );
});

export default GameAnswer;
