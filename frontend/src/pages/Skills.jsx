import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../context/AuthContext';

const getSkillCategoryColors = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('networking') || cat.includes('network')) {
    return {
      text: 'text-cyan-500 dark:text-cyan-400',
      border: 'hover:border-cyan-500/30 dark:hover:border-cyan-500/30',
      hoverBadge: 'hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:text-cyan-400 dark:hover:border-cyan-500/20',
      badgeBorder: 'border-b-cyan-500/20 dark:border-b-cyan-500/10'
    };
  }
  if (cat.includes('programming') || cat.includes('language') || cat.includes('ai') || cat.includes('science') || cat.includes('ml')) {
    return {
      text: 'text-purple-500 dark:text-purple-400',
      border: 'hover:border-purple-500/30 dark:hover:border-purple-500/30',
      hoverBadge: 'hover:text-purple-500 hover:border-purple-500/30 dark:hover:text-purple-400 dark:hover:border-purple-500/20',
      badgeBorder: 'border-b-purple-500/20 dark:border-b-purple-500/10'
    };
  }
  if (cat.includes('backend') || cat.includes('database')) {
    return {
      text: 'text-emerald-500 dark:text-emerald-400',
      border: 'hover:border-emerald-500/30 dark:hover:border-emerald-500/30',
      hoverBadge: 'hover:text-emerald-500 hover:border-emerald-500/30 dark:hover:text-emerald-400 dark:hover:border-emerald-500/20',
      badgeBorder: 'border-b-emerald-500/20 dark:border-b-emerald-500/10'
    };
  }
  if (cat.includes('fundamental') || cat.includes('cs fundamentals')) {
    return {
      text: 'text-amber-500 dark:text-amber-400',
      border: 'hover:border-amber-500/30 dark:hover:border-amber-500/30',
      hoverBadge: 'hover:text-amber-500 hover:border-amber-500/30 dark:hover:text-amber-400 dark:hover:border-amber-500/20',
      badgeBorder: 'border-b-amber-500/20 dark:border-b-amber-500/10'
    };
  }
  // Default Blue
  return {
    text: 'text-blue-500 dark:text-blue-400',
    border: 'hover:border-blue-500/30 dark:hover:border-blue-500/30',
    hoverBadge: 'hover:text-blue-500 hover:border-blue-500/30 dark:hover:text-blue-400 dark:hover:border-blue-500/20',
    badgeBorder: 'border-b-blue-500/20 dark:border-b-blue-500/10'
  };
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultSkills = [
    // Programming Languages
    { name: 'Java', category: 'Programming Languages', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'Python', category: 'Programming Languages', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'JavaScript', category: 'Programming Languages', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    // Backend Technologies
    { name: 'Node.js', category: 'Backend Technologies', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    { name: 'Express.js', category: 'Backend Technologies', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    { name: 'REST API Development', category: 'Backend Technologies', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'Socket.io', category: 'Backend Technologies', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    // Databases
    { name: 'MongoDB', category: 'Databases', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    { name: 'Mongoose', category: 'Databases', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    { name: 'SQL/DBMS', category: 'Databases', level: 'Intermediate', rating: 4, yearsOfExperience: '2 years' },
    // Networking
    { name: 'CCNA (Routing & Switching)', category: 'Networking', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'Network Security', category: 'Networking', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    { name: 'TCP/IP & OSI Models', category: 'Networking', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'VLANs & Routing', category: 'Networking', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'Cisco Packet Tracer', category: 'Networking', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'Network Troubleshooting', category: 'Networking', level: 'Intermediate', rating: 4, yearsOfExperience: '1.5 years' },
    // Cloud
    { name: 'AWS (S3, Redshift, Glue, Athena)', category: 'Cloud', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    { name: 'Cloud Computing', category: 'Cloud', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    // Frontend
    { name: 'HTML & CSS', category: 'Frontend Technologies', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'React.js', category: 'Frontend Technologies', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
    { name: 'Redux', category: 'Frontend Technologies', level: 'Intermediate', rating: 4, yearsOfExperience: '1.5 years' },
    { name: 'Tailwind CSS', category: 'Frontend Technologies', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    // Developer Tools
    { name: 'Git & GitHub', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'Docker', category: 'Developer Tools', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    { name: 'Postman / API Testing', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
    { name: 'VS Code & IntelliJ', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    // CS Fundamentals
    { name: "Object Oriented Programming (OOPs)", category: 'CS Fundamentals', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'Computer Networks (CN)', category: 'CS Fundamentals', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    { name: 'Database Management Systems (DBMS)', category: 'CS Fundamentals', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    // AI/ML & Data Science
    { name: 'Artificial Intelligence (AI)', category: 'AI/ML & Data Science', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
    { name: 'Data Science', category: 'AI/ML & Data Science', level: 'Intermediate', rating: 4, yearsOfExperience: '1.5 years' },
    { name: 'Data Handling', category: 'AI/ML & Data Science', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        if (response.data && response.data.length > 0) {
          setSkills(response.data);
        } else {
          setSkills(defaultSkills);
        }
      } catch (err) {
        console.warn('Backend skills fetch failed, using offline default skills:', err.message);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Unique categories in seeded list
  const categories = [
    'Programming Languages',
    'Frontend Technologies',
    'Backend Technologies',
    'Databases',
    'Networking',
    'Cloud',
    'Developer Tools',
    'CS Fundamentals',
    'AI/ML & Data Science',
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-black/30 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
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
            Technical <span className="text-accent-primary">Skills</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>


        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;
            const colors = getSkillCategoryColors(cat);

            return (
              <motion.div
                key={cat}
                className={`p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl flex flex-col h-full transition-all duration-300 ${colors.border}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className={`text-base md:text-lg font-bold tracking-tight border-b pb-4 mb-5 uppercase font-mono transition-colors duration-300 ${colors.text} ${colors.badgeBorder}`}>
                  {cat}
                </h3>
                
                {/* Skills list inside category */}
                <div className="flex flex-wrap gap-2.5 flex-grow content-start">
                  {catSkills.map((skill) => (
                    <span
                      key={skill._id || skill.name}
                      className={`px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 ${colors.hoverBadge}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
