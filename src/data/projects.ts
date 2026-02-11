export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  image: string;
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'bts1',
    title: 'Infrastructure Réseau',
    description: 'Mise en place d\'une architecture réseau WAN/DMZ/LAN complète.',
    fullDescription: [
      'Conception d\'une infrastructure réseau composée d\'un routeur WAN/DMZ et d\'un routeur DMZ/LAN.',
      'La DMZ héberge un serveur web avec base de données. Le LAN intègre Active Directory et un poste client Windows.',
      'Configuration de règles NAT et pare-feu pour assurer la sécurité et l\'isolation des zones.',
    ],
    image: '/assets/img/project_networking.png',
    technologies: ['Réseau', 'Linux', 'Windows Server', 'Active Directory', 'Firewall'],
    link: '/projects/infrastructure-reseau',
  },
  {
    id: 'charte',
    title: 'Charte Graphique',
    description: 'Création de l\'identité visuelle du portfolio.',
    fullDescription: [
      'Conception d\'une charte graphique pour définir l\'identité visuelle du site.',
      'Définition des couleurs, typographies et composants UI pour garantir une cohérence globale.',
    ],
    image: '/assets/img/project_web_design.png',
    technologies: ['Design', 'UI/UX', 'CSS', 'Figma'],
    link: '/projects/charte-graphique',
  },
  {
    id: 'minecraft',
    title: 'Serveur Valdrum',
    description: 'Serveur Minecraft Survival optimisé avec 20+ plugins (100 joueurs max).',
    fullDescription: [
      'Serveur PaperMC 1.21+ en mode Survival Hard avec whitelist, configuré pour 100 joueurs simultanés.',
      'Gestion des permissions avec LuckPerms, protection WorldGuard, économie Vault, et téléportation EssentialsX.',
      'Features: NPCs (Citizens/FancyNpcs), multi-mondes (Multiverse), shop GUI, voice chat, et arènes PvP.',
      'Optimisations: entity-activation-range ajustée, hopper-check optimisé, chunks pré-générés (Chunky).',
      'Monitoring: TCPShield (DDoS protection), Spark (profiling), bStats (analytics).',
    ],
    image: '/assets/img/project_minecraft.png',
    technologies: ['PaperMC', 'Linux', 'LuckPerms', 'WorldGuard', 'EssentialsX', 'Multiverse', 'Citizens'],
    link: '/projects/valdrum',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Web',
    description: 'Développement de ce site portfolio avec React.',
    fullDescription: [
      'Création d\'un portfolio professionnel avec React et TypeScript.',
      'Intégration d\'animations, d\'un système de thème et de composants interactifs.',
      'Déploiement avec Docker et configuration HTTPS via Caddy.',
    ],
    image: '/assets/img/project_portfolio.png',
    technologies: ['React', 'TypeScript', 'Docker', 'Caddy'],
    link: 'https://lilian-charron.fr:12347',
  },
];
