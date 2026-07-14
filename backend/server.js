require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Local Vite development
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL, // Production URL (if deployed)
].filter(Boolean).map(url => url.replace(/\/$/, ''));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      console.log(`CORS Preflight - Origin: "${origin}" (Cleaned: "${cleanOrigin}"). Allowed:`, allowedOrigins);
      if (allowedOrigins.indexOf(cleanOrigin) === -1) {
        console.warn(`CORS Rejected - "${cleanOrigin}" not found in allowed list:`, allowedOrigins);
        return callback(null, false); // Reject gracefully rather than throwing 500 error
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Mount API Routes
app.use('/api', apiRoutes);

// Root Route (Welcome message / Health check)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Hari Om Gupta\'s Portfolio API Server',
    status: 'active',
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Server Listening Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
