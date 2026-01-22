import { useState } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';

function Flashcard({ card, onFlip }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
        if (onFlip) onFlip(!isFlipped);
    };

    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    <div className="card-icon">❓</div>
                    <h3 className="card-question">{card.question}</h3>
                    <p className="card-hint">Click để xem đáp án</p>
                </div>
                <div className="flashcard-back">
                    <div className="card-icon">💡</div>
                    <p className="card-answer">{card.answer}</p>
                    <span className="card-concept">{card.concept}</span>
                </div>
            </div>
        </div>
    );
}

Flashcard.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        concept: PropTypes.string.isRequired,
    }).isRequired,
    onFlip: PropTypes.func
};

export default Flashcard;
