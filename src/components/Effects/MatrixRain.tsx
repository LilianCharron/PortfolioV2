import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../../context/SoundContext';

const MatrixRain: React.FC = () => {
    const { playSound } = useSound();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMatrix = () => {
            setIsActive(true);
            playSound('scan');
        };
        const handleStop = () => setIsActive(false);

        window.addEventListener('matrix-start', handleMatrix);
        window.addEventListener('matrix-stop', handleStop);

        return () => {
            window.removeEventListener('matrix-start', handleMatrix);
            window.removeEventListener('matrix-stop', handleStop);
        };
    }, []);

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-[9998] pointer-events-auto bg-black/80">
            <canvas ref={canvasRef} className="block" />
            <button
                onClick={() => {
                    setIsActive(false);
                    playSound('click');
                }}
                onMouseEnter={() => playSound('hover')}
                className="absolute top-10 right-10 z-[9999] px-6 py-3 bg-green-500 text-black font-black rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs"
            >
                EXIT MATRIX
            </button>
        </div>
    );
};

export default MatrixRain;
