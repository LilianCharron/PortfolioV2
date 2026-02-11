import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import { useAchievements } from '../../context/AchievementContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const { unlock } = useAchievements();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => playSound('hover')}
      onClick={() => {
        toggleTheme();
        playSound('shimmer');
        unlock('DARK_SQUARE');
      }}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-warning hover:border-warning/50 transition-colors shadow-lg backdrop-blur-xl"
      // ...
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Changer pour le mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {theme === 'light' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
