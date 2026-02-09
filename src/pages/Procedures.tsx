import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaFilter, FaCalendar, FaTags, FaChevronRight, FaCode } from 'react-icons/fa';
import { procedures, getAllCategories, type Procedure } from '../data/procedures';

const Procedures: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...getAllCategories()];

    const filteredProcedures = selectedCategory === 'All'
        ? procedures
        : procedures.filter(proc => proc.category === selectedCategory);

    return (
        <div className="pt-20 pb-24 px-4 min-h-screen bg-page relative overflow-hidden">
            {/* Cyber Grid Background */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Scanning line animation */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none"
            />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative glass rounded-[2rem] p-8 md:p-12 mb-16 overflow-hidden group shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-warning/[0.02] to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-[12rem] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                        <FaBook />
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-[10px] font-black tracking-[0.4em] uppercase shadow-xl mb-6"
                        >
                            <FaCode className="animate-pulse" /> DOCUMENTATION TECHNIQUE
                        </motion.div>

                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                            MES <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning to-orange-500">PROCÉDURES</span>
                        </h1>

                        <p className="text-muted text-lg leading-relaxed font-medium max-w-3xl">
                            Documentation technique et procédures opérationnelles. Guides détaillés sur la configuration système, le développement et l'administration réseau.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <StatBadge label={`${procedures.length} Procédures`} />
                            <StatBadge label={`${getAllCategories().length} Catégories`} />
                            <StatBadge label="Mise à jour régulière" />
                        </div>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning shadow-lg">
                            <FaFilter />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase">Filtrer par catégorie</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${selectedCategory === category
                                    ? 'bg-warning text-bg shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                                    : 'glass text-muted hover:text-inherit hover:border-warning/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Procedures Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {filteredProcedures.map((procedure, index) => (
                        <ProcedureCard key={procedure.id} procedure={procedure} index={index} />
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProcedures.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-[2rem] p-16 text-center"
                    >
                        <div className="text-6xl text-muted/20 mb-4">
                            <FaBook />
                        </div>
                        <h3 className="text-2xl font-black mb-2">Aucune procédure trouvée</h3>
                        <p className="text-muted">Aucune procédure ne correspond à cette catégorie.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const ProcedureCard: React.FC<{ procedure: Procedure; index: number }> = ({ procedure, index }) => {
    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Réseau': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
            'Système': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
            'Développement': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
            'Sécurité': 'from-red-500/20 to-orange-500/20 border-red-500/30',
            'Base de données': 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
        };
        return colors[category] || 'from-warning/20 to-orange-500/20 border-warning/30';
    };

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Réseau': '🌐',
            'Système': '⚙️',
            'Développement': '💻',
            'Sécurité': '🔒',
            'Base de données': '🗄️',
        };
        return icons[category] || '📋';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-[2rem] p-8 overflow-hidden group hover:border-warning/30 transition-all shadow-xl relative"
        >
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${getCategoryColor(procedure.category)} border text-xs font-black uppercase tracking-wider mb-4`}>
                <span>{getCategoryIcon(procedure.category)}</span>
                {procedure.category}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-warning transition-colors">
                {procedure.title}
            </h3>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-6">
                {procedure.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-theme">
                <div className="flex items-center gap-2 text-xs text-muted">
                    <FaCalendar className="text-warning" />
                    <span className="font-medium">Créé: {new Date(procedure.createdDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                    <FaTags className="text-warning" />
                    <span className="font-medium">{procedure.tags.length} tags</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {procedure.tags.slice(0, 4).map((tag, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-page/50 text-muted text-[10px] font-bold uppercase tracking-wide border border-white/5"
                    >
                        {tag}
                    </span>
                ))}
                {procedure.tags.length > 4 && (
                    <span className="px-3 py-1 rounded-lg bg-warning/10 text-warning text-[10px] font-bold">
                        +{procedure.tags.length - 4}
                    </span>
                )}
            </div>

            {/* Link to Detail Page */}
            <Link
                to={`/procedures/${procedure.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-warning/10 hover:bg-warning hover:text-bg border border-warning/20 text-warning font-black text-xs uppercase tracking-wider transition-all group/btn w-full justify-center"
            >
                Voir la procédure complète
                <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

const StatBadge: React.FC<{ label: string }> = ({ label }) => (
    <div className="px-4 py-1.5 rounded-lg glass text-muted text-[10px] font-black uppercase tracking-wider">
        {label}
    </div>
);

export default Procedures;
