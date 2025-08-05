import express from 'express';
import dotenv from 'dotenv';
import prisma from './utils/prisma.js';
import jwt from 'jsonwebtoken';
import { sendToken } from './utils/sendToken.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS middleware (for React Native app communication)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes

app.post('/login', async (req, res) => {
  try {
      const { signedToken } = req.body;
      
      if (!signedToken) {
        return res.status(400).json({ 
          success: false, 
          error: "Signed token is required" 
        });
      }

      const data = jwt.verify(signedToken, process.env.JWT_SECRET);
      if (data) {
        const isUserExists = await prisma.user.findUnique({
          where: { email: data.email }
        });
        
        if (isUserExists) {
          await sendToken(isUserExists, res);
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: data.email,
              name: data.name,
              avatar: data.avatar
            }
          });
          await sendToken(newUser, res);
        }
      } else {
        res.status(401).json({ 
          success: false, 
          error: "Couldn't verify your request. Try again later!!!" 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed. Please try again.',
        details: error.message
      });
    }
});

app.get('/', (req, res) => {
  res.json({
    message: 'LMS Server API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    uptime: process.uptime()
  });
});

// Auth routes placeholder
app.post('/api/auth/google', (req, res) => {
  res.json({
    message: 'Google OAuth endpoint - implement authentication logic here',
    receivedData: req.body
  });
});

app.post('/api/auth/github', (req, res) => {
  res.json({
    message: 'GitHub OAuth endpoint - implement authentication logic here',
    receivedData: req.body
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    url: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Ready to handle requests from your React Native app`);
});

export default app;
