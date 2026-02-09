import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ParticlesBackground from './components/Effects/ParticlesBackground';
import PageTransition from './components/UI/PageTransition';
import ScrollProgress from './components/UI/ScrollProgress';
import ScrollToTop from './components/UI/ScrollToTop';
import './styles/global.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const CV = lazy(() => import('./pages/CV'));
const Competences = lazy(() => import('./pages/Competences'));
const Veille = lazy(() => import('./pages/Veille'));
const Procedures = lazy(() => import('./pages/Procedures'));
const ProcedureDetail = lazy(() => import('./pages/procedures/ProcedureDetail'));
const Stage = lazy(() => import('./pages/Stage'));
const Stage2 = lazy(() => import('./pages/Stage2'));
const ProjectDetail = lazy(() => import('./pages/projects/ProjectDetail'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-page">
    <div className="w-12 h-12 border-4 border-warning/20 border-t-warning rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/cv" element={<PageTransition><CV /></PageTransition>} />
          <Route path="/competences" element={<PageTransition><Competences /></PageTransition>} />
          <Route path="/veille" element={<PageTransition><Veille /></PageTransition>} />
          <Route path="/procedures" element={<PageTransition><Procedures /></PageTransition>} />
          <Route path="/procedures/:id" element={<PageTransition><ProcedureDetail /></PageTransition>} />
          <Route path="/stage" element={<PageTransition><Stage /></PageTransition>} />
          <Route path="/stage2" element={<PageTransition><Stage2 /></PageTransition>} />
          <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen font-sans transition-colors duration-500">
          <ScrollProgress />
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
