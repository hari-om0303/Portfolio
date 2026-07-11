const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Middleware
const { protect } = require('../middleware/authMiddleware');

// Controllers
const { loginUser } = require('../controllers/authController');
const { getProfile, updateProfile } = require('../controllers/profileController');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require('../controllers/certificateController');
const {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const {
  submitMessage,
  getMessages,
  deleteMessage,
} = require('../controllers/contactController');

// Rate Limiters
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact form submissions per windowMs
  message: { message: 'Too many messages sent from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: { message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth Routes
router.post('/auth/login', loginLimiter, loginUser);

// Profile Routes
router.get('/profile', getProfile);
router.put('/profile', protect, updateProfile);

// Project Routes
router.get('/projects', getProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Skill Routes
router.get('/skills', getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Certificate Routes
router.get('/certificates', getCertificates);
router.post('/certificates', protect, createCertificate);
router.put('/certificates/:id', protect, updateCertificate);
router.delete('/certificates/:id', protect, deleteCertificate);

// Experience Routes
router.get('/experience', getExperiences);
router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// Contact / Message Routes
router.post('/contact', contactLimiter, submitMessage);
router.get('/contact', protect, getMessages);
router.delete('/contact/:id', protect, deleteMessage);

module.exports = router;
