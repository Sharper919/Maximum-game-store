import '../../css/checkout/CheckoutPage.css';

export default function CheckoutPage() {
    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2 className="checkout-title">Checkout</h2>
                <form action="">
                    <label className="checkout-label">Card number</label>
                    <input type="text" className="checkout-input" placeholder="1234 5678 9012 3456" />

                    <div className='input-block'>
                        <div className='item'>
                            <label className="checkout-label">Card type</label>
                            <select className="checkout-input">
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                                <option value="amex">American Express</option>
                            </select>
                        </div>

                        <div className='item'>
                            <label className="checkout-label">CVV</label>
                            <input type="text" className="checkout-input" placeholder="123" />
                        </div>
                    </div>

                    <label className="checkout-label">Expiration</label>
                    <input type="text" className="checkout-input" placeholder="MM.YY" />

                    <button type="submit" className="checkout-button">Pay Now</button>
                </form>
            </div>
            <div className="checkout-details">
                <h3 className="details-title">Order Summary</h3>
                <div className="details-items">
                    <div className="details-item">
                        <span>Game Title 1</span>
                        <span>$19.99</span>
                    </div>
                    <div className="details-item">
                        <span>Game Title 2</span>
                        <span>$29.99</span>
                    </div>
                </div>
                <div className="details-total">
                    <span>Total</span>
                    <span>$49.98</span>
                </div>
            </div>
        </div>
    );
}