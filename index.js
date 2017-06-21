const Alexa = require('alexa-sdk');
const metroApi = require('./metro-api');

const handlers = {
	'nextTrainRequest': nextTrainHandler,
	// 'stopsRequest': function() {}, // get a stop
	'AMAZON.HelpIntent': todo,
	'AMAZON.CancelIntent': todo,
	'AMAZON.StopIntent': todo,
}

// right now just doing one stop on the expo line
const MY_LINE = '806'
const MY_STOP = '80133';

function nextTrainHandler() {
	var self = this;
	metroApi.buildStopInformation().then(allLines => metroAPI.getPredictions(
		allLines.filter(line => line.id === MY_LINE)[0].id, // stupid I know
		MY_STOP
	).then(predictions => {
		self.emit(':tell', 'The next train will arrive in ' + predictions[0].minutes + ' minutes.');
	});
}

function todo() {
	this.emit(':tell', 'Yeah, that\'s not done yet.');
}

exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
}
