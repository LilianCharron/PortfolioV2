import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '../../data/projects';
import Breadcrumb from '../../components/UI/Breadcrumb';
import { FaChevronLeft, FaExternalLinkAlt, FaMicrochip } from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
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

  if (!project) {
    return (
      <div className="pt-32 text-center min-h-screen bg-page">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">PROJET NON TROUVÉ</h2>
        <Link to="/" className="text-warning font-black tracking-widest hover:underline uppercase">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

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
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
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
        className="absolute w-[1000px] h-[1000px] bg-warning/[0.03] rounded-full blur-[150px] pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-4 text-muted hover:text-warning mb-12 transition-all group uppercase font-black tracking-widest text-xs"
        >
          <FaChevronLeft className="group-hover:-translate-x-2 transition-transform" /> [
          RETOUR ]
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Header Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="px-4 py-1.5 bg-warning/10 text-warning text-[10px] font-black uppercase rounded-full tracking-widest border border-warning/20 shadow-lg">
                PROJET : {id?.toUpperCase()}
              </span>
              <div className="h-[1px] flex-grow bg-theme" />
              <span className="text-muted text-[10px] font-black tracking-[0.4em] uppercase">
                Statut : Complété
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none italic">
              {project.title}
            </h1>
          </div>

          {/* Main Image */}
          <div className="relative group rounded-[2.5rem] overflow-hidden border border-theme shadow-2xl h-[300px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-page via-transparent to-transparent opacity-80" />

            <div className="absolute top-8 right-8 text-[10px] font-black text-muted opacity-20 uppercase tracking-[0.4em] pointer-events-none">
              [ APERÇU ]
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="p-6 md:p-8 glass border border-theme rounded-[2rem] space-y-4">
                <h3 className="text-lg font-black flex items-center gap-4 uppercase">
                  <span className="w-2 h-2 bg-warning rounded-full shadow-[0_0_10px_#fbbf24]" />
                  Détails du Projet
                </h3>

                <div className="space-y-3 text-muted text-base leading-relaxed font-medium">
                  {project.fullDescription.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Tech Stack Module */}
              <div className="p-8 glass border border-theme rounded-[2rem] space-y-6">
                <h3 className="text-lg font-black flex items-center gap-4 uppercase italic">
                  <FaMicrochip className="text-warning" /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 glass text-muted text-[9px] font-black uppercase tracking-widest rounded-lg border border-theme"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Module */}
              {project.link && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -5 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-warning text-black dark:text-bleunuit rounded-[1.5rem] text-center font-black tracking-tighter text-lg shadow-[0_0_40px_rgba(251,191,36,0.2)] group"
                >
                  VOIR LE PROJET
                  <FaExternalLinkAlt className="inline-block ml-4 text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
              )}

              {/* System Meta removed for simplicity */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
