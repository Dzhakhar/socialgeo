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

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on("new_message", function (data) {
        io.emit("new_message", data);
    })
});

app.get('/*', function (req, res) {
    console.log(getClientAddress(req));
    io.emit("new::user", geoip.lookup(getClientAddress(req)));
    res.sendFile(path.join(__dirname, "index.html"));
});

http.listen(3000, function () {
    console.log("listening on *:3000");
})