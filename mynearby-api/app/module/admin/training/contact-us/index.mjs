'use strict';

import express from 'express';
const router = express.Router();
import contactUsCtrl from './contact-us.ctrl.mjs';
import authorization from '../../../../libraries/auth.lib.mjs';

router.get('/user-list', authorization.isAuthenticatedAdmin(), contactUsCtrl.getUserList);
router.get('/contact-user-list', authorization.isAuthenticatedAdmin(), contactUsCtrl.getContactUsList);


export default  router;