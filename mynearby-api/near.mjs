'use strict';
import express from 'express';
import path from 'path';
import config from './config/config.mjs';
import expressmjs from './config/express.mjs';
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

/* Sentry.init({
	dsn: "https://a9d2d4a99c1546f39db976210eb72201@o4504496753803264.ingest.sentry.io/4504496773070848",
	//dsn: "https://eacc67b7d7cd443386eb278f351a811b@o1109204.ingest.sentry.io/6137443",
}); */

global.__base = __dirname + '/';

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Add headers
app.use(function (req, res, next) {
	let allowedOrigins = config.allow_origin_url;
	let origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		//res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization, enctype ');

	// Set to true if you need the website to include cookiebdbss in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});


export default expressmjs(app, config);
try{
	app.listen(config.port, function () {
		console.log('Express server listening on port ' + config.port);
	});
}catch(e){
	console.log(e);
}