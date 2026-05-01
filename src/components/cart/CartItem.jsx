import '../../css/cart/CartItem.css';
import React from 'react';

export default function CartItem({ imgSrc, title, price, onRemove, disabled }) {
    return (
        <div className="cart-item">
            <img src={imgSrc} alt={title} />
            <h3>{title}</h3>
            <p>Price: UAH {price}</p>
            <button className="remove-button" onClick={onRemove} disabled={disabled}>
                Remove
            </button>
        </div>
    );
}
