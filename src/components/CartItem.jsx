import './CartItem.css';
import React from 'react';

export default function CartItem({ imgSrc, title, price }) {
    return (
        <div className="cart-item">
            <img src={imgSrc} alt={title} />
            <h3>{title}</h3>
            <p>Price: UAH {price}</p>
            <button className="remove-button">Remove</button>
        </div>
    );
}