var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('spavned', function(){
        // console.log('заспавнили бота')
        var sid = socket.id;
        io.emit('spavned on area', sid);
    });

    socket.on('set coords', function(data) {
        io.emit('get enemy coords', data);
    });

});

http.listen(process.env.PORT , function(){
    console.log('listening on *:'+ process.env.PORT +'');
  });