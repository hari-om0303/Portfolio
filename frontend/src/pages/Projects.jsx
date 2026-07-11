import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const defaultProjects = [
    {
      title: 'Stateful Deep Packet Inspection (DPI) Engine',
      description:
        'Built a multi-threaded real-time DPI engine using Python and Scapy with Five-Tuple flow tracking for stateful traffic analysis across live network interfaces. Implemented Layer 7 protocol inspection for HTTP, DNS, and TLS, including SNI extraction from TLS Client Hello messages. Engineered a Snort-inspired signature matching engine with string and byte-pattern detection and zero-downtime policy updates via background watcher threads.',
      keySkills: ['Python', 'Scapy', 'Multithreading', 'Network Security', 'DPI', 'TCP/IP'],
      githubLink: 'https://github.com/hari-om0303/PYTHON_DPI_ANALYZER',
      link: '',
      features: [
        'Real-time network packet capturing and decoding',
        'Five-Tuple flow tracking (Src/Dst IP & Port, Protocol)',
        'Layer 7 protocol identification (HTTP, DNS, TLS SNI)',
        'Snort-inspired signature pattern matching engine',
        'Rule-based blocking and packet dropping',
      ],
      category: 'Networking',
      featured: true,
    },
    {
      title: 'SaaSify — AI-Powered Multi-Tenant SaaS Platform',
      description:
        'Architected a multi-tenant backend with organization-level data isolation, JWT authentication, and role-based access control (RBAC); exposed functionality via a structured REST API with protected routes and real-time Socket.IO notifications. Designed MongoDB schemas with indexing, audit logging, and organization-level data segregation. Containerized with Docker and integrated Google Gemini API.',
      keySkills: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'Socket.io', 'Google Gemini API', 'JWT'],
      githubLink: 'https://github.com/hari-om0303',
      link: 'https://ai-intelligence-layer-multi-org.onrender.com/',
      features: [
        'Multi-tenant architecture with logical data isolation',
        'Role-Based Access Control (RBAC) & JWT authorization',
        'Real-time collaborative events via Socket.IO',
        'Scalable MongoDB indexing and audit logs',
        'AI-powered task prioritization using Google Gemini API',
      ],
      category: 'Full Stack',
      featured: true,
    },
    {
      title: 'Home Rental Web Application (Dream Nest)',
      description:
        'Built a full-stack rental platform with authentication, booking, wishlist, and property listing features, creating a working MVP for user and stakeholder review. Built REST APIs for reservations CRUD, user management, listings, wishlist, and search, enabling automated reservation flows. Used Redux for state management and React Router for navigation.',
      keySkills: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
      githubLink: 'https://github.com/hari-om0303/DREAM_NEST',
      link: '',
      features: [
        'Property listings with advanced search & filter options',
        'Booking & reservation management workflow',
        'Wishlist functionality for user favorites',
        'Redux state synchronization across routes',
        'Secure JWT authentication & token state retention',
      ],
      category: 'Full Stack',
      featured: false,
    },
    {
      title: 'Jarvis — Python Voice-Controlled Virtual Assistant',
      description:
        'Built a Python voice assistant that executes commands (open websites, play music, retrieve real-time news), enabling hands-free automation and streamlining common tasks. Integrated SpeechRecognition and text-to-speech (gTTS/pyttsx3) with OpenAI GPT-4 API for NLU, improving conversational accuracy. Implemented wake-word detection, continuous command processing and API integrations.',
      keySkills: ['Python', 'OpenAI API (GPT-4)', 'SpeechRecognition', 'gTTS', 'pyttsx3'],
      githubLink: 'https://github.com/hari-om0303/jarvis_virtual_assistant',
      link: '',
      features: [
        'Hands-free voice recognition with custom wake-word',
        'Conversational AI integrations powered by OpenAI GPT-4',
        'Device automation (web browsing, media control, system actions)',
        'Speech-to-text and text-to-speech synthesis (offline and online)',
      ],
      category: 'AI & Python',
      featured: false,
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err) {
        console.warn('Backend projects fetch failed, using offline default projects:', err.message);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = ['All', 'Full Stack', 'Networking', 'AI & Python'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-black/30 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Featured <span className="text-accent-primary">Projects</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-accent-primary border-accent-primary text-white shadow-md shadow-accent-primary/20 scale-[1.02]'
                  : 'bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-300 hover:border-accent-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project._id || project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl flex flex-col justify-between h-full relative group overflow-hidden"
              >
                {/* Floating ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/0 via-accent-primary/0 to-accent-primary/0 group-hover:from-accent-primary/5 group-hover:to-accent-secondary/5 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-accent-primary uppercase px-2.5 py-1 rounded bg-accent-primary/10">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono font-bold text-accent-emerald bg-accent-emerald/10 px-2 py-1 rounded">
                        🔥 Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
                    {project.description}
                  </p>

                  {/* Core Features */}
                  <h4 className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                    <FaCode className="mr-2 text-accent-secondary" />
                    <span>Key Features:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-light mb-6 list-disc list-inside">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="leading-relaxed">
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom section with tech tags and links */}
                <div className="mt-auto">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.keySkills.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Code Links */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary transition-colors"
                      >
                        <FaGithub className="w-4.5 h-4.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-accent-primary dark:hover:text-accent-primary transition-colors"
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
