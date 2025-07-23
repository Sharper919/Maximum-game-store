import React from 'react';
//import './SignUpButton.css';

const SignUpButton = ({ children, type = "button" }) => {
  return (
    <button type={type} className="custom-button">
      {children}
    </button>
  );
};

export default SignUpButton;
