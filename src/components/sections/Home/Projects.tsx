import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Card from '../../UI/Card';
import { projects } from '../../../data/projects';
import { FaCode, FaTerminal, FaMicrochip, FaNetworkWired, FaTools } from 'react-icons/fa';

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
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

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    const keywords = ["SISR", "MVC", ".NET", "Linux", "Network", "Active Directory", "Security", "DevOps"];

    return (
        <section
            id="projects"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="py-16 relative overflow-hidden bg-page"
        >
            {/* 1. Cyber Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* 2. Scanning line animation */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none"
            />

            {/* 3. Sidebars - Lab Status */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-16 pointer-events-none z-10 opacity-30">
                <p className="rotate-90 text-[8px] font-black tracking-[0.5em] uppercase whitespace-nowrap">Core.Module.active</p>
                <div className="w-[1px] h-24 bg-theme mx-auto" />
                <p className="rotate-90 text-[8px] text-warning font-black tracking-[0.5em] uppercase whitespace-nowrap">Status: Operational</p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-16 pointer-events-none z-10 opacity-30">
                <p className="-rotate-90 text-[8px] font-black tracking-[0.5em] uppercase whitespace-nowrap">Version.v4.0.stable</p>
                <div className="w-[1px] h-24 bg-theme mx-auto" />
                <p className="-rotate-90 text-[8px] text-sky-400 font-black tracking-[0.5em] uppercase whitespace-nowrap">Deployments: 100%</p>
            </div>

            {/* 4. Drifting Floating Keywords */}
            {keywords.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 0.1, 0] }}
                    animate={{
                        x: [Math.random() * 100, Math.random() * -100],
                        y: [Math.random() * 100, Math.random() * -100]
                    }}
                    transition={{ duration: 20 + i, repeat: Infinity, ease: "linear" }}
                    className="absolute text-white/10 text-xl font-bold italic pointer-events-none"
                    style={{
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 90}%`,
                        fontSize: `${Math.random() * 15 + 7}px`
                    }}
                >
                    {word}
                </motion.span>
            ))}

            {/* Interactive Light Follower */}
            <motion.div
                className="absolute w-[800px] h-[800px] bg-warning/[0.03] rounded-full blur-[150px] pointer-events-none z-0"
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Parallax Icons */}
            <motion.div style={{ y: y1, opacity }} className="absolute top-32 right-[10%] opacity-5 text-[7rem] font-black pointer-events-none hidden lg:block"><FaCode /></motion.div>
            <motion.div style={{ y: y2, opacity }} className="absolute bottom-32 left-[10%] opacity-5 text-[7rem] font-black pointer-events-none hidden lg:block"><FaTerminal /></motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-theme text-warning text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-2xl"
                    >
                        <FaMicrochip className="text-sm animate-pulse" /> Intelligence Center
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center leading-none"
                    >
                        PROJETS <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning via-orange-500 to-sky-500">&</span> LABS
                    </motion.h2>

                    {/* 5. Tech Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-8"
                    >
                        <TechStat icon={<FaCode />} label="Code Quality" value="A+" />
                        <TechStat icon={<FaNetworkWired />} label="Uptime" value="99.9%" />
                        <TechStat icon={<FaTools />} label="Tools" value="Modern" />
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "300px" }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-warning to-transparent mt-10 rounded-full"
                    />
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12 max-w-5xl mx-auto pb-12 px-4 scrollbar-hide snap-x md:snap-none">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex-shrink-0 snap-center md:flex justify-center ${index % 2 !== 0 ? 'md:mt-40' : ''}`}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-gradient-to-br from-warning/10 via-sky-400/5 to-transparent rounded-[50px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <Card
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
                                    link={`/projects/${project.id}`}
                                    tags={project.technologies.slice(0, 3)}
                                />

                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="absolute -right-6 -top-6 w-16 h-16 rounded-[1.5rem] bg-page/90 border border-theme backdrop-blur-2xl flex items-center justify-center font-black text-xl group-hover:border-warning/50 group-hover:text-warning transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-20"
                                >
                                    <span className="italic opacity-50 text-[10px] absolute top-3 text-muted">CASE</span>
                                    <span className="mt-3">0{index + 1}</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 text-center space-y-6"
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-theme" />
                        <div className="w-2 h-2 rounded-full bg-warning animate-ping" />
                        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-theme" />
                    </div>
                    <p className="text-muted text-[11px] font-black tracking-[0.5em] uppercase max-w-sm mx-auto leading-relaxed">
                        End of experimental section. Proceed to specialized documentation for technical deep-dives.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const TechStat = ({ icon, label, value }: any) => (
    <div className="flex flex-col items-center">
        <div className="text-warning/40 text-base mb-1.5">{icon}</div>
        <span className="text-muted text-[8px] font-black uppercase tracking-widest mb-0.5">{label}</span>
        <span className="font-bold text-xs tracking-tighter text-inherit">{value}</span>
    </div>
);

export default Projects;
