import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const routeLabels: Record<string, string> = {
    cv: 'CV',
    competences: 'Compétences',
    veille: 'Veille',
    procedures: 'Procédures',
    stage: 'Stage 1ère Année',
    stage2: 'Stage 2ème Année',
    projects: 'Projets',
};

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav className="container mx-auto px-6 mb-8 mt-4">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 glass rounded-xl border border-theme text-[10px] font-black uppercase tracking-widest shadow-xl pointer-events-auto"
            >
                <Link
                    to="/"
                    className="text-muted hover:text-warning transition-colors flex items-center gap-2 group"
                >
                    <FaHome className="text-xs group-hover:scale-110 transition-transform" />
                    <span>Accueil</span>
                </Link>

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    // Try to get a clean label, otherwise capitalize the path segment
                    const label =
                        routeLabels[value] ||
                        value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

                    return (
                        <React.Fragment key={to}>
                            <FaChevronRight className="text-[8px] text-muted/30" />
                            {last ? (
                                <span className="text-warning">{label}</span>
                            ) : (
                                <Link to={to} className="text-muted hover:text-white transition-colors">
                                    {label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </motion.div>
        </nav>
    );
};

export default Breadcrumb;
