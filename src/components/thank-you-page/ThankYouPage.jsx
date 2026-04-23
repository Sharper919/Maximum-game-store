import '../../css/thank-you-page/ThankYouPage.css';

export default function ThankYouPage() {
    return (
        <div className="thankyou-container">
            <div className="thankyou-card">
                
                <div className="success-icon">✔</div>

                <h1 className="thankyou-title">Thank you for your purchase!</h1>

                <p className="thankyou-text">
                    Your order has been successfully completed.
                </p>

                <div className="thankyou-details">
                    <div className="detail-row">
                        <span>Order ID</span>
                        <span>#123456</span>
                    </div>
                    <div className="detail-row">
                        <span>Total</span>
                        <span>$49.98</span>
                    </div>
                </div>

                <div className="thankyou-actions">
                    <button className="primary">Go to Library</button>
                    <button className="secondary">Back to Store</button>
                </div>

            </div>
        </div>
    );
}