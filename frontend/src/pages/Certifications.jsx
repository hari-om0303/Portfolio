import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultCertificates = [
    {
      name: 'CCNA: Introduction to Networks',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Computer Networks', 'TCP/IP Networking', 'IPv4 Addressing', 'Subnetting', 'Cisco Packet Tracer'],
      issueDate: 'Dec 2025',
      credentialUrl: '',
    },
    {
      name: 'CCNA: Switching, Routing, and Wireless Essentials',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Routing and Switching', 'VLANs', 'Inter VLAN Routing', 'Wireless Networking'],
      issueDate: 'Jan 2026',
      credentialUrl: '',
    },
    {
      name: 'CCNA: Enterprise Networking, Security, and Automation',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Network Security', 'ACLs', 'NAT', 'OSPF Routing'],
      issueDate: 'Feb 2026',
      credentialUrl: '',
    },
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Data Science',
      provider: 'Oracle University',
      skillsLearned: ['Data Science', 'Machine Learning', 'Python', 'OCI DS Platform'],
      issueDate: '14 Oct, 2024',
      credentialUrl: '',
    },
    {
      name: 'Python for Data Science',
      provider: 'NPTEL - IIT Madras',
      skillsLearned: ['Python', 'NumPy', 'Pandas', 'Data Visualization', 'Data Science'],
      issueDate: 'Jul 2024',
      credentialUrl: '',
    },
    {
      name: 'Advanced Data Structures and Algorithms',
      provider: 'Board Infinity',
      skillsLearned: ['Data Structures', 'Algorithms', 'Java Programming', 'Problem Solving', 'Time Complexity'],
      issueDate: 'Aug 2025',
      credentialUrl: '',
    },
    {
      name: 'Full Stack Development',
      provider: 'Board Infinity',
      skillsLearned: ['HTML & CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React.js', 'REST APIs', 'API Testing'],
      issueDate: 'Sep 2025',
      credentialUrl: '',
    },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.get('/certificates');
        if (response.data && response.data.length > 0) {
          setCertificates(response.data);
        } else {
          setCertificates(defaultCertificates);
        }
      } catch (err) {
        console.warn('Backend certificates fetch failed, using offline default certificates:', err.message);
        setCertificates(defaultCertificates);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section id="certifications" className="py-24 border-t border-slate-100 dark:border-zinc-900 transition-colors duration-300">
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
            Assessments & <span className="text-accent-primary">Certifications</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl flex flex-col justify-between h-full relative group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div>
                {/* Provider Icon */}
                <div className="flex justify-between items-center mb-4">
                  <span className="p-3 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                    <FaCertificate className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 dark:bg-zinc-800/50 px-2.5 py-1 rounded-xl">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-800 dark:text-white mb-2 leading-tight">
                  {cert.name}
                </h3>

                {/* Provider */}
                <h4 className="text-xs font-semibold text-accent-secondary mb-4">
                  {cert.provider}
                </h4>

                {/* Skills Learned */}
                <div className="mb-6">
                  <h5 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center">
                    <FaAward className="mr-1.5 text-accent-emerald" />
                    <span>Skills Validated:</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] md:text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Verification Link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-center space-x-2 group-hover:border-accent-primary group-hover:text-accent-primary transition-all duration-300"
                >
                  <span>Verify Credential</span>
                  <FaExternalLinkAlt className="w-2.5 h-2.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
