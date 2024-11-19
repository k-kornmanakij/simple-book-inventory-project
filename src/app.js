const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/api', bookRoutes);

// Default Route
// Default Route
app.get('/', (req, res) => {
    connection.query('SELECT * FROM Inventory', (err, results) => {
        if (err) {
            console.error('Error fetching books:', err.message);
            res.status(500).send('Error fetching books');
        } else {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
        }
    });
});

module.exports = app;