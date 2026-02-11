import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Breadcrumb from '../../components/UI/Breadcrumb';
import SEOHead from '../../components/SEO/SEOHead';
import {
    FaChevronLeft, FaNetworkWired, FaServer, FaShieldAlt, FaLock, FaFireAlt,
    FaDatabase, FaDesktop, FaGlobe, FaCog, FaCheckCircle, FaLaptop
} from 'react-icons/fa';

const InfrastructureProject: React.FC = () => {
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

    const networkZones = [
        {
            zone: 'WAN',
            color: 'text-red-400',
            icon: <FaGlobe />,
            desc: 'Réseau public Internet',
            config: ['Gateway principal', 'Connexion FAI', 'IP publique statique']
        },
        {
            zone: 'DMZ',
            color: 'text-orange-400',
            icon: <FaServer />,
            desc: 'Zone démilitarisée isolée',
            config: ['Serveur Web Apache/Nginx', 'Base de données MySQL', 'Règles NAT restrictives']
        },
        {
            zone: 'LAN',
            color: 'text-emerald-400',
            icon: <FaDesktop />,
            desc: 'Réseau local privé',
            config: ['Active Directory', 'Poste client Windows', 'DHCP et DNS internes']
        }
    ];

    const securityFeatures = [
        { feature: 'Firewall pfSense', details: 'Filtrage entrant/sortant avec règles par zone' },
        { feature: 'Règles NAT', details: 'Port forwarding sécurisé vers DMZ uniquement' },
        { feature: 'VLANs', details: 'Segmentation totale WAN/DMZ/LAN' },
        { feature: 'IDS/IPS', details: 'Détection d\'intrusion sur trafic WAN→DMZ' },
    ];

    const technologies = [
        { name: 'pfSense', role: 'Firewall & Routeur' },
        { name: 'Windows Server', role: 'Active Directory' },
        { name: 'Linux Debian', role: 'Serveur Web DMZ' },
        { name: 'MySQL', role: 'Base de données' },
        { name: 'Apache/Nginx', role: 'Web Server' },
    ];

    return (
        <div ref={sectionRef} onMouseMove={handleMouseMove} className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative">
            <SEOHead
                title="Infrastructure Réseau WAN/DMZ/LAN - Projet BTS SISR | Lilian Charron"
                description="Projet technique d'infrastructure réseau complète avec architecture WAN/DMZ/LAN, firewall pfSense, Active Directory, et services web sécurisés. Configuration détaillée et documentation."
                keywords={['Infrastructure Réseau', 'WAN DMZ LAN', 'pfSense', 'Active Directory', 'Firewall', 'NAT', 'VLAN', 'Sécurité réseau', 'BTS SISR']}
                canonicalUrl="/projects/infrastructure-reseau"
            />

            <Breadcrumb />

            {/* Backgrounds */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent z-[1] pointer-events-none" />
            <motion.div className="absolute w-[1000px] h-[1000px] bg-sky-500/[0.03] rounded-full blur-[150px] pointer-events-none z-0" style={{ left: springX, top: springY, translateX: '-50%', translateY: '-50%' }} />

            <div className="container mx-auto max-w-7xl relative z-10">
                <Link to="/" className="inline-flex items-center gap-4 text-muted hover:text-warning mb-12 transition-all group uppercase font-black tracking-widest text-xs">
                    <FaChevronLeft className="group-hover:-translate-x-2 transition-transform" /> [ RETOUR ]
                </Link>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-20">
                    {/* Hero */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-6 flex-wrap">
                            <span className="px-4 py-1.5 bg-sky-400/10 text-sky-400 text-[10px] font-black uppercase rounded-full tracking-widest border border-sky-400/20">INFRASTRUCTURE RÉSEAU</span>
                            <div className="h-[1px] flex-grow bg-theme hidden md:block" />
                            <span className="text-muted text-[10px] font-black tracking-[0.4em] uppercase">BTS SISR - Projet 1</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600">WAN / DMZ / LAN</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted font-medium max-w-4xl leading-relaxed">
                            Conception et déploiement d'une <strong className="text-sky-400">infrastructure réseau complète</strong> avec segmentation WAN/DMZ/LAN, firewall pfSense, Active Directory, et services web hautement sécur isés.
                        </p>
                    </div>

                    {/* Architecture Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {networkZones.map((zone) => (
                            <div key={zone.zone} className="glass border border-theme rounded-2xl p-8 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={`text-4xl ${zone.color}`}>{zone.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-black">{zone.zone}</h3>
                                        <p className="text-xs text-muted">{zone.desc}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {zone.config.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                            <FaCheckCircle className={`${zone.color} shrink-0 mt-1`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Network Diagram */}
                    <div className="glass border border-theme rounded-[3rem] p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaNetworkWired className="text-sky-400" /> Schéma D'Architecture
                        </h2>

                        <div className="grid grid-cols-4 gap-4 items-center">
                            {/* WAN */}
                            <div className="text-center p-6 glass border border-red-500/30 rounded-xl">
                                <FaGlobe className="text-4xl text-red-400 mx-auto mb-3" />
                                <div className="font-black text-lg">WAN</div>
                                <div className="text-xs text-muted mt-2">Internet</div>
                            </div>

                            {/* Routeur 1 */}
                            <div className="text-center p-6 glass border border-warning/30 rounded-xl">
                                <FaServer className="text-4xl text-warning mx-auto mb-3" />
                                <div className="font-black">Routeur 1</div>
                                <div className="text-xs text-muted mt-2">WAN ↔ DMZ</div>
                            </div>

                            {/* DMZ */}
                            <div className="text-center p-6 glass border border-orange-500/30 rounded-xl">
                                <FaDatabase className="text-4xl text-orange-400 mx-auto mb-3" />
                                <div className="font-black text-lg">DMZ</div>
                                <div className="text-xs text-muted mt-2">Serveur Web</div>
                            </div>

                            {/* Routeur 2 */}
                            <div className="col-span-1 row-span-2 text-center p-6 glass border border-emerald-500/30 rounded-xl flex flex-col justify-center">
                                <FaCog className="text-5xl text-emerald-400 mx-auto mb-3" />
                                <div className="font-black text-lg">Routeur 2</div>
                                <div className="text-xs text-muted mt-2">DMZ ↔ LAN</div>
                            </div>

                            {/* LAN */}
                            <div className="col-span-3 mt-4 grid grid-cols-2 gap-4">
                                <div className="text-center p-6 glass border border-emerald-500/30 rounded-xl">
                                    <FaServer className="text-4xl text-emerald-400 mx-auto mb-3" />
                                    <div className="font-black">AD Server</div>
                                    <div className="text-xs text-muted mt-2">Win Server 2019</div>
                                </div>
                                <div className="text-center p-6 glass border border-emerald-500/30 rounded-xl">
                                    <FaLaptop className="text-4xl text-emerald-400 mx-auto mb-3" />
                                    <div className="font-black">Client</div>
                                    <div className="text-xs text-muted mt-2">Windows 10</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="glass border border-red-500/20 bg-red-500/5 rounded-[3rem] p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaShieldAlt className="text-red-400" /> Sécurité & Isolation
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {securityFeatures.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 glass border border-red-500/20 rounded-xl">
                                    <FaLock className="text-red-400 text-xl shrink-0 mt-1" />
                                    <div>
                                        <div className="font-black text-sm mb-1">{item.feature}</div>
                                        <div className="text-xs text-muted">{item.details}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="glass border border-theme rounded-2xl p-8 space-y-6">
                        <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                            <FaFireAlt className="text-warning" /> Technologies Utilisées
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {technologies.map((tech) => (
                                <div key={tech.name} className="px-6 py-3 glass border border-theme rounded-xl">
                                    <div className="font-bold text-sm">{tech.name}</div>
                                    <div className="text-xs text-muted">{tech.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InfrastructureProject;
