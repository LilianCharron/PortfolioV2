import proc1 from './markdown/proc-001.md?raw';
import proc2 from './markdown/proc-002.md?raw';
import proc3 from './markdown/proc-003.md?raw';
import proc4 from './markdown/proc-004.md?raw';
import proc5 from './markdown/proc-005.md?raw';
import proc6 from './markdown/proc-006.md?raw';

// Procedure type definition
export interface Procedure {
  id: string;
  title: string;
  description: string;
  category: 'Réseau' | 'Système' | 'Développement' | 'Sécurité' | 'Base de données';
  content: string;
  tags: string[];
  createdDate: string;
  lastUpdated: string;
}

// Sample procedures data
export const procedures: Procedure[] = [
  {
    id: 'proc-001',
    title: "Configuration Professionnelle d'un Serveur DHCP sous Windows Server",
    description:
      'Guide professionnel ultra-complet pour installer, configurer et optimiser un serveur DHCP sur Windows Server 2019/2022. Inclut les bonnes pratiques, le dépannage et des exemples réels.',
    category: 'Réseau',
    content: proc1,
    tags: [
      'Windows Server',
      'DHCP',
      'Réseau',
      'PowerShell',
      'Active Directory',
      'Infrastructure',
      'Haute Disponibilité',
    ],
    createdDate: '2024-01-15',
    lastUpdated: '2024-02-09',
  },
  {
    id: 'proc-002',
    title: "Déploiement d'une application React avec Vite",
    description:
      'Procédure pour déployer une application React sur Vercel, Netlify ou GitHub Pages.',
    category: 'Développement',
    content: proc2,
    tags: ['React', 'Vite', 'Déploiement', 'Vercel', 'Netlify'],
    createdDate: '2024-01-20',
    lastUpdated: '2024-02-01',
  },
  {
    id: 'proc-003',
    title: "Installation Complète d'OpenProject sur Debian 12",
    description:
      "Guide pas à pas pour installer OpenProject sur Debian 12 (Bookworm), incluant la configuration du dépôt, l'installation via APT et la configuration initiale.",
    category: 'Système',
    content: proc3,
    tags: ['Debian', 'OpenProject', 'Gestion de Projet', 'Linux', 'Serveur Web'],
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-10',
  },
  {
    id: 'proc-004',
    title: 'Installation de Zabbix Server 7.0 LTS sur Debian 12',
    description:
      "Procédure d'installation de Zabbix Server 7.0 LTS avec base de données MariaDB sur Debian 12 (sans sudo).",
    category: 'Système',
    content: proc4,
    tags: ['Debian', 'Zabbix', 'Supervision', 'MariaDB', 'Linux', 'Serveur'],
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-10',
  },
  {
    id: 'proc-005',
    title: 'Déploiement Agent Zabbix et Déclaration Hôte',
    description:
      "Procédure générique pour déployer l'agent Zabbix sur un serveur Linux et le déclarer correctement dans l'interface Zabbix.",
    category: 'Système',
    content: proc5,
    tags: ['Zabbix', 'Agent', 'Supervision', 'Linux', 'Déploiement'],
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-10',
  },
  {
    id: 'proc-006',
    title: 'Installation et Configuration VPN MFA avec Duo Security',
    description:
      "Guide complet pour la mise en place d'un VPN MFA utilisant OpenVPN, PFSense et Duo Security pour une authentification forte.",
    category: 'Sécurité',
    content: proc6,
    tags: ['VPN', 'MFA', 'Sécurité', 'PFSense', 'OpenVPN', 'Duo Security'],
    createdDate: '2026-01-14',
    lastUpdated: '2026-02-09',
  },
];

// Helper function to get procedure by ID
export const getProcedureById = (id: string): Procedure | undefined => {
  return procedures.find((proc) => proc.id === id);
};

// Helper function to get all unique categories
export const getAllCategories = (): string[] => {
  const categories = procedures.map((proc) => proc.category);
  return Array.from(new Set(categories));
};
