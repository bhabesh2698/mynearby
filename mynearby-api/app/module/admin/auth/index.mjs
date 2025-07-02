'use strict';

import express from 'express';
const router = express.Router();
import authCtrl from './auth.ctrl.mjs';
import authorization from './../../../libraries/auth.lib.mjs';

router.get('/user-list', authorization.isAuthenticatedAdmin(), authCtrl.getUserList);
router.get('/contact-user-list', authorization.isAuthenticatedAdmin(), authCtrl.getContactUsList);


export default  router;