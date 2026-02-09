import React from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaServer, FaCode, FaTools, FaMicrochip } from 'react-icons/fa';

const Skills: React.FC = () => {
    const skillCategories = [
        {
            title: "Security & Net",
            icon: <FaNetworkWired />,
            skills: ["WAN/DMZ/LAN", "Pfsense", "Firewalls", "DNS Sync"],
            color: "warning"
        },
        {
            title: "Infra Systems",
            icon: <FaServer />,
            skills: ["Linux/Windows", "AD Domain", "Samba", "Virtualization"],
            color: "sky-400"
        },
        {
            title: "Web Engine",
            icon: <FaCode />,
            skills: ["React/TS", "Next.js", "Node.js", "API Rest"],
            color: "emerald-500"
        },
        {
            title: "Support Tools",
            icon: <FaTools />,
            skills: ["Git/Gitea", "Ansible", "Docker", "DevOps"],
            color: "orange-500"
        }
    ];

    return (
        <section id="skills" className="py-40 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-theme text-warning text-xs font-black tracking-[0.4em] uppercase mb-8 shadow-2xl"
                    >
                        <FaMicrochip className="text-sm" /> Audit Readiness: 100%
                    </motion.div>

                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-center leading-none uppercase">
                        SKILL <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning to-sky-400">SCAN</span>
                    </h2>
                    <div className="h-[2px] w-48 bg-warning/30 mt-8 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 rounded-[2.5rem] glass border border-theme hover:border-warning/30 transition-all duration-500 group relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FaMicrochip size={50} />
                            </div>

                            <div className={`text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 opacity-60 text-${category.color}`}>
                                {category.icon}
                            </div>

                            <h3 className="text-2xl font-black mb-8 tracking-tight uppercase italic">{category.title}</h3>

                            <div className="flex flex-wrap gap-3">
                                {category.skills.map(skill => (
                                    <span key={skill} className="px-4 py-1.5 glass text-muted text-[10px] font-black uppercase tracking-widest rounded-lg border border-theme group-hover:border-warning/20 group-hover:text-warning transition-all">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
