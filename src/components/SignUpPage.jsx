import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SignUpPage.css';
import logo from './maximum_game.png';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (!username || !email || !password) {
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

                <p className="title">Sign Up</p>

                <form className="signup-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="username" className="signup-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="signup-input"
                        required
                        autoComplete="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

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

                    <button type="button" className="signup-button" onClick={handleSignUp}>sign up</button>
                </form>
            </div>
        </div>
    );
}