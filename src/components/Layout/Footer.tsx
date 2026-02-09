import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="relative py-12 bg-alt border-t border-theme overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-warning/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg glass flex items-center justify-center p-1.5 overflow-hidden">
                                <img src="/assets/img/LogoNavBar2.webp" alt="Logo" className="w-full h-full object-contain opacity-100 transition-all" />
                            </div>
                            <span className="text-base font-black tracking-tighter">
                                Lilian<span className="text-warning">.</span>Charron
                            </span>
                        </div>
                        <p className="text-muted text-[8px] font-black tracking-[0.2em] uppercase">
                            Modern Engineering Portfolio
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-6">
                            <a href="https://github.com/votre-github" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-warning transition-colors">
                                <FaGithub className="text-xl" />
                            </a>
                            <a href="https://linkedin.com/in/votre-linkedin" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-warning transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                        <p className="text-muted text-[10px] font-mono tracking-tight uppercase">
                            © {new Date().getFullYear()} // v4.0.0-CORE
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
