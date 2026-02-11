import React from 'react';
import { motion } from 'framer-motion';
import NetworkTopology from '../../UI/NetworkTopology';

const Analysis: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-page">
            {/* Ambient background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border border-sky-400/20 mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">Expertise Analysis</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tighter"
                    >
                        Topologie du <span className="text-sky-400">Système</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg font-medium leading-relaxed"
                    >
                        Visualisez l'interconnexion entre mes projets, mes technologies et mes infrastructures
                        via ce graphe interactif en temps réel.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <NetworkTopology />
                </motion.div>
            </div>
        </section>
    );
};

export default Analysis;
