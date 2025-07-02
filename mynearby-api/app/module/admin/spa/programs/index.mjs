'use strict';

import express from 'express';
const router = express.Router();
import programCtrl from './programs.ctrl.mjs';
import authorization from '../../../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.post('/add-package', authorization.isAuthenticatedAdmin(), programCtrl.addProgram);
router.get('/package-list', authorization.isAuthenticatedAdmin(), programCtrl.getList);
router.put('/edit-package/:package_id', authorization.isAuthenticatedAdmin(), programCtrl.editProgram);
router.put('/is-active/:package_id', authorization.isAuthenticatedAdmin(), programCtrl.activeProgram);
router.put('/package-image/:package_id', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticatedAdmin(), programCtrl.programImage);
router.delete('/delete-package/:package_id', authorization.isAuthenticatedAdmin(), programCtrl.deleteProgram);


export default  router;