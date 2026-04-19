import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/authorization/SignUpPage.css';
import logo from '../header/maximum_game.png';

const BASE_URL = 'https://localhost:7151';

export default function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (!userName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName,
                    email,
                    password
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            const data = await res.json();

            // 🔐 одразу логінимо
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.userName);

            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <p className="title">Sign Up</p>

                <form className="signup-form" onSubmit={e => e.preventDefault()}>
                    <label className="signup-label">Username</label>
                    <input
                        type="text"
                        className="signup-input"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />

                    <label className="signup-label">Email</label>
                    <input
                        type="email"
                        className="signup-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label className="signup-label">Password</label>
                    <input
                        type="password"
                        className="signup-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    <button type="button" className="signup-button" onClick={handleSignUp}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}