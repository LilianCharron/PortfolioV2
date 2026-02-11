import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import Breadcrumb from '../components/UI/Breadcrumb';
import { projects } from '../data/projects';
import { FaChevronLeft, FaExternalLinkAlt, FaArrowRight, FaNetworkWired, FaPalette, FaCube, FaCode } from 'react-icons/fa';

// Project icons mapping
const projectIcons: Record<string, React.ReactNode> = {
    'bts1': <FaNetworkWired className="text-6xl" />,
    'charte': <FaPalette className="text-6xl" />,
    'minecraft': <FaCube className="text-6xl" />,
    'portfolio': <FaCode className="text-6xl" />,
};

// Project gradient colors
const projectGradients: Record<string, string> = {
    'bts1': 'from-sky-500 via-blue-600 to-indigo-700',
    'charte': 'from-warning via-orange-500 to-yellow-600',
    'minecraft': 'from-emerald-500 via-green-600 to-teal-700',
    'portfolio': 'from-purple-500 via-violet-600 to-indigo-700',
};

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

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

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative"
        >
            <SEOHead
                title="Projets - Portfolio BTS SISR | Lilian Charron"
                description="Découvrez mes projets techniques BTS SISR : infrastructure réseau WAN/DMZ/LAN, serveur Minecraft Valdrum, charte graphique et plus encore."
                keywords={['Projets BTS SISR', 'Infrastructure Réseau', 'Portfolio Technique', 'Minecraft Server', 'Design System']}
                canonicalUrl="/projects"
            />

            {/* Animated Backgrounds */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none"
            />

            <motion.div
                className="absolute w-[800px] h-[800px] bg-warning/[0.03] rounded-full blur-[120px] pointer-events-none z-0"
                style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }}
            />

            <motion.div
                style={{ y: y1, opacity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/[0.02] rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
                style={{ y: y2, opacity }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/[0.02] rounded-full blur-[100px] pointer-events-none"
            />

            <Breadcrumb />

            <div className="container mx-auto max-w-7xl relative z-10">
                <Link to="/" className="inline-flex items-center gap-4 text-muted hover:text-warning mb-12 transition-all group uppercase font-black tracking-widest text-xs">
                    <FaChevronLeft className="group-hover:-translate-x-2 transition-transform" /> [ RETOUR ]
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 mb-20"
                >
                    <div className="flex items-center gap-6 flex-wrap">
                        <span className="px-4 py-1.5 bg-warning/10 text-warning text-[10px] font-black uppercase rounded-full tracking-widest border border-warning/20 backdrop-blur-sm">
                            PORTFOLIO TECHNIQUE
                        </span>
                        <div className="h-[1px] flex-grow bg-theme hidden md:block" />
                        <span className="text-muted text-[10px] font-black tracking-[0.4em] uppercase">{projects.length} PROJETS</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning via-orange-400 to-yellow-500">Réalisations</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted font-medium max-w-4xl leading-relaxed">
                        Découvrez mes réalisations techniques en <strong className="text-sky-400">infrastructure réseau</strong>, <strong className="text-warning">administration système</strong>, et <strong className="text-emerald-400">développement</strong>.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: [0.34, 1.56, 0.64, 1]
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="glass border border-theme rounded-[2rem] overflow-hidden group relative"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-warning/0 via-warning/0 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                            {/* Modern Gradient Header with Icon */}
                            <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${projectGradients[project.id] || 'from-gray-700 to-gray-900'} flex items-center justify-center`}>
                                {/* Animated gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Mesh gradient effect */}
                                <div className="absolute inset-0 opacity-30" style={{
                                    backgroundImage: `radial-gradient(circle at 20% 50%, currentColor 1px, transparent 1px),
                                   radial-gradient(circle at 80% 80%, currentColor 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px'
                                }} />

                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.9 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative z-10 text-white/90"
                                >
                                    {projectIcons[project.id]}
                                </motion.div>

                                {/* Floating particles */}
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full blur-sm"
                                />
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        opacity: [0.3, 0.8, 0.3]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 1
                                    }}
                                    className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white rounded-full blur-sm"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-5 relative z-20">
                                <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-warning transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-sm text-muted leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 4).map((tech, i) => (
                                        <motion.span
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                            className="px-3 py-1.5 bg-warning/5 text-warning text-xs font-bold rounded-lg border border-warning/10 backdrop-blur-sm hover:bg-warning/10 hover:border-warning/20 transition-all"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-3 py-1.5 text-muted text-xs font-bold">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* CTA */}
                                <div className="pt-4 border-t border-theme">
                                    {project.link && (
                                        <Link
                                            to={project.link}
                                            className="inline-flex items-center gap-3 text-warning hover:text-white font-black text-sm uppercase tracking-wider group/link transition-all"
                                        >
                                            <span className="relative">
                                                Découvrir le projet
                                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-warning group-hover/link:w-full transition-all duration-300" />
                                            </span>
                                            {project.link.startsWith('http') ? (
                                                <FaExternalLinkAlt className="text-xs group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                            ) : (
                                                <FaArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                                            )}
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Bottom gradient accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-warning/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: projects.length * 0.1 + 0.3 }}
                    className="mt-20 text-center glass border border-theme rounded-[3rem] p-16 space-y-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-sky-500/5 pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                            Plus de projets à venir
                        </h3>
                        <p className="text-muted text-lg max-w-2xl mx-auto">
                            Ce portfolio évolue constamment avec de nouveaux projets techniques et challenges relevés.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
