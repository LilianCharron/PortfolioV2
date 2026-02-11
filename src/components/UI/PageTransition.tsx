import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Sub-component for the Binary Rain effect
const BinaryRain = () => {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Create columns based on screen width
    const count = Math.floor(window.innerWidth / 20);
    setColumns(Array.from({ length: count }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none flex justify-around overflow-hidden">
      {columns.map((_, i) => (
        <BinaryColumn key={i} delay={Math.random() * 2} />
      ))}
    </div>
  );
};

const BinaryColumn = ({ delay }: { delay: number }) => {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const length = Math.floor(Math.random() * 10) + 10;
    setChars(Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0')));
  }, []);

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: '100%' }}
      transition={{
        duration: 1 + Math.random() * 1.5,
        repeat: Infinity,
        ease: 'linear',
        delay: delay,
      }}
      className="flex flex-col text-warning/20 font-mono text-xs font-black select-none whitespace-nowrap"
    >
      {chars.map((char, i) => (
        <span key={i} style={{ opacity: 1 - i / chars.length }}>
          {char}
        </span>
      ))}
    </motion.div>
  );
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div className="relative" initial="initial" animate="animate" exit="exit">
      {/* 1. The Binary Curtain Overlay */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none bg-bleunuit flex flex-col items-center justify-center border-x border-warning/10 overflow-hidden"
        variants={{
          initial: { y: '0%' }, // Start covering (at center)
          animate: { y: '100%' }, // Slide down to reveal at bottom
          exit: { y: ['-100%', '0%'] }, // Arrive from Top to center
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="relative text-center">
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-[10px] font-mono font-black tracking-[1.5em] text-warning mb-12"
          >
            SYNCHRONIZING_CORE
          </motion.div>
          <BinaryRain />
        </div>
      </motion.div>

      {/* 2. Content Animation */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.02 },
        }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* 3. Secondary scanning line on the wipe edge */}
      <motion.div
        className="fixed left-0 right-0 h-[2px] bg-warning shadow-[0_0_20px_#fbbf24] z-[101] pointer-events-none"
        variants={{
          initial: { top: '0%' },
          animate: { top: '100%' },
          exit: { top: ['-100%', '0%'] },
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
};

export default PageTransition;
