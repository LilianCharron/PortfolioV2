import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaChevronRight,
  FaPlus,
  FaMicrochip,
} from 'react-icons/fa';
import Breadcrumb from '../components/UI/Breadcrumb';

interface SkillItem {
  title: string;
  content: string[];
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  items: SkillItem[];
}

const CompetencesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
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
    'OSI',
    'TCP/IP',
    'RGPD',
    'Gantt',
    'ITIL',
    'SLA',
    'VLAN',
    'VPN',
    'DMZ',
    'IDS/IPS',
    'Hyper-V',
    'Docker',
  ];

  const sections: SkillCategory[] = [
    {
      category: 'Services & Support',
      icon: <FaServer />,
      color: 'warning',
      glow: '#fbbf24',
      items: [
        {
          title: '1.1 Gestion de Patrimoine',
          content: [
            'Inventaire automatisé via GLPI & OCS Inventory',
            'Standards ITIL (SLA, Gestion des changements)',
            'Habilitations & Accès (RBAC, Matrices de flux)',
            'Plan de Continuité (BCP) & Sauvegardes (Veeam)',
            'Conformité Réglementaire & Audit S.I.',
          ],
        },
        {
          title: '1.2 Support Opérationnel',
          content: [
            'Gestion des Incidents multi-niveaux (L1/L2)',
            'Support Utilisateurs & Postes de travail (WDS/FOG)',
            'Documentation Technique (DEX, DAT, Procédures)',
            'Escalade & Suivi des tickets critiques',
          ],
        },
        {
          title: '1.3 Écosystème Web & Com',
          content: [
            'SEO & Image de marque digitale',
            'Administration CMS (WordPress, Joomla)',
            'Analytics & Reporting de performance',
            'Maintenance de plateformes collaboratives',
          ],
        },
        {
          title: '1.4 Management de Projet',
          content: [
            'Agilité (Scrum/Kanban) via OpenProject',
            'Planification (Gantt, Chemin Critique)',
            'KPIs & Tableaux de bord de performance',
            'Étude de faisabilité & Budgétisation',
          ],
        },
      ],
    },
    {
      category: 'Infra & Systèmes',
      icon: <FaNetworkWired />,
      color: 'sky-400',
      glow: '#38bdf8',
      items: [
        {
          title: '2.1 Design & Architecture',
          content: [
            'Analyse de Besoins & Schématisation (Visio, FossFLOW)',
            'Architecture LAN/WAN (Segmentation VLAN, DMZ)',
            'Spécifications Techniques (DAT) & ROI',
            'Prototypage & POC en environnement de Lab',
          ],
        },
        {
          title: '2.2 Build & Virt',
          content: [
            'Virtualisation High-Level (Hyper-V, Proxmox, ESXi)',
            'Setup Infrastructures Core (AD, DNS, DHCP, NPS)',
            'Vérification & Recette (QA, Tests de charge)',
            'Logiciels & Middleware (SQL Server, Apache)',
          ],
        },
        {
          title: '2.3 Infrastructure as Code & Run',
          content: [
            'Automation via Ansible & Scripts (PowerShell/Bash)',
            'Supervision (Zabbix, Nagios, Grafana)',
            'Câblage structuré & Baies de brassage',
            'Maintenance préventive & Curative',
          ],
        },
        {
          title: '2.4 Stockage & Flux',
          content: [
            'Gestion SAN/NAS (iSCSI, NFS, SMB)',
            'Réplication de données & RAID',
            'Optimisation des flux inter-VLAN (Layer 3)',
            'Gestion des certificats SSL/TLS',
          ],
        },
      ],
    },
    {
      category: 'Cybersécurité',
      icon: <FaShieldAlt />,
      color: 'green-500',
      glow: '#22c55e',
      items: [
        {
          title: '3.1 Data Integrity & GRC',
          content: [
            'Mise en conformité RGPD & CNIL',
            'Analyse de Risque (Méthode EBIOS)',
            'Sensibilisation Utilisateurs (Phishing, Hygiène IT)',
            'Cycle de vie de la donnée (Protection/Archivage)',
          ],
        },
        {
          title: '3.2 Identity & Access Management',
          content: [
            'Solutions MFA (Duo Push, Microsoft Auth)',
            'Authentification Centralisée (LDAP, Radius)',
            'Gestion des secrets & LAPS',
            'PKI & Signature Électronique',
          ],
        },
        {
          title: '3.3 Hardening & Monitoring',
          content: [
            'Filtrage applicatif & Firewalling (pfSense, Stormshield)',
            'Analyse de logs (SIEM, ELK Stack)',
            'Hardening Systèmes (GPO, AppLocker, UAC)',
            'Audits de Sécurité & Veille Vulnérabilités',
          ],
        },
        {
          title: '3.4 Network Security',
          content: [
            'Sécurisation des accès distants (VPN IPsec/OpenVPN)',
            "Détection d'intrusion (IDS/IPS - Snort/Suricata)",
            'WAF (Web Application Firewall)',
            'Segmentation Zéro Trust',
          ],
        },
      ],
    },
  ];

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="pt-20 pb-24 px-4 min-h-screen bg-page overflow-hidden relative"
    >
      {/* 1. Cyber Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-text-muted) 0.5px, transparent 0.5px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* 2. Scanning line animation */}
      <motion.div
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warning/20 to-transparent z-[1] pointer-events-none"
      />

      {/* 3. Interactive Light Follower */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-warning/[0.02] rounded-full blur-[120px] pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 4. Drifting Floating Keywords */}
      {keywords.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.1, 0] }}
          animate={{
            x: [Math.random() * 80, Math.random() * -80],
            y: [Math.random() * 80, Math.random() * -80],
          }}
          transition={{ duration: 20 + i, repeat: Infinity, ease: 'linear' }}
          className="absolute text-muted/10 text-[10px] md:text-xs font-black tracking-widest pointer-events-none select-none"
          style={{ left: `${Math.random() * 90}%`, top: `${Math.random() * 90}%` }}
        >
          {word}
        </motion.span>
      ))}

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        <Breadcrumb />
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-warning text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-2xl"
          >
            <FaMicrochip className="text-sm" /> Modules d'Expertise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center leading-none"
          >
            COMPÉTENCES
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '300px' }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'circOut' }}
            className="h-[1px] bg-gradient-to-r from-transparent via-warning to-transparent mt-8 mb-3 rounded-full"
          />
          <p className="text-muted text-[8px] font-black tracking-[0.5em] uppercase">
            Référentiel de compétences BTS SIO
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all duration-500 border relative overflow-hidden backdrop-blur-3xl ${activeTab === idx
                ? 'bg-warning/10 text-inherit border-warning/30 shadow-[0_0_40px_rgba(251,191,36,0.05)]'
                : 'glass text-muted border-theme hover:border-warning/30'
                }`}
            >
              <div
                className={`p-3 rounded-xl transition-all duration-500 ${activeTab === idx ? 'bg-warning text-bg scale-110 shadow-lg' : 'bg-alt text-muted group-hover:text-warning'}`}
              >
                {section.icon}
              </div>
              {section.category}
              {activeTab === idx && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-warning"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area with Alt Background */}
      <section className="bg-alt/50 border-y border-theme py-24 relative overflow-hidden shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.3)] my-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-4xl bg-warning/[0.01] blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
            >
              {sections[activeTab].items.map((item, i) => (
                <SkillBox
                  key={i}
                  title={item.title}
                  content={item.content}
                  color={sections[activeTab].color}
                  glow={sections[activeTab].glow}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

const SkillBox = ({
  title,
  content,
  color,
  glow,
}: {
  title: string;
  content: string[];
  color: string;
  glow: string;
}) => {
  const textColorClass =
    color === 'warning' ? 'text-warning' : color === 'sky-400' ? 'text-sky-400' : 'text-green-500';
  const borderColorClass =
    color === 'warning'
      ? 'group-hover:border-warning/30'
      : color === 'sky-400'
        ? 'group-hover:border-sky-400/30'
        : 'group-hover:border-green-500/30';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group glass rounded-[1.5rem] p-8 hover:bg-warning/5 transition-all duration-700 relative overflow-hidden shadow-2xl ${borderColorClass}`}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000"
        style={{ backgroundColor: glow }}
      />

      <h3 className="text-xl font-black mb-8 flex items-center justify-between tracking-tight">
        {title}
        <div
          className={`p-2 rounded-lg border border-theme glass ${textColorClass} opacity-30 group-hover:opacity-100 transition-all shadow-inner`}
        >
          <FaPlus className="text-xs" />
        </div>
      </h3>

      <ul className="space-y-4">
        {content.map((bullet, idx) => (
          <li
            key={idx}
            className="flex gap-3 text-muted group-hover:text-inherit transition-colors"
          >
            <FaChevronRight
              className={`text-[10px] mt-1 ${textColorClass} opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
            />
            <span className="text-sm font-medium leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CompetencesPage;
