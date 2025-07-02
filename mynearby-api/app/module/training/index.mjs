'use strict';
import express from 'express';
const router = express.Router();

//cms Model
import cms from './cms/index.mjs';
// program Model
import program from './program/index.mjs';
// blog Model
import blog from './blog/index.mjs';
// blog Model
import contactUs from './contact-us/index.mjs';

//Routing
//cms Model
router.use('/cms', cms);
// program Model
router.use('/program', program);
// blog Model
router.use('/blog', blog);
// log Model
router.use('/contact-us', contactUs);


export default router;
