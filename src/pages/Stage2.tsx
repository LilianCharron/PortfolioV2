import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
    FaGraduationCap, FaBuilding, FaCheckCircle,
    FaShieldAlt, FaNetworkWired, FaServer,
    FaDocker, FaLock, FaWindows
} from 'react-icons/fa';
import { SiDocker } from 'react-icons/si';

const Stage2: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const keywords = ["VPN", "MFA", "pfSense", "VLAN", "LAPS", "Radius", "SISR", "Docker", "Active Directory", "Firewall"];

    return (
        <div
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="pt-20 pb-24 px-4 min-h-screen bg-page relative overflow-hidden"
        >
            {/* 1. Cyber Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

            {/* 2. Scanning line animation */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/20 to-transparent z-[1] pointer-events-none"
            />

            {/* 3. Interactive Light Follower */}
            <motion.div
                className="absolute w-[1000px] h-[1000px] bg-sky-500/[0.02] rounded-full blur-[150px] pointer-events-none z-0"
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Drifting Floating Keywords */}
            {keywords.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.08, 0] }}
                    animate={{
                        x: [Math.random() * 60, Math.random() * -60],
                        y: [Math.random() * 60, Math.random() * -60]
                    }}
                    transition={{ duration: 18 + i, repeat: Infinity, ease: "linear" }}
                    className="absolute text-muted/10 text-[10px] md:text-sm font-black tracking-widest pointer-events-none select-none"
                    style={{ left: `${Math.random() * 95}%`, top: `${Math.random() * 95}%` }}
                >
                    {word}
                </motion.span>
            ))}

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Hero Header */}
                <div className="flex flex-col items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-theme text-sky-400 text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-2xl"
                    >
                        <FaShieldAlt className="text-sm" /> Infrastructure Report v2.0
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center leading-none uppercase"
                    >
                        CYBER & <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500">NETWORK</span>
                    </motion.h1>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <div className="px-4 py-1.5 rounded-lg glass border border-theme text-muted text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                            <FaBuilding className="text-sky-500" /> Org: <span className="text-inherit">DE SANGOSSE</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-lg glass border border-theme text-muted text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                            <FaGraduationCap className="text-sky-500" /> Stage: <span className="text-inherit">2EME ANNÉE (SISR)</span>
                        </div>
                    </div>
                </div>

                {/* Summary Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <InfoSummary icon={<FaShieldAlt />} label="Core Focus" value="Sécurisation VPN & MFA" />
                    <InfoSummary icon={<FaNetworkWired />} label="Architecture" value="Firewalling pfSense L3" />
                    <InfoSummary icon={<FaCheckCircle />} label="Compliance" value="Deployment LAPS & Duo" />
                </div>

                {/* Main Content Sections */}
                <div className="space-y-20 md:space-y-32">

                    {/* Mission Architecture Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase flex items-center gap-4">
                                <span className="text-sky-500">01.</span> Infrastucture Lab
                            </h2>
                            <p className="text-muted text-lg leading-relaxed font-medium">
                                Mise en place d'un environnement de laboratoire complet pour simuler et valider les changements critiques avant mise en production.
                            </p>
                            <div className="space-y-4">
                                <TaskItem title="Switching L2/L3" desc="Configuration de VLANs, routage inter-VLAN et optimisation des flux réseaux sur matériel physique." />
                                <TaskItem title="pfSense Implementation" desc="Déploiement et mise à jour de firewalls pfSense, correction de certificats et résolution de dépendances pkg." />
                                <TaskItem title="Network Simulation" desc="Réplication du réseau existant pour tester des règles de pare-feu complexes sans impact sur la production." />
                            </div>
                        </motion.div>
                        <div className="glass border border-theme rounded-[2.5rem] p-6 md:p-8 aspect-video relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
                            <FaServer className="absolute -bottom-10 -right-10 text-sky-500/5 group-hover:scale-110 transition-transform duration-1000" size={300} />
                            <div className="relative z-10 flex flex-col h-full justify-center items-center text-center space-y-6">
                                <FaNetworkWired className="text-sky-500 text-6xl animate-pulse" />
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Network Status</p>
                                    <p className="text-2xl font-black">SEGMENTED & ROUTED</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VPN & MFA Module */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="glass border border-theme rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 shadow-3xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 text-8xl">
                            <FaLock />
                        </div>
                        <div className="max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter uppercase italic">
                                SÉCURISATION <span className="text-warning">VPN MFA</span>
                            </h2>
                            <p className="text-muted text-lg mb-12 leading-relaxed">
                                Intégration de la solution Duo MFA avec pfSense et OpenVPN pour répondre aux nouvelles exigences de cybersécurité de l'entreprise.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-warning">Technologies Scalées</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge text="Radius" />
                                        <Badge text="OpenVPN" />
                                        <Badge text="Duo Push" />
                                        <Badge text="Active Directory" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-sky-500">Migration Strategy</h4>
                                    <p className="text-sm text-muted font-medium">Étude et mise en place d'une transition douce via Radius pour les utilisateurs internes et externes.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tools & Docker Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
                        <ToolCard
                            icon={<FaDocker className="text-sky-500" />}
                            title="Docker Systems"
                            desc="Hébergement d'outils internes via Portainer pour la centralisation des services."
                        />
                        <ToolCard
                            icon={<FaWindows className="text-emerald-500" />}
                            title="Active Directory LAPS"
                            desc="Déploiement de la solution LAPS pour la gestion automatisée des mots de passe admin locaux."
                        />
                        <ToolCard
                            icon={<FaNetworkWired className="text-warning" />}
                            title="Flow Analysis"
                            desc="Utilisation de FossFLOW et Scanopy pour la cartographie et l'audit automatique du réseau."
                        />
                    </div>

                    {/* Weekly Timeline */}
                    <div className="space-y-12 md:space-y-16">
                        <h2 className="text-3xl md:text-4xl font-black text-center tracking-tighter uppercase opacity-20">Mission Timeline</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left">
                            <TimelineCard week="01" title="Environment" tasks={["AD Integration", "L2/L3 Switching", "pfSense Updates", "Poste Deployment"]} />
                            <TimelineCard week="02" title="Security" tasks={["OpenVPN MFA", "Duo Integration", "Radius Setup", "Migration Audit"]} />
                            <TimelineCard week="03" title="Infrastructure" tasks={["Hardware Sorting", "LAPS Deployment", "Firewall Analysis", "Network Scan"]} />
                            <TimelineCard week="04" title="Deployment" tasks={["Internal Hosting", "Docker/Portainer", "Network Mapping", "Final Documentation"]} />
                        </div>
                    </div>

                </div>

                {/* Conclusion Footer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-32 text-center"
                >
                    <div className="inline-block p-8 md:p-12 glass border border-theme rounded-[2rem] md:rounded-[2.5rem] relative group shadow-3xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">System Ready</h3>
                        <p className="text-muted italic max-w-2xl mx-auto font-medium">
                            "Ce stage de deuxième année m'a permis de valider mes compétences en administration réseaux et cybersécurité au sein d'une infrastructure d'entreprise réelle."
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const TaskItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex gap-4 group">
        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 group-hover:scale-150 transition-transform" />
        <div>
            <h4 className="font-black text-sm uppercase tracking-tight mb-1">{title}</h4>
            <p className="text-muted text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const TimelineCard = ({ week, title, tasks }: { week: string, title: string, tasks: string[] }) => (
    <div className="glass border border-theme rounded-3xl p-8 relative overflow-hidden hover:border-sky-500/30 transition-all group">
        <div className="absolute top-4 right-4 text-4xl font-black opacity-5 group-hover:opacity-10 transition-opacity">W{week}</div>
        <h4 className="text-sky-500 text-[10px] font-black uppercase tracking-widest mb-1">Week {week}</h4>
        <h3 className="text-xl font-black mb-6 tracking-tight">{title}</h3>
        <ul className="space-y-3">
            {tasks.map((t, idx) => (
                <li key={idx} className="flex items-center gap-2 text-muted text-xs font-medium">
                    <div className="w-1 h-1 rounded-full bg-theme" /> {t}
                </li>
            ))}
        </ul>
    </div>
);

const Badge = ({ text }: { text: string }) => (
    <span className="px-3 py-1 glass border border-theme rounded-lg text-[9px] font-black uppercase tracking-widest text-muted">{text}</span>
);

const InfoSummary = ({ icon, label, value }: any) => (
    <div className="glass border border-theme rounded-[1.5rem] p-6 md:p-8 overflow-hidden relative group shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-125 transition-transform duration-1000">
            {icon}
        </div>
        <div className="flex flex-col gap-1.5 relative z-10">
            <span className="text-sky-500 text-[8px] uppercase tracking-[0.4em] font-black">{label}</span>
            <span className="font-black text-lg tracking-tight leading-tight">{value}</span>
        </div>
    </div>
);

const ToolCard = ({ icon, title, desc }: any) => (
    <div className="glass border border-theme rounded-[1.5rem] p-8 hover:bg-sky-500/5 transition-all duration-500 group relative overflow-hidden shadow-xl">
        <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl glass border border-theme flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-sky-500/10 transition-all duration-700 shadow-lg">{icon}</div>
            <h4 className="text-xl font-black tracking-tight">{title}</h4>
        </div>
        <p className="text-muted text-sm leading-relaxed font-medium relative z-10">{desc}</p>
    </div>
);

export default Stage2;
