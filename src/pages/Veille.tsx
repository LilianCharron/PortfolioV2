import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  FaTools,
  FaBoxes,
  FaShieldAlt,
  FaRocket,
  FaTerminal,
  FaMicrochip,
  FaChevronRight,
} from 'react-icons/fa';
import { useSound } from '../context/SoundContext';
import Breadcrumb from '../components/UI/Breadcrumb';
import PaperFeed from '../components/sections/Veille/PaperFeed';

const Veille: React.FC = () => {
  const { playSound } = useSound();
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

  const keywords = [
    'Java',
    'RAM',
    'TickRate',
    'TPS',
    'MultiThread',
    'PaperMC',
    'Spigot',
    'Maven',
    'Git',
    'API',
  ];

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="pt-20 pb-24 px-4 min-h-screen bg-page relative overflow-hidden"
    >
      <Breadcrumb />
      {/* 1. Cyber Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* 2. Scanning line animation */}
      <motion.div
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent z-[1] pointer-events-none"
      />

      {/* 3. Interactive Light Follower */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] bg-warning/[0.02] rounded-full blur-[150px] pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Drifting Floating Keywords */}
      {keywords.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.08, 0] }}
          animate={{
            x: [Math.random() * 50, Math.random() * -50],
            y: [Math.random() * 50, Math.random() * -50],
          }}
          transition={{ duration: 15 + i, repeat: Infinity, ease: 'linear' }}
          className="absolute text-muted/10 text-[10px] md:text-sm font-black tracking-widest pointer-events-none select-none"
          style={{ left: `${Math.random() * 95}%`, top: `${Math.random() * 95}%` }}
        >
          {word}
        </motion.span>
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass rounded-[2rem] p-8 md:p-12 mb-20 overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-warning/[0.02] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[12rem] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
            <FaTerminal />
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-[10px] font-black tracking-[0.4em] uppercase shadow-xl"
              >
                <FaMicrochip className="animate-pulse" /> SUJET DE VEILLE PRINCIPAL
              </motion.div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none">
                PAPER
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning to-orange-500">
                  MC
                </span>
              </h1>

              <div className="text-muted space-y-4 text-lg leading-relaxed font-medium max-w-2xl">
                <p>
                  Je me passionne pour l'optimisation des systèmes via l'écosystème PaperMC. J'étudie comment tirer le meilleur parti de la JVM pour gérer des flux de données en temps réel avec une efficacité maximale.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <StatusBadge label="Stabilité Max" />
                  <StatusBadge label="Optimisation Nucleus" />
                  <StatusBadge label="Open Source" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-warning/20 blur-[80px] rounded-full animate-pulse" />
                <img
                  src="https://assets.papermc.io/brand/papermc_logo.min.svg"
                  alt="PaperMC"
                  className="h-48 md:h-64 relative z-10 drop-shadow-[0_0_50px_rgba(251,191,36,0.4)]"
                />
                <div className="absolute -bottom-6 -left-6 bg-page/80 border border-theme px-4 py-2 rounded-xl backdrop-blur-xl shadow-2xl">
                  <span className="text-warning text-[8px] font-black uppercase tracking-widest block mb-0.5">
                    Version Stable
                  </span>
                  <span className="font-black text-base">1.21.STABLE</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-theme">
            <FeatureCard
              icon={<FaRocket />}
              title="Haute Performance"
              desc="Optimisation des ressources et réduction drastique de la latence."
              playSound={playSound}
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Sécurité Renforcée"
              desc="Protection contre les failles et gestion saine des paquets réseau."
              playSound={playSound}
            />
            <FeatureCard
              icon={<FaBoxes />}
              title="Écosystème Agile"
              desc="Compatibilité totale et architecture modulaire extensible."
              playSound={playSound}
            />
          </div>
        </motion.div>

        {/* Analysis Section with Alt Background */}
      </div>

      <section className="bg-alt/50 border-y border-theme py-24 relative overflow-hidden shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.3)] my-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-4xl bg-warning/[0.01] blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning text-2xl shadow-lg">
                  <FaTools />
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">Le Monitoring</h2>
              </div>
              <p className="text-muted text-lg leading-relaxed font-medium">
                Pour rester à jour, j'ai mis au point un outil qui surveille les API PaperMC et les mises à jour GitHub. Cela me permet de filtrer l'information et de ne garder que l'essentiel pour mes infrastructures.
              </p>
              <div className="space-y-6">
                <ToolBullet text="Interrogation API Asynchrone" />
                <ToolBullet text="Processing & Traduction de Builds" />
                <ToolBullet text="Mapping Direct Commits Git" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass border border-theme rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-warning/40" />
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase italic opacity-70">
                Ma Méthodologie
              </h2>
              <div className="text-muted space-y-6 text-base leading-relaxed font-medium">
                <p>
                  Je réalise une analyse hebdomadaire des branches expérimentales pour anticiper les éventuels problèmes. Mon but est de garantir une transition fluide entre les versions sans compromettre la stabilité.
                </p>
                <div>
                  <span className="text-warning text-[10px] font-black uppercase block mb-2">
                    Fréquence des tests
                  </span>
                  <span className="font-bold">Quotidienne.Auto</span>
                </div>
                <div>
                  <span className="text-warning text-[10px] font-black uppercase block mb-2">
                    Niveau d'audit
                  </span>
                  <span className="font-bold">Complet</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Live Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
            <div className="space-y-3">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-warning text-[10px] font-black tracking-[0.5rem] uppercase block"
              >
                [ FLUX EN DIRECT ]
              </motion.span>
              <h2 className="text-4xl font-black tracking-tighter">FLUX D'INFOS</h2>
            </div>
            <div className="glass border border-theme px-8 py-3 rounded-2xl font-black text-xs font-mono tracking-widest flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              FLUX SÉCURISÉ :: VERSION_1.21
            </div>
          </div>

          <div className="relative rounded-[3.5rem] overflow-hidden border border-white/10 shadow-3xl bg-white/[0.02] backdrop-blur-3xl p-10">
            <PaperFeed />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, playSound }: any) => (
  <div
    onMouseEnter={() => playSound('hover')}
    className="flex flex-col items-center md:items-start group cursor-help"
  >
    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-warning text-xl mb-4 group-hover:bg-warning group-hover:text-bg transition-all duration-500 shadow-lg">
      {icon}
    </div>
    <h3 className="text-lg font-black mb-2 tracking-tight">{title}</h3>
    <p className="text-muted text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

const ToolBullet = ({ text }: { text: string }) => (
  <div className="flex items-center gap-4 text-muted group">
    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-warning group-hover:text-warning transition-all">
      <FaChevronRight className="text-[8px]" />
    </div>
    <span className="text-base font-bold group-hover:text-inherit transition-colors">{text}</span>
  </div>
);

const StatusBadge = ({ label }: { label: string }) => (
  <div className="px-4 py-1.5 rounded-lg glass text-muted text-[10px] font-black uppercase tracking-wider">
    {label}
  </div>
);

export default Veille;
