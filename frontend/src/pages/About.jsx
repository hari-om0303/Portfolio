import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  const education = [
    {
      institution: 'Medi-Caps University',
      degree: 'B.Tech. - Computer Science & Engineering',
      duration: '2023 - 2027',
      grade: 'CGPA: 8.32 / 10',
      details: 'Skilled in Software Development, Computer Networks, Data Structures & Algorithms, and Backend Engineering.',
    },
    {
      institution: 'GOVT SR SEC SCH, BAKANI, Jhalawar',
      degree: '12th Grade (BSER Board)',
      duration: '2022',
      grade: 'Percentage: 88 / 100',
      details: 'Focused on Mathematics, Physics, Chemistry, and Computer Science.',
    },
    {
      institution: 'SWAMI SHRI RAMESHWAR ASHRAM A V M SEC SCH, BAKANI',
      degree: '10th Grade (BSER Board)',
      duration: '2020',
      grade: 'Percentage: 81.33 / 100',
      details: 'Completed secondary education with high-performance metrics.',
    },
  ];

  const awards = [
    'NPTEL Elite Certification in Python for Data Science by IIT Madras.',
    'Top 3 Finalist — HackSprint Hackathon, Google Developer Groups (GDG), Medicaps University.',
  ];

  const hobbies = [
    'Listening to Music',
    'Cooking',
    'Playing Cricket and Badminton',
    'Fitness and Gym Training',
    'Trekking & Exploring Nature',
    'Exploring New Technology',
  ];

  return (
    <section id="about" className="py-24 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-accent-primary">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Summary & Hobbies */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {/* Biography */}
            <motion.div
              className="p-8 rounded-3xl glass-card dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900/60 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold flex items-center space-x-2 text-slate-800 dark:text-white mb-4">
                <span className="text-accent-primary">My Journey</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                I am a B.Tech Computer Science student at Medi-Caps University with a strong academic foundation (CGPA 8.32/10) and a passion for network security and backend software engineering. 
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mt-4">
                I enjoy cracking complex algorithmic problems on competitive programming platforms and applying data-structures concepts practically. My background blends modern web app development (MERN stack, Docker) with hands-on networking training (VLANs, CCNA, Scapy packets scripting).
              </p>
            </motion.div>

            {/* Hobbies Card */}
            <motion.div
              className="p-8 rounded-3xl glass-card dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900/60 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold flex items-center space-x-2 text-slate-800 dark:text-white mb-4">
                <FaHeart className="text-red-500 w-4 h-4" />
                <span>Interests & Hobbies</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm font-medium">
                {hobbies.map((hobby, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                    <span>{hobby}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Education & Awards */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Education Timeline */}
            <motion.div
              className="p-8 rounded-3xl glass-card dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900/60 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold flex items-center space-x-2 text-slate-800 dark:text-white mb-6">
                <FaGraduationCap className="text-accent-primary w-6 h-6" />
                <span>Education Background</span>
              </h3>
              <div className="space-y-6 relative border-l border-slate-200 dark:border-zinc-800 ml-3 pl-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle timeline indicator */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent-primary bg-white dark:bg-zinc-950 transition-colors duration-300 group-hover:bg-accent-primary" />
                    
                    <span className="text-[10px] font-mono font-semibold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded">
                      {edu.duration}
                    </span>
                    <h4 className="text-base font-bold text-slate-800 dark:text-white mt-2">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                      {edu.institution} — <span className="text-accent-secondary font-mono">{edu.grade}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Awards & Achievements Card */}
            <motion.div
              className="p-8 rounded-3xl glass-card dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900/60 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold flex items-center space-x-2 text-slate-800 dark:text-white mb-4">
                <FaAward className="text-accent-emerald w-5 h-5" />
                <span>Awards & Achievements</span>
              </h3>
              <div className="space-y-3">
                {awards.map((award, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm font-medium">
                    <span className="text-accent-emerald mt-0.5">🏆</span>
                    <span className="text-slate-600 dark:text-slate-300">{award}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
