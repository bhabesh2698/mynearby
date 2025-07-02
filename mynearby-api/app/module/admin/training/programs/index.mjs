'use strict';

import express from 'express';
const router = express.Router();
import programCtrl from './programs.ctrl.mjs';
import authorization from '../../../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.post('/add-program', authorization.isAuthenticatedAdmin(), programCtrl.addProgram);
router.get('/program-list', authorization.isAuthenticatedAdmin(), programCtrl.getList);
router.put('/edit-program/:program_id', authorization.isAuthenticatedAdmin(), programCtrl.editProgram);
router.put('/is-active/:program_id', authorization.isAuthenticatedAdmin(), programCtrl.activeProgram);
router.put('/program-image/:program_id', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticatedAdmin(), programCtrl.programImage);
router.delete('/delete-program/:program_id', authorization.isAuthenticatedAdmin(), programCtrl.deleteProgram);


export default  router;