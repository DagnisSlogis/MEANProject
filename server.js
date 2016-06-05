var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./src/server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
  console.log('Server is running on ' + PORT);
})
