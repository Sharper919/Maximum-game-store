import './Cart.css';
import React from 'react';
import Header from './Header';
import CartItem from './CartItem';
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
                        <CartItem imgSrc={assassin} title="Assassin’s Creed Shadows" price="1999" />
                        <CartItem imgSrc={stalker2} title="S.T.A.L.K.E.R. 2: Heart of Chornobyl" price="1399" />
                        <CartItem imgSrc={assassin} title="Assassin’s Creed Shadows" price="1999" />
                        <CartItem imgSrc={stalker2} title="S.T.A.L.K.E.R. 2: Heart of Chornobyl" price="1399" />
                        <CartItem imgSrc={assassin} title="Assassin’s Creed Shadows" price="1999" />
                        <CartItem imgSrc={stalker2} title="S.T.A.L.K.E.R. 2: Heart of Chornobyl" price="1399" />
                    </div>
                    

                    <div className="cart-total">
                        <h3>Total: <span>UAH 3,398</span></h3>
                        <button className="checkout-button">Proceed to Checkout</button>
                        <button className="checkout-button">Continue shopping</button>
                    </div>

                </div>

            </div>
        </div>
    );
}