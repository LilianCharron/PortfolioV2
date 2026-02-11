import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaNetworkWired, FaServer, FaCode, FaTools, FaMicrochip } from 'react-icons/fa';
import { useSound } from '../../../context/SoundContext';

const Skills: React.FC = () => {
  const { playSound } = useSound();
  const skillCategories = [
    {
      title: 'Réseau & Sécurité',
      icon: <FaNetworkWired />,
      skills: ['WAN/DMZ/LAN', 'Pfsense', 'Firewalls', 'DNS Sync'],
      color: 'warning',
    },
    {
      title: 'Systèmes & Infra',
      icon: <FaServer />,
      skills: ['Linux/Windows', 'AD Domain', 'Samba', 'Virtualization'],
      color: 'sky-400',
    },
    {
      title: 'Développement Web',
      icon: <FaCode />,
      skills: ['React/TS', 'Next.js', 'Node.js', 'API Rest'],
      color: 'emerald-500',
    },
    {
      title: 'Outils & DevOps',
      icon: <FaTools />,
      skills: ['Git/Gitea', 'Ansible', 'Docker', 'DevOps'],
      color: 'orange-500',
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-40 relative overflow-hidden">
      {/* Bicolore ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60%] h-full bg-emerald-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[60%] h-full bg-sky-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-theme text-warning text-xs font-black tracking-[0.4em] uppercase mb-8 shadow-2xl"
          >
            <FaMicrochip className="text-sm" /> Stack Technique : 100% Opérationnel
          </motion.div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-center leading-none uppercase">
            MES <span className="text-transparent bg-clip-text bg-gradient-to-br from-warning to-sky-400">
              COMPÉTENCES
            </span>
          </h2>
          <div className="h-[2px] w-48 bg-warning/30 mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {skillCategories.map((category, idx) => (
            <Link
              key={idx}
              to="/competences"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass border border-theme hover:border-warning/30 transition-all duration-500 group relative overflow-hidden shadow-2xl h-full"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FaMicrochip size={50} />
                </div>

                <div
                  className={`text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 opacity-60 text-${category.color}`}
                >
                  {category.icon}
                </div>

                <h3 className="text-2xl font-black mb-8 tracking-tight uppercase italic">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 glass text-muted text-[10px] font-black uppercase tracking-widest rounded-lg border border-theme group-hover:border-warning/20 group-hover:text-warning transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-warning opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Détails Compétences</span>
                  <div className="w-4 h-[1px] bg-warning/30" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
