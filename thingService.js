var request = require('request'),
	settings = require('./config'),
	_thing;

var sendMesageToImp = function(action, pin){
console.log(settings.settings.url);
 request.post(
 	settings.settings.url,
    {form: { pin: pin , command:action} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
        }else{
        	//console.log(error);
        }
    });
};

var createThing = function(){
    
	var thing = {};
    thing.settings = { 
		"name": 'PinMeTo Office',
		"id": 3432,
		"iconType": "Lock",
		//"position": config.getPosition(),
		"info":"unknown",
		"actionControles": [
                {"type":"lock", "name":"", "id":"1"}
            ]
	};	

	thing.onAction = function(action){
		if(action.id === "1"){
			var command = action.value.state ? "lock":"open";
			sendMesageToImp(command, action.value.pin);
			getDoorState();
		}

	}
	_thing = thing;
	return thing;
};

var updateDoorState = function(error, response, data){
	if(error){
		console.log(error);
		return;
	}
	if(_thing.socket){
		_thing.socket.emit('updateInfo', data.doorState);
		//lastState = !lastState;
		//console.log(data.doorState);
		var curentState = data.doorState == "locked" ? true:false;
		_thing.socket.emit('updateActionControlerState',{"id":"1", "curentState":curentState});
	         	
	}
	setTimeout(getDoorState, 2000);
};

var getDoorState = function(){
	request.get({url:settings.settings.url+"state", json:true}, updateDoorState);
};

setTimeout(getDoorState, 2000);

module.exports.thing = createThing();