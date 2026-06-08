require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "https://task-manager-flame-alpha-87.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// Error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));