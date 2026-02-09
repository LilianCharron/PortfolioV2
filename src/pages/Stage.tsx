import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
    FaGraduationCap, FaBuilding, FaInfoCircle, FaCheckCircle,
    FaLaptopCode, FaCogs, FaArrowRight, FaProjectDiagram,
    FaGitAlt, FaCode, FaTerminal, FaMicrochip
} from 'react-icons/fa';
import { SiSharp, SiHtml5, SiCss3, SiFigma } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const Stage: React.FC = () => {
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

    const keywords = ["MVC", ".NET", "SQL", "LINQ", "REST", "C#", "DEBUG", "SAP", "Agile", "Sprint"];

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
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent z-[1] pointer-events-none"
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
                    className="absolute text-white/5 text-[10px] md:text-sm font-black tracking-widest pointer-events-none select-none"
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-theme text-warning text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-2xl"
                    >
                        <FaGraduationCap className="text-sm" /> Internship Report v4.0.1
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center leading-none uppercase"
                    >
                        MIGRATION <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning via-orange-500 to-sky-500">WEB</span>
                    </motion.h1>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <div className="px-4 py-1.5 rounded-lg glass border border-theme text-muted text-[8px] font-black uppercase tracking-widest">
                            Org: <span className="text-inherit">DE SANGOSSE</span>
                        </div>
                        <div className="px-4 py-1.5 rounded-lg glass border border-theme text-muted text-[8px] font-black uppercase tracking-widest">
                            Period: <span className="text-inherit">MAY – JUNE 2025</span>
                        </div>
                    </div>
                </div>

                {/* Summary Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <InfoSummary icon={<FaLaptopCode />} label="Primary Mission" value="Refonte Logicielle MVC" />
                    <InfoSummary icon={<FaBuilding />} label="Location" value="Agen / Bon-Encontre (47)" />
                    <InfoSummary icon={<FaCheckCircle />} label="Project Status" value="100% Core Complete" />
                </div>

                {/* Remerciements Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass border border-theme rounded-[2.5rem] p-6 md:p-12 mb-16 md:mb-20 relative overflow-hidden shadow-3xl"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-warning/40" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-warning/5 rounded-full blur-3xl" />

                    <h2 className="text-3xl font-black mb-8 flex items-center gap-4 tracking-tighter uppercase">
                        Remerciements
                        <div className="h-[1px] bg-theme flex-grow" />
                    </h2>

                    <div className="columns-1 md:columns-2 gap-10 space-y-6 text-muted text-base leading-relaxed font-medium text-justify">
                        <p>Je souhaite tout d’abord exprimer ma gratitude envers l’entreprise De Sangosse pour m’avoir accueilli au sein de ses équipes. Ce stage m'a permis de travailler dans un cadre idéal avec des professionnels pédagogues, ce qui sera déterminant pour la suite de mes études.</p>
                        <p>Un grand merci à M. Jean-François Judit pour la présentation des équipes et du fonctionnement de la D.S.I. au sein du groupe.</p>
                        <p>Je remercie particulièrement M. Cédric Duvignacq et M. Pierre-Antoine Chiaradia pour leur suivi quotidien, leur aide précieuse face aux blocages techniques, et l'organisation rigoureuse de ce projet sur cinq semaines.</p>
                        <p>Enfin, merci à l'ensemble du personnel de De Sangosse pour leur accueil chaleureux et leur bienveillance constante.</p>
                    </div>
                </motion.div>

                {/* Introduction & Context */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-24 mb-20 md:mb-40">
                    <div className="lg:col-span-12 space-y-6 lg:space-y-12 mb-4 lg:mb-12">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase flex items-center gap-4 md:gap-6">
                            <div className="w-8 md:w-12 h-1 md:h-1.5 bg-warning rounded-full shadow-lg" />
                            STRATEGY <span className="text-warning">&</span> DEPTH
                        </h2>
                    </div>

                    <div className="lg:col-span-6 space-y-10">
                        <div className="group glass border border-theme rounded-[1.5rem] p-6 md:p-8 hover:bg-warning/5 transition-all relative overflow-hidden shadow-2xl">
                            <FaInfoCircle className="text-warning text-3xl mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-black mb-4 tracking-tight">SIO Context</h3>
                            <p className="text-muted text-base leading-relaxed font-medium">
                                Immersion au coeur de la D.S.I de De Sangosse. Une opportunité rare d'observer la gestion d'un parc informatique d'envergure internationale tout en participant activement à l'évolution du patrimoine applicatif.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-6 space-y-10">
                        <div className="group glass border border-theme rounded-[1.5rem] p-6 md:p-8 hover:bg-warning/5 transition-all relative overflow-hidden shadow-2xl">
                            <FaCogs className="text-sky-400 text-3xl mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-black mb-4 tracking-tight">Core Objective</h3>
                            <p className="text-muted text-base leading-relaxed font-medium">
                                Modernisation d'une brique logicielle critique. Migration d'un environnement Legacy WinForm (C#) vers une architecture Web moderne distribuée, alignée sur les nouveaux standards Cloud de l'entreprise.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Presentation Organisme */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 md:mb-40">
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="glass border border-theme rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-3xl overflow-hidden group"
                    >
                        <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic opacity-70 flex items-center gap-3">
                            L'Entreprise <span className="text-warning text-[10px] not-italic opacity-30 tracking-widest">EST.1926</span>
                        </h3>
                        <p className="text-muted text-base leading-relaxed font-medium text-justify mb-8">
                            Leader mondial des BioSolutions, De Sangosse déploie une ingénierie complexe pour une agriculture durable. Présence stratégique dans 40 pays avec un focus constant sur l'innovation.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video rounded-2xl border border-theme bg-[url('/assets/img/carte-sangosse.jpg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                            <div className="aspect-video rounded-2xl border border-theme bg-[url('/assets/img/EntrepriseDeSangosse.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -6 }}
                        className="relative bg-gradient-to-br from-sky-500/[0.03] to-transparent border border-theme rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-3xl overflow-hidden group"
                    >
                        <FaBuilding className="absolute -bottom-16 -right-16 text-sky-500/5 group-hover:scale-110 transition-transform duration-1000" size={200} />
                        <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic opacity-70">Architecture D.S.I</h3>
                        <p className="text-muted text-base leading-relaxed font-medium text-justify relative z-10">
                            Support technologique transverse. Déploiement SAP, développements Agile internes et maintenance d'un réseau hybride complexe. La D.S.I est le moteur de la transformation digitale du groupe.
                        </p>
                        <div className="mt-8 flex items-center gap-4 text-sky-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
                            Systems Integrated <FaArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </div>
                    </motion.div>
                </div>

                {/* Section Outils */}
                <div className="mb-20 md:mb-24">
                    <h2 className="text-3xl md:text-4xl font-black mb-10 md:mb-16 text-center tracking-tighter uppercase italic opacity-20">Tools & Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                        {/* Organisation */}
                        <div className="space-y-6 md:space-y-10">
                            <h3 className="text-sky-400 text-xs md:text-sm font-black uppercase tracking-[0.3rem] md:tracking-[0.5rem] flex items-center gap-4">
                                <FaProjectDiagram /> PROJECT_MGMT
                            </h3>
                            <div className="space-y-4 md:space-y-6">
                                <ToolCard
                                    icon={<VscCode className="text-[#007ACC]" />}
                                    title="OpenProject"
                                    desc="Workflow Sprints & Sprint Planning. Estimation fine des charges et suivi analytique."
                                />
                                <ToolCard
                                    icon={<FaGitAlt className="text-[#F05032]" />}
                                    title="Git Protocol"
                                    desc="Versioning distribué via Gitea. Gestion rigoureuse des commits et sécurisation logicielle."
                                />
                            </div>
                        </div>
                        {/* Développement */}
                        <div className="space-y-6 md:space-y-10">
                            <h3 className="text-warning text-xs md:text-sm font-black uppercase tracking-[0.3rem] md:tracking-[0.5rem] flex items-center gap-4">
                                <FaCode /> CODE_MODULES
                            </h3>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <TechBadge icon={<SiSharp />} name="C# / .NET" />
                                <TechBadge icon={<SiHtml5 />} name="HTML5" />
                                <TechBadge icon={<SiCss3 />} name="CSS3" />
                                <TechBadge icon={<FaTerminal />} name="MVC ARCH" />
                            </div>
                            <div className="glass border border-theme rounded-[1.5rem] p-6 md:p-8 font-bold italic text-muted text-sm md:text-base leading-relaxed shadow-inner">
                                "La transition vers le modèle MVC a permis une encapsulation totale des données, autorisant un déploiement web scalables et sécurisé."
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Details */}
                <div className="mb-20 md:mb-40">
                    <h2 className="text-3xl md:text-4xl font-black mb-12 md:mb-16 tracking-tighter uppercase flex items-center gap-4 md:gap-6">
                        <span className="text-warning">03.</span> ANALYSIS PATH
                    </h2>

                    <div className="space-y-16 md:space-y-24 relative before:absolute before:left-[-2px] before:top-4 before:bottom-4 before:w-[2px] before:bg-theme ml-1 md:ml-4">
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-warning shadow-[0_0_20px_#fbbf24] z-10" />
                            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">Analyse Legacy (S1-S2)</h3>
                            <p className="text-muted text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8 max-w-4xl text-justify">
                                Déconstruction du socle WinForm existant. Identification des routines critiques et mapping des dépendances SQL pour une réécriture optimisée en environnement .NET Core.
                            </p>
                            <div className="inline-flex flex-col gap-1.5 p-3 md:p-4 rounded-2xl glass border border-theme shadow-inner">
                                <span className="text-[8px] text-muted font-black uppercase tracking-widest">Inbound Tech</span>
                                <span className="font-bold text-sm md:text-base leading-none">C# WinForm Systems</span>
                            </div>
                        </div>

                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-sky-500 shadow-[0_0_20px_#38bdf8] z-10" />
                            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight flex items-center gap-4">
                                <SiFigma className="opacity-20" /> UX Architecture (S3)
                            </h3>
                            <p className="text-muted text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8 max-w-4xl text-justify">
                                Conceptualisation via Figma. Design system unifié respectant la charte graphique globale de De Sangosse tout en maximisant l'ergonomie mobile/tablet.
                            </p>
                        </div>

                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute left-[-9px] top-4 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981] z-10" />
                            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">Full-Stack Dev (S4-S5)</h3>
                            <p className="text-muted text-sm md:text-base leading-relaxed font-medium mb-6 md:mb-8 max-w-4xl text-justify">
                                Implémentation du pattern MVC. Développement asynchrone pour une réactivité optimale et intégration de services RESTful pour la communication avec les bases de données SQL Server.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                <div className="p-4 md:p-6 glass rounded-2xl border border-theme shadow-lg group hover:border-emerald-500/30 transition-all">
                                    <h4 className="text-emerald-500 text-[8px] font-black mb-2 md:mb-3 uppercase tracking-[0.2em]">Front-end</h4>
                                    <p className="text-inherit opacity-70 font-bold text-xs md:text-sm">Modern Web Stack</p>
                                </div>
                                <div className="p-4 md:p-6 glass rounded-2xl border border-theme shadow-lg group hover:border-emerald-500/30 transition-all">
                                    <h4 className="text-emerald-500 text-[8px] font-black mb-2 md:mb-3 uppercase tracking-[0.2em]">Back-end</h4>
                                    <p className="text-inherit opacity-70 font-bold text-xs md:text-sm">.NET Framework</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conclusion */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-warning/10 to-transparent border border-warning/20 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-3xl"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl">
                        <FaMicrochip />
                    </div>
                    <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter">Mission Accomplished</h2>
                    <p className="text-muted text-xl leading-relaxed max-w-4xl mx-auto italic font-medium px-4">
                        "Ce stage a validé ma capacité à transformer des systèmes complexes tout en maintenant une exigence de qualité industrielle au sein d'une D.S.I d'envergure."
                    </p>
                    <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
                        <Metric icon={<FaCogs />} label="Duration" value="5 Weeks" />
                        <Metric icon={<FaTerminal />} label="Outcome" value="100% Web" />
                        <Metric icon={<FaMicrochip />} label="Auth" value="Full Agency" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ToolCard = ({ icon, title, desc }: any) => (
    <div className="glass border border-theme rounded-[1.5rem] p-8 hover:bg-warning/5 transition-all duration-500 group relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-warning/[0.02] to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl glass border border-theme flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-warning/10 transition-all duration-700 shadow-lg">{icon}</div>
            <h4 className="text-xl font-black tracking-tight">{title}</h4>
        </div>
        <p className="text-muted text-sm leading-relaxed font-medium relative z-10">{desc}</p>
    </div>
);

const TechBadge = ({ icon, name }: any) => (
    <div className="flex items-center gap-3 p-4 glass border border-theme rounded-2xl hover:border-warning/50 transition-all duration-500 shadow-lg group">
        <span className="text-warning text-2xl group-hover:scale-110 transition-transform">{icon}</span>
        <span className="text-muted text-xs font-black uppercase tracking-widest">{name}</span>
    </div>
);

const InfoSummary = ({ icon, label, value }: any) => (
    <div className="glass border border-theme rounded-[1.5rem] p-6 md:p-8 overflow-hidden relative group shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-125 transition-transform duration-1000">
            {icon}
        </div>
        <div className="flex flex-col gap-1.5 relative z-10">
            <span className="text-warning text-[8px] uppercase tracking-[0.4em] font-black">{label}</span>
            <span className="font-black text-lg tracking-tight leading-tight">{value}</span>
        </div>
    </div>
);

const Metric = ({ icon, label, value }: any) => (
    <div className="flex flex-col items-center gap-3 group">
        <div className="text-warning text-xl group-hover:scale-125 transition-transform duration-700">{icon}</div>
        <div>
            <p className="font-black text-2xl tracking-tighter shadow-sm">{value}</p>
            <p className="text-muted text-[8px] uppercase font-black tracking-[0.3em]">{label}</p>
        </div>
    </div>
);

export default Stage;
