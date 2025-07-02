'use strict';

import express from 'express';
const router = express.Router();
import cmsCtrl from './cms.ctrl.mjs';
import authorization from '../../../../libraries/auth.lib.mjs';

router.post('/add-cms', authorization.isAuthenticatedAdmin(), cmsCtrl.addCms);
router.get('/get-cms/:label', authorization.isAuthenticatedAdmin(), cmsCtrl.getCMS);
router.get('/get-all-cms', authorization.isAuthenticatedAdmin(), cmsCtrl.getAllCMS);
router.delete('/delete-cms/:cms_id', authorization.isAuthenticatedAdmin(), cmsCtrl.deleteCms);


export default  router;