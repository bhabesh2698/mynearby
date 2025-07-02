import { } from 'dotenv/config'
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const configuation = {
	development: {
		root: rootPath,
		_env: 'dev',
		app: {
			name: 'node-api'
		},
		port: process.env.PORT || 3008,
		base_url: "http://localhost:3008/",
		allow_origin_url: ["http://localhost:4200"],
		mysql: {
			"main": {
				"read": {
					"host": process.env.main_read_host,
					"port": process.env.main_read_port,
					"username": process.env.main_read_username,
					"password": process.env.main_read_password
				},
				"write": {
					"host": process.env.main_write_host,
					"port": process.env.main_write_port,
					"username": process.env.main_write_username,
					"password": process.env.main_write_password
				},
				"database": process.env.main_database
			}
		},
		logging: console.log
	},

	production: {
		root: rootPath,
		_env: 'prod',
		app: {
			name: 'node-api'
		},
		port: process.env.PORT || 1337,
		base_url: "https://mt-api.mantrayawellness.com/",
		allow_origin_url: ['https://mantrayawellness.com'],
		mysql: {
			"main": {
				"read": {
					"host": process.env.main_read_host,
					"port": process.env.main_read_port,
					"username": process.env.main_read_username,
					"password": process.env.main_read_password
				},
				"write": {
					"host": process.env.main_write_host,
					"port": process.env.main_write_port,
					"username": process.env.main_write_username,
					"password": process.env.main_write_password
				},
				"database": process.env.main_database
			}
		},
		logging: console.log
	},

	staging: {
		root: rootPath,
		_env: 'stag',
		app: {
			name: 'node-api'
		},
		port: process.env.PORT || 1337,
		base_url: "",
		allow_origin_url: ['https://softtechfire.com'],
		mysql: {
			"main": {
				"read": {
					"host": process.env.main_read_host,
					"port": process.env.main_read_port,
					"username": process.env.main_read_username,
					"password": process.env.main_read_password
				},
				"write": {
					"host": process.env.main_write_host,
					"port": process.env.main_write_port,
					"username": process.env.main_write_username,
					"password": process.env.main_write_password
				},
				"database": process.env.main_database
			}
		},
		logging: console.log
	},
}

export default configuation[env];
