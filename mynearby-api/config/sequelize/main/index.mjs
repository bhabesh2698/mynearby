'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from './../../config.mjs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import { createRequire } from "module";
const require = createRequire(import.meta.url);

let Op = Sequelize.Op;
let connection = config.mysql.main;
let sequelize = new Sequelize(connection.database, null, null, {
    replication: connection,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions:
    {
        decimalNumbers: true
    }
});

let db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.mjs");
    })
    .forEach(function (file) {
        let model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.Op = Op;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;