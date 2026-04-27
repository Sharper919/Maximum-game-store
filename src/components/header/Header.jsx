import React from 'react';
import logo from './maximum_game.png';
import '../../css/header/Header.css';
import MenuIcon from './MenuIcon';
import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';
import CartIcon from './CartIcon';
import UserIcon from './UserIcon';

class Header extends React.Component {
    // handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userName');
    //     window.location.href = '/';
    // };

    render() {
        const { showButtons } = this.props;

        const userName = localStorage.getItem('userName');

        return (
            <header className='header'>
                <div className="left-section">
                    <MenuIcon />
                    <img src={logo} alt="Logo" className="maximum-game-img" />
                    <span className="store-name">Maximum Game Store</span>
                </div>

                <HeaderInput />

                <div className="right-section">
                    <CartIcon />

                    {!userName && showButtons && (
                        <>
                            <HeaderButton text='sign in' navigateTo="/signin" />
                            <HeaderButton text='sign up' type='primary' navigateTo="/signup" />
                        </>
                    )}

                    {userName && (
                        <UserIcon userName={userName} />
                    )}
                </div>
            </header>
        );
    }
}

export default Header;