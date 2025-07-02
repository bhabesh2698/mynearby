'use strict';

import express from 'express';
const router = express.Router();
import programCtrl from './program.ctrl.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 

router.get('/all-package-list', programCtrl.getList);


export default  router;