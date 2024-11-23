// frontend/src/components/ThemeControl.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThemeControl = ({ userId }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle theme
  const toggleTheme = async () => {
    setIsDarkMode(!isDarkMode);

    // Send the theme preference to the backend (only if logged in)
    if (userId) {
      try {
        await axios.post('http://localhost:5000/api/user/update-theme', {
          theme: !isDarkMode ? 'dark' : 'light',
          userId: userId
        });
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  };

  // Check saved theme preference on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Set default based on system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply the theme
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="theme-control">
      <button onClick={toggleTheme} className="btn btn-toggle">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default ThemeControl;