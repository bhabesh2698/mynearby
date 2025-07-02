'use strict';
import express from 'express';
const router = express.Router();

// auth module
import auth from './auth/index.mjs';
//spa module
import spa from './spa/index.mjs';
//spa module
import training from './training/index.mjs';


//Routing
//auth module
router.use('/auth', auth);
//spa module
router.use('/spa', spa);
//spa module
router.use('/training', training);


export default router;
