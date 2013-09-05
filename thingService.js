var request = require('request'),
	settings = require('./config');

var sendMesageToImp = function(action){
 request.post(
 	settings.url,
    { form: { pin: '1234' , command:action} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}

var createThing = function(){
    
	var thing = {};
    thing.settings = { 
		"name": 'PinMeTo Office',
		"id": 3432,
		"iconType": "Lock",
		//"position": config.getPosition(),
		"actionControles": [
                {"type":"button", "name":"Open", "id":"1"},
                {"type":"button", "name":"Lock", "id":"2"}
            ]
	};	

	thing.onAction = function(action){
		if(action.id === "1"){
			sendMesageToImp("open");
		}else if(action.id === "2"){
			sendMesageToImp("lock");
		}

	}
	return thing;
};

module.exports.thing = createThing();