import React from 'react';
import logo from './maximum_game.png';
import '../css/Header.css';
import MenuIcon from './MenuIcon';
import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';

class Header extends React.Component {
    render() {
        const { showButtons } = this.props;
        return (
            <header className='header'>
                <div className="left-section">
                    <MenuIcon />
                    <img src={logo} alt="Logo" className="maximum-game-img" />
                    <span className="store-name">Maximum Game Store</span>
                </div>
                <HeaderInput />
                <div className="right-section">
                    {showButtons && (
                        <>
                            <HeaderButton text='sign in' navigateTo="/signin" />
                            <HeaderButton text='sign up' type='primary' navigateTo="/signup" />
                        </>
                    )}
                </div>
            </header>
        )
    }
}

export default Header;