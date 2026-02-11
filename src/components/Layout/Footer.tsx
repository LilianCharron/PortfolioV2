import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaTerminal, FaSignal, FaWifi, FaChevronRight } from 'react-icons/fa';
import { useAchievements } from '../../context/AchievementContext';
import { useSound } from '../../context/SoundContext';

const Footer: React.FC = () => {
  const { playSound } = useSound();
  const { unlock } = useAchievements();
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
      setLatency(10 + Math.floor(Math.random() * 8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  return (
    <footer className="relative bg-page border-t border-theme overflow-hidden pt-24 pb-12">
      {/* Ambient background effect */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-warning/[0.03] to-transparent pointer-events-none" />

      {/* Scanning scanning line */}
      <motion.div
        animate={{ left: ['-100%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-warning/30 to-transparent"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl glass border border-theme flex items-center justify-center p-2 group-hover:border-warning/50 transition-all duration-500 shadow-3d-xl">
                <img
                  src="/assets/img/LogoNavBar2.webp"
                  alt="Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">
                  Lilian<span className="text-warning">.</span>Charron
                </span>
                <span className="text-[9px] font-black text-muted uppercase tracking-[0.3em] mt-1">
                  Cloud Infrastructure
                </span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed font-medium">
              Futur expert en infrastructures systèmes et réseaux. Passionné par l'automatisation,
              la sécurité et le déploiement d'environnements scalables.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaGithub />} href="https://github.com/votre-github" />
              <SocialIcon icon={<FaLinkedin />} href="https://linkedin.com/in/votre-linkedin" />
              <SocialIcon icon={<FaTwitter />} href="#" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-warning flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              Navigation
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/" label="Dashboard (Accueil)" />
              <FooterLink to="/cv" label="Profil (CV)" />
              <FooterLink to="/competences" label="Expertises" />
              <FooterLink to="/veille" label="Recherche (Veille)" />
              <FooterLink to="/procedures" label="Documentation" />
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-sky-400 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Channels
            </h3>
            <div className="space-y-6">
              <ContactBlock
                label="Email Principal"
                value="Lilian.charron@free.fr"
                link="mailto:Lilian.charron@free.fr"
              />
              <ContactBlock
                label="HQ Location"
                value="Bon-Encontre (47), France"
              />
              <ContactBlock
                label="Availability"
                value="[ READY FOR OPS ]"
              />
            </div>
          </div>

          {/* Column 4: System Stats (The "Lab" feel) */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pulse Monitor
            </h3>
            <div className="glass rounded-3xl p-6 border border-theme shadow-inner space-y-5">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted">
                  <span>Session Uptime</span>
                  <FaTerminal className="text-emerald-500/50" />
                </div>
                <p className="font-mono text-xs font-bold">{formatUptime(uptime)}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted">
                  <span>Latency</span>
                  <FaSignal className="text-emerald-500/50" />
                </div>
                <p className="font-mono text-xs font-bold text-emerald-500">{latency}ms stable</p>
              </div>
              <div className="pt-2 border-t border-theme-border flex items-center gap-2">
                <FaWifi className="text-[10px] text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted">
                  CORE_ENGINE_V4.2.1-LIVE
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-theme to-transparent mb-12 opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted relative">
          <button
            onClick={() => { unlock('DARK_SQUARE'); playSound('shimmer'); }}
            className="absolute -top-1 right-0 w-2 h-2 bg-transparent hover:bg-white/5 rounded-full transition-colors cursor-default"
            title="???"
          />
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} CHARON SEC OPS</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-theme" />
            <a
              href="#"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="hover:text-warning transition-colors"
            >
              Politique de sécurité
            </a>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 glass rounded-full border border-theme-border">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            SYSTEMS: OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  const { playSound } = useSound();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => playSound('hover')}
      onClick={() => playSound('click')}
      className="w-10 h-10 rounded-xl glass border border-theme flex items-center justify-center text-muted hover:text-warning hover:border-warning/50 transition-all duration-500 shadow-lg"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => {
  const { playSound } = useSound();
  return (
    <li className="group">
      <Link
        to={to}
        onMouseEnter={() => playSound('hover')}
        onClick={() => playSound('click')}
        className="text-muted hover:text-inherit text-sm font-medium flex items-center gap-2 transition-all group-hover:translate-x-1"
      >
        <FaChevronRight className="text-[8px] text-warning opacity-0 group-hover:opacity-100 transition-all" />
        {label}
      </Link>
    </li>
  );
};

const ContactBlock = ({ label, value, link }: { label: string; value: string; link?: string }) => (
  <div className="space-y-1">
    <span className="text-[9px] font-black text-muted uppercase tracking-widest">{label}</span>
    {link ? (
      <a href={link} className="block font-bold text-sm hover:text-sky-400 transition-colors">{value}</a>
    ) : (
      <p className="font-bold text-sm">{value}</p>
    )}
  </div>
);

export default Footer;
