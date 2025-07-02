'use strict';

import env from './../../config/env/index.mjs';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt'; // ✅ correct way for v7+
import compose from 'composable-middleware';
// import moment from 'moment';
import models from './../../config/sequelize/index.mjs';

const validateJwt = expressjwt({
	secret: env.secret_key,
	algorithms: ['HS256'],
	requestProperty: 'user', // default, but you can customize
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
	return compose()
		// Validate jwt
		.use(function (req, res, next) {
			// allow access_token to be passed through query parameter as well
			// if (req.query && req.query.hasOwnProperty('access_token')) {
			if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'access_token')) {
				req.headers.authorization = 'Bearer ' + req.query.access_token;
			}
			//console.log('req.headers.authorization: ',req.headers.authorization);
			validateJwt(req, res, next);
		})
		// Attach user to request
		.use(function (req, res, next) {
			models.main.User.findByPk(req.user._id, {
				// attributes: ['id', 'name', 'email'],
				attributes: ['id', 'first_name', 'last_name', 'email'],
				// where: {
				// 	is_activated: 'Y'
				// },
				raw: true
			}).then(function (rows) {
				if (!!rows && 'id' in rows) {
					// const refresh_token = signToken(rows.id);
					// req.refresh_token = refresh_token;
					req.user = rows;
					return next();
				} else {
					return res.send(401);
				}
			}, function (err) {
				return res.send(401);
			});
		});
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticatedAdmin() {
	return compose()
		// Validate jwt
		.use(function (req, res, next) {
			// allow access_token to be passed through query parameter as well
			// if (req.query && req.query.hasOwnProperty('access_token')) {
			if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'access_token')) {
				req.headers.authorization = 'Bearer ' + req.query.access_token;
			}
			//console.log('req.headers.authorization: ',req.headers.authorization);
			validateJwt(req, res, next);
		})
		// Attach user to request
		.use(function (req, res, next) {
			models.main.User.findOne({
				attributes: ['id', 'email'],
				where: {
					id: req.user._id,
					account_type: "A"
				},
				raw: true
			}).then(function (rows) {
				if (!!rows && 'id' in rows) {
					// const refresh_token = signToken(rows.id);
					// req.refresh_token = refresh_token;
					req.user = rows;
					return next();
				} else {
					return res.send(401);
				}
			}, function (err) {
				return res.send(401);
			});
		});
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
	return jwt.sign({
		_id: id
	}, env.secret_key, {
		expiresIn: "24h"
	});
}


export default {
	isAuthenticated: isAuthenticated,
	isAuthenticatedAdmin: isAuthenticatedAdmin,
	signToken: signToken
};