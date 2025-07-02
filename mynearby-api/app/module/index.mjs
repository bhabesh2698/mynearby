'use strict';
import express from 'express';
const router = express.Router();

// auth module
import auth from './auth/index.mjs';
// Admin Model
import admin from './admin/index.mjs';
// spa Model
import spa from './spa/index.mjs';
// training Model
import training from './training/index.mjs';
// blog Model
import common from './common/index.mjs';

//Routing
//auth module
router.use('/auth', auth);
// Admin Model
router.use('/admin', admin);
// spa Model
router.use('/spa', spa);
// training Model
router.use('/training', training);
// log Model
router.use('/common', common);


export default router;
