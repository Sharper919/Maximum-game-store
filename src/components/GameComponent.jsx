import React from 'react';
import './GameComponent.css';
//import assassin from '../images/assassin.avif'

class GameComponent extends React.Component {
    render() {
        return (
            <div className='game-component'>
                <div className='game-image'>
                    <img src={this.props.image} alt="" />
                </div>
                <span className='game-name'>{this.props.gameName}</span>
                <span className='game-price'>{this.props.gamePrice}</span>
            </div>
        )
    }
}

export default GameComponent;