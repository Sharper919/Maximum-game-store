import React, { useRef } from 'react';
import '../css/GameComponent.css';

const GameComponent = ({ image, gameName, gamePrice, onClick }) => {
    const cardRef = useRef(null);

    const handleClick = (e) => {
        const card = cardRef.current;
        if (card) {
            card.classList.remove('pop-effect'); // скидаємо, якщо вже є
            void card.offsetWidth; // перезапускаємо анімацію
            card.classList.add('pop-effect');
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div
            ref={cardRef}
            className="game-component"
            onClick={handleClick}
        >
            <div className="game-image">
                <img src={image} alt={gameName} />
            </div>
            <div className="game-name">{gameName}</div>
            <div className="game-price">{gamePrice}</div>
        </div>
    );
};

export default GameComponent;