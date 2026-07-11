import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Core Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundParticles from './components/BackgroundParticles';

// Pages / Sections
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Landing Page Wrapper
const PortfolioHome = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if redirect has requested scrolling to a section
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      
      // Clear navigation state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </>
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-zinc-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 relative">
      {/* Background ambient flows */}
      <BackgroundParticles />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Global Toast Controller */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-zinc-900 dark:text-white border dark:border-zinc-800 text-sm font-semibold rounded-2xl p-4 shadow-xl',
          duration: 4000,
        }}
      />

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
