import '../../css/cart/Cart.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import CartItem from './CartItem';
import { apiFetch, BASE_URL, isAuthenticated } from '../../api/client';

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const loadCart = useCallback(async () => {
        if (!isAuthenticated()) {
            navigate('/signin');
            return;
        }

        try {
            setIsLoading(true);
            setError('');
            const data = await apiFetch('/api/cart');
            setCart(data);
        } catch (err) {
            if (err.status === 401) {
                navigate('/signin');
                return;
            }

            setError(err.message || 'Failed to load cart');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const removeGame = async (gameId) => {
        try {
            setIsUpdating(true);
            setError('');
            await apiFetch(`/api/cart/remove/${gameId}`, { method: 'DELETE' });
            await loadCart();
        } catch (err) {
            setError(err.message || 'Failed to remove game');
        } finally {
            setIsUpdating(false);
        }
    };

    const clearCart = async () => {
        try {
            setIsUpdating(true);
            setError('');
            await apiFetch('/api/cart/clear', { method: 'DELETE' });
            await loadCart();
        } catch (err) {
            setError(err.message || 'Failed to clear cart');
        } finally {
            setIsUpdating(false);
        }
    };

    const hasItems = cart?.cartItems?.length > 0;

    return (
        <div className="cart-screen">
            <Header showButtons={false} />

            <div className="cart-screen-main">
                <h1>Shopping Cart</h1>

                {isLoading && <div className="cart-message">Loading...</div>}
                {error && <div className="cart-error">{error}</div>}

                {!isLoading && !hasItems && (
                    <div className="cart-empty">
                        <h3>Your cart is empty</h3>
                        <button className="checkout-button" onClick={() => navigate('/')}>
                            Back to Store
                        </button>
                    </div>
                )}

                {!isLoading && hasItems && (
                    <div className="cart-screen-content">
                        <div className="cart-items">
                            {cart.cartItems.map(item => (
                                <CartItem
                                    key={item.gameId}
                                    imgSrc={item.image ? `${BASE_URL}/${item.image}` : '/placeholder.png'}
                                    title={item.title}
                                    price={item.price}
                                    onRemove={() => removeGame(item.gameId)}
                                    disabled={isUpdating}
                                />
                            ))}
                        </div>

                        <div className="cart-total">
                            <h3>
                                Total: <span>UAH {cart.totalPrice}</span>
                            </h3>

                            <button
                                className="checkout-button"
                                onClick={() => navigate('/checkout')}
                                disabled={isUpdating}
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                className="checkout-button"
                                onClick={clearCart}
                                disabled={isUpdating}
                            >
                                Clear cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
