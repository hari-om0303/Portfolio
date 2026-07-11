require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const dns = require('dns');

// Solve Node.js/Windows DNS resolution issue (querySrv ECONNREFUSED) for MongoDB Atlas SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('Failed to set custom DNS servers, SRV resolution might fail:', e.message);
}

// Import models
const User = require('../models/User');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Experience = require('../models/Experience');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Error: MONGODB_URI environment variable is missing. Please set it in your .env file.');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to Database. Cleaning collections...');

    // Clear existing data
    await User.deleteMany();
    await Profile.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Certificate.deleteMany();
    await Experience.deleteMany();

    console.log('Collections cleared. Seeding default Admin User...');

    // 1. Seed Admin User
    const adminUser = new User({
      email: 'hariomgupta0303@gmail.com',
      password: 'Hariom@2027', // Will be hashed by pre-save schema hook
      role: 'admin',
    });
    await adminUser.save();
    console.log('Admin user seeded (email: hariomgupta0303@gmail.com, password: Hariom@2027)');

    // 2. Seed Developer Profile
    const profile = new Profile({
      name: 'Hari Om Gupta',
      title: 'B.Tech. - Computer Science & Engineering (Batch 2027) at Medi-Caps University',
      roles: ['Software Engineer', 'Backend Developer', 'Network Enthusiast'],
      email: 'hariomgupta0303@gmail.com',
      phone: '+91-8905952189',
      address: 'Indore, Indore, Indore, Madhya Pradesh, India - 453331',
      permanentAddress: 'Bakani Jhalawar Rajasthan, India - 326022',
      github: 'https://github.com/hari-om0303',
      linkedin: 'https://linkedin.com/in/hariomgupta301399/',
      dob: '03 Mar, 2004',
      gender: 'Male',
      languages: ['English', 'Hindi'],
      hobbies: [
        'Listening to Music',
        'Cooking',
        'Playing Cricket and Badminton',
        'Fitness and Gym',
        'Trekking',
        'Exploring New Technology',
      ],
      summary:
        'B.Tech Computer Science Engineering student at Medi-Caps University (Batch 2027) with a strong foundation in Software Development, Computer Networks, Data Structures & Algorithms, and Backend Engineering. Skilled in Java, Python, Web Development, Node.js, Express.js, MongoDB, REST APIs, and networking concepts including TCP/IP, Routing & Switching, OSPF, VLANs, ACLs, and VPN fundamentals through CCNA training. Experienced in building practical projects including a Stateful Deep Packet Inspection Engine for network traffic analysis and a Multi-Tenant SaaS Platform. Solved DSA problems on LeetCode and completed AWS Data Engineering Virtual Internship, gaining exposure to cloud computing and data engineering workflows. Looking for Software Engineering opportunities where I can apply my problem-solving skills, networking knowledge, and software development experience to build reliable, scalable, and impactful technology solutions.',
    });
    await profile.save();
    console.log('Developer profile seeded.');

    // 3. Seed Projects
    const projects = [
      {
        title: 'Stateful Deep Packet Inspection (DPI) Engine',
        description:
          'Built a multi-threaded real-time DPI engine using Python and Scapy with Five-Tuple flow tracking for stateful traffic analysis across live network interfaces. Implemented Layer 7 protocol inspection for HTTP, DNS, and TLS, including SNI extraction from TLS Client Hello messages for encrypted traffic classification. Engineered a Snort-inspired signature matching engine with string and byte-pattern detection, dynamic rule reloading, and zero-downtime policy updates via background watcher threads. Built flow lifecycle management and rule-based blocking for domain, application, and payload-level traffic control.',
        keySkills: ['Python', 'Scapy', 'Multithreading', 'Network Security', 'DPI', 'TCP/IP'],
        githubLink: 'https://github.com/hari-om0303/PYTHON_DPI_ANALYZER',
        link: '',
        features: [
          'Real-time network packet capturing and decoding',
          'Five-Tuple flow tracking (Src IP, Dst IP, Src Port, Dst Port, Protocol)',
          'Layer 7 protocol identification (HTTP, DNS, TLS SNI)',
          'Snort-inspired pattern matching engine',
          'Rule-based blocking and packet dropping',
          'Multi-threaded background watchers for configuration reloading',
        ],
        category: 'Networking',
        featured: true,
      },
      {
        title: 'SaaSify — AI-Powered Multi-Tenant SaaS Platform',
        description:
          'Architected a multi-tenant backend with organization-level data isolation, JWT authentication, and role-based access control (RBAC); exposed functionality via a structured REST API with protected routes and real-time Socket.IO notifications. Designed scalable MongoDB schemas with indexing, audit logging, and organization-level data segregation to support multitenant isolation and horizontal scalability. Containerized with multi-stage Docker builds and deployed on Render with MongoDB Atlas; integrated Google Gemini API for AI-powered task triage and risk analysis.',
        keySkills: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'Socket.io', 'Google Gemini API', 'JWT'],
        githubLink: 'https://github.com/hari-om0303',
        link: 'https://ai-intelligence-layer-multi-org.onrender.com/',
        features: [
          'Multi-tenant architecture with logical data isolation',
          'Role-Based Access Control (RBAC) & JWT authorization',
          'Real-time collaborative events via Socket.IO',
          'Scalable MongoDB indexing and audit logs',
          'AI-powered task prioritization using Google Gemini API',
          'Multi-stage Docker setup and containerized hosting',
        ],
        category: 'Full Stack',
        featured: true,
      },
      {
        title: 'Home Rental Web Application (Dream Nest)',
        description:
          'Built a full-stack rental platform with authentication, booking, wishlist, and property listing features, creating a working MVP for user and stakeholder review. Built REST APIs for reservations CRUD, user management, listings, wishlist, and search, enabling automated reservation flows and faster front-end integration. Used Redux for state management and React Router for navigation, keeping data consistent across pages and improving user experience consistency.',
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
          'Built a Python voice assistant that executes commands (open websites, play music, retrieve real-time news), enabling hands-free automation and streamlining common tasks for demonstrations and prototyping. Integrated SpeechRecognition and text-to-speech (gTTS and pyttsx3) with OpenAI GPT-4 API for natural-language understanding, improving conversational accuracy and enabling AI-powered dialogue. Implemented wake-word detection, continuous command processing and API integrations (Pygame, Requests, WebBrowser), reducing manual triggers and enabling fully automated task execution.',
        keySkills: ['Python', 'OpenAI API (GPT-4)', 'SpeechRecognition', 'gTTS', 'pyttsx3'],
        githubLink: 'https://github.com/hari-om0303/jarvis_virtual_assistant',
        link: '',
        features: [
          'Hands-free voice recognition with custom wake-word',
          'Conversational AI integrations powered by OpenAI GPT-4',
          'Device automation (web browsing, media control, system actions)',
          'Speech-to-text and text-to-speech synthesis (offline and online)',
          'Integrations with external weather & news APIs',
        ],
        category: 'AI & Python',
        featured: false,
      },
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // 4. Seed Skills
    const skills = [
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
      // Frontend / Web Dev
      { name: 'HTML & CSS', category: 'Frontend Technologies', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
      { name: 'React.js', category: 'Frontend Technologies', level: 'Advanced', rating: 4, yearsOfExperience: '2 years' },
      { name: 'Redux', category: 'Frontend Technologies', level: 'Intermediate', rating: 4, yearsOfExperience: '1.5 years' },
      { name: 'Tailwind CSS', category: 'Frontend Technologies', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
      // Developer Tools
      { name: 'Git & GitHub', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
      { name: 'Docker', category: 'Developer Tools', level: 'Intermediate', rating: 4, yearsOfExperience: '1 year' },
      { name: 'Postman / API Testing', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '2 years' },
      { name: 'VS Code & IntelliJ IDEA', category: 'Developer Tools', level: 'Advanced', rating: 5, yearsOfExperience: '3 years' },
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // 5. Seed Certifications
    const certificates = [
      {
        name: 'CCNA: Introduction to Networks',
        provider: 'Cisco Networking Academy',
        skillsLearned: ['Computer Networks', 'TCP/IP Networking', 'IPv4 Addressing', 'Subnetting', 'Network Fundamentals', 'Cisco Packet Tracer'],
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
        skillsLearned: ['Data Science', 'Machine Learning', 'Python', 'Predictive Modeling'],
        issueDate: 'Oct 2025',
        credentialUrl: '',
      },
      {
        name: 'Python for Data Science',
        provider: 'NPTEL - IIT Madras',
        skillsLearned: ['Python Programming', 'NumPy', 'Pandas', 'Data Visualization', 'Data Science Foundations'],
        issueDate: 'Jul 2024',
        credentialUrl: '',
      },
      {
        name: 'Advanced Data Structures and Algorithms',
        provider: 'Board Infinity',
        skillsLearned: ['Data Structures', 'Algorithms', 'Java Programming', 'Problem Solving', 'Time Complexity Analysis'],
        issueDate: 'Aug 2025',
        credentialUrl: '',
      },
      {
        name: 'Full Stack Development',
        provider: 'Board Infinity',
        skillsLearned: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React.js', 'Web Development', 'REST APIs', 'API Testing'],
        issueDate: 'Sep 2025',
        credentialUrl: '',
      },
    ];
    await Certificate.insertMany(certificates);
    console.log('Certifications seeded.');

    // 6. Seed Experience
    const experiences = [
      {
        role: 'Data Engineering Intern',
        organization: 'AICTE EduSkills - AWS Academy',
        duration: 'Jan 2026 - Mar 2026',
        type: 'Internship',
        keySkills: ['Amazon S3', 'Data Engineering', 'Amazon Redshift', 'AWS Cloud', 'Cloud Computing', 'AWS Glue', 'Python'],
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
        keySkills: ['Computer Networks', 'TCP/IP', 'Routing and Switching', 'IPv4 Addressing', 'VLANs', 'Cisco Packet Tracer', 'Network Troubleshooting'],
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
    await Experience.insertMany(experiences);
    console.log('Experiences seeded.');

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding database failed:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
