import React, { useEffect, useState } from 'react'

function useDarkMode() {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.theme || 'light');

  // Determine the alternative theme color based on current theme
  const colorTheme = theme === "dark" ? "light" : "dark";

  // Effect hook to apply theme to the document root
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the opposite theme and add the current theme
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Save the current theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  // Return colorTheme for toggling and setTheme for updating theme state
  return [colorTheme, setTheme];
}

export default useDarkMode;
