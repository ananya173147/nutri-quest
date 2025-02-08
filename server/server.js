// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/database");
const logger = require("./config/logger");
const cors = require("cors");

if (!process.env.DATABASE_URL) {
  logger.error("Error: DATABASE_URL variables in .env missing.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;
// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.use(authRoutes);

// Database connection
connectDB();

app.on("error", (error) => {
  logger.error(`Server error: ${error.message}`);
  logger.error(error.stack);
});

// Basic Routes
app.use(basicRoutes);
// Authentication Routes
app.use('/api/auth', authRoutes);

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(`Unhandled application error: ${err.message}`);
  logger.error(error.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});