import React from 'react';
import './HeaderButton.css'

const HeaderButton = ({ text, type = 'default' }) => {
    return(
        <button className={`btn ${type}`}>
            {text}
        </button>
    )
}

export default HeaderButton;