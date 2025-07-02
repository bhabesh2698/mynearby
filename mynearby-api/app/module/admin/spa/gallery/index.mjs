'use strict';

import express from 'express';
const router = express.Router();
import galleryCtrl from './gallery.ctrl.mjs';
import authorization from './../../../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.get('/image-list', authorization.isAuthenticatedAdmin(), galleryCtrl.getList);
router.post('/add-image', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticatedAdmin(), galleryCtrl.addImage);
router.put('/edit-image/:image_id', authorization.isAuthenticatedAdmin(), galleryCtrl.editImage);
router.put('/update-image/:image_id', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticatedAdmin(), galleryCtrl.updateImage);
router.delete('/delete-image/:image_id', authorization.isAuthenticatedAdmin(), galleryCtrl.deleteimage);


export default  router;