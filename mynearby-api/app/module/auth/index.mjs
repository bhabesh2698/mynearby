'use strict';

import express from 'express';
const router = express.Router();
import authCtrl from './auth.ctrl.mjs';
import authorization from './../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.post('/login', authCtrl.login);
router.post('/signup', authCtrl.signup);
// router.post('/signup', authCtrl.signup);
router.post('/change-password', authorization.isAuthenticated(), authCtrl.changePassword);
router.post('/contact-us', authCtrl.contactUs);
router.put('/edit-profile', authorization.isAuthenticated(), authCtrl.editProfile);
router.put('/profile-pic', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticated(), authCtrl.uploadUserProfilePic);
router.get('/my-profile', authorization.isAuthenticated(), authCtrl.getUserProfile);


export default  router;