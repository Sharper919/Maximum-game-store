import React from 'react';
import '../../css/footer/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h3>Maximum Game Store</h3>
                    <p>Your ultimate destination for PC games.</p>
                </div>

                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <li><a href="/signin">Sign In</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li>Email: support@gmail.com</li>
                        <li>Phone: +380 86 345 6789</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Maximum Game Store. All rights reserved.
            </div>
        </footer>
    );
}