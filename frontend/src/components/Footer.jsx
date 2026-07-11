import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const Footer = () => {
  const [profile, setProfile] = useState({
    github: 'https://github.com/hari-om0303',
    linkedin: 'https://linkedin.com/in/hariomgupta301399/',
    email: 'hariomgupta0303@gmail.com',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        if (response.data) {
          setProfile(response.data);
        }
      } catch (err) {
        console.warn('Backend profile fetch failed in Footer, using fallback:', err.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <footer className="w-full py-12 mt-20 border-t border-slate-100 dark:border-zinc-900 bg-slate-50 dark:bg-black/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-mono text-base font-bold tracking-tight text-slate-800 dark:text-white">
            &lt;HariOm /&gt;
          </p>
          <p className="text-xs text-slate-500 mt-2">
            © {new Date().getFullYear()} Hari Om Gupta. All rights reserved.
          </p>
        </div>

        {/* Middle stack tag */}
        <div className="text-xs text-slate-400 font-medium">
          Built with <span className="text-accent-primary">MERN Stack</span> • <span className="text-accent-secondary">Tailwind CSS</span> • <span className="text-accent-emerald">Framer Motion</span>
        </div>

        {/* Right column socials */}
        <div className="flex space-x-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary dark:hover:border-accent-primary transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4.5 h-4.5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary dark:hover:border-accent-primary transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary dark:hover:border-accent-primary transition-all duration-300"
            aria-label="Email Address"
          >
            <FaEnvelope className="w-4.5 h-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
