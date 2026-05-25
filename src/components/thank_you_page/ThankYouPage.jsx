import '../../css/thank-you-page/ThankYouPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ThankYouPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <div className="thankyou-container">
            <div className="thankyou-card">
                <div className="success-icon">OK</div>

                <h1 className="thankyou-title">Thank you for your purchase!</h1>

                <p className="thankyou-text">
                    {state?.message || 'Your order has been successfully completed.'}
                </p>

                <div className="thankyou-details">
                    <div className="detail-row">
                        <span>Order ID</span>
                        <span>{state?.orderId ? `#${state.orderId}` : '-'}</span>
                    </div>
                    <div className="detail-row">
                        <span>Total</span>
                        <span>{state?.totalPrice ? `UAH ${state.totalPrice}` : '-'}</span>
                    </div>
                </div>

                <div className="thankyou-actions">
                    <button className="primary" onClick={() => navigate('/profile')}>
                        Go to Library
                    </button>
                    <button className="secondary" onClick={() => navigate('/')}>
                        Back to Store
                    </button>
                </div>
            </div>
        </div>
    );
}
