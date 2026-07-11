import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Skills', path: 'skills' },
    { name: 'Experience', path: 'experience' },
    { name: 'Projects', path: 'projects' },
    { name: 'Certifications', path: 'certifications' },
    { name: 'Contact', path: 'contact' },
  ];

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    
    // If not on home page (e.g. on admin or login), redirect to home first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

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
  };

  const handleAdminClick = () => {
    setIsOpen(false);
    if (user) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'glass-nav py-4 shadow-lg shadow-black/20'
            : 'glass-nav-light py-4 shadow-lg shadow-slate-100/40'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary"
        >
          &lt;<span className="text-slate-800 dark:text-white transition-colors duration-300">HariOm</span> /&gt;
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {location.pathname === '/' &&
            navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="text-sm font-medium transition-colors hover:text-accent-primary text-slate-600 dark:text-slate-300"
              >
                {link.name}
              </button>
            ))}

          {location.pathname !== '/' && (
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-accent-primary text-slate-600 dark:text-slate-300"
            >
              Back to Portfolio
            </Link>
          )}

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>

          {/* Admin Area Actions */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/admin"
                className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 transition-opacity"
              >
                <FiLayout className="w-3.5 h-3.5" />
                <span>CMS</span>
              </Link>
              <button
                onClick={logout}
                className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-colors"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdminClick}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-slate-600 dark:text-slate-400"
              title="Admin Login"
            >
              <FiUser className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburguer */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Theme Toggler for mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/50 text-slate-800 dark:text-slate-200"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 dark:text-slate-200"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white dark:bg-zinc-950 shadow-2xl border-l border-slate-100 dark:border-zinc-900 z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-24 space-y-6">
          {location.pathname === '/' &&
            navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="text-left text-lg font-medium py-2 border-b border-slate-100 dark:border-zinc-900 text-slate-800 dark:text-slate-200 hover:text-accent-primary"
              >
                {link.name}
              </button>
            ))}

          {location.pathname !== '/' && (
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-left text-lg font-medium py-2 border-b border-slate-100 dark:border-zinc-900 text-slate-800 dark:text-slate-200"
            >
              Back to Portfolio
            </Link>
          )}

          {user ? (
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl text-white bg-gradient-to-r from-accent-primary to-accent-secondary"
              >
                <FiLayout className="w-4 h-4" />
                <span>Go to Admin CMS</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdminClick}
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-slate-200"
            >
              <FiUser className="w-4 h-4" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
