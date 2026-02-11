import React from 'react';
import SEOHead from '../components/SEO/SEOHead';
import Hero from '../components/sections/Home/Hero';
import About from '../components/sections/Home/About';
import Projects from '../components/sections/Home/Projects';
import Skills from '../components/sections/Home/Skills';
import Analysis from '../components/sections/Home/Analysis';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Lilian Charron - Portfolio BTS SISR | Technicien Systèmes & Réseaux"
        description="Portfolio professionnel de Lilian Charron, technicien BTS SISR. Découvrez mes projets en infrastructure réseau, cybersécurité, administration système Linux/Windows et services réseau."
        keywords={['BTS SISR', 'Technicien Réseau', 'Administration Système', 'Cybersécurité', 'Linux', 'Windows Server', 'Active Directory', 'pfSense', 'Infrastructure', 'Firewall']}
        canonicalUrl="/"
      />
      <div className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Analysis />
        <Projects />
      </div>
    </>
  );
};

export default Home;
