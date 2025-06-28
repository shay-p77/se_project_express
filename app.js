const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { NOT_FOUND } = require('./utils/errors');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Enable request logger BEFORE routes
app.use(requestLogger);

// Root route — simple welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the WTWR backend API!');
});

// Routes
app.use(routes);

// 404 fallback (must be after routes)
app.use((req, res) =>
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' })
);

// Enable error logger AFTER routes but BEFORE error handlers
app.use(errorLogger);

// Celebrate validation error handler
app.use(errors());

// Centralized error handler (last middleware)
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
