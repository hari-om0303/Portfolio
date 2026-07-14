import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth, api } from '../context/AuthContext';
import {
  FiLayout,
  FiUser,
  FiCode,
  FiCheckCircle,
  FiMail,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiAward,
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // CMS Tabs State
  const [activeTab, setActiveTab] = useState('profile');

  // Data Loading State
  const [loading, setLoading] = useState(false);

  // Collections State
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    roles: [],
    email: '',
    phone: '',
    address: '',
    permanentAddress: '',
    github: '',
    linkedin: '',
    summary: '',
    profileImage: '',
  });

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Modal / Form Management States
  const [editingProject, setEditingProject] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [certificateForm, setCertificateForm] = useState({
    name: '',
    provider: '',
    skillsLearned: '',
    issueDate: '',
    category: 'Networking',
    credentialUrl: '',
    fileUrl: '',
  });
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    keySkills: '',
    link: '',
    githubLink: '',
    features: '',
    category: 'Full Stack',
    featured: false,
  });

  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Programming Languages',
    level: 'Intermediate',
    rating: 3,
    yearsOfExperience: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (!authLoading && !user && !storedUser) {
      toast.error('Access denied. Please log in first.');
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch initial collections
  useEffect(() => {
    if (user) {
      fetchCMSData();
    }
  }, [user]);

  const fetchCMSData = async () => {
    setLoading(true);
    try {
      const [profRes, projRes, skillRes, msgRes, certRes] = await Promise.all([
        api.get('/profile').catch(() => null),
        api.get('/projects').catch(() => null),
        api.get('/skills').catch(() => null),
        api.get('/contact').catch(() => null), // Protected route
        api.get('/certificates').catch(() => null),
      ]);

      if (profRes && profRes.data) setProfile(profRes.data);
      if (projRes && Array.isArray(projRes.data)) setProjects(projRes.data);
      if (skillRes && Array.isArray(skillRes.data)) setSkills(skillRes.data);
      if (msgRes && Array.isArray(msgRes.data)) setMessages(msgRes.data);
      if (certRes && Array.isArray(certRes.data)) setCertificates(certRes.data);
    } catch (err) {
      console.error('Error fetching CMS collections:', err);
      toast.error('Failed to load portfolio CMS data.');
    } finally {
      setLoading(false);
    }
  };

  // --- Profile Operations ---
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        toast.error('Image size should be less than 1.5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRolesChange = (e) => {
    // Splits by comma
    const rolesArray = e.target.value.split(',').map((r) => r.trim()).filter(Boolean);
    setProfile((prev) => ({ ...prev, roles: rolesArray }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/profile', profile);
      setProfile(response.data);
      toast.success('Profile details updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  // --- Project Operations ---
  const openProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        description: proj.description,
        keySkills: proj.keySkills.join(', '),
        link: proj.link || '',
        githubLink: proj.githubLink || '',
        features: proj.features.join('\n'),
        category: proj.category,
        featured: proj.featured,
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        keySkills: '',
        link: '',
        githubLink: '',
        features: '',
        category: 'Full Stack',
        featured: false,
      });
    }
    setActiveTab('projectForm');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...projectForm,
      keySkills: projectForm.keySkills.split(',').map((s) => s.trim()).filter(Boolean),
      features: projectForm.features.split('\n').map((f) => f.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        // Update
        const response = await api.put(`/projects/${editingProject._id}`, formattedData);
        setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? response.data : p)));
        toast.success('Project updated successfully!');
      } else {
        // Create
        const response = await api.post('/projects', formattedData);
        setProjects((prev) => [response.data, ...prev]);
        toast.success('Project created successfully!');
      }
      setActiveTab('projects');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project.');
    } finally {
      setLoading(false);
    }
  };

  // --- Skill Operations ---
  const openSkillModal = (sk = null) => {
    if (sk) {
      setEditingSkill(sk);
      setSkillForm({
        name: sk.name,
        category: sk.category,
        level: sk.level || 'Advanced',
        rating: sk.rating || 5,
        yearsOfExperience: sk.yearsOfExperience || '',
      });
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: '',
        category: 'Programming Languages',
        level: 'Advanced',
        rating: 5,
        yearsOfExperience: '',
      });
    }
    setActiveTab('skillForm');
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSkill) {
        // Update
        const response = await api.put(`/skills/${editingSkill._id}`, skillForm);
        setSkills((prev) => prev.map((s) => (s._id === editingSkill._id ? response.data : s)));
        toast.success('Skill updated successfully!');
      } else {
        // Create
        const response = await api.post('/skills', skillForm);
        setSkills((prev) => [response.data, ...prev]);
        toast.success('Skill added successfully!');
      }
      setActiveTab('skills');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save skill.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    setLoading(true);
    try {
      await api.delete(`/skills/${id}`);
      setSkills((prev) => prev.filter((s) => s._id !== id));
      toast.success('Skill deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete skill.');
    } finally {
      setLoading(false);
    }
  };

  // --- Certificate Operations ---
  const openCertificateModal = (cert = null) => {
    if (cert) {
      setEditingCertificate(cert);
      setCertificateForm({
        name: cert.name,
        provider: cert.provider,
        skillsLearned: cert.skillsLearned.join(', '),
        issueDate: cert.issueDate || '',
        category: cert.category || 'Networking',
        credentialUrl: cert.credentialUrl || '',
        fileUrl: cert.fileUrl || '',
      });
    } else {
      setEditingCertificate(null);
      setCertificateForm({
        name: '',
        provider: '',
        skillsLearned: '',
        issueDate: '',
        category: 'Networking',
        credentialUrl: '',
        fileUrl: '',
      });
    }
    setActiveTab('certificateForm');
  };

  const handleCertificateFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertificateForm((prev) => ({ ...prev, fileUrl: reader.result }));
        toast.success('File loaded successfully.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedData = {
      ...certificateForm,
      skillsLearned: certificateForm.skillsLearned.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingCertificate) {
        // Update
        const response = await api.put(`/certificates/${editingCertificate._id}`, formattedData);
        setCertificates((prev) => prev.map((c) => (c._id === editingCertificate._id ? response.data : c)));
        toast.success('Certificate updated successfully!');
      } else {
        // Create
        const response = await api.post('/certificates', formattedData);
        setCertificates((prev) => [response.data, ...prev]);
        toast.success('Certificate added successfully!');
      }
      setActiveTab('certificates');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save certificate.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    setLoading(true);
    try {
      await api.delete(`/certificates/${id}`);
      setCertificates((prev) => prev.filter((c) => c._id !== id));
      toast.success('Certificate deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete certificate.');
    } finally {
      setLoading(false);
    }
  };

  // --- Message Operations ---
  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    setLoading(true);
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success('Message deleted.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete message.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 font-mono text-sm">
        Verifying administrator session...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Admin sidebar controls */}
        <div className="lg:col-span-3 flex flex-col space-y-3 p-6 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl">
          <h2 className="text-sm font-bold font-mono tracking-widest text-accent-primary uppercase mb-3 px-2 border-b border-slate-100 dark:border-zinc-800 pb-2">
            Control Panel
          </h2>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-accent-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
            }`}
          >
            <FiUser className="w-4.5 h-4.5" />
            <span>Profile Details</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'projects' || activeTab === 'projectForm'
                ? 'bg-accent-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
            }`}
          >
            <FiCode className="w-4.5 h-4.5" />
            <span>Manage Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'skills' || activeTab === 'skillForm'
                ? 'bg-accent-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
            }`}
          >
            <FiCheckCircle className="w-4.5 h-4.5" />
            <span>Manage Skills</span>
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'certificates' || activeTab === 'certificateForm'
                ? 'bg-accent-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
            }`}
          >
            <FiAward className="w-4.5 h-4.5" />
            <span>Manage Certs</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'messages'
                ? 'bg-accent-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiMail className="w-4.5 h-4.5" />
              <span>Inbox Message</span>
            </div>
            {messages.length > 0 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">
                {messages.length}
              </span>
            )}
          </button>
        </div>

        {/* Right Column: Active Content Forms */}
        <div className="lg:col-span-9 p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-xl min-h-[500px]">
          
          {loading && (
            <div className="text-xs font-mono text-accent-primary mb-4 animate-pulse">
              Syncing changes with database server...
            </div>
          )}

          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <form onSubmit={saveProfile} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                Update Developer Profile
              </h3>
              
              {/* Profile Photo Upload Row */}
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 pb-6 border-b border-slate-100 dark:border-zinc-800">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 flex justify-center items-center shadow-inner">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl">💻</span>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-accent-primary/10 file:text-accent-primary hover:file:bg-accent-primary/20 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400">Choose a professional picture from your computer (Max 1.5MB recommended).</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Subtitle / Tagline</label>
                  <input
                    type="text"
                    name="title"
                    value={profile.title}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Typewriter Roles (comma separated)</label>
                  <input
                    type="text"
                    value={profile.roles.join(', ')}
                    onChange={handleRolesChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    placeholder="Software Engineer, Backend Developer, Network Enthusiast"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Contact Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">GitHub Link</label>
                  <input
                    type="text"
                    name="github"
                    value={profile.github}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">LinkedIn Link</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Bio Summary</label>
                  <textarea
                    name="summary"
                    rows="6"
                    value={profile.summary}
                    onChange={handleProfileChange}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary resize-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent-primary hover:opacity-90 transition-opacity"
              >
                <FiSave className="w-4 h-4" />
                <span>Save Profile details</span>
              </button>
            </form>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Manage Projects</h3>
                <button
                  onClick={() => openProjectModal()}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-accent-primary"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="flex justify-between items-center p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{proj.title}</h4>
                      <span className="text-[10px] text-accent-primary font-mono">{proj.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(proj._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2b: PROJECT ADD/EDIT FORM */}
          {activeTab === 'projectForm' && (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                {editingProject ? 'Edit Project' : 'Add Project'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Project Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Networking">Networking</option>
                    <option value="AI & Python">AI & Python</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 text-accent-primary focus:ring-accent-primary border-slate-200 dark:border-zinc-800 rounded"
                  />
                  <label htmlFor="featured" className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Feature on Home page
                  </label>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">GitHub Link</label>
                  <input
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Deployment Link</label>
                  <input
                    type="text"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Description</label>
                  <textarea
                    rows="3"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary resize-none"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Tech Badges (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.keySkills}
                    onChange={(e) => setProjectForm({ ...projectForm, keySkills: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    placeholder="React, Node.js, Scapy, Docker"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Features List (one per line)</label>
                  <textarea
                    rows="4"
                    value={projectForm.features}
                    onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary resize-none"
                    placeholder="Feature 1&#10;Feature 2"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent-primary hover:opacity-90"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{editingProject ? 'Update Project' : 'Save Project'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className="px-6 py-3 rounded-xl text-sm font-bold border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: SKILLS MANAGEMENT */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Manage Skills</h3>
                <button
                  onClick={() => openSkillModal()}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-accent-primary"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((sk) => (
                  <div
                    key={sk._id}
                    className="flex justify-between items-center p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{sk.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {sk.category}
                      </p>
                    </div>
                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => openSkillModal(sk)}
                        className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteSkill(sk._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3b: SKILLS ADD/EDIT FORM */}
          {activeTab === 'skillForm' && (
            <form onSubmit={handleSkillSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Skill Name</label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  >
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Frontend Technologies">Frontend Technologies</option>
                    <option value="Backend Technologies">Backend Technologies</option>
                    <option value="Databases">Databases</option>
                    <option value="Networking">Networking</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="CS Fundamentals">CS Fundamentals</option>
                    <option value="AI/ML & Data Science">AI/ML & Data Science</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent-primary hover:opacity-90"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{editingSkill ? 'Update Skill' : 'Save Skill'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('skills')}
                  className="px-6 py-3 rounded-xl text-sm font-bold border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* TAB 3.5: CERTIFICATIONS MANAGEMENT */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Manage Certifications</h3>
                <button
                  onClick={() => openCertificateModal()}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-accent-primary"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>Add Certificate</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert._id}
                    className="flex justify-between items-center p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{cert.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {cert.provider} • <span className="text-accent-primary">{cert.category}</span>
                      </p>
                    </div>
                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => openCertificateModal(cert)}
                        className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                      >
                        <FiEdit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCertificate(cert._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.5b: CERTIFICATIONS FORM */}
          {activeTab === 'certificateForm' && (
            <form onSubmit={handleCertificateSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                {editingCertificate ? 'Edit Certificate' : 'Add Certificate'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Certificate Name</label>
                  <input
                    type="text"
                    value={certificateForm.name}
                    onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Provider</label>
                  <input
                    type="text"
                    value={certificateForm.provider}
                    onChange={(e) => setCertificateForm({ ...certificateForm, provider: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Category</label>
                  <select
                    value={certificateForm.category}
                    onChange={(e) => setCertificateForm({ ...certificateForm, category: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  >
                    <option value="Networking">Networking</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Backend & Full Stack">Backend & Full Stack</option>
                    <option value="Achievements / Awards">Achievements / Awards</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Issue Date</label>
                  <input
                    type="text"
                    value={certificateForm.issueDate}
                    placeholder="e.g. Sep 2025"
                    onChange={(e) => setCertificateForm({ ...certificateForm, issueDate: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Credential Verification Link</label>
                  <input
                    type="text"
                    value={certificateForm.credentialUrl}
                    placeholder="https://credly.com/..."
                    onChange={(e) => setCertificateForm({ ...certificateForm, credentialUrl: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Skills Learned (comma separated)</label>
                  <input
                    type="text"
                    value={certificateForm.skillsLearned}
                    placeholder="React, Node.js, Express"
                    onChange={(e) => setCertificateForm({ ...certificateForm, skillsLearned: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Certificate File Link / URL</label>
                  <input
                    type="text"
                    value={certificateForm.fileUrl.startsWith('data:') ? '' : certificateForm.fileUrl}
                    placeholder="https://example.com/cert.pdf or leave empty if uploading file below"
                    onChange={(e) => setCertificateForm({ ...certificateForm, fileUrl: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary"
                  />
                </div>
                <div className="flex flex-col space-y-2 md:col-span-2 pb-6 border-b border-slate-100 dark:border-zinc-800">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">OR Upload Certificate Document (Image/PDF)</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleCertificateFileChange}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-accent-primary/10 file:text-accent-primary hover:file:bg-accent-primary/20 cursor-pointer"
                  />
                  {certificateForm.fileUrl && (
                    <div className="text-[10px] text-accent-emerald flex items-center space-x-1 mt-1">
                      <span>✓ Document attached:</span>
                      <span className="truncate max-w-xs font-mono">{certificateForm.fileUrl.startsWith('data:') ? 'Base64 Encoded File' : certificateForm.fileUrl}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-accent-primary hover:opacity-90"
                >
                  <FiSave className="w-4 h-4" />
                  <span>{editingCertificate ? 'Update Certificate' : 'Save Certificate'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('certificates')}
                  className="px-6 py-3 rounded-xl text-sm font-bold border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: CONTACT MESSAGES INBOX */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-900">
                Contact Messages Inbox
              </h3>

              {messages.length === 0 ? (
                <div className="text-xs font-mono text-slate-400 py-10 text-center">
                  Inbox is clean. No messages received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white">{msg.name}</h4>
                          <a href={`mailto:${msg.email}`} className="text-xs text-accent-primary hover:underline">
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-slate-400">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete message"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {msg.subject && (
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Subject: {msg.subject}
                        </div>
                      )}

                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed bg-white dark:bg-black/20 p-3.5 rounded-xl border border-slate-200/20 dark:border-zinc-800/30">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
