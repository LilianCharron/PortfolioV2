import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Breadcrumb from '../../components/UI/Breadcrumb';
import SEOHead from '../../components/SEO/SEOHead';
import {
    FaChevronLeft, FaPalette, FaFont, FaCube, FaStar, FaCode, FaEye
} from 'react-icons/fa';

const CharteGraphiqueProject: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

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

    const colorPalette = [
        { name: 'Background Dark', hex: '#0a0a0a', var: '--color-bg' },
        { name: 'Background Page', hex: '#0a1a2e', var: '--color-page' },
        { name: 'Text Primary', hex: '#e0e0e0', var: '--color-text' },
        { name: 'Text Muted', hex: '#a0a0a0', var: '--color-text-muted' },
        { name: 'Warning/Accent', hex: '#fbbf24', var: '--color-warning' },
        { name: 'Theme Border', hex: '#ffffff10', var: '--color-theme' },
    ];

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const designPrinciples = [
        { icon: <FaPalette />, title: 'Palette Cohérente', desc: 'Couleurs tech-lab avec accents orange/jaune' },
        { icon: <FaFont />, title: 'Typographie', desc: 'System fonts optimisées pour performance' },
        { icon: <FaCube />, title: 'Composants Glass', desc: 'Glassmorphism avec backdrop-blur' },
        { icon: <FaStar />, title: 'Animations', desc: 'Framer Motion pour fluidité' },
    ];

    const components = [
        { name: 'Card (Glass)', class: 'glass border border-theme', desc: 'Effet verre translucide' },
        { name: 'Button Primary', class: 'bg-warning text-black', desc: 'Accent principal' },
        { name: 'Badge', class: 'px-3 py-1 bg-warning/10 text-warning border border-warning/20', desc: 'Labels et tags' },
    ];

    return (
        <div ref={sectionRef} onMouseMove={handleMouseMove} className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative">
            <SEOHead
                title="Charte Graphique Portfolio - Design System | Lilian Charron"
                description="Documentation complète de la charte graphique du portfolio: palette de couleurs, typographie, composants UI réutilisables, et principes de design tech-lab moderne."
                keywords={['Charte Graphique', 'Design System', 'UI/UX', 'Palette Couleurs', 'Composants React', 'Glassmorphism', 'Tailwind CSS']}
                canonicalUrl="/projects/charte-graphique"
            />

            <Breadcrumb />

            {/* Backgrounds */}
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
                            <span className="px-4 py-1.5 bg-warning/10 text-warning text-[10px] font-black uppercase rounded-full tracking-widest border border-warning/20">DESIGN SYSTEM</span>
                            <div className="h-[1px] flex-grow bg-theme hidden md:block" />
                            <span className="text-muted text-[10px] font-black tracking-[0.4em] uppercase">UI/UX PORTFOLIO</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Charte <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning via-orange-400 to-yellow-500">Graphique</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted font-medium max-w-4xl leading-relaxed">
                            Documentation complète du <strong className="text-warning">design system</strong> du portfolio : palette de couleurs, typographie, composants UI réutilisables, et principes de design moderne <strong className="text-sky-400">tech-lab aesthetic</strong>.
                        </p>
                    </div>

                    {/* Design Principles */}
                    <div className="grid md:grid-cols-4 gap-6">
                        {designPrinciples.map((principle) => (
                            <div key={principle.title} className="glass border border-theme rounded-2xl p-6 text-center space-y-4">
                                <div className="text-3xl text-warning mx-auto">{principle.icon}</div>
                                <h3 className="font-black text-sm uppercase">{principle.title}</h3>
                                <p className="text-xs text-muted">{principle.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Color Palette */}
                    <div className="glass border border-theme rounded-[3rem] p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaPalette className="text-warning" /> Palette de Couleurs
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {colorPalette.map((color) => (
                                <motion.div
                                    key={color.hex}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => copyToClipboard(color.hex)}
                                    className="cursor-pointer glass border border-theme rounded-2xl p-6 space-y-4"
                                >
                                    <div
                                        className="w-full h-32 rounded-xl border-2 border-white/10"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div>
                                        <div className="font-black text-sm">{color.name}</div>
                                        <div className="text-xs font-mono text-muted mt-1">{color.hex}</div>
                                        <div className="text-[10px] font-mono text-warning/70 mt-1">{color.var}</div>
                                        {copiedColor === color.hex && (
                                            <div className="text-xs text-emerald-400 mt-2">✓ Copié !</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="glass border border-theme rounded-2xl p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaFont className="text-sky-400" /> Typographie
                        </h2>

                        <div className="space-y-6">
                            <div className="p-6 glass border border-theme rounded-xl">
                                <div className="text-6xl font-black mb-4">AaBbCc 123</div>
                                <div className="text-sm text-muted"><strong>Font Stack:</strong> system-ui, -apple-system, "Segoe UI", Roboto, sans-serif</div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 glass border border-theme rounded-xl">
                                    <div className="text-4xl font-black mb-2">Heading</div>
                                    <div className="text-xs font-mono text-muted">font-size: 2.25rem<br />font-weight: 900</div>
                                </div>
                                <div className="p-4 glass border border-theme rounded-xl">
                                    <div className="text-xl font-bold mb-2">Subheading</div>
                                    <div className="text-xs font-mono text-muted">font-size: 1.25rem<br />font-weight: 700</div>
                                </div>
                                <div className="p-4 glass border border-theme rounded-xl">
                                    <div className="text-base mb-2">Body Text</div>
                                    <div className="text-xs font-mono text-muted">font-size: 1rem<br />font-weight: 400</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Components Showcase */}
                    <div className="glass border border-theme rounded-2xl p-12 space-y-8">
                        <h2 className="text-3xl font-black uppercase flex items-center gap-4">
                            <FaCube className="text-emerald-400" /> Composants UI
                        </h2>

                        <div className="space-y-6">
                            {components.map((comp) => (
                                <div key={comp.name} className="p-6 glass border border-theme rounded-xl space-y-4">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <h3 className="font-black">{comp.name}</h3>
                                            <p className="text-sm text-muted">{comp.desc}</p>
                                        </div>
                                        <div className={`px-6 py-3 rounded-xl font-black ${comp.class}`}>
                                            Preview
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono text-muted/70 bg-black/20 p-3 rounded">
                                        className="{comp.class}"
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="glass border border-theme rounded-2xl p-8 space-y-6">
                        <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                            <FaCode className="text-warning" /> Exemple D'Utilisation
                        </h3>
                        <pre className="bg-black/40 border border-theme rounded-xl p-6 overflow-x-auto text-sm">
                            <code className="text-emerald-400">{`<div className="glass border border-theme rounded-2xl p-6">
  <h2 className="font-black text-2xl">Titre</h2>
  <p className="text-muted">Contenu avec style cohérent</p>
</div>`}</code>
                        </pre>
                    </div>

                    {/* CTA */}
                    <div className="text-center glass border border-warning/20 bg-warning/5 rounded-[3rem] p-16 space-y-6">
                        <FaEye className="text-warning text-5xl mx-auto" />
                        <h3 className="text-4xl font-black uppercase tracking-tighter">Design Cohérent</h3>
                        <p className="text-muted max-w-2xl mx-auto text-lg">Une identité visuelle professionnelle et moderne pour un portfolio technique percutant.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CharteGraphiqueProject;
