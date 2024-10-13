import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Icons for toggle button

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply or remove the dark mode class based on the state
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {darkMode ? (
        <FaMoon className="text-yellow-300 w-6 h-6" />
      ) : (
        <FaSun className="text-yellow-500 w-6 h-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;
