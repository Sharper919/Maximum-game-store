import '../../css/cart/Cart.css';
import React from 'react';
import Header from '../header/Header';
import CartItem from './CartItem';
import assassin from '../../images/assassin.avif';
import stalker2 from '../../images/stalker2.png';

const BASE_URL = 'https://localhost:7151';

export default function Cart() {
    const [cart, setCart] = useState(null);

    const token = localStorage.getItem('token');

    // 🔹 Завантаження кошика
    const loadCart = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setCart(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // 🔹 Видалення гри
    const removeGame = async (gameId) => {
        try {
            await fetch(`${BASE_URL}/api/cart/remove/${gameId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadCart(); // перезавантажуємо кошик
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Очистка кошика
    const clearCart = async () => {
        try {
            await fetch(`${BASE_URL}/api/cart/clear`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadCart();
        } catch (err) {
            console.error(err);
        }
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="cart-screen">
            <Header showButtons={false} />

            <div className="cart-screen-main">
                <h1>Shopping Cart</h1>

                <div className="cart-screen-content">

                    {/* 🔹 Список товарів */}
                    <div className="cart-items">
                        {cart.cartItems.map(item => (
                            <CartItem
                                key={item.gameId}
                                imgSrc={`${BASE_URL}${item.image}`}
                                title={item.title}
                                price={item.price}
                                onRemove={() => removeGame(item.gameId)}
                            />
                        ))}
                    </div>

                    {/* 🔹 Підсумок */}
                    <div className="cart-total">
                        <h3>
                            Total: <span>UAH {cart.totalPrice}</span>
                        </h3>

                        <button className="checkout-button">
                            Proceed to Checkout
                        </button>

                        <button className="checkout-button" onClick={clearCart}>
                            Clear cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}