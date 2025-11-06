require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();

app.enable('trust proxy');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;

  res.json({
    ipaddress: ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

