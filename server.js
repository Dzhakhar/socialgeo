var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);
var geoip = require('geoip-lite');

// Get client IP address from request object ----------------------
var getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
};

var CONNECTED_LIST = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on("new_message", function (data) {
        io.emit("new_message", data);
    })

    socket.on("new::user", function(data){
      var ip = socket.handshake.address;
      data.geo = geoip.lookup(ip);

      if(ip.indexOf("127.0.0.1") > -1){

      }else {
          io.emit("new::user", data);
      }
    })
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

http.listen(3000, function () {
    console.log("listening on *:3000");
})
