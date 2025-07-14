import React from 'react';
import './GameComponent.css';
import assassin from '../images/assassin.avif'

class GameComponent extends React.Component {
    render() {
        return (
            <div className='game-component'>
                <div className='game-image'>
                    <img src={assassin} alt="" />
                </div>
                <span className='game-name'>Assassin’s Creed Shadows</span>
                <p className='game-price'>UAH 1,999</p>
            </div>
        )
    }
}

export default GameComponent;