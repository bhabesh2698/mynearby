'use strict';
import express from 'express';
const router = express.Router();

//cms Model
import cms from './cms/index.mjs';
//programs module
import programs from './programs/index.mjs';
//blog module
import blog from './blog/index.mjs';
//contact-us module
import contactUs from './contact-us/index.mjs';

//Routing
//cms Model
router.use('/cms', cms);
//programs module
router.use('/programs', programs);
//blog module
router.use('/blog', blog);
//contact-us module
router.use('/contact-us', contactUs);


export default router;
