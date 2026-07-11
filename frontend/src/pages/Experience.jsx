import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultExperiences = [
    {
      role: 'Data Engineering Intern',
      organization: 'AICTE EduSkills - AWS Academy',
      duration: 'Jan 2026 - Mar 2026',
      type: 'Internship',
      keySkills: ['Amazon S3', 'Data Engineering', 'Amazon Redshift', 'AWS Cloud', 'AWS Glue', 'Python'],
      details: [
        'Completed AWS Data Engineering Virtual Internship by AICTE EduSkills and AWS Academy, gaining hands-on exposure to cloud-based data solutions.',
        'Built and managed data pipelines using AWS S3 and AWS Glue for data ingestion, transformation, and ETL workflows.',
        'Worked with Amazon Redshift and Amazon Athena for data storage, querying, and basic data analytics operations.',
        'Applied fundamentals of cloud computing, data engineering concepts, and Python to understand scalable data processing architectures.',
      ],
    },
    {
      role: 'Network Trainee — CCNA Training Program',
      organization: 'Medicaps University',
      duration: '01 Oct, 2025 - 01 Apr, 2026',
      type: 'Training',
      keySkills: ['Computer Networks', 'TCP/IP', 'Routing and Switching', 'VLANs', 'Cisco Packet Tracer', 'Network Troubleshooting'],
      details: [
        'Completed CCNA Training Program conducted at Medi-Caps University through Cisco Networking Academy curriculum, gaining practical understanding of networking fundamentals.',
        'Configured IPv4 addressing, subnetting, VLANs, inter-VLAN routing, and OSPF-based network topologies using Cisco Packet Tracer.',
        'Implemented networking concepts including ACLs, NAT, VPN fundamentals, and secure communication between network devices.',
        'Practiced network troubleshooting using ping, traceroute, and simulation tools while strengthening routing and switching concepts.',
      ],
    },
    {
      role: 'Societal Internship Program (SIP)',
      organization: 'Medi-Caps Charitable Trust | NGO / Social Services',
      duration: '10 Jul, 2026 - 15 Aug, 2026',
      type: 'Internship',
      keySkills: ['Community Engagement', 'Communication', 'Empathy', 'Social Responsibility', 'Education', 'Teamwork'],
      details: [
        'Completed 60-hour Societal Internship Program (SIP) through Medi-Caps University as part of academic curriculum.',
        'The program focused on teaching and community engagement in schools to develop nation-first mindset, social responsibility, and empathy.',
        'Responsibilities included: conducting classes for students, organizing activities, interacting with school staff, and teaching students new technologies.',
        'Gained practical exposure to real-world societal challenges and contributed meaningfully to the local community.',
      ],
    },
  ];

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.get('/experience');
        if (response.data && response.data.length > 0) {
          setExperiences(response.data);
        } else {
          setExperiences(defaultExperiences);
        }
      } catch (err) {
        console.warn('Backend experience fetch failed, using offline default experiences:', err.message);
        setExperiences(defaultExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
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
            Work & <span className="text-accent-primary">Training</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-slate-200 dark:border-zinc-800 max-w-3xl mx-auto pl-8 md:pl-12 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id || idx}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Timeline Icon Badge */}
              <span className="absolute -left-[50px] md:-left-[66px] top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent-primary bg-white dark:bg-zinc-950 text-accent-primary shadow-md">
                <FaBriefcase className="w-4 h-4" />
              </span>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-3xl glass-card dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl">
                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                  <div>
                    <span className="text-xs font-mono font-semibold text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded">
                      {exp.type}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mt-1">
                      {exp.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {exp.organization}
                    </h4>
                  </div>
                  <div className="flex items-center text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-zinc-800 w-fit">
                    <FaCalendarAlt className="mr-2" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Details list */}
                <ul className="space-y-2 list-disc list-inside text-xs md:text-sm text-slate-500 dark:text-slate-400 font-light mb-6">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="leading-relaxed pl-1">
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                  {exp.keySkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] md:text-xs font-mono font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-600 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
