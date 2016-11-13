//listen.js

var http = require('http');

var server = http.createServer(function(req, res) {
  var date = new Date();
  res.writeHead(200);
  res.end('Hello Http, it is: ' + date);
});
server.listen(8080);