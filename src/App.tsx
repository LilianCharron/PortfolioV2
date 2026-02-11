import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ParticlesBackground from './components/Effects/ParticlesBackground';
import GlobalAtmosphere from './components/Effects/GlobalAtmosphere';
import BinaryBursts from './components/Effects/BinaryBursts';
import PanicMode from './components/Effects/PanicMode';
import MatrixRain from './components/Effects/MatrixRain';
import PageTransition from './components/UI/PageTransition';
import SystemMonitor from './components/UI/SystemMonitor';
import InteractiveTerminal from './components/UI/InteractiveTerminal';
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
const ValdrumProject = lazy(() => import('./pages/projects/ValdrumProject'));
const InfrastructureProject = lazy(() => import('./pages/projects/InfrastructureProject'));
const CharteGraphiqueProject = lazy(() => import('./pages/projects/CharteGraphiqueProject'));
const ProjectsGallery = lazy(() => import('./pages/Projects'));

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
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/cv"
            element={
              <PageTransition>
                <CV />
              </PageTransition>
            }
          />
          <Route
            path="/competences"
            element={
              <PageTransition>
                <Competences />
              </PageTransition>
            }
          />
          <Route
            path="/veille"
            element={
              <PageTransition>
                <Veille />
              </PageTransition>
            }
          />
          <Route
            path="/procedures"
            element={
              <PageTransition>
                <Procedures />
              </PageTransition>
            }
          />
          <Route
            path="/procedures/:id"
            element={
              <PageTransition>
                <ProcedureDetail />
              </PageTransition>
            }
          />
          <Route
            path="/stage"
            element={
              <PageTransition>
                <Stage />
              </PageTransition>
            }
          />
          <Route
            path="/stage2"
            element={
              <PageTransition>
                <Stage2 />
              </PageTransition>
            }
          />
          <Route
            path="/projects/valdrum"
            element={
              <PageTransition>
                <ValdrumProject />
              </PageTransition>
            }
          />
          <Route
            path="/projects/infrastructure-reseau"
            element={
              <PageTransition>
                <InfrastructureProject />
              </PageTransition>
            }
          />
          <Route
            path="/projects/charte-graphique"
            element={
              <PageTransition>
                <CharteGraphiqueProject />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <ProjectsGallery />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PageTransition>
                <ProjectDetail />
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { AchievementProvider } from './context/AchievementContext';
import AchievementToast from './components/UI/AchievementToast';

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <Router>
          <AchievementProvider>
            <ScrollToTop />
            <div className="relative min-h-screen font-sans transition-colors duration-500">
              <ScrollProgress />
              <ParticlesBackground />
              <GlobalAtmosphere />
              <BinaryBursts />
              <SystemMonitor />
              <PanicMode />
              <MatrixRain />
              <InteractiveTerminal />
              <AchievementToast />
              <Header />
              <main className="relative z-10">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </AchievementProvider>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
