import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import logo from './maximum_game.png';
import google_logo from '../images/google-logo.png';
import microsoft_logo from '../images/microsoft-logo.png';
import xbox_logo from '../images/xbox-logo.png';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <p className="title">Sign In</p>

                <form className="signup-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="email" className="signup-label">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="signup-input"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className="signup-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="signup-input"
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

                    <button type="button" className="signup-button" onClick={handleSignIn}>sign in</button>
                </form>

                <div className="signup-divider">
                    <hr />
                    <span>or continue with</span>
                    <hr />
                </div>

                <div className="signup-alt-buttons">
                    <button className="signup-alt-button">
                        <img src={google_logo} alt="Google" />
                    </button>
                    <button className="signup-alt-button">
                        <img src={microsoft_logo} alt="Microsoft" />
                    </button>
                    <button className="signup-alt-button">
                        <img src={xbox_logo} alt="Xbox" />
                    </button>
                </div>
            </div>
        </div>
    );
}