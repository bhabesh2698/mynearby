import express from 'express';
import router from './route.mjs';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import xmlparser from 'express-xml-bodyparser';
import compress from 'compression';
import methodOverride from 'method-override';

export default function (app, config) {

	app.set('views', config.root + '/app/views');
	app.set('view engine', 'ejs');
	//app.set('view engine', 'jade');
	// app.use(favicon(config.root + '/public/img/favicon.ico'));
	app.use(logger('dev'));
	/*app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));*/

	// Tell the bodyparser middleware to accept more data
	app.use('/api/upi/callback-upi-transaction', bodyParser.text({ type: 'text/plain' }));
	app.use(bodyParser.json({ limit: '20mb' }));
	app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
	app.use(xmlparser());

	app.use(cookieParser());
	app.use(compress());
	app.use(express.static(config.root + '/public'));
	app.use(methodOverride());
	app.use('/', router);
	// return app;
};
