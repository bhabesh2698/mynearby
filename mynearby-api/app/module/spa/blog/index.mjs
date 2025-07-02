'use strict';

import express from 'express';
const router = express.Router();
import blogCtrl from './blog.ctrl.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 

router.post('/all-blog-list', blogCtrl.getList);


export default  router;


















