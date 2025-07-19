import React, { useRef } from 'react';
import './GameComponent.css';

const GameComponent = ({ image, gameName, gamePrice }) => {
    const cardRef = useRef(null);

    const handleClick = () => {
        const card = cardRef.current;
        if (card) {
            card.classList.remove('pop-effect'); // скидаємо, якщо вже є
            void card.offsetWidth; // перезапускаємо анімацію
            card.classList.add('pop-effect');
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