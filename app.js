
/**
 * Module dependencies.
 */

var express = require('express')
  io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.compiler({src: __dirname + '/public', enable: ['less', 'coffeescript']}));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Drawing howard'
  });
});

app.listen(3000);

var actions = [];

var sio = io.listen(app);

sio.sockets.on('connection', function(socket) {
    socket.emit('buffer', actions);
    socket.on('action', function (data) {
        actions.push(data);
        socket.broadcast.emit('action', socket.id, data);
    });
});
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
