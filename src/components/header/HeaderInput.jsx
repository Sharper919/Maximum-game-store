import React from 'react';
import '../../css/header/HeaderInput.css';


const HeaderInput = ({ value = '', onChange, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form id="search-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Search..."
      />
      <button type="submit" aria-label="Search games">
        <span class="material-symbols-outlined">
          search
        </span>
      </button>
    </form>
  );
};

export default HeaderInput;
