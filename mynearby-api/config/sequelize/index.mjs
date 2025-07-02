'use strict';

import Sequelize from 'sequelize';
import underscore from 'underscore';
import mainDB from './main/index.mjs';

let databases = {};

if (underscore.isEmpty(databases)) {
    // For main DB
    databases.main = mainDB;

    databases.Sequelize = Sequelize;
}


// module.exports = databases;
export default databases;