import React from 'react';
import './HeaderInput.css';
//import loupe from './loupe.png';


const HeaderInput = () => {
  return (
    <div className="search-input">
      <input type="text" placeholder="Search..." />
      <button type="button">
        🔍
      </button>
    </div>
  );
};

export default HeaderInput;
