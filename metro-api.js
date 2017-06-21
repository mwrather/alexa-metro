const https = require('https');

function requestOptions(route) {
	return {
		host: 'api.metro.net',
		port: 80,
		path: '/agencies/lametro-rail/' + route,
		method: 'GET'
	};
}

function httpPromise(route) {
	return new Promise((resolve, reject) => {
		const req = https.request(requestOptions(route), res => {
			var returnData = '';
			res.setEncoding('utf8');
			res.on(data, chunk => { returnData += chunk; });
			res.on('end', () => { resolve(JSON.parse(returnData)); });
		});
		req.on('error', e => { reject(e); });
		req.end();
	});
}

// @todo CACHING
function buildStopInformation() {
	return httpPromise('routes/')
		.then(data => Promise.all(data.items.map(item =>
			httpPromise('routes/' + item.id + '/stops/').then(data => {
				return {
					display_name: item.display_name,
					id: item.id,
					stops: data.items
				};
			})
		)))
	;
}

function getPredictions(route, stop) {
	return httpPromise(
		'routes/' + route + '/stops/' + stop + '/predictions/'
	).then(data => data.items);
}

module.exports = {
	buildStopInformation: buildStopInformation,
	getPredictions: getPredictions
};
