'use strict';
import express from 'express';
const router = express.Router();

//cms Model
import cms from './cms/index.mjs';
// package Model
import program from './program/index.mjs';
// blog Model
import blog from './blog/index.mjs';
// contact-us Model
import contactUs from './contact-us/index.mjs';


//Routing
//cms Model
router.use('/cms', cms);
// package Model
router.use('/package', program);
// blog Model
router.use('/blog', blog);
// blog Model
router.use('/contact-us', contactUs);



export default router;
