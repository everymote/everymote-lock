var io = require('socket.io-client'),
   thingService = require('./thingService');

var port = '80',
    server =  'thing.everymote.com';


var connectThing = function(thing, onAction){
	console.log(thing);
	var socket = io.connect('http://' + server + ':' + port + '/thing'
		,{"force new connection":true
            ,'reconnect': true
            ,'reconnection delay': 5000
            ,'reconnection limit': 5000
            ,'max reconnection attempts': 10 });

	socket.on('connect', function () {
		console.log('connected');
		socket.emit('setup', thing.settings);
	}).on('doAction', function (action) {
		
			thing.onAction(action);			
		

	}).on('connect_failed', function () {
		console.log('error:' + socket );
	}).on('disconnect', function () {
		console.log('disconnected');
	}).on('reconnect', function () {
		console.log('reconnect');
	}).on('reconnecting', function () {
		console.log('reconnecting');
	}).on('reconnect_failed', function () {
		console.log('reconnect_failed');
	});
};


var start =  function(action){
    connectThing(thingService.thing, action);
};

start();