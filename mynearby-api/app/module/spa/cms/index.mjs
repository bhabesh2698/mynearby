'use strict';

import express from 'express';
const router = express.Router();
import cmsCtrl from './cms.ctrl.mjs';

// router.post('/active-course-list', cmsCtrl.getActiveCourseList);
router.get('/get-cms/:label', cmsCtrl.getCMS);
router.get('/gallery-image', cmsCtrl.getGalleryImage);

export default  router;
