import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBrain, FaCode, FaNetworkWired,
    FaCube, FaLayerGroup, FaMicrochip,
    FaChevronRight, FaTerminal,
    FaProjectDiagram, FaFingerprint
} from 'react-icons/fa';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useSound } from '../../context/SoundContext';

// --- TYPES ---
interface NodeStats {
    label: string;
    value: string;
}

interface TopoNode {
    id: string;
    label: string;
    description: string;
    type: 'core' | 'project' | 'tech';
    icon: React.ReactNode;
    stats: NodeStats[];
    technologies?: string[];
}

// --- SUB-COMPONENTS ---

const HUDTag: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-[8px] font-black uppercase tracking-widest opacity-50">{label}:</span>
        <span className="font-mono text-[9px] text-sky-400 font-bold tracking-wider">{value}</span>
    </div>
);

const DataBus: React.FC<{ isHovered?: boolean; isOutput?: boolean }> = ({ isHovered, isOutput }) => (
    <div className={`w-32 h-40 flex flex-col items-center justify-center transition-all duration-700 ${isHovered ? 'scale-110 opacity-100' : 'opacity-10'}`}>
        <div className="relative w-full h-[1px] bg-sky-200">
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_15px_#38bdf8]"
                animate={{ left: isOutput ? ['0%', '100%'] : ['100%', '0%'], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-4 left-0 w-full h-px bg-sky-400/10" />
            <div className="absolute -top-4 left-0 w-full h-px bg-sky-400/10" />
        </div>
        <div className="mt-8 text-[8px] font-black uppercase tracking-[0.6em] opacity-40">
            {isOutput ? 'Downlink' : 'Uplink'}
        </div>
    </div>
);

interface BlueprintNodeProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    type: 'core' | 'project' | 'tech';
    isMini?: boolean;
    onHover: (id: string | null) => void;
    isHovered?: boolean;
    isHighlight?: boolean;
}

const BlueprintNode: React.FC<BlueprintNodeProps> = ({ id, label, icon, type, isMini, onHover, isHighlight, isHovered }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            className={`
                pointer-events-auto cursor-help transition-all duration-500 relative group
                ${isMini ? 'px-3 py-2 flex items-center gap-3' : 'p-8 w-64'}
                ${isHighlight ? 'border-warning/50 bg-warning/10 shadow-[0_0_40px_rgba(251,191,36,0.1)] translate-x-2' :
                    isHovered ? 'border-sky-400/50 bg-sky-400/10 shadow-[0_0_40px_rgba(56,189,248,0.1)]' :
                        'border-white/10 bg-white/5 hover:border-white/20'}
                border rounded-2xl backdrop-blur-md
            `}
        >
            {!isMini && (
                <>
                    <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${isHovered || isHighlight ? 'border-theme bg-theme shadow-glow' : 'border-white/10 bg-black'} transition-all duration-300`} />
                    <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${isHovered || isHighlight ? 'border-theme bg-theme shadow-glow' : 'border-white/10 bg-black'} transition-all duration-300`} />
                </>
            )}

            <div className={`
                ${isMini ? 'text-[14px]' : 'text-4xl mb-6'}
                ${isHighlight ? 'text-warning' : isHovered ? 'text-sky-400 scale-110' : 'text-white/30'}
                transition-all duration-500
                flex items-center
            `}>
                {icon}
            </div>

            <div>
                <div className={`
                    font-black uppercase tracking-[0.3em] leading-tight
                    ${isMini ? 'text-[9px] opacity-70' : 'text-[13px]'}
                    ${isHovered || isHighlight ? 'text-white' : 'text-white/20'}
                    transition-all duration-300
                `}>
                    {label}
                </div>
                {!isMini && (
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">{type}_ID::{id.slice(0, 5)}</span>
                        <FaChevronRight className="text-white/5 text-[10px]" />
                    </div>
                )}
            </div>

            {isHovered && !isMini && (
                <motion.div
                    className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            )}
        </motion.div>
    );
};

// --- MAIN COMPONENT ---

const NetworkTopology: React.FC = () => {
    const { playSound } = useSound();
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const data = useMemo(() => {
        const techsList = Array.from(new Set(projects.flatMap((p: Project) => p.technologies || [])));

        return {
            core: {
                id: 'core',
                label: 'LILIAN.CORE',
                type: 'core' as const,
                icon: <FaBrain />,
                description: 'Cœur névralgique de toute l\'infrastructure. Gère la logique système, l\'architecture des données et l\'orchestration des modules créatifs.',
                stats: [
                    { label: 'Uptime', value: '100% Guaranteed' },
                    { label: 'Thread_Count', value: '128_Async' },
                    { label: 'Sync_Integrity', value: 'Nominal' }
                ]
            } as TopoNode,
            projects: projects.map((p: Project) => {
                return {
                    id: p.id,
                    label: p.title,
                    description: p.fullDescription.join(' '),
                    type: 'project' as const,
                    technologies: p.technologies,
                    icon: p.id === 'bts1' ? <FaNetworkWired /> :
                        p.id === 'minecraft' ? <FaCube /> :
                            p.id === 'charte' ? <FaLayerGroup /> :
                                p.id === 'portfolio' ? <FaProjectDiagram /> : <FaCode />,
                    stats: [
                        { label: 'Technologies', value: `${p.technologies.length} techs` },
                        { label: 'Status', value: 'Completed' },
                        { label: 'Type', value: p.id === 'bts1' ? 'Infrastructure' : p.id === 'minecraft' ? 'Server' : 'Development' }
                    ]
                } as TopoNode;
            }),
            techs: techsList.map((t: string) => ({
                id: `tech-${t}`,
                label: t,
                type: 'tech' as const,
                icon: <FaMicrochip />,
                description: `Module technologique ${t} : Injection prioritaire dans le stack pour garantir une scalabilité verticale et une résilience système accrue lors des déploiements.`,
                stats: [
                    { label: 'Tech_Class', value: ['React', 'CSS'].includes(t) ? 'Frontend_Logic' : 'System_Level' },
                    { label: 'Vers_Verif', value: 'vLatest' }
                ]
            }) as TopoNode)
        };
    }, []);

    const hoveredNode = useMemo(() => {
        if (!hoveredNodeId) return null;
        if (hoveredNodeId === 'core') return data.core;
        if (hoveredNodeId.startsWith('tech-')) return data.techs.find(t => t.id === hoveredNodeId) || null;
        return data.projects.find(p => p.id === hoveredNodeId) || null;
    }, [hoveredNodeId, data]);

    const onNodeHover = (id: string | null) => {
        try {
            if (id && id !== hoveredNodeId) {
                playSound('mechanical');
            }
        } catch (e) {
            // Silently fail if audio context issue
        }
        setHoveredNodeId(id);
    };

    return (
        <div
            ref={containerRef}
            className="w-full min-h-[850px] glass rounded-3xl border border-theme overflow-hidden relative bg-black shadow-2xl"
        >
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* HUD LAYER */}
            <div className="absolute top-10 right-10 z-50 pointer-events-none">
                <AnimatePresence mode="wait">
                    {hoveredNode && (
                        <motion.div
                            key={hoveredNode.id}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className="glass-dark border border-theme/50 p-6 rounded-2xl w-[340px] shadow-3d-xl pointer-events-auto backdrop-blur-xl"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <FaTerminal className="text-warning text-xs" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-warning">Diagnostic_Intel_Report</span>
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2 leading-none">{hoveredNode.label}</h3>
                            <div className="flex gap-2 mb-4">
                                <span className="px-2 py-0.5 bg-sky-400/10 border border-sky-400/20 text-[7px] font-black uppercase tracking-widest text-sky-400 rounded-sm">Node_{hoveredNode.type.toUpperCase()}</span>
                            </div>

                            <p className="text-[11px] leading-relaxed text-white/50 mb-6 font-medium border-l-2 border-theme/20 pl-3">
                                {hoveredNode.description}
                            </p>

                            <div className="space-y-2">
                                {hoveredNode.stats.map((stat, idx) => (
                                    <div key={`${stat.label}-${idx}`} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors">
                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-40">{stat.label}</span>
                                        <span className="font-mono text-[10px] text-sky-400 font-bold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* GRAPH LAYER */}
            <div className="relative h-full flex flex-col p-12 z-10 min-h-[850px]">
                <div className="flex justify-between items-start mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <FaProjectDiagram className="text-sky-400" />
                            <span className="text-[12px] font-black uppercase tracking-[0.8em] text-sky-400">Master_Architecture_Control</span>
                        </div>
                        <div className="flex gap-10 opacity-40">
                            <HUDTag label="Core_Status" value="Optimized" />
                            <HUDTag label="Topology" value="Fixed_Grid" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-between px-10">
                    <div className="flex-1 flex justify-center">
                        <BlueprintNode
                            id="core"
                            label="Lilian.Core"
                            icon={<FaBrain className="text-sky-400 text-4xl" />}
                            type="core"
                            onHover={onNodeHover}
                            isHovered={hoveredNodeId === 'core'}
                        />
                    </div>

                    <DataBus isHovered={hoveredNodeId === 'core' || data.projects.some(p => p.id === hoveredNodeId)} />

                    <div className="flex flex-col gap-10 items-center px-10">
                        {data.projects.map((p) => {
                            const isHighlightedByTech = hoveredNodeId?.startsWith('tech-') &&
                                (p.technologies || []).includes(hoveredNodeId.replace('tech-', ''));

                            return (
                                <BlueprintNode
                                    key={p.id}
                                    id={p.id}
                                    label={p.label}
                                    icon={p.icon}
                                    type="project"
                                    onHover={onNodeHover}
                                    isHovered={hoveredNodeId === p.id}
                                    isHighlight={isHighlightedByTech}
                                />
                            );
                        })}
                    </div>

                    <DataBus
                        isHovered={
                            data.projects.some(p => p.id === hoveredNodeId) ||
                            data.techs.some(t => t.id === hoveredNodeId) ||
                            (hoveredNodeId?.startsWith('tech-') && data.projects.some(p => (p.technologies || []).includes(hoveredNodeId.replace('tech-', ''))))
                        }
                        isOutput
                    />

                    <div className="flex-1 max-w-[350px] flex flex-wrap gap-2.5 justify-start content-center pl-10">
                        {data.techs.map((t) => {
                            const isConnectedToProject = projects.some(p => p.id === hoveredNodeId && (p.technologies || []).includes(t.label));
                            return (
                                <BlueprintNode
                                    key={t.id}
                                    id={t.id}
                                    label={t.label}
                                    icon={<FaMicrochip />}
                                    type="tech"
                                    isMini
                                    onHover={onNodeHover}
                                    isHighlight={isConnectedToProject}
                                    isHovered={hoveredNodeId === t.id}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-end" onMouseEnter={() => onNodeHover(null)}>
                    <div className="flex items-center gap-12 font-mono text-[9px] opacity-20 uppercase tracking-widest">
                        <span>SYSTEM_HEALTH: NOMINAL</span>
                        <span>DATA_INTEGRITY: 100%</span>
                    </div>
                    <div className="flex items-center gap-4 opacity-30 group cursor-help transition-opacity hover:opacity-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Hover nodes for system intel</span>
                        <FaFingerprint className="text-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkTopology;
