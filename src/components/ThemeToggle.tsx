import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-surface dark:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-surface focus:ring-primary"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute left-1 transform transition-transform duration-200 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <FiMoon className="w-4 h-4 text-primary" />
        ) : (
          <FiSun className="w-4 h-4 text-accent" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle; 