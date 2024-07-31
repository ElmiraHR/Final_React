import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
// Создаем контекст для темы
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#282828',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#302F2F',
      paper: '#424242',
    },
    text: {
      primary: '#808181',
    },
  },
});

const Theme = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeToggleButton = () => {
  const { isDarkMode, handleToggleTheme } = useTheme();

  return (
    <IconButton
      color="inherit"
      aria-label="toggle theme"
      onClick={handleToggleTheme}
    >
      {isDarkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
    </IconButton>
  );
};

export default Theme;
