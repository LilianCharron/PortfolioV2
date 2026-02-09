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
        id: "bts1",
        title: "Projet BTS 1ère année",
        description: "Infrastructure réseau complète WAN/DMZ/LAN.",
        fullDescription: [
            "Dans le cadre de ma première année de BTS SIO, j’ai conçu une infrastructure réseau complète composée d’un routeur WAN/DMZ et d’un routeur DMZ/LAN.",
            "La DMZ héberge un serveur web connecté à une base de données interne, tandis que le LAN intègre un serveur Samba Active Directory et un poste client Windows administré.",
            "Des règles NAT et de sécurité ont été mises en place pour garantir l’isolation, la fiabilité et la protection du réseau."
        ],
        image: "/assets/img/project_networking.png",
        technologies: ["Réseau", "Linux", "Windows Server", "Samba", "NAT", "Firewall"]
    },
    {
        id: "charte",
        title: "Charte Graphique",
        description: "Conception d'une identité visuelle complète.",
        fullDescription: [
            "J’ai conçu une charte graphique complète pour assurer la cohérence visuelle et l’identité professionnelle de mon site web.",
            "Elle définit les couleurs, typographies et styles d’interface utilisés, afin de garantir une présentation claire, moderne et harmonieuse."
        ],
        image: "/assets/img/project_web_design.png",
        technologies: ["Design", "UI/UX", "CSS", "Photoshop/Figma"]
    },
    {
        id: "minecraft",
        title: "Serveur Minecraft",
        description: "Administration d'un serveur PaperMC professionnel.",
        fullDescription: [
            "J’ai conçu et administré un serveur Minecraft professionnel basé sur PaperMC, accompagné d’un site web relié pour le suivi et la gestion du projet.",
            "Le serveur est sécurisé, optimisé et maintenu à jour, avec une sélection de plugins assurant stabilité, performance et expérience utilisateur fluide."
        ],
        image: "/assets/img/project_minecraft.png",
        technologies: ["Linux", "Java", "PaperMC", "Web", "Administration Système"],
        link: "https://valdrum.fr:12347/Apropos.php"
    },
    {
        id: "counter",
        title: "Compteur JavaScript",
        description: "Projet interactif d'apprentissage du DOM.",
        fullDescription: [
            "J’ai réalisé un petit projet personnel en JavaScript consistant à créer un compteur interactif. Ce projet m’a permis de m’exercer à la manipulation du DOM, à la gestion des événements et à l’actualisation dynamique d’éléments sur une page web.",
            "C’est un exercice simple mais formateur, que j’ai appris grâce à la plateforme Scrimba, et qui m’a aidé à renforcer mes bases en développement front-end."
        ],
        image: "/assets/img/project_counter.png",
        technologies: ["JavaScript", "HTML", "CSS", "DOM"]
    }
];
