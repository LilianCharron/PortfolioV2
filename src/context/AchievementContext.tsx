import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSound } from './SoundContext';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: number;
    progress?: number;
    maxProgress?: number;
}

interface AchievementContextType {
    achievements: Achievement[];
    unlock: (id: string) => void;
    updateProgress: (id: string, progress: number) => void;
    recentAchievement: Achievement | null;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    { id: 'HELLO_WORLD', title: 'Hello World', description: 'Lancer le terminal pour la première fois', icon: '⌨️', unlocked: false },
    { id: 'MATRIX_LINK', title: 'Neural Link', description: 'Activer la simulation Matrix', icon: '🕶️', unlocked: false },
    { id: 'SNAKE_ACE', title: 'Snake Ace', description: 'Score > 50 au Snake', icon: '🐍', unlocked: false, progress: 0, maxProgress: 50 },
    { id: 'DARK_SQUARE', title: 'The Dark Side', description: 'Trouver le bouton secret', icon: '🌙', unlocked: false },
    { id: 'HISTORIAN', title: 'Historien', description: 'Découvrir ton parcours (Page CV)', icon: '📜', unlocked: false },
    { id: 'LAB_RAT', title: 'Memory Pro', description: 'Score > 5 au Memory Lab', icon: '🧬', unlocked: false, progress: 0, maxProgress: 6 },
    { id: 'FULL_SYNC', title: 'Synchronisation Totale', description: 'Visiter 5 pages du site', icon: '🛰️', unlocked: false, progress: 0, maxProgress: 5 },
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { playSound } = useSound();
    const [achievements, setAchievements] = useState<Achievement[]>(() => {
        const saved = localStorage.getItem('portfolio-achievements');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return INITIAL_ACHIEVEMENTS.map(initial => {
                    const found = parsed.find((p: any) => p.id === initial.id);
                    return found ? {
                        ...initial,
                        unlocked: found.unlocked,
                        unlockedAt: found.unlockedAt,
                        progress: found.progress ?? initial.progress
                    } : initial;
                });
            } catch (e) {
                return INITIAL_ACHIEVEMENTS;
            }
        }
        return INITIAL_ACHIEVEMENTS;
    });

    const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
    }, [achievements]);

    const unlock = useCallback((id: string) => {
        let wasUnlocked = false;
        let achievement: Achievement | null = null;

        setAchievements(prev => {
            const index = prev.findIndex(a => a.id === id);
            if (index !== -1 && !prev[index].unlocked) {
                wasUnlocked = true;
                const newAchievements = [...prev];
                achievement = { ...newAchievements[index], unlocked: true, unlockedAt: Date.now(), progress: newAchievements[index].maxProgress };
                newAchievements[index] = achievement;
                return newAchievements;
            }
            return prev;
        });

        if (wasUnlocked && achievement) {
            setRecentAchievement(achievement);
            playSound('success');
            setTimeout(() => setRecentAchievement(null), 5000);
        }
    }, [playSound]);

    const updateProgress = useCallback((id: string, progress: number) => {
        setAchievements(prev => {
            const index = prev.findIndex(a => a.id === id);
            if (index !== -1 && !prev[index].unlocked) {
                const achievement = prev[index];
                const newProgress = Math.min(progress, achievement.maxProgress || Infinity);

                if (achievement.progress === newProgress) return prev;

                const newAchievements = [...prev];
                newAchievements[index] = { ...achievement, progress: newProgress };

                // Auto-unlock if max reached
                if (achievement.maxProgress && newProgress >= achievement.maxProgress) {
                    // Use a short delay to trigger unlock after state update
                    setTimeout(() => unlock(id), 0);
                }

                return newAchievements;
            }
            return prev;
        });
    }, [unlock]);

    const [visitedPages, setVisitedPages] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('portfolio-visited-pages');
        if (saved) {
            try {
                return new Set(JSON.parse(saved));
            } catch (e) {
                return new Set();
            }
        }
        return new Set();
    });

    const location = useLocation();

    // Persist visited pages
    useEffect(() => {
        localStorage.setItem('portfolio-visited-pages', JSON.stringify(Array.from(visitedPages)));
    }, [visitedPages]);

    // Track unique pages for FULL_SYNC using useLocation
    useEffect(() => {
        const path = location.pathname;
        if (path && !visitedPages.has(path)) {
            const newVisited = new Set(visitedPages).add(path);
            setVisitedPages(newVisited);
            updateProgress('FULL_SYNC', newVisited.size);
        }
    }, [location.pathname, visitedPages, updateProgress]);

    return (
        <AchievementContext.Provider value={{ achievements, unlock, updateProgress, recentAchievement }}>
            {children}
        </AchievementContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementContext);
    if (context === undefined) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
};
