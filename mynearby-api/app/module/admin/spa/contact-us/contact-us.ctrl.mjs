'use strict';

//Load model
import ContactUsModel from './contact-us.model.mjs';
//Load helper
import errorCodes from '../../../../../config/error.mjs'
import config from '../../../../../config/config.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import ajvvalidate from '../../../../helpers/ajvValidator/admin/validator.mjs';
import Ajv from "ajv";
import moment from 'moment';
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
const error = ajvErrors(ajv /*, {singleError: true} */);

class ContactUsController {

   
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
            let profileData = await ContactUsModel.userList(reqData);
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
    * URL : api/admin/spa/contact-us/contact-user-list
    * DETAILS : Admin get contact user list
    * METHOD : GET
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", contact_user_list: array}}
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
        let contactData = await ContactUsModel.fetchContactUserList(reqData);
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

export default new ContactUsController
