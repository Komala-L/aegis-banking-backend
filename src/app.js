const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Import route modules
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');

// Authentication routes
app.use('/api/auth', authRoutes);

// Account routes
app.use('/api/accounts', accountRoutes);

module.exports = app;