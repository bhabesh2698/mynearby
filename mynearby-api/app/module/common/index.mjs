'use strict';

import express from 'express';
const router = express.Router();
import commonCtrl from './common.ctrl.mjs';
import authorization from './../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.put('/ck-image', upload.fields([{name: 'uploadFile', maxCount: 1}]), commonCtrl.uploadCkImage);


export default  router;