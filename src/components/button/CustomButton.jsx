import React, { useState } from 'react';
import './Button.css'; // Импортируйте обычный CSS

const CustomButton = ({ children, clickedText, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    if (onClick) {
      onClick(e); // Передайте событие e в обработчик onClick
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`button ${isClicked ? 'clicked' : ''}`}
    >
      {isClicked ? clickedText : children}
    </button>
  );
};

export default CustomButton;
