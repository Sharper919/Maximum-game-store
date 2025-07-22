import React from 'react';
import SignUpButton from './SignUpButton';
import './SignUpPage.css';
import logo from './maximum_game.png';
import google_logo from '../images/google-logo.png';
import microsoft_logo from '../images/microsoft-logo.png';
import xbox_logo from '../images/xbox-logo.png';

export default function SignUpPage() {
    return(
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <h1 className="title">Sign Up</h1>

                <form className="signup-form">
                    <label htmlFor="email" className="signup-label">Email address</label>
                    <input type="email" id="email" name="email" className="signup-input" required />

                    <label htmlFor="password" className="signup-label">Password</label>
                    <input type="password" id="password" name="password" className="signup-input" required />

                    <SignUpButton type="submit">sign up</SignUpButton>
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
    )
}