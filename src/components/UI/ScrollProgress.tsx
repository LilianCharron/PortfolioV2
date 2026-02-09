import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-warning via-warning to-warning/50 origin-left z-[1000] shadow-[0_0_15px_rgba(251,191,36,0.3)]"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
