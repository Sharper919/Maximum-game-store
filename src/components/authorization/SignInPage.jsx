import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/authorization/SignUpPage.css';
import { BASE_URL } from '../../api/client';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }

            const data = await res.json();

            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('role', data.role);

            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo-container">
                    <img src={`${BASE_URL}/images/others/maximum_game.png`} alt="Logo" className="logo" />
                </div>

                <p className="title">Sign In</p>

                <form className="signup-form" onSubmit={e => e.preventDefault()}>
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

                    {error && <div className="auth-error">{error}</div>}

                    <button type="button" className="signup-button" onClick={handleSignIn}>Sign In</button>

                    <p className="signup-link">
                        Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
