'use strict';

import express from 'express';
const router = express.Router();
import blogCtrl from './blog.ctrl.mjs';
import authorization from '../../../../libraries/auth.lib.mjs';
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/tmp/' });


// Router 
router.post('/add-blog', authorization.isAuthenticatedAdmin(), blogCtrl.addBlog);
router.get('/blog-list', authorization.isAuthenticatedAdmin(), blogCtrl.getList);
router.put('/edit-blog/:blog_id', authorization.isAuthenticatedAdmin(), blogCtrl.editBlog);
router.put('/is-active/:blog_id', authorization.isAuthenticatedAdmin(), blogCtrl.activeBlog);
router.put('/blog-image/:blog_id', upload.fields([{name: 'uploadFile', maxCount: 1}]), authorization.isAuthenticatedAdmin(), blogCtrl.blogImage);
router.delete('/delete-blog/:blog_id', authorization.isAuthenticatedAdmin(), blogCtrl.deleteBlog);


export default  router;