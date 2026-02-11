import { useEffect } from 'react';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    twitterCard?: 'summary' | 'summary_large_image';
    canonicalUrl?: string;
    author?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'Lilian Charron - Portfolio BTS SISR',
    description = 'Portfolio professionnel de Lilian Charron, étudiant BTS SISR spécialisé en administration système, réseaux et cybersécurité. Découvrez mes projets techniques et compétences.',
    keywords = ['BTS SISR', 'Administration Système', 'Réseaux', 'Cybersécurité', 'Linux', 'Windows Server', 'DevOps', 'Portfolio technique'],
    ogImage = 'https://lilian-charron.fr:12347/assets/img/og-image.png',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonicalUrl,
    author = 'Lilian Charron',
}) => {
    useEffect(() => {
        const baseUrl = 'https://lilian-charron.fr:12347';
        const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
        const keywordsString = keywords.join(', ');

        // Update document title
        document.title = title;

        // Helper function to update or create meta tag
        const updateMetaTag = (attribute: string, attributeValue: string, content: string) => {
            let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, attributeValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Update or create link tag for canonical
        const updateCanonical = (href: string) => {
            let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'canonical';
                document.head.appendChild(link);
            }
            link.href = href;
        };

        // Basic meta tags
        updateMetaTag('name', 'description', description);
        updateMetaTag('name', 'keywords', keywordsString);
        updateMetaTag('name', 'author', author);
        updateCanonical(fullCanonicalUrl);

        // Open Graph / Facebook
        updateMetaTag('property', 'og:type', ogType);
        updateMetaTag('property', 'og:url', fullCanonicalUrl);
        updateMetaTag('property', 'og:title', title);
        updateMetaTag('property', 'og:description', description);
        updateMetaTag('property', 'og:image', ogImage);
        updateMetaTag('property', 'og:site_name', 'Lilian Charron Portfolio');
        updateMetaTag('property', 'og:locale', 'fr_FR');

        // Twitter
        updateMetaTag('name', 'twitter:card', twitterCard);
        updateMetaTag('name', 'twitter:url', fullCanonicalUrl);
        updateMetaTag('name', 'twitter:title', title);
        updateMetaTag('name', 'twitter:description', description);
        updateMetaTag('name', 'twitter:image', ogImage);
        updateMetaTag('name', 'twitter:creator', '@liliancharron');

        // Additional meta tags
        updateMetaTag('name', 'robots', 'index, follow');
        updateMetaTag('name', 'language', 'French');
        updateMetaTag('name', 'revisit-after', '7 days');
    }, [title, description, keywords, ogImage, ogType, twitterCard, canonicalUrl, author]);

    return null; // This component doesn't render anything
};

export default SEOHead;
