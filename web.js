var express = require("express");
var igb = require("./app/models/igbParams.js");
var app = express();
app.use(express.logger());

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');

app.get('/', function(req, res) {
  var igbparams = igb.extractParameters(req);
  console.log(igbparams);
  res.render('index', {
    igb: igbparams
  });
});
app.use(express.static(__dirname + '/public'));
// app.get('/api/igb', fuction(req, res) {
//   res.send(eve.getIGBHeaders(req));
// });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});