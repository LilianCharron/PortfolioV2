import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'terminal' | 'success' | 'error' | 'note' | 'shimmer' | 'scan' | 'mechanical' | 'startup' | 'toggle';

interface SoundContextType {
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    playSound: (type: SoundType, frequency?: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('sound-muted');
        return saved ? JSON.parse(saved) : false;
    });

    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

    useEffect(() => {
        localStorage.setItem('sound-muted', JSON.stringify(isMuted));
    }, [isMuted]);

    const initAudio = useCallback(() => {
        if (!audioCtx) {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            setAudioCtx(ctx);
            return ctx;
        }
        return audioCtx;
    }, [audioCtx]);

    const playSound = useCallback((type: SoundType, frequency?: number) => {
        if (isMuted) return;

        const ctx = initAudio();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'click':
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'terminal':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150 + Math.random() * 50, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case 'success':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(500, now);
                osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'error':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.2);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'note':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(frequency || 440, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
                break;

            case 'shimmer':
                // Arpeggiated shimmer effect using separate oscillators
                [880, 1320, 1760].forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = 'sine';
                    o.frequency.setValueAtTime(freq, now + i * 0.1);
                    g.gain.setValueAtTime(0, now + i * 0.1);
                    g.gain.linearRampToValueAtTime(0.05, now + i * 0.1 + 0.05);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.start(now + i * 0.1);
                    o.stop(now + i * 0.1 + 0.3);
                });
                break;

            case 'scan':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'mechanical':
                // Short, sharp metallic click
                osc.type = 'square';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.02);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
                osc.start(now);
                osc.stop(now + 0.02);
                break;

            case 'startup':
                // Cinematic rising drone
                const startupFreqs = [110, 220, 330];
                startupFreqs.forEach((f, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = i === 0 ? 'sawtooth' : 'sine';
                    o.frequency.setValueAtTime(f, now);
                    o.frequency.exponentialRampToValueAtTime(f * 2, now + 0.8);
                    g.gain.setValueAtTime(0, now);
                    g.gain.linearRampToValueAtTime(0.03, now + 0.2);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.start(now);
                    o.stop(now + 0.8);
                });
                break;

            case 'toggle':
                // Clean switch flick
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(1000, now + 0.05);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
        }
    }, [isMuted, initAudio]);

    return (
        <SoundContext.Provider value={{ isMuted, setIsMuted, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
