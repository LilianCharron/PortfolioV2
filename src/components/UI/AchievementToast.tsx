import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../../context/AchievementContext';
import { FaTrophy } from 'react-icons/fa';

const AchievementToast: React.FC = () => {
    const { recentAchievement } = useAchievements();

    return (
        <div className="fixed top-8 right-8 z-[1000] pointer-events-none">
            <AnimatePresence>
                {recentAchievement && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.8 }}
                        className="glass border-2 border-warning/50 rounded-2xl p-5 shadow-3d-xl flex items-center gap-5 w-80 pointer-events-auto"
                    >
                        <div className="w-14 h-14 bg-warning rounded-xl flex items-center justify-center text-3xl shadow-[0_0_20px_#fbbf24] animate-bounce">
                            <span role="img" aria-label="achievement-icon">{recentAchievement.icon}</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-warning text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                                <FaTrophy size={10} />
                                Succès Débloqué !
                            </div>
                            <h4 className="text-sm font-black tracking-tight">{recentAchievement.title}</h4>
                            <p className="text-muted text-[10px] italic">{recentAchievement.description}</p>
                        </div>
                        {/* Progress Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-transparent pointer-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AchievementToast;
