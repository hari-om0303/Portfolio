import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { api } from '../context/AuthContext';

const Hero = () => {
  const [profile, setProfile] = useState({
    name: 'Hari Om Gupta',
    roles: ['Software Engineer', 'Backend Developer', 'Network Enthusiast'],
    summary: 'B.Tech Computer Science Engineering student at Medi-Caps University (Batch 2027) with a strong foundation in Software Development, Computer Networks, Data Structures & Algorithms, and Backend Engineering.',
    github: 'https://github.com/hari-om0303',
    linkedin: 'https://linkedin.com/in/hariomgupta301399/',
    email: 'hariomgupta0303@gmail.com',
  });

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const roles = (profile && Array.isArray(profile.roles) && profile.roles.length > 0)
      ? profile.roles
      : ['Software Engineer', 'Backend Developer', 'Network Enthusiast'];
    const fullText = roles[currentRoleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, profile.roles]);

  // Fetch real profile details from DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && Array.isArray(response.data.roles)) {
          setProfile(response.data);
        }
      } catch (err) {
        console.warn('Backend profile fetch failed, using offline fallback:', err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleProjectsClick = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden grid-bg dark:grid-bg-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Intro Text Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs md:text-sm font-semibold tracking-widest text-accent-primary uppercase px-3 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/5">
              Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-blue-500 to-accent-secondary">{profile.name}</span>
          </motion.h1>

          <motion.div
            className="h-10 md:h-12 text-xl md:text-2xl font-mono text-slate-600 dark:text-slate-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I am a <span className="text-accent-primary border-r-2 border-accent-primary animate-pulse pr-1">{currentText}</span>
          </motion.div>

          <motion.p
            className="max-w-xl mx-auto lg:mx-0 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {profile.summary}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={handleContactClick}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Get In Touch
            </button>
            <button
              onClick={handleProjectsClick}
              className="px-8 py-3.5 rounded-2xl text-sm font-bold border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              View My Work
            </button>
          </motion.div>

          {/* Social Links & Resume Download */}
          <motion.div
            className="flex items-center justify-center lg:justify-start space-x-6 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary transition-all duration-300 hover:scale-110"
              title="GitHub Profile"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary transition-all duration-300 hover:scale-110"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://leetcode.com/u/hariomgupta0303/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary hover:border-accent-primary transition-all duration-300 hover:scale-110"
              title="LeetCode Profile"
            >
              <SiLeetcode className="w-5 h-5" />
            </a>
            
            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download="Hari_Om_Gupta_Resume.pdf"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-dashed border-accent-emerald text-accent-emerald hover:bg-accent-emerald/5 transition-all duration-300 hover:scale-[1.03]"
            >
              <FaFileDownload className="w-4 h-4" />
              <span className="text-xs font-semibold">Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Graphic/Image Column */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            {/* Ambient pulsing background circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary via-blue-500 to-accent-secondary opacity-25 blur-3xl animate-pulse-slow" />
            
            {/* Spinning gradient ring border */}
            <div className="absolute inset-2 rounded-full border border-dashed border-accent-primary/40 animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary opacity-15 blur-sm" />

            {/* Main Avatar Area */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 shadow-2xl flex justify-center items-center">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="p-6 flex flex-col justify-center items-center text-center">
                  <span className="text-6xl mb-4 animate-bounce">💻</span>
                  <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-white">&lt;HOG /&gt;</h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">B.Tech Student @ Medi-Caps</p>
                  <p className="text-[11px] font-mono text-slate-400">Class of 2027</p>
                  <div className="flex space-x-1.5 mt-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-ping" />
                    <span className="text-[10px] font-mono text-accent-primary uppercase tracking-wider font-semibold">Available for Internships</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
