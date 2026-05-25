import React, { useRef } from 'react';
import '../../css/main-screen/GameComponent.css';

const GameComponent = ({ image, gameName, gamePrice, onClick }) => {
    const cardRef = useRef(null);

    const handleClick = (e) => {
        const card = cardRef.current;

        if (card) {
            card.classList.remove('pop-effect');
            void card.offsetWidth;
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