import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import '../../styles/global.css';

import ThemeToggle from '../UI/ThemeToggle';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStagesOpen, setIsStagesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'CV', path: '/cv' },
        { name: 'Compétences', path: '/competences' },
        { name: 'Veille', path: '/veille' },
        { name: 'Procédures', path: '/procedures' },
        {
            name: 'Stages',
            subLinks: [
                { name: 'Stage 1ère Année', path: '/stage' },
                { name: 'Stage 2ème Année', path: '/stage2' },
            ]
        },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div
                className={`absolute inset-0 bg-page/80 backdrop-blur-xl border-b border-theme transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            <nav className="container mx-auto px-6 flex justify-between items-center relative">
                <Link to="/" className="text-lg sm:text-xl font-black tracking-tighter group flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg glass flex items-center justify-center group-hover:border-warning/50 transition-all overflow-hidden p-1 shadow-[0_0_15px_rgba(251,191,36,0.1)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <img src="/assets/img/LogoNavBar2.webp" alt="Logo" className="w-full h-full object-contain transition-all opacity-100" />
                    </div>
                    <span>
                        Lilian<motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-warning"
                        >.</motion.span>Charron
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        link.subLinks ? (
                            <NavDropdown key={link.name} label={link.name} subLinks={link.subLinks} />
                        ) : (
                            <NavLink key={link.path} to={link.path!}>
                                {link.name}
                            </NavLink>
                        )
                    ))}
                    <div className="pl-4 border-l border-white/10">
                        <ThemeToggle />
                    </div>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white hover:text-warning transition-colors"
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-page/95 backdrop-blur-3xl border-b border-theme overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-8 gap-6">
                            {navLinks.map((link) => (
                                link.subLinks ? (
                                    <div key={link.name} className="space-y-4">
                                        <button
                                            onClick={() => setIsStagesOpen(!isStagesOpen)}
                                            className="text-2xl font-black tracking-tighter flex items-center justify-between w-full uppercase"
                                        >
                                            {link.name}
                                            <FaChevronDown className={`text-xs transition-transform duration-300 ${isStagesOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isStagesOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="pl-6 flex flex-col gap-4 overflow-hidden"
                                                >
                                                    {link.subLinks.map(sub => (
                                                        <MobileNavLink key={sub.path} to={sub.path} onClick={() => { setIsMobileMenuOpen(false); setIsStagesOpen(false); }}>
                                                            {sub.name}
                                                        </MobileNavLink>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <MobileNavLink key={link.path} to={link.path!} onClick={() => setIsMobileMenuOpen(false)}>
                                        {link.name}
                                    </MobileNavLink>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

const NavDropdown = ({ label, subLinks }: { label: string, subLinks: { name: string, path: string }[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all font-black text-[10px] uppercase tracking-[0.2em] group ${isOpen ? 'text-warning bg-warning/5' : 'text-muted hover:text-inherit'}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label={`Menu déroulant ${label}`}
            >
                {label}
                <FaChevronDown className={`text-[8px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-48 glass border border-theme rounded-xl overflow-hidden shadow-2xl p-1 z-50"
                    >
                        {subLinks.map((sub) => (
                            <RouterNavLink
                                key={sub.path}
                                to={sub.path}
                                className={({ isActive }) =>
                                    `block px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-warning/10 text-warning' : 'text-muted hover:bg-page hover:text-inherit'}`
                                }
                            >
                                {sub.name}
                            </RouterNavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileNavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) => (
    <Link
        to={to}
        onClick={onClick}
        className="hover:text-warning text-2xl font-black tracking-tighter transition-all flex items-center gap-4 group uppercase"
    >
        <div className="w-1 h-1 bg-warning/20 rounded-full group-hover:bg-warning transition-colors" />
        {children}
    </Link>
);

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <RouterNavLink
        to={to}
        className={({ isActive }: { isActive: boolean }) =>
            `px-4 py-1.5 rounded-lg transition-all font-black text-[10px] uppercase tracking-[0.2em] relative group overflow-hidden ${isActive ? 'text-warning bg-warning/5' : 'text-muted hover:text-inherit'}`
        }
    >
        {({ isActive }: { isActive: boolean }) => (
            <div className="flex items-center gap-1.5">
                {isActive && <span className="text-[8px] animate-pulse text-warning">::</span>}
                <span className={isActive ? 'text-warning' : ''}>{children}</span>
                <motion.span
                    className={`absolute bottom-0 left-0 h-[2px] bg-warning transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
            </div>
        )}
    </RouterNavLink>
);

export default Header;
