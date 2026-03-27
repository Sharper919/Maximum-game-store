import React from 'react';
import '../css/HeaderInput.css';
import loupe from './loupe.png';


const HeaderInput = () => {
  return (
    <div id="search-input">
      <input type="text" placeholder="Search..." />
      <button type="button">
        <img src={loupe} alt="" />
      </button>
    </div>
  );
};

export default HeaderInput;
