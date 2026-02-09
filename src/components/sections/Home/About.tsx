import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaCode, FaNetworkWired, FaUsers, FaMicrochip } from 'react-icons/fa';

const About: React.FC = () => {
    const features = [
        { icon: <FaNetworkWired />, title: "Net & Infra", desc: "Configuration de routeurs, switchs, et architecture réseau sécurisée.", color: "sky-400" },
        { icon: <FaServer />, title: "Sys Admin", desc: "Gestion de serveurs Linux/Windows, Active Directory, Services Web.", color: "warning" },
        { icon: <FaCode />, title: "Development", desc: "Création de sites web modernes et scripts d'automatisation.", color: "green-500" },
        { icon: <FaUsers />, title: "Module Projects", desc: "Travail d'équipe et méthodologies agiles (Sprints/Git).", color: "orange-500" },
    ];

    return (
        <section className="py-40 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-24 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-12"
                    >
                        <div className="space-y-4">
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-warning text-xs font-black tracking-[0.5rem] uppercase block"
                            >
                                [ SYSTEM_PROFILE_DATA ]
                            </motion.span>
                            <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                                DECODING THE <span className="text-warning italic">ARCHITECT</span>
                            </h2>
                        </div>

                        <div className="space-y-8 text-muted text-xl leading-relaxed font-medium">
                            <p>
                                Je m’appelle <strong className="text-inherit">Lilian Charron</strong>. En tant qu'étudiant en BTS SIO (SISR), j'opère à l'intersection de l'ingénierie système et du design applicatif.
                            </p>
                            <p>
                                De la configuration d'environnements virtualisés complexes (Proxmox/Docker) à l'optimisation de noyaux serveurs, ma mission est de bâtir des structures robustes, scalables et auditables.
                            </p>
                            <div className="p-8 glass border-l-4 border-warning rounded-2xl italic">
                                "L'excellence technique ne réside pas dans la complexité, mais dans la clarté et la résilience de l'infrastructure."
                            </div>
                        </div>

                        <div className="flex gap-12 pt-8">
                            <div className="text-center">
                                <p className="font-black text-4xl">5+</p>
                                <p className="text-muted text-[10px] uppercase font-black tracking-widest">Active Projects</p>
                            </div>
                            <div className="text-center">
                                <p className="font-black text-4xl">99%</p>
                                <p className="text-muted text-[10px] uppercase font-black tracking-widest">Uptime Ready</p>
                            </div>
                            <div className="text-center">
                                <p className="font-black text-4xl">SISR</p>
                                <p className="text-muted text-[10px] uppercase font-black tracking-widest">Core Branch</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] glass border border-theme hover:border-warning/30 transition-all duration-500 relative group overflow-hidden shadow-2xl"
                            >
                                <div className={`text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 opacity-50 text-${feature.color}`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">{feature.title}</h4>
                                <p className="text-muted text-base leading-relaxed font-medium">{feature.desc}</p>
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FaMicrochip size={60} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
