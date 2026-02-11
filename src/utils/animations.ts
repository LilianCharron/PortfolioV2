// Animation variants and configuration
// Optimized for faster, more responsive animations

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' } // Réduit de 0.5s à 0.3s
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: 'easeOut' } // Réduit de 0.4s à 0.2s
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } // Spring easing
};

export const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
};

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
};

// Pour les listes d'éléments - animation en cascade rapide
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05 // Réduit de 0.1s à 0.05s
        }
    }
};

export const staggerItem = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25 }
};

// Configuration optimale pour whileInView
export const viewportConfig = {
    once: true, // Anime une seule fois
    amount: 0.2, // Commence l'animation quand 20% est visible (au lieu d'attendre plus)
    margin: '0px 0px -100px 0px' // Commence l'animation 100px avant que l'élément soit visible
};

// Alternatives sans délai initial pour contenu critique
export const instantFadeIn = {
    initial: { opacity: 0.3 }, // Commence semi-visible au lieu de complètement invisible
    animate: { opacity: 1 },
    transition: { duration: 0.15 }
};

export const fastScale = {
    initial: { opacity: 0.5, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2, ease: 'easeOut' }
};
