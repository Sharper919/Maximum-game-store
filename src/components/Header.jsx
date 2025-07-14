import React from 'react';
import logo from './maximum_game.png';
import './Header.css';
import MenuIcon from './MenuIcon';
import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className="left-section">
                    <MenuIcon />
                    <img src={logo} alt="Logo" className="maximum-game-img" />
                    <span className="store-name">Maximum Game Store</span>
                </div>
                <HeaderInput />
                <div className="right-section">
                    <HeaderButton text='sign in'/>
                    <HeaderButton text='sign up' type='primary'/>
                </div>
            </header>
        )
    }
}

export default Header;