import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const GlobalAtmosphere: React.FC = () => {
    const location = useLocation();

    // Motion values for smooth parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

    // Inverted and amplified parallax for the second blob
    const invX = useTransform(mouseX, (val) => val * -1.5);
    const invY = useTransform(mouseY, (val) => val * -1.5);
    const springXInv = useSpring(invX, { stiffness: 50, damping: 30 });
    const springYInv = useSpring(invY, { stiffness: 50, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 60;
            const y = (e.clientY / window.innerHeight - 0.5) * 60;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Route-based color palettes
    const getPalette = (path: string) => {
        if (path === '/') return { primary: 'rgba(251, 191, 36, 0.08)', secondary: 'rgba(14, 165, 233, 0.06)' };
        if (path.startsWith('/cv')) return { primary: 'rgba(34, 211, 238, 0.08)', secondary: 'rgba(129, 140, 248, 0.06)' };
        if (path.startsWith('/competences')) return { primary: 'rgba(16, 185, 129, 0.08)', secondary: 'rgba(34, 211, 238, 0.06)' };
        if (path.startsWith('/veille')) return { primary: 'rgba(168, 85, 247, 0.08)', secondary: 'rgba(236, 72, 153, 0.06)' };
        if (path.startsWith('/procedures')) return { primary: 'rgba(249, 115, 22, 0.08)', secondary: 'rgba(250, 204, 21, 0.06)' };
        if (path.startsWith('/stage')) return { primary: 'rgba(99, 102, 241, 0.08)', secondary: 'rgba(34, 211, 238, 0.06)' };
        return { primary: 'rgba(251, 191, 36, 0.05)', secondary: 'rgba(14, 165, 233, 0.05)' };
    };

    const palette = getPalette(location.pathname);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Main Ambient Blobs with Differential Parallax */}
                    <motion.div
                        style={{ x: springX, y: springY }}
                        className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] blur-[140px] rounded-full"
                        animate={{ backgroundColor: palette.primary }}
                        transition={{ duration: 2 }}
                    />
                    <motion.div
                        style={{ x: springXInv, y: springYInv }}
                        className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] blur-[140px] rounded-full"
                        animate={{ backgroundColor: palette.secondary }}
                        transition={{ duration: 2 }}
                    />

                    {/* Micro-particles loop */}
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                backgroundColor: i % 2 === 0 ? palette.primary : palette.secondary,
                            }}
                            animate={{
                                y: [0, -120, 0],
                                opacity: [0, 0.4, 0],
                                scale: [0, 1.2, 0],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 6,
                                repeat: Infinity,
                                delay: Math.random() * 6,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default GlobalAtmosphere;
