require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Trust proxy to get the correct IP when hosted (important for FCC)
app.enable('trust proxy');

// Serve the main page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Example API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// WHOAMI endpoint
app.get('/api/whoami', function (req, res) {
  res.json({
    ipaddress: req.ip,                         // FCC expects this exact key and format
    language: req.headers['accept-language'],  // User's preferred language
    software: req.headers['user-agent']        // User's software info
  });
});

// Start the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

