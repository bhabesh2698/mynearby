'use strict';
import express from 'express';
const router = express.Router();

// auth module
//cms Model
import cms from './cms/index.mjs';
//programs module
import packages from './programs/index.mjs';
//programs module
import blog from './blog/index.mjs';
//contact-us module
import contactUs from './contact-us/index.mjs';
//gallery module
import gallery from './gallery/index.mjs';


//Routing
//cms Model
router.use('/cms', cms);
//programs module
router.use('/package', packages);
//programs module
router.use('/blog', blog);
//contact-us module
router.use('/contact-us', contactUs);
//gallery module
router.use('/gallery', gallery);


export default router;
