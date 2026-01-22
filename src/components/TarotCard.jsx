import { useState } from "react";
import PropTypes from "prop-types";
import "./TarotCard.css";

const TarotCard = ({ card, position, isRevealed, onReveal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isRevealed && onReveal) {
      setIsFlipped(true);
      setTimeout(() => {
        onReveal();
      }, 600);
    }
  };

  const getPositionLabel = () => {
    switch (position) {
      case 0:
        return "May Mắn";
      case 1:
        return "Tình Yêu";
      case 2:
        return "Sự Nghiệp";
      default:
        return "";
    }
  };

  const getMeaning = () => {
    switch (position) {
      case 0:
        return card.luck;
      case 1:
        return card.love;
      case 2:
        return card.career;
      default:
        return card.upright;
    }
  };

  return (
    <div
      className="tarot-card-container"
      data-aos="fade-up"
      data-aos-delay={position * 100}
    >
      <div className="position-label">{getPositionLabel()}</div>
      <div
        className={`tarot-card ${isFlipped ? "flipped" : ""} ${isRevealed ? "revealed" : ""}`}
        onClick={handleClick}
      >
        <div className="card-inner">
          {/* Card Back */}
          <div className="card-face card-back">
            <div className="card-pattern">
              <div className="card-symbol">✨</div>
              <div className="card-border"></div>
            </div>
          </div>

          {/* Card Front */}
          <div className="card-face card-front">
            <div className="card-image-container">
              <img
                src={card.image}
                alt={card.nameVi}
                className="card-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="card-symbol-fallback" style={{ display: "none" }}>
                {card.type === "major" ? "⭐" : "🌙"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption appears below card when revealed */}
      {isRevealed && (
        <div className="card-caption" data-aos="fade-up">
          <h3 className="card-name">{card.nameVi}</h3>
          <p className="card-name-en">{card.name}</p>
          <div className="card-meaning">
            <p className="meaning-text">{getMeaning()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

TarotCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nameVi: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    upright: PropTypes.string,
    luck: PropTypes.string,
    love: PropTypes.string,
    career: PropTypes.string,
  }).isRequired,
  position: PropTypes.number.isRequired,
  isRevealed: PropTypes.bool,
  onReveal: PropTypes.func,
};

export default TarotCard;
