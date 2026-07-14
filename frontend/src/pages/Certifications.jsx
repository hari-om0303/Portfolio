import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaAward, FaSearchPlus, FaFilePdf, FaTimes } from 'react-icons/fa';
import { api } from '../context/AuthContext';

const getCategoryColors = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('network')) {
    return {
      text: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/10',
      border: 'hover:border-cyan-500/30 dark:hover:border-cyan-500/30',
      badge: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/30',
      glow: 'group-hover:from-cyan-500/5 group-hover:to-cyan-500/5',
      icon: 'text-cyan-500 dark:text-cyan-400',
      button: 'bg-cyan-500 hover:bg-cyan-600 text-white',
      buttonOutline: 'border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/20',
    };
  }
  if (cat.includes('ai') || cat.includes('python')) {
    return {
      text: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-500/10 dark:bg-purple-500/10',
      border: 'hover:border-purple-500/30 dark:hover:border-purple-500/30',
      badge: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30',
      glow: 'group-hover:from-purple-500/5 group-hover:to-purple-500/5',
      icon: 'text-purple-500 dark:text-purple-400',
      button: 'bg-purple-500 hover:bg-purple-600 text-white',
      buttonOutline: 'border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20',
    };
  }
  if (cat.includes('full stack') || cat.includes('backend') || cat.includes('db') || cat.includes('database')) {
    return {
      text: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
      border: 'hover:border-emerald-500/30 dark:hover:border-emerald-500/30',
      badge: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30',
      glow: 'group-hover:from-emerald-500/5 group-hover:to-emerald-500/5',
      icon: 'text-emerald-500 dark:text-emerald-400',
      button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      buttonOutline: 'border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20',
    };
  }
  if (cat.includes('achievement') || cat.includes('award')) {
    return {
      text: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 dark:bg-amber-500/10',
      border: 'hover:border-amber-500/30 dark:hover:border-amber-500/30',
      badge: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30',
      glow: 'group-hover:from-amber-500/5 group-hover:to-amber-500/5',
      icon: 'text-amber-500 dark:text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-600 text-white',
      buttonOutline: 'border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20',
    };
  }
  // Default Blue
  return {
    text: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/10',
    border: 'hover:border-blue-500/30 dark:hover:border-blue-500/30',
    badge: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30',
    glow: 'group-hover:from-blue-500/5 group-hover:to-blue-500/5',
    icon: 'text-blue-500 dark:text-blue-400',
    button: 'bg-blue-500 hover:bg-blue-600 text-white',
    buttonOutline: 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20',
  };
};

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  const defaultCertificates = [
    {
      name: 'CCNA: Introduction to Networks',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Computer Networks', 'TCP/IP Networking', 'IPv4 Addressing', 'Subnetting', 'Cisco Packet Tracer'],
      issueDate: 'Dec 2025',
      credentialUrl: '',
      category: 'Networking',
      fileUrl: '',
    },
    {
      name: 'CCNA: Switching, Routing, and Wireless Essentials',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Routing and Switching', 'VLANs', 'Inter VLAN Routing', 'Wireless Networking'],
      issueDate: 'Jan 2026',
      credentialUrl: '',
      category: 'Networking',
      fileUrl: '',
    },
    {
      name: 'CCNA: Enterprise Networking, Security, and Automation',
      provider: 'Cisco Networking Academy',
      skillsLearned: ['Network Security', 'ACLs', 'NAT', 'OSPF Routing'],
      issueDate: 'Feb 2026',
      credentialUrl: '',
      category: 'Networking',
      fileUrl: '',
    },
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Data Science',
      provider: 'Oracle University',
      skillsLearned: ['Data Science', 'Machine Learning', 'Python', 'OCI DS Platform'],
      issueDate: '14 Oct, 2024',
      credentialUrl: '',
      category: 'AI & Data Science',
      fileUrl: '',
    },
    {
      name: 'Python for Data Science',
      provider: 'NPTEL - IIT Madras',
      skillsLearned: ['Python', 'NumPy', 'Pandas', 'Data Visualization', 'Data Science'],
      issueDate: 'Jul 2024',
      credentialUrl: '',
      category: 'AI & Data Science',
      fileUrl: '',
    },
    {
      name: 'Advanced Data Structures and Algorithms',
      provider: 'Board Infinity',
      skillsLearned: ['Data Structures', 'Algorithms', 'Java Programming', 'Problem Solving', 'Time Complexity'],
      issueDate: 'Aug 2025',
      credentialUrl: '',
      category: 'Backend & Full Stack',
      fileUrl: '',
    },
    {
      name: 'Full Stack Development',
      provider: 'Board Infinity',
      skillsLearned: ['HTML & CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React.js', 'REST APIs', 'API Testing'],
      issueDate: 'Sep 2025',
      credentialUrl: '',
      category: 'Backend & Full Stack',
      fileUrl: '',
    },
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.get('/certificates');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
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

  const isPdf = (url) => {
    if (!url) return false;
    return url.startsWith('data:application/pdf') || url.toLowerCase().endsWith('.pdf') || url.includes('.pdf?');
  };

  const openFileInNewTab = (fileUrl) => {
    if (!fileUrl) return;
    if (fileUrl.startsWith('data:')) {
      const win = window.open();
      if (win) {
        win.document.write(`<iframe src="${fileUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      } else {
        // Fallback: download the file
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'certificate';
        link.click();
      }
    } else {
      window.open(fileUrl, '_blank');
    }
  };

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
          {certificates.map((cert, idx) => {
            const colors = getCategoryColors(cert.category);
            return (
              <motion.div
                key={cert._id || idx}
                onClick={() => setSelectedCert(cert)}
                className={`p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl flex flex-col justify-between h-full relative group overflow-hidden cursor-pointer transition-all duration-300 ${colors.border}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex items-center space-x-2 text-white bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 scale-95 group-hover:scale-100 transition-all duration-300">
                    <FaSearchPlus className="w-4 h-4" />
                    <span className="text-xs font-semibold">Click to Preview</span>
                  </div>
                </div>

                <div>
                  {/* Provider Icon */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`p-3 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
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

                  {/* Provider & Category */}
                  <div className="flex flex-col space-y-1 mb-4">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {cert.provider}
                    </h4>
                    <span className={`text-[9px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded w-fit ${colors.badge}`}>
                      {cert.category || 'Other'}
                    </span>
                  </div>

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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(cert.credentialUrl, '_blank');
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-center space-x-2 hover:border-accent-primary hover:text-accent-primary transition-all duration-300 relative z-20"
                  >
                    <span>Verify Credential</span>
                    <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modern Certificate Modal Details / Preview Popover */}
      <AnimatePresence>
        {selectedCert && (() => {
          const colors = getCategoryColors(selectedCert.category);
          const hasFile = !!selectedCert.fileUrl;
          const pdfMode = isPdf(selectedCert.fileUrl);

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="relative w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-30 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 rounded-full transition-colors shadow"
                >
                  <FaTimes className="w-4 h-4" />
                </button>

                {/* Left Side: Document Preview */}
                <div className="md:w-3/5 bg-slate-100 dark:bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden h-[40%] md:h-full border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800">
                  {hasFile ? (
                    pdfMode ? (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <iframe
                          src={selectedCert.fileUrl}
                          className="w-full h-full border-0 rounded-2xl hidden md:block"
                          title="Certificate PDF Preview"
                        />
                        <div className="md:hidden flex flex-col items-center space-y-4 text-center p-4">
                          <FaFilePdf className="w-16 h-16 text-red-500 animate-pulse" />
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">PDF Certificate Document</h4>
                          <button
                            onClick={() => openFileInNewTab(selectedCert.fileUrl)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold ${colors.button}`}
                          >
                            Open Certificate PDF
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center overflow-auto p-2">
                        <img
                          src={selectedCert.fileUrl}
                          alt="Certificate Document Preview"
                          className="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-slate-200/50 dark:border-zinc-800/80 transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center text-center p-8 space-y-4">
                      <div className={`p-5 rounded-full ${colors.bg} ${colors.text}`}>
                        <FaCertificate className="w-12 h-12" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">Verification Only</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs font-light">
                        No physical document file was uploaded for this certificate. Use the button to verify credentials directly on the issuer's website.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side: Details & Actions */}
                <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-between h-[60%] md:h-full overflow-y-auto bg-white dark:bg-zinc-900">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <span className={`text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded w-fit ${colors.badge}`}>
                        {selectedCert.category || 'Other'}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white mt-3 leading-tight">
                        {selectedCert.name}
                      </h3>
                      <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {selectedCert.provider}
                      </h4>
                      <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded mt-2 inline-block">
                        Issued: {selectedCert.issueDate}
                      </span>
                    </div>

                    {/* Skills learned */}
                    <div>
                      <h5 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center">
                        <FaAward className="mr-1.5 text-accent-emerald" />
                        <span>Skills Validated:</span>
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skillsLearned.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs font-mono font-medium px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-zinc-800/80">
                    {hasFile && (
                      <button
                        onClick={() => openFileInNewTab(selectedCert.fileUrl)}
                        className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md hover:opacity-90 ${colors.button}`}
                      >
                        {pdfMode ? <FaFilePdf /> : <FaSearchPlus />}
                        <span>{pdfMode ? 'Open PDF File' : 'Open Image / Zoom'}</span>
                      </button>
                    )}
                    {selectedCert.credentialUrl && (
                      <button
                        onClick={() => window.open(selectedCert.credentialUrl, '_blank')}
                        className={`w-full py-3 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 border transition-all ${colors.buttonOutline}`}
                      >
                        <span>Verify Credential</span>
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="w-full py-3 rounded-2xl text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
