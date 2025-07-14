import React from 'react';
import './HeaderInput.css';
import loupe from './loupe.png';


const HeaderInput = () => {
  return (
    <div className="search-input">
      <input type="text" placeholder="Search..." />
      <button type="button">
        <img src={loupe} alt="" />
      </button>
    </div>
  );
};

export default HeaderInput;
