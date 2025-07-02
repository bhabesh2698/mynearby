'use strict';

//Load model
import AuthModel from './auth.model.mjs';
//Load helper
import errorCodes from '../../../../config/error.mjs'
import authorization from '../../../libraries/auth.lib.mjs';
import config from '../../../../config/config.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import ajvvalidate from '../../../helpers/ajvValidator/admin/validator.mjs';
import Ajv from "ajv";
import moment from 'moment';
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
const error = ajvErrors(ajv /*, {singleError: true} */);

class authController {

   
    /**
    * URL : api/auth/me
    * DETAILS : user view profile
    * METHOD : GET
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_profile: object}}
    **/

    async getUserList(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let reqData = {
                id: req?.user?.id
            };
            let profileData = await AuthModel.userList(reqData);
            if (!!profileData[0]) {
                response.error = profileData[0];
                return res.send(response);
            }
            let profileList = profileData[1];
            response.result = profileList;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    }; 
/**
    * URL : api/auth/me
    * DETAILS : user view profile
    * METHOD : GET
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_profile: object}}
    **/

async getContactUsList(req, res) {
    let response = {
        jsonrpc: '2.0',
        result: null,
        status: false,
        error: null
    };

    try {
        let reqData = {
            id: req?.user?.id
        };
        let contactData = await AuthModel.fetchContactUserList(reqData);
        if (!!contactData[0]) {
            response.error = contactData[0];
            return res.send(response);
        }
        let contactList = contactData[1];
        response.result = contactList;
        response.status = true;
        return res.send(response);
    } catch (e) {
        console.log(e);
        response.error = { "message": errorCodes["-32500"] };
        return res.send(response)
    }
}; 

    
}

export default new authController
