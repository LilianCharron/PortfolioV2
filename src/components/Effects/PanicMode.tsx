import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const PanicMode: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handlePanic = () => setIsActive(true);
        const handleReset = () => setIsActive(false);

        window.addEventListener('panic-trigger', handlePanic);
        window.addEventListener('panic-reset', handleReset);
        return () => {
            window.removeEventListener('panic-trigger', handlePanic);
            window.removeEventListener('panic-reset', handleReset);
        };
    }, []);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
            {/* Red Alert Overlay */}
            <motion.div
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 bg-red-600 pointer-events-none"
            />

            {/* Warning Text */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="glass border-2 border-red-500 rounded-3xl p-10 flex flex-col items-center gap-6 shadow-[0_0_100px_rgba(239,68,68,0.5)] pointer-events-auto"
                >
                    <FaExclamationTriangle className="text-red-500 text-6xl animate-pulse" />
                    <div className="text-center">
                        <h2 className="text-4xl font-black text-white tracking-widest uppercase mb-2">Security Breach</h2>
                        <p className="text-red-400 font-mono text-sm tracking-widest">CRITICAL_SYSTEM_FAILURE_DETECTION</p>
                    </div>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('panic-reset'))}
                        className="px-8 py-3 bg-red-500 text-white font-black rounded-xl hover:bg-white hover:text-red-600 transition-all uppercase tracking-widest text-xs"
                    >
                        RESTORE SYSTEM
                    </button>
                </motion.div>
            </div>

            {/* Scrolling Text Bars */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-red-600 flex items-center overflow-hidden">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="whitespace-nowrap text-white font-black text-[10px] tracking-[0.5em] uppercase"
                >
                    {Array(20).fill(' WARNING :: SYSTEM COMPROMISED :: ACCESS DENIED :: ').join('')}
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600 flex items-center overflow-hidden">
                <motion.div
                    animate={{ x: [-1000, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="whitespace-nowrap text-white font-black text-[10px] tracking-[0.5em] uppercase"
                >
                    {Array(20).fill(' WARNING :: SYSTEM COMPROMISED :: ACCESS DENIED :: ').join('')}
                </motion.div>
            </div>
        </div>
    );
};

export default PanicMode;
