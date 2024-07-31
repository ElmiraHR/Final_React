import React, { useState } from 'react';
import './ButtonForm.css'; // Импортируйте обычный CSS

const ButtonForm = ({ children, clickedText }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`buttonForm ${isClicked ? 'clicks' : ''}`}
    >
      {isClicked ? clickedText : children}
    </button>
  );
};

export default ButtonForm;
