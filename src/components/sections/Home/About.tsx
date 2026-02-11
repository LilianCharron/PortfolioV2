import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaCode, FaNetworkWired, FaUsers, FaMicrochip } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSound } from '../../../context/SoundContext';

const About: React.FC = () => {
  const { playSound } = useSound();
  const features = [
    {
      icon: <FaNetworkWired />,
      title: 'Net & Infra',
      desc: 'Configuration de routeurs, switchs, et architecture réseau sécurisée.',
      color: 'sky-400',
    },
    {
      icon: <FaServer />,
      title: 'Sys Admin',
      desc: 'Gestion de serveurs Linux/Windows, Active Directory, Services Web.',
      color: 'warning',
    },
    {
      icon: <FaCode />,
      title: 'Development',
      desc: "Création de sites web modernes et scripts d'automatisation.",
      color: 'green-500',
    },
    {
      icon: <FaUsers />,
      title: 'Module Projects',
      desc: "Travail d'équipe et méthodologies agiles (Sprints/Git).",
      color: 'orange-500',
    },
  ];

  return (
    <section className="py-20 md:py-40 relative overflow-hidden bg-alt shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.3)]">
      {/* Aurora Ambient Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-warning/[0.03] blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-sky-500/[0.03] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-4">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-warning text-xs font-black tracking-[0.5rem] uppercase block"
              >
                [ UN REGARD SUR MON PARCOURS ]
              </motion.span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                À PROPOS DE <span className="text-warning italic">MOI</span>
              </h2>
            </div>

            <div className="space-y-8 text-muted text-xl leading-relaxed font-medium">
              <p>
                Je m’appelle <strong>Lilian Charron</strong> et je suis passionné par l’informatique sous toutes ses formes. Actuellement en <Link to="/cv" onClick={() => playSound('click')} className="text-warning hover:underline">BTS SIO, option SISR</Link>, je me spécialise dans la gestion des réseaux et la configuration de serveurs, un domaine qui me fascine.
              </p>
              <p>
                Parmi mes projets personnels, j'ai notamment conçu et administré des <Link to="/projects/minecraft" onClick={() => playSound('click')} className="text-warning hover:underline">serveurs Minecraft avec boutique en ligne</Link>, gérés comme de véritables projets professionnels. J'aime créer des solutions alliant performance, esthétique et fonctionnalité, que ce soit via des interfaces fluides ou des environnements Linux robustes.
              </p>
              <p>
                Au-delà de la technique, j'ai développé un esprit d'équipe et une forte adaptabilité grâce à mes expériences d' <Link to="/cv" onClick={() => playSound('click')} className="text-warning hover:underline">animateur de colonie</Link> de vacances. Ma philosophie : apprendre, expérimenter et partager.
              </p>
            </div>

            <div className="flex gap-12 pt-8">
              <div className="text-center">
                <p className="font-black text-4xl">5+</p>
                <p className="text-muted text-[10px] uppercase font-black tracking-widest">
                  Active Projects
                </p>
              </div>
              <div className="text-center">
                <p className="font-black text-4xl">99%</p>
                <p className="text-muted text-[10px] uppercase font-black tracking-widest">
                  Uptime Ready
                </p>
              </div>
              <div className="text-center">
                <p className="font-black text-4xl">SISR</p>
                <p className="text-muted text-[10px] uppercase font-black tracking-widest">
                  BTS SIO
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                onMouseEnter={() => playSound('hover')}
                className="p-10 rounded-[2.5rem] glass border border-theme hover:border-warning/30 transition-all duration-500 relative group overflow-hidden shadow-2xl"
              >
                <div
                  className={`text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 opacity-50 text-${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">
                  {feature.title}
                </h4>
                <p className="text-muted text-base leading-relaxed font-medium">{feature.desc}</p>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaMicrochip size={60} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
