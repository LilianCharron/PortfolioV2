import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaRedo } from 'react-icons/fa';
import { useSound } from '../../context/SoundContext';
import { useAchievements } from '../../context/AchievementContext';

// --- SNAKE GAME LOGIC ---
const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

const SnakeGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const { playSound } = useSound();
    const { updateProgress } = useAchievements();
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 3, y: 3 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) { setDirection({ x: 0, y: -1 }); playSound('mechanical'); }
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) { setDirection({ x: 0, y: 1 }); playSound('mechanical'); }
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) { setDirection({ x: -1, y: 0 }); playSound('mechanical'); }
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) { setDirection({ x: 1, y: 0 }); playSound('mechanical'); }
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, playSound]);

    useEffect(() => {
        updateProgress('SNAKE_ACE', score);
    }, [score, updateProgress]);

    useEffect(() => {
        if (isGameOver) {
            playSound('error');
        }
    }, [isGameOver, playSound]);

    useEffect(() => {
        if (isGameOver) return;

        const moveSnake = () => {
            const newHead = {
                x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
                y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
            };

            if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                setIsGameOver(true);
                return;
            }

            const newSnake = [newHead, ...snake];

            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 10);
                playSound('success');
                setFood({
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE),
                });
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const gameLoop = setInterval(moveSnake, 150);
        return () => clearInterval(gameLoop);
    }, [snake, direction, isGameOver, food, playSound]);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-between w-full px-4 text-[10px] font-black uppercase tracking-widest text-warning">
                <span>Score: {score}</span>
                {isGameOver && <span className="text-red-500 animate-pulse">Game Over!</span>}
            </div>
            <div className="grid bg-black/40 border border-theme rounded-lg overflow-hidden" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, width: '210px', height: '210px' }}>
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div key={i} className={`w-full h-full border-[0.1px] border-white/5 ${isHead ? 'bg-warning' : isSnake ? 'bg-warning/40' : isFood ? 'bg-emerald-500 animate-pulse scale-75 rounded-full' : ''}`} />
                    );
                })}
            </div>
            <div className="flex gap-4 mt-2">
                <button onClick={() => { setSnake(INITIAL_SNAKE); setDirection(INITIAL_DIRECTION); setIsGameOver(false); setScore(0); }} className="px-4 py-1.5 glass rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-warning/50"><FaRedo className="inline mr-2" /> Reset</button>
                <button onClick={onExit} className="px-4 py-1.5 glass rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-red-500/50">Exit Game</button>
            </div>
        </div>
    );
};

// --- TERMINAL COMPONENT ---
const InteractiveTerminal: React.FC = () => {
    const { playSound } = useSound();
    const { unlock } = useAchievements();
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([
        'LAB Terminal v5.0 [SISR-OS]',
        'System: Lilian Charron Architecture',
        'Tapez "help" pour commencer.'
    ]);
    const [input, setInput] = useState('');
    const [isSnakeMode, setIsSnakeMode] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.toLowerCase().trim();
        let response = '';

        switch (cleanCmd) {
            case 'help':
                response = 'Commandes: matrix, snake, whoami, skills, clear, exit';
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'snake':
                setIsSnakeMode(true);
                playSound('startup');
                response = 'Launching SNAKE.EXE...';
                break;
            case 'matrix':
                window.dispatchEvent(new CustomEvent('matrix-start'));
                unlock('MATRIX_LINK');
                response = 'Initializing Neural Link...';
                break;
            case 'exit':
                setIsOpen(false);
                return;
            default:
                response = `Commande inconnue: ${cleanCmd}. Tapez "help".`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response]);
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100] hidden md:block">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-[450px] h-[350px] glass rounded-3xl border border-theme shadow-3d-xl overflow-hidden flex flex-col">
                        <div className="bg-white/5 px-6 py-3 border-b border-theme flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaTerminal className="text-warning text-xs" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">SISR-OS / Term v5.0</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="w-2.5 h-2.5 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed scrollbar-hide bg-black/20">
                            {isSnakeMode ? (
                                <SnakeGame onExit={() => setIsSnakeMode(false)} />
                            ) : (
                                <>
                                    {history.map((line, i) => (
                                        <div key={i} className={line.startsWith('>') ? 'text-warning/80' : 'text-sky-400'}>{line}</div>
                                    ))}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-warning text-sm">λ</span>
                                        <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleCommand(input); setInput(''); playSound('mechanical'); } }} className="flex-1 bg-transparent border-none outline-none text-sky-400 placeholder-sky-900" placeholder="Entrez une commande..." />
                                    </div>
                                    <div ref={terminalEndRef} />
                                </>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setIsOpen(true); playSound('startup'); unlock('HELLO_WORLD'); }} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-warning border border-warning/20 shadow-2xl hover:bg-warning/10 transition-all">
                        <FaTerminal />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveTerminal;
