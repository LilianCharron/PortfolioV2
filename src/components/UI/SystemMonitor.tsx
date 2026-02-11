import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrochip, FaNetworkWired, FaServer, FaChevronUp, FaChevronDown, FaGamepad, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useSound } from '../../context/SoundContext';
import { useAchievements } from '../../context/AchievementContext';

const SystemMonitor: React.FC = () => {
    const { playSound, isMuted, setIsMuted } = useSound();
    const { achievements, updateProgress } = useAchievements();
    const [isOpen, setIsOpen] = useState(true);
    const [isGameMode, setIsGameMode] = useState(false);
    const [cpuUsage, setCpuUsage] = useState(12);
    const [networkTraffic, setNetworkTraffic] = useState(45);
    const [uptime, setUptime] = useState(0);

    const [activeTab, setActiveTab] = useState<'monitor' | 'game' | 'missions'>('monitor');

    // Memory Game State
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [activePad, setActivePad] = useState<number | null>(null);
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'gameOver' | 'waiting'>('idle');
    const [score, setScore] = useState(0);

    const padNotes = [440, 523.25, 587.33, 659.25]; // A4, C5, D5, E5

    useEffect(() => {
        if (isGameMode) setActiveTab('game');
        else if (activeTab === 'game') setActiveTab('monitor');
    }, [isGameMode]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(prev => {
                const jitter = (Math.random() - 0.5) * 5;
                return Math.min(Math.max(prev + jitter, 5), 85);
            });
            setNetworkTraffic(prev => {
                const jitter = (Math.random() - 0.5) * 10;
                return Math.min(Math.max(prev + jitter, 10), 900);
            });
            setUptime(prev => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Game Logic
    const startNewRound = useCallback((currentSequence: number[]) => {
        const newSequence = [...currentSequence, Math.floor(Math.random() * 4)];
        setSequence(newSequence);
        setUserSequence([]);
        setTimeout(() => setGameState('showing'), 100);
    }, []);

    useEffect(() => {
        if (gameState === 'showing' && sequence.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                const padId = sequence[i];
                if (padId !== undefined) {
                    setActivePad(padId);
                    playSound('note', padNotes[padId]);
                    setTimeout(() => setActivePad(null), 400);
                }
                i++;
                if (i >= sequence.length) {
                    clearInterval(interval);
                    setTimeout(() => setGameState('playing'), 500);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [gameState, sequence, playSound]);

    const handlePadClick = (id: number) => {
        if (gameState !== 'playing') return;

        setActivePad(id);
        playSound('note', padNotes[id]);
        setTimeout(() => setActivePad(null), 200);

        const newUserSequence = [...userSequence, id];
        setUserSequence(newUserSequence);

        if (id !== sequence[userSequence.length]) {
            setGameState('gameOver');
            playSound('error');
            return;
        }

        if (newUserSequence.length === sequence.length) {
            setScore(s => {
                const newScore = s + 1;
                updateProgress('LAB_RAT', newScore);
                return newScore;
            });
            playSound('success');
            setGameState('waiting');
            setTimeout(() => startNewRound(sequence), 800);
        }
    };

    const startGame = () => {
        playSound('click');
        setScore(0);
        setSequence([]);
        setGameState('waiting');
        startNewRound([]);
    };

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <div className="fixed bottom-6 right-6 z-[100] hidden md:block">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="w-64 glass rounded-[1.5rem] border border-theme p-5 shadow-3d-xl backdrop-blur-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${activeTab === 'game' ? 'bg-warning' : activeTab === 'missions' ? 'bg-sky-400' : 'bg-green-500'} animate-pulse`} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    {activeTab === 'game' ? 'Memory Lab v1.0' : activeTab === 'missions' ? 'Mission Center' : 'Live Monitoring'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveTab(activeTab === 'missions' ? 'monitor' : 'missions')}
                                    className={`p-1.5 rounded-lg transition-all ${activeTab === 'missions' ? 'bg-sky-400 text-black' : 'text-muted hover:text-sky-400 hover:bg-white/5'}`}
                                    title="Missions"
                                >
                                    <FaServer size={10} />
                                </button>
                                <button
                                    onClick={() => setIsGameMode(!isGameMode)}
                                    className={`p-1.5 rounded-lg transition-all ${isGameMode ? 'bg-warning text-black' : 'text-muted hover:text-warning hover:bg-white/5'}`}
                                    title={isGameMode ? "Back to Monitor" : "Enter Game Mode"}
                                >
                                    {isGameMode ? <FaTimes size={10} /> : <FaGamepad size={12} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMuted(!isMuted);
                                        playSound('click');
                                    }}
                                    className="text-muted hover:text-warning transition-colors"
                                >
                                    {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        playSound('click');
                                    }}
                                    className="text-muted hover:text-warning transition-colors"
                                >
                                    <FaChevronDown size={12} />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'game' ? (
                                <motion.div
                                    key="game"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-2 gap-3 aspect-square max-w-[140px] mx-auto">
                                        {[0, 1, 2, 3].map((id) => (
                                            <button
                                                key={id}
                                                onClick={() => handlePadClick(id)}
                                                className={`w-full h-full rounded-xl transition-all duration-200 ${activePad === id ? 'scale-95 brightness-150' : 'brightness-75 hover:brightness-100 opacity-60'} ${['bg-rose-500', 'bg-sky-500', 'bg-emerald-500', 'bg-warning'][id]}`}
                                                disabled={gameState !== 'playing'}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-center space-y-3">
                                        <div className="flex justify-between items-center px-2">
                                            <span className="text-[10px] font-black uppercase text-muted tracking-widest">Score</span>
                                            <span className="text-sm font-black text-warning">{score}</span>
                                        </div>
                                        {gameState === 'idle' && (
                                            <button onClick={startGame} className="w-full py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-warning/50">Start Simulation</button>
                                        )}
                                        {gameState === 'gameOver' && (
                                            <div className="space-y-2">
                                                <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Simulation Failed</p>
                                                <button onClick={startGame} className="w-full py-2 glass border-rose-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-rose-500">Retry</button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : activeTab === 'missions' ? (
                                <motion.div
                                    key="missions"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[8px] font-black uppercase opacity-40">Progression</span>
                                        <span className="text-[10px] font-black text-sky-400">{unlockedCount}/{achievements.length}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {achievements.map((achievement) => (
                                            <div
                                                key={achievement.id}
                                                className={`p-2.5 rounded-xl border transition-all ${achievement.unlocked ? 'bg-sky-400/10 border-sky-400/30' : 'bg-white/5 border-white/10 opacity-70'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{achievement.unlocked ? achievement.icon : (achievement.progress !== undefined ? achievement.icon : '🔒')}</span>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <h5 className={`text-[10px] font-black ${achievement.unlocked ? 'text-sky-400' : 'text-muted'}`}>{achievement.title}</h5>
                                                            {achievement.maxProgress !== undefined && !achievement.unlocked && (
                                                                <span className="text-[8px] font-mono opacity-60">
                                                                    {achievement.progress}/{achievement.maxProgress}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-[8px] opacity-60 line-clamp-1 mb-1.5">{achievement.description}</p>

                                                        {achievement.maxProgress !== undefined && !achievement.unlocked && (
                                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${(achievement.progress || 0) / achievement.maxProgress * 100}%` }}
                                                                    className="h-full bg-sky-400/50"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="monitor"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-5"
                                >
                                    <StatItem icon={<FaMicrochip className="text-sky-400" />} label="CPU Load" value={`${cpuUsage.toFixed(1)}%`} color="bg-sky-400" percent={cpuUsage} />
                                    <StatItem icon={<FaNetworkWired className="text-warning" />} label="Net Flow" value={`${networkTraffic.toFixed(0)} Mbps`} color="bg-warning" percent={(networkTraffic / 1000) * 100} />
                                    <div className="pt-4 border-t border-theme flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <FaServer className="text-[10px] opacity-40" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-muted">Session Time</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-inherit">{formatUptime(uptime)}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute -right-6 -bottom-6 opacity-5 rotate-12 -z-10">
                            <FaServer size={80} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="closed"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsOpen(true)}
                        className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-warning border border-warning/20 shadow-2xl hover:bg-warning/10 transition-all"
                    >
                        <FaChevronUp />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatItem = ({ icon, label, value, color, percent }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-muted">{label}</span>
            </div>
            <span>{value}</span>
        </div>
        <div className="h-1 bg-theme rounded-full overflow-hidden">
            <motion.div
                animate={{ width: `${percent}%` }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);

export default SystemMonitor;
