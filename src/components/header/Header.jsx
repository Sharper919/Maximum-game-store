import React from 'react';
// import logo from './maximum_game.png';
import '../../css/header/Header.css';
import HeaderInput from './HeaderInput';
import HeaderButton from './HeaderButton';
import CartIcon from './CartIcon';
import UserIcon from './UserIcon';
import { BASE_URL } from '../../api/client';

class Header extends React.Component {
    render() {
        const userName = localStorage.getItem('userName');

        return (
            <header className='header'>
                <div className="left-section">
                    <img src={`${BASE_URL}/images/others/maximum_game.png`} onClick={() => window.location.href = '/'} alt="Logo" className="maximum-game-img" />
                    <span className="store-name" onClick={() => window.location.href = '/'}>Maximum Game Store</span>
                </div>

                {this.props.showSearch && (
                    <HeaderInput
                        value={this.props.searchValue}
                        onChange={this.props.onSearchChange}
                        onSubmit={this.props.onSearchSubmit}
                    />
                )}

                <div className="right-section">
                    <CartIcon />

                    {!userName && (
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
