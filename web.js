var express = require("express");
//var eve = require("./eve");
var app = express();
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

// app.get('/api/igb', fuction(req, res) {
//   res.send(eve.getIGBHeaders(req));
// });

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});