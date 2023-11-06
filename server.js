// Import necessary modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create Express app
const app = express();

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv?.config();

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Micro routes
import demoRoutes from './src/routes/demoRoutes.js';
// Add rest of your micro routes here

// Use micro routes
app.use('/demo', demoRoutes);
// Add rest of micro routes to put use in here

// Start the server
app.listen(PORT, () => {
    console.log(`NodeJS with Express server is running on port ${PORT}`);
});

// Test endpoint
app.get('/testEndpoint', (req, res) => {
    res.send('NodeJS with Express service test endpoint');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
