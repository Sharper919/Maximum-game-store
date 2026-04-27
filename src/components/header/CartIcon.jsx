import { useNavigate } from 'react-router-dom';

export default function CartIcon() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/cart');
    };

    return (
        <span className="material-symbols-outlined" onClick={handleClick}>
            shopping_cart
        </span>
    );
}