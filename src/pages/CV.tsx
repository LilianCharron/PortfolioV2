import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/UI/Breadcrumb';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaCar,
  FaGlobeAmericas,
  FaDownload,
  FaBriefcase,
  FaGraduationCap,
  FaUser,
  FaMicrochip,
  FaDatabase,
  FaNetworkWired,
  FaTools,
} from 'react-icons/fa';
import { useSound } from '../context/SoundContext';
import { useAchievements } from '../context/AchievementContext';
import { useEffect } from 'react';

const CV: React.FC = () => {
  const { playSound } = useSound();
  const { unlock } = useAchievements();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    unlock('HISTORIAN');
  }, [unlock]);

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
    'SISR',
    'GPO',
    'DNS',
    'IPv6',
    'NAT',
    'SSH',
    'VPN',
    'RAID',
    'Backup',
    'LAN/WAN',
    'Proxmox',
    'Scripting',
  ];

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative"
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
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent z-[1] pointer-events-none"
      />

      {/* 3. Sidebars - System Status */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-24 pointer-events-none z-10 opacity-20">
        <p className="rotate-90 text-[10px] font-black tracking-[0.5em] uppercase whitespace-nowrap">
          Lilian Charron
        </p>
        <div className="w-[1px] h-40 bg-theme-border mx-auto border-l border-theme rounded-full" />
        <p className="rotate-90 text-[10px] text-warning font-black tracking-[0.5em] uppercase whitespace-nowrap">
          Prêt à échanger
        </p>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-24 pointer-events-none z-10 opacity-20">
        <p className="-rotate-90 text-[10px] font-black tracking-[0.5em] uppercase whitespace-nowrap">
          Informations de contact
        </p>
        <div className="w-[1px] h-40 bg-theme-border mx-auto border-l border-theme rounded-full" />
        <p className="-rotate-90 text-[10px] text-sky-400 font-black tracking-[0.5em] uppercase whitespace-nowrap">
          100% Motivé
        </p>
      </div>

      {/* 4. Interactive Light Follower */}
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
          className="absolute text-white/5 text-[10px] md:text-sm font-black tracking-widest pointer-events-none select-none"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
          }}
        >
          {word}
        </motion.span>
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass text-warning text-xs font-black tracking-[0.4em] uppercase mb-8 shadow-2xl"
          >
            <FaMicrochip className="text-sm" /> Profil Professionnel
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center leading-none uppercase"
          >
            PARCOURS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning via-orange-500 to-sky-500">
              &
            </span>{' '}
            XP
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '400px' }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'circOut' }}
            className="h-[2px] bg-gradient-to-r from-transparent via-warning to-transparent mt-12 mb-4 rounded-full"
          />
          <p className="text-muted text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-center">
            Évolution et expériences professionnelles
          </p>
        </div>
      </div>

      {/* Main Content Sections with Alt Background */}
      <section className="bg-alt/50 border-y border-theme py-24 relative overflow-hidden shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.3)] my-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-4xl bg-sky-500/[0.02] blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-12">
              {/* Profile Section */}
              <motion.section
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => playSound('hover')}
                className="relative group glass rounded-[1.5rem] p-6 overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <FaUser />
                </div>
                <h2 className="text-3xl font-black mb-10 tracking-tighter flex items-center gap-4">
                  <span className="w-10 h-1.5 bg-warning rounded-full shadow-[0_0_10px_#fbbf24]"></span>{' '}
                  Profil
                </h2>
                <p className="text-muted leading-relaxed text-lg font-medium">
                  Volontaire, rigoureux et passionné par les systèmes d'information. Je m’efforce
                  d’accomplir les missions confiées avec une précision chirurgicale. S'intègre
                  naturellement dans des environnements techniques complexes.
                </p>
                <div className="mt-12 flex items-center gap-4 p-5 rounded-3xl bg-warning/5 border border-warning/10 shadow-inner">
                  <div className="w-3 h-3 bg-warning rounded-full animate-ping" />
                  <span className="text-warning text-xs font-black tracking-[0.2em] uppercase">
                    Disponibilité : Immédiate
                  </span>
                </div>
              </motion.section>

              {/* Contact Section */}
              <motion.section
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 backdrop-blur-3xl shadow-xl"
              >
                <h2 className="text-white text-xl font-black mb-8 tracking-tighter uppercase">
                  Channels
                </h2>
                <ul className="space-y-6">
                  <ContactItem
                    icon={<FaEnvelope />}
                    text="Lilian.charron@free.fr"
                    href="mailto:Lilian.charron@free.fr"
                    playSound={playSound}
                  />
                  <ContactItem
                    icon={<FaMapMarkerAlt />}
                    text="47240 - Bon-Encontre"
                    href="https://maps.app.goo.gl/51WzsVXbBLah2oyt8"
                    playSound={playSound}
                  />
                  <ContactItem icon={<FaPhone />} text="06 51 45 88 98" href="tel:+33651458898" playSound={playSound} />
                  <ContactItem icon={<FaBirthdayCake />} text="10/11/2005" />
                  <ContactItem icon={<FaCar />} text="Véhiculé / Permis B" />
                  <ContactItem icon={<FaGlobeAmericas />} text="Anglais - B1" />
                </ul>
              </motion.section>

              {/* Special Project Box */}
              <motion.section
                initial={{ opacity: 0, rotate: -2 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                className="relative overflow-hidden group bg-gradient-to-br from-warning/10 to-transparent border border-warning/20 rounded-[2.5rem] p-10 shadow-2xl"
              >
                <div className="absolute -right-20 -bottom-20 text-[18rem] text-warning/[0.04] group-hover:rotate-12 transition-transform duration-1000">
                  <FaDatabase />
                </div>
                <h2 className="text-warning text-3xl font-black mb-10 tracking-tighter">Lab Perso</h2>
                <div className="space-y-6 relative z-10">
                  <Link to="/projects/minecraft" onMouseEnter={() => playSound('hover')} onClick={() => playSound('click')}>
                    <ProjetItem
                      title="Infrastructure Minecraft"
                      desc="PaperMC, Linux Optimization, SQL Security"
                    />
                  </Link>
                  <ProjetItem title="E-commerce Node" desc="Boutique sécurisée, Stripe integration" />
                  <ProjetItem title="Hardware Modding" desc="Reconditionnement workstation Linux" />
                </div>
              </motion.section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 space-y-24">
              {/* Formation Section */}
              <section>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="p-2 md:p-3 bg-sky-400/10 rounded-xl md:rounded-2xl text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.1)] w-fit">
                    <FaGraduationCap className="text-xl md:text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
                    Formation
                  </h2>
                  <div className="hidden md:block flex-grow h-[1px] bg-gradient-to-r from-theme-border to-transparent" />
                </div>

                <div className="space-y-12 md:space-y-16 relative before:absolute before:left-4 md:before:left-10 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
                  {formations.map((item, i) => (
                    <TimelineItem key={i} {...item} />
                  ))}
                </div>
              </section>

              {/* Experience Section */}
              <section>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                  <div className="p-2 md:p-3 bg-warning/10 rounded-xl md:rounded-2xl text-warning shadow-[0_0_20px_rgba(251,191,36,0.1)] w-fit">
                    <FaBriefcase className="text-xl md:text-2xl" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
                    Expérience
                  </h2>
                  <div className="hidden md:block flex-grow h-[1px] bg-gradient-to-r from-theme-border to-transparent" />
                </div>

                <div className="space-y-12 md:space-y-16 relative before:absolute before:left-4 md:before:left-10 before:top-4 before:bottom-4 before:w-[1px] before:bg-theme-border">
                  {experiences.map((item, i) => (
                    <TimelineItem key={i} {...item} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Skills Overview - Centered full width */}
        <section className="mt-24 w-full flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-black mb-12 text-center tracking-tighter flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="hidden md:block w-12 h-0.5 bg-warning/30 rounded-full" />
            <span className="text-white uppercase">Tech Stack</span>
            <div className="hidden md:block w-12 h-0.5 bg-warning/30 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl px-4">
            <SkillCard
              icon={<FaNetworkWired />}
              title="Infrastructure"
              items={[
                'Architecture IPv4/v6',
                'VLAN / ST / Routing',
                'PfSense / Firewalling',
                'DNS / DHCP Server',
              ]}
            />
            <SkillCard
              icon={<FaMicrochip />}
              title="Systèmes"
              items={[
                'Active Directory / GPO',
                'PowerShell Automation',
                'Samba / Linux Distros',
                'Deployment (FOG)',
              ]}
            />
            <SkillCard
              icon={<FaTools />}
              title="Labs & Virt"
              items={[
                'Proxmox / Hyper-V',
                'ZFS / RAID / Replication',
                'NextCloud / SSH / VPN',
                'MVC / Web Modern',
              ]}
            />
          </div>
        </section>

        {/* Modern Downloads - Centered full width */}
        <div className="pt-16 pb-8 flex flex-col lg:flex-row gap-6 justify-center items-center w-full max-w-3xl mx-auto px-4 mt-20">
          <DownloadCard title="Print Ready (B&W)" file="/assets/cv/Cv-Noir-Blanc.pdf" playSound={playSound} />
          <DownloadCard title="Interactive (Color)" file="/assets/cv/Cv-Couleur.pdf" playSound={playSound} />
        </div>

        {/* Footer Decorative Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-48 flex flex-col items-center gap-10"
        >
          <div className="w-px h-40 bg-gradient-to-b from-warning to-transparent opacity-50" />
          <p className="text-muted text-[11px] font-black tracking-[0.6em] uppercase">
            Merci de votre visite - 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Static Data ---
const formations = [
  {
    title: 'BTS SIO SISR',
    subtitle: 'St-John Perse (Pau)',
    date: '2024 - 2026',
    desc: 'Solutions d’infrastructure, systèmes et réseaux. Expertises en administration et sécurisation.',
    link: '/competences',
  },
  {
    title: 'Bac STI2D (SIN)',
    subtitle: 'Lycée de Baudre (Agen)',
    date: '2021 - 2024',
    desc: "Option Systèmes d'Information et Numérique. Focus hardware et fondamentaux info.",
  },
  {
    title: 'Formation Continue',
    subtitle: 'OpenClassrooms',
    date: 'Present',
    desc: 'Veille techno active et perfectionnement autodidacte sur les nouveaux standards.',
  },
];

const experiences = [
  {
    title: 'Stage Informatique',
    subtitle: 'DE SANGOSSE',
    date: 'Mai - Juin 2025',
    desc: 'Migration WinForm vers Web Modern (MVC). Gestion flux CSV complexes.',
    isSpecial: true,
    link: '/stage',
  },
  {
    title: "Jobs d'été Intérim",
    subtitle: 'Secteur Agro',
    date: '2021 - 2025',
    desc: 'Préparateur, ripeur, manutention. Rigueur extrême et endurance physique.',
  },
  {
    title: 'Animation Colonie',
    subtitle: 'Centres de Vacances',
    date: '2022',
    desc: 'Gestion de groupes (8-12 ans), animation et sécurité.',
  },
];

// --- Sub-components ---

const ContactItem = ({ icon, text, href, playSound }: any) => (
  <li className="flex items-center gap-4 md:gap-6 group">
    <div
      onMouseEnter={() => playSound?.('hover')}
      className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl md:rounded-2xl group-hover:border-warning group-hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-500 glass relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-warning opacity-0 group-hover:opacity-5 transition-opacity" />
      <span className="group-hover:text-warning text-lg md:text-xl transition-colors">{icon}</span>
    </div>
    <div className="flex flex-col min-w-0 overflow-hidden">
      {href ? (
        <a
          href={href}
          onMouseEnter={() => playSound?.('hover')}
          onClick={() => playSound?.('click')}
          className="font-bold text-sm md:text-base tracking-tight hover:text-warning transition-colors truncate"
        >
          {text}
        </a>
      ) : (
        <span className="font-bold text-sm md:text-base tracking-tight truncate">{text}</span>
      )}
      <span className="text-[8px] text-muted font-black tracking-widest uppercase mt-0.5">
        Status: Verified
      </span>
    </div>
  </li>
);

const ProjetItem = ({ title, desc }: any) => (
  <div className="p-5 rounded-3xl glass hover:border-warning/40 transition-all duration-500 group shadow-inner">
    <h4 className="font-black text-sm mb-1.5 group-hover:text-warning transition-colors tracking-tight">
      {title}
    </h4>
    <p className="text-muted text-[10px] font-bold tracking-tight leading-relaxed">{desc}</p>
  </div>
);

const TimelineItem = ({ title, subtitle, date, desc, isSpecial, link }: any) => {
  const content = (
    <div className="glass rounded-[1rem] md:rounded-[1.5rem] p-4 md:p-6 hover:bg-warning/5 transition-all duration-700 group-hover:-translate-y-2 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-warning/[0.02] to-transparent pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
        <span className="text-warning text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase opacity-70">
          {date}
        </span>
        {isSpecial && (
          <span className="px-3 py-1 bg-warning/20 text-warning text-[8px] font-black uppercase rounded-full tracking-widest border border-warning/10 shadow-lg">
            Expérience Clé
          </span>
        )}
      </div>
      <h3 className="text-lg md:text-xl font-black mb-1 tracking-tighter leading-tight">{title}</h3>
      <h4 className="text-sky-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-5 opacity-50">
        {subtitle}
      </h4>
      <p className="text-muted text-[13px] md:text-[14px] leading-relaxed font-medium">{desc}</p>
      {link && (
        <div className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-warning">
          <span>En savoir plus</span>
          <div className="w-4 h-[1px] bg-warning/30" />
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="ml-4 sm:ml-10 md:ml-24 relative group"
    >
      <div
        className={`absolute -left-[18px] sm:-left-[30px] md:-left-[64px] top-6 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border-[2px] md:border-[3px] border-page z-10 transition-transform duration-700 group-hover:scale-150 ${isSpecial ? 'bg-warning shadow-[0_0_20px_#fbbf24]' : 'bg-muted group-hover:bg-sky-400'}`}
      />
      {link ? <Link to={link}>{content}</Link> : content}
    </motion.div>
  );
};

const SkillCard = ({ icon, title, items }: any) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="glass rounded-[1.5rem] p-6 relative group overflow-hidden shadow-2xl"
  >
    <div className="absolute -right-4 -top-4 text-6xl opacity-10 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="font-black text-lg mb-6 flex items-center gap-3">
      <span className="w-2 h-2 bg-warning rounded-full shadow-[0_0_10px_#fbbf24]"></span>
      {title}
    </h3>
    <ul className="space-y-3">
      {items.map((item: string, i: number) => (
        <li
          key={i}
          className="text-muted text-[11px] font-bold flex gap-3 group-hover:text-inherit transition-colors tracking-tight"
        >
          <span className="text-warning">▹</span>
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const DownloadCard = ({ title, file, playSound }: any) => (
  <motion.a
    whileHover={{ scale: 1.05, y: -5 }}
    onMouseEnter={() => playSound('hover')}
    onClick={() => playSound('click')}
    href={file}
    className="relative group glass rounded-2xl p-6 flex items-center gap-4 w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-700 hover:border-warning/50"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-warning/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning text-xl group-hover:bg-warning group-hover:text-bg transition-all duration-500 shadow-lg">
      <FaDownload />
    </div>
    <div className="flex flex-col text-left">
      <span className="font-black text-base tracking-tighter uppercase">{title}</span>
      <span className="text-muted text-[8px] font-black tracking-widest uppercase">
        Format: PDF
      </span>
    </div>
  </motion.a>
);

export default CV;
