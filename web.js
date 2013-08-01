var express = require("express");
var igb = require("./app/models/igb.js");
var app = express();

// logger
app.use(express.logger());

// ejs template stuffs
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');

// Process IGB (in game browser) headers
app.use(igb.middleware);

// default view
app.get('/', function(req, res) {
  res.render('index', {
    igb: JSON.stringify(req.igb)
  });
});

// static content
app.use(express.static(__dirname + '/public'));

// run application.
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});