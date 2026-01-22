import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Flashcard from './Flashcard';
import flashcardData from '../data/flashcardData';
import { IoChevronBack, IoChevronForward, IoShuffle, IoBook } from 'react-icons/io5';
import './FlashcardDeck.css';

function FlashcardDeck({ month }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter flashcards by month
    const cards = useMemo(() => {
        return flashcardData.filter(card => card.month === month);
    }, [month]);

    const totalCards = cards.length;
    const currentCard = cards[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalCards - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < totalCards - 1 ? prev + 1 : 0));
    };

    const handleShuffle = () => {
        const randomIndex = Math.floor(Math.random() * totalCards);
        setCurrentIndex(randomIndex);
    };

    if (!currentCard) {
        return (
            <div className="flashcard-deck">
                <div className="no-cards">
                    <IoBook size={48} />
                    <p>Không có flashcard cho tháng này</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flashcard-deck">
            <div className="deck-header">
                <IoBook className="deck-icon" />
                <h3 className="deck-title">Flashcards - Tháng {month}</h3>
            </div>

            <div className="deck-card-container">
                <Flashcard card={currentCard} />
            </div>

            <div className="deck-navigation">
                <button className="nav-btn" onClick={handlePrevious} title="Thẻ trước">
                    <IoChevronBack />
                </button>
                
                <div className="card-counter">
                    {currentIndex + 1} / {totalCards}
                </div>

                <button className="nav-btn" onClick={handleNext} title="Thẻ tiếp theo">
                    <IoChevronForward />
                </button>

                <button className="shuffle-btn" onClick={handleShuffle} title="Random">
                    <IoShuffle />
                    Random
                </button>
            </div>

            <p className="deck-hint">💡 Click vào thẻ để xem đáp án</p>
        </div>
    );
}

FlashcardDeck.propTypes = {
    month: PropTypes.number.isRequired
};

export default FlashcardDeck;
