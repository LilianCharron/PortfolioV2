import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    char: string;
    color: string;
}

const BinaryBursts: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Create 8-12 particles per click
            const count = 8 + Math.floor(Math.random() * 5);
            const newParticles: Particle[] = [];
            const colors = ['#fbbf24', '#0ea5e9', '#22d3ee', '#f97316'];

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: Date.now() + Math.random(),
                    x: e.clientX,
                    y: e.clientY,
                    char: Math.random() > 0.5 ? '0' : '1',
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }

            setParticles((prev) => [...prev, ...newParticles]);

            // Cleanup after 1 second
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.span
                        key={p.id}
                        initial={{
                            opacity: 1,
                            x: p.x,
                            y: p.y,
                            scale: 0.5,
                            rotate: 0
                        }}
                        animate={{
                            opacity: 0,
                            x: p.x + (Math.random() - 0.5) * 300,
                            y: p.y + (Math.random() - 0.5) * 300 + 100, // Gravity effect
                            scale: 1.5,
                            rotate: Math.random() * 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute font-black text-xs select-none"
                        style={{ color: p.color }}
                    >
                        {p.char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default BinaryBursts;
