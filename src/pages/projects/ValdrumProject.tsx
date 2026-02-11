import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Breadcrumb from '../../components/UI/Breadcrumb';
import {
    FaChevronLeft, FaExternalLinkAlt, FaShieldAlt, FaServer, FaCog, FaUsers, FaCube,
    FaLock, FaGlobe, FaTerminal, FaDatabase, FaTools, FaStar
} from 'react-icons/fa';

const ValdrumProject: React.FC = () => {
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

    // Données simplifiées pour build
    const corePlugins = [
        { name: 'LuckPerms', version: 'v5.5.2', category: 'Permissions', icon: <FaShieldAlt />, desc: 'Système de gestion de permissions avancé avec support des groupes, héritages, meta-données et synchronisation SQL.', config: 'MySQL backend, weight-based inheritance, context-aware permissions' },
        { name: 'WorldGuard', version: 'v7.0.14', category: 'Protection', icon: <FaLock />, desc: 'Protection de zones (regions) avec flags configurables, blacklist d\'items, et anti-grief complet.', config: 'Régions hiérarchiques, flags custom, priorities, ownership' },
        { name: 'WorldEdit', version: 'v7.3.16', category: 'Edition', icon: <FaTools />, desc: 'Outil d\'édition de terrain in-game avec commandes puissantes.', config: 'Historique, patterns, masques, transformations' },
        { name: 'Multiverse', version: 'v5.1.2', category: 'Mondes', icon: <FaGlobe />, desc: 'Gestion de mondes multiples avec générateurs custom.', config: '5 mondes: world, world2, nether, end, spawn' },
        { name: 'EssentialsX', version: 'v2.22.0', category: 'Core', icon: <FaCube />, desc: 'Plugin essentiel fournissant 100+ commandes de base.', config: 'Homes, warps, kits, teleportation' },
        { name: 'Vault', version: 'Latest', category: 'API', icon: <FaDatabase />, desc: 'API unifiée pour permissions et économie.', config: 'Bridge économique entre plugins' },
    ];

    const stats = [
        { label: 'Plugins', value: '23', icon: <FaCog />, color: 'text-emerald-400' },
        { label: 'Mondes', value: '5', icon: <FaGlobe />, color: 'text-sky-400' },
        { label: 'Capacité', value: '100', icon: <FaUsers />, color: 'text-warning' },
        { label: 'Version', value: '1.21+', icon: <FaServer />, color: 'text-purple-400' },
    ];

    return (
        <div ref={sectionRef} onMouseMove={handleMouseMove} className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative">
            <Breadcrumb />
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none" />
            <motion.div className="absolute w-[1000px] h-[1000px] bg-warning/[0.03] rounded-full blur-[150px] pointer-events-none z-0" style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }} />

            <div className="container mx-auto max-w-7xl relative z-10">
                <Link to="/" className="inline-flex items-center gap-4 text-muted hover:text-warning mb-12 transition-all group uppercase font-black tracking-widest text-xs">
                    <FaChevronLeft className="group-hover:-translate-x-2 transition-transform" /> [ RETOUR ]
                </Link>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-20">
                    {/* Hero */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-6 flex-wrap">
                            <span className="px-4 py-1.5 bg-warning/10 text-warning text-[10px] font-black uppercase rounded-full tracking-widest border border-warning/20">SERVEUR MINECRAFT</span>
                            <div className="h-[1px] flex-grow bg-theme hidden md:block" />
                            <span className="text-muted text-[10px] font-black tracking-[0.4em] uppercase">Production Active</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Serveur <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning via-orange-400 to-yellow-500">Valdrum</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted font-medium max-w-4xl leading-relaxed">
                            Infrastructure complète de serveur Minecraft <strong className="text-warning">PaperMC 1.21+</strong> haute performance, configurée pour supporter jusqu'à <strong className="text-sky-400">100 joueurs simultanés</strong> avec <strong className="text-emerald-400">23 plugins optimisés</strong>, architecture multi-mondes, et monitoring en temps réel.
                        </p>

                        <motion.a whileHover={{ scale: 1.05 }} href="https://valdrum.fr:12347/Apropos.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-8 py-4 bg-warning text-black rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(251,191,36,0.2)] group">
                            SITE OFFICIEL <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: 'Version', value: 'PaperMC 1.21+', icon: <FaServer /> },
                            { label: 'Capacité', value: '100 joueurs', icon: <FaUsers /> },
                            { label: 'Mode', value: 'Survival Hard', icon: <FaCube /> },
                            { label: 'Sécurité', value: 'Whitelist + DDoS', icon: <FaShieldAlt /> },
                            { label: 'Mondes', value: '5 dimensions', icon: <FaGlobe /> },
                            { label: 'Plugins', value: '23 actifs', icon: <FaCog /> },
                        ].map((spec) => (
                            <div key={spec.label} className="glass border border-theme rounded-2xl p-6 text-center space-y-3 hover:border-warning/30 transition-all">
                                <div className="text-2xl text-warning mx-auto">{spec.icon}</div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-muted opacity-60">{spec.label}</div>
                                <div className="text-sm font-black">{spec.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Introduction */}
                    <div className="glass border border-theme rounded-[3rem] p-12 md:p-16 space-y-8">
                        <div className="flex items-center gap-4">
                            <FaTerminal className="text-warning text-4xl" />
                            <h2 className="text-4xl font-black tracking-tighter uppercase">Aperçu du Projet</h2>
                        </div>

                        <div className="space-y-6 text-muted text-lg leading-relaxed">
                            <p><strong className="text-white">Valdrum</strong> est un serveur Minecraft Survival professionnel basé sur <strong className="text-warning">PaperMC 1.21+</strong>, conçu pour offrir une expérience de jeu complète et optimisée. Le projet combine une architecture réseau robuste, une stack de 23 plugins soigneusement sélectionnés, et des configurations avancées pour garantir stabilité et performance.</p>

                            <p>Le serveur implémente une <strong className="text-sky-400">architecture multi-mondes</strong> avec gestion séparée des inventaires, un système économique complet, des protections multi-niveaux (zones WorldGuard + claims individuels), et des fonctionnalités sociales avancées incluant voice chat intégré et NPCs interactifs.</p>

                            <p>Hébergé sur infrastructure Linux dédiée, le serveur bénéficie d'optimisations server-side poussées (entity activation range, hopper timings, chunk loading), de monitoring en temps réel via Spark et bStats, et d'une protection DDoS active via TCPShield. La configuration supporte un maximum de <strong className="text-emerald-400">100 joueurs simultanés</strong> avec whitelist activée pour contrôle d'accès.</p>
                        </div>
                    </div>

                    {/* Core Plugins */}
                    <div className="glass border border-theme rounded-[3rem] p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaServer className="text-warning" /> Plugins Core (6)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {corePlugins.map((plugin) => (
                                <div key={plugin.name} className="glass border border-theme rounded-2xl p-6 space-y-4 hover:border-warning/30 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl text-warning">{plugin.icon}</div>
                                            <div>
                                                <h3 className="text-xl font-black">{plugin.name}</h3>
                                                <p className="text-xs text-muted font-mono">{plugin.version}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-warning/10 text-warning text-[8px] font-black uppercase rounded-lg">{plugin.category}</span>
                                    </div>
                                    <p className="text-sm text-muted">{plugin.desc}</p>
                                    <div className="pt-3 border-t border-theme text-xs text-muted/70">{plugin.config}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="glass border border-theme rounded-2xl p-8 text-center space-y-4">
                                <div className={`text-4xl mx-auto ${stat.color}`}>{stat.icon}</div>
                                <div className="text-3xl font-black">{stat.value}</div>
                                <div className="text-xs font-black uppercase tracking-wider text-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center glass border border-warning/20 bg-warning/5 rounded-[3rem] p-16 space-y-6">
                        <FaStar className="text-warning text-5xl mx-auto" />
                        <h3 className="text-4xl font-black uppercase tracking-tighter">Rejoindre Valdrum</h3>
                        <p className="text-muted max-w-2xl mx-auto text-lg">Serveur Survival optimisé avec communauté active et features uniques.</p>
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://valdrum.fr:12347/Apropos.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-warning via-orange-400 to-yellow-500 text-black rounded-2xl font-black text-lg shadow-[0_0_60px_rgba(251,191,36,0.3)]">
                            EN SAVOIR PLUS <FaExternalLinkAlt />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ValdrumProject;
