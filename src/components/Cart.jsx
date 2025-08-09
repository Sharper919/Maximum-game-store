import './Cart.css';
import React from 'react';
import Header from './Header';
import assassin from '../images/assassin.avif';
import stalker2 from '../images/stalker2.png';

export default function Cart() {
    return (
        <div className="cart-screen">
            <Header showButtons={false} />

            <div className="cart-screen-main">
                <h1>Shopping Cart</h1>

                <div className="cart-screen-content">
                    <div className="cart-items">
                        <div className="cart-item">
                            <img src={assassin} alt="Assassin’s Creed Shadows" />
                            <h3>Assassin’s Creed Shadows</h3>
                            <p>Price: UAH 1,999</p>
                            <button className="remove-button">Remove</button>
                        </div>

                        <div className="cart-item">
                            <img src={stalker2} alt="S.T.A.L.K.E.R. 2: Heart of Chornobyl" />
                            <h3>S.T.A.L.K.E.R. 2: Heart of Chornobyl</h3>
                            <p>Price: UAH 1,399</p>
                            <button className="remove-button">Remove</button>
                        </div>
                    </div>

                    <div className="cart-total">
                        <h3>Total: <span>UAH 3,398</span></h3>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>

                </div>

            </div>
        </div>
    );
}