import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CV from './pages/CV';
import Competences from './pages/Competences';
import Veille from './pages/Veille';
import Stage from './pages/Stage';
import Stage2 from './pages/Stage2';
import ProjectDetail from './pages/projects/ProjectDetail';
import ParticlesBackground from './components/Effects/ParticlesBackground';
import PageTransition from './components/UI/PageTransition';
import './styles/global.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/cv" element={<PageTransition><CV /></PageTransition>} />
        <Route path="/competences" element={<PageTransition><Competences /></PageTransition>} />
        <Route path="/veille" element={<PageTransition><Veille /></PageTransition>} />
        <Route path="/stage" element={<PageTransition><Stage /></PageTransition>} />
        <Route path="/stage2" element={<PageTransition><Stage2 /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen font-sans transition-colors duration-500">
          <ParticlesBackground />
          <Header />
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
