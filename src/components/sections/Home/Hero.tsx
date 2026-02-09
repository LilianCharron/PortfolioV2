import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight } from 'react-icons/fa';

const Hero: React.FC = () => {
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

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16"
        >
            {/* 1. Cyber Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

            {/* 2. Scanning line animation */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none"
            />

            {/* 3. Interactive Light Follower */}
            <motion.div
                className="absolute w-[1000px] h-[1000px] bg-warning/[0.02] rounded-full blur-[150px] pointer-events-none z-0"
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg glass text-warning text-[8px] font-black tracking-[0.4em] uppercase shadow-2xl"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-warning/50 animate-pulse" />
                                SYSTEM_NOMINAL :: LCH-4172
                            </motion.div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase flex items-center gap-3 flex-wrap">
                                <span className="opacity-30">LILIAN</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning via-orange-500 to-sky-500 relative">
                                    CHARRON
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        className="absolute -bottom-1 left-0 h-[2px] bg-warning/20"
                                    />
                                </span>
                            </h1>

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-lg md:text-xl text-muted font-black tracking-tight uppercase italic flex items-center gap-6"
                            >
                                <span className="w-10 h-[2px] bg-warning/30" />
                                Étudiant BTS SIO / SISR
                            </motion.h2>
                        </div>

                        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                            Architecte d'infra, gardien système et explorateur du Web. Je bâtis des écosystèmes numériques robustes avec une précision chirurgicale.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                href="#projects"
                                className="group px-6 py-3 bg-warning text-bleunuit font-black rounded-xl text-sm flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(251,191,36,0.2)]"
                            >
                                EXPLORER PROJETS
                                <FaChevronRight className="group-hover:translate-x-2 transition-transform text-xs" />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                href="/cv"
                                className="px-6 py-3 glass font-black rounded-xl text-sm hover:bg-warning opacity-80 hover:opacity-100 hover:text-bleunuit transition-all"
                            >
                                VOIR DOSSIER.SYS
                            </motion.a>
                        </div>

                        <div className="flex gap-8 pt-6">
                            <SocialLink href="https://github.com" icon={<FaGithub />} />
                            <SocialLink href="https://linkedin.com" icon={<FaLinkedin />} />
                            <SocialLink href="mailto:contact@liliancharron.fr" icon={<FaEnvelope />} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="relative hidden lg:flex items-center justify-center min-h-[400px]"
                    >
                        {/* Core Visualization Container */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Orbital Rings */}
                            {[1, 2, 3].map((ring) => (
                                <motion.div
                                    key={ring}
                                    animate={{
                                        rotate: ring % 2 === 0 ? 360 : -360,
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 10 + ring * 5, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute inset-0 rounded-full border border-warning/10"
                                    style={{
                                        padding: `${ring * 12}px`,
                                        opacity: 1 - ring * 0.2
                                    }}
                                />
                            ))}

                            {/* Central Pulsating Core with Logo */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 25px rgba(251,191,36,0.15)",
                                        "0 0 50px rgba(251,191,36,0.4)",
                                        "0 0 25px rgba(251,191,36,0.15)"
                                    ],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-warning/30 to-transparent backdrop-blur-3xl border border-warning/40 flex items-center justify-center relative z-20 group cursor-crosshair overflow-hidden p-5"
                            >
                                <img src="/assets/img/LogoNavBar2.webp" alt="Lilian" className="w-full h-full object-contain group-hover:scale-110 duration-700 transition-transform" />

                                <div className="absolute inset-0 border border-warning/20 rounded-full animate-pulse" />

                                {/* Orbiting Nodes */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-40 h-40"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
                                </motion.div>
                            </motion.div>

                            {/* HUD Data Fragments */}
                            <div className="absolute -top-10 -right-10 text-[8px] font-mono text-muted space-y-1">
                                <p>SYS.LOCK: ACTIVE</p>
                                <p>LATENCY: 12ms</p>
                                <p>FLUX: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                            </div>

                            <div className="absolute -bottom-10 -left-10 text-[8px] font-mono text-muted">
                                <p>TRACE_ID: LCH_CORE_v4</p>
                            </div>
                        </div>

                        {/* Background Atmosphere */}
                        <div className="absolute w-64 h-64 bg-warning/5 rounded-full blur-[80px] animate-pulse" />
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-sky-400/5 rounded-full blur-[60px] animate-pulse delay-1000" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <motion.a
        whileHover={{ y: -5, scale: 1.1 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted hover:text-warning hover:border-warning/50 transition-all shadow-lg text-base"
    >
        {icon}
    </motion.a>
);

export default Hero;
