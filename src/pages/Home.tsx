import React from 'react';
import Hero from '../components/sections/Home/Hero';
import About from '../components/sections/Home/About';
import Projects from '../components/sections/Home/Projects';
import Skills from '../components/sections/Home/Skills';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <About />
            <Skills />
            <Projects />
        </div>
    );
};

export default Home;
