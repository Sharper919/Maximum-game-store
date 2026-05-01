import '../../css/checkout/CheckoutPage.css';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../header/Header';
import { apiFetch, BASE_URL, isAuthenticated } from '../../api/client';

const initialForm = {
    cardNumber: '',
    cardType: 'Visa',
    expiry: '',
    cvv: ''
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('gameId');
    const [form, setForm] = useState(initialForm);
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/signin');
            return;
        }

        const loadSummary = async () => {
            try {
                setIsLoading(true);
                setError('');

                if (gameId) {
                    const game = await apiFetch(`/api/games/${gameId}/info`);
                    const images = await apiFetch(`/api/games/${gameId}/images`);
                    const mainImage = images?.[0];

                    setItems([{
                        gameId: game.id,
                        title: game.title,
                        price: game.price,
                        image: mainImage
                    }]);
                    setTotalPrice(game.price);
                } else {
                    const cart = await apiFetch('/api/cart');
                    setItems(cart.cartItems || []);
                    setTotalPrice(cart.totalPrice || 0);
                }
            } catch (err) {
                if (err.status === 401) {
                    navigate('/signin');
                    return;
                }

                setError(err.message || 'Failed to load order summary');
            } finally {
                setIsLoading(false);
            }
        };

        loadSummary();
    }, [gameId, navigate]);

    const handleChange = (field) => (event) => {
        setForm(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const cardNumber = form.cardNumber.replace(/\s+/g, '');
        if (cardNumber.length < 12 || form.cvv.length < 3 || !form.expiry.trim()) {
            setError('Please enter valid payment details.');
            return;
        }

        try {
            setIsSubmitting(true);
            const payload = {
                ...form,
                cardNumber
            };
            const path = gameId ? `/api/checkout/buy-now/${gameId}` : '/api/checkout';
            const result = await apiFetch(path, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            navigate('/thank-you', {
                state: {
                    orderId: result.orderId,
                    totalPrice,
                    message: result.responseMassage
                }
            });
        } catch (err) {
            setError(err.message || 'Checkout failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasItems = items.length > 0;

    return (
        <div className="checkout-page">
            <Header showButtons={false} />

            <div className="checkout-container">
                <div className="checkout-form">
                    <h2 className="checkout-title">Checkout</h2>

                    {error && <div className="checkout-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <label className="checkout-label">Card number</label>
                        <input
                            type="text"
                            className="checkout-input"
                            placeholder="1234 5678 9012 3456"
                            value={form.cardNumber}
                            onChange={handleChange('cardNumber')}
                            disabled={isSubmitting || isLoading}
                        />

                        <div className="input-block">
                            <div className="item">
                                <label className="checkout-label">Card type</label>
                                <select
                                    className="checkout-input"
                                    value={form.cardType}
                                    onChange={handleChange('cardType')}
                                    disabled={isSubmitting || isLoading}
                                >
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="American Express">American Express</option>
                                </select>
                            </div>

                            <div className="item">
                                <label className="checkout-label">CVV</label>
                                <input
                                    type="password"
                                    className="checkout-input"
                                    placeholder="123"
                                    value={form.cvv}
                                    onChange={handleChange('cvv')}
                                    disabled={isSubmitting || isLoading}
                                />
                            </div>
                        </div>

                        <label className="checkout-label">Expiration</label>
                        <input
                            type="text"
                            className="checkout-input"
                            placeholder="MM.YY"
                            value={form.expiry}
                            onChange={handleChange('expiry')}
                            disabled={isSubmitting || isLoading}
                        />

                        <button
                            type="submit"
                            className="checkout-button"
                            disabled={isSubmitting || isLoading || !hasItems}
                        >
                            {isSubmitting ? 'Processing...' : 'Pay Now'}
                        </button>
                    </form>
                </div>

                <div className="checkout-details">
                    <h3 className="details-title">Order Summary</h3>

                    {isLoading && <div className="checkout-message">Loading...</div>}
                    {!isLoading && !hasItems && (
                        <div className="checkout-message">Your cart is empty.</div>
                    )}

                    {!isLoading && hasItems && (
                        <>
                            <div className="details-items">
                                {items.map(item => (
                                    <div className="details-item" key={item.gameId}>
                                        <div className="details-game">
                                            {item.image && (
                                                <img src={`${BASE_URL}/${item.image}`} alt={item.title} />
                                            )}
                                            <span>{item.title}</span>
                                        </div>
                                        <span>UAH {item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="details-total">
                                <span>Total</span>
                                <span>UAH {totalPrice}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
