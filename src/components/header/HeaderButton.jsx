import React from 'react';
import '../../css/header/HeaderButton.css';
import { useNavigate } from 'react-router-dom';

const HeaderButton = ({ text, type = 'default', navigateTo }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    };

    return (
        <button className={`btn ${type}`} onClick={handleClick}>
            {text}
        </button>
    )
}

export default HeaderButton;