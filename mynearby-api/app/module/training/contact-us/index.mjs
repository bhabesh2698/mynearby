'use strict';

import express from 'express';
const router = express.Router();
import contactUsCtrl from './contact-us.ctrl.mjs';

// router.post('/active-course-list', cmsCtrl.getActiveCourseList);
router.post('/contact-us', contactUsCtrl.contactUs);

export default  router;
