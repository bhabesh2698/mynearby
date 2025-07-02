'use strict';

//Load model
import CmsModel from './cms.model.mjs';
//Load helper
import errorCodes from '../../../../../config/error.mjs';
// import authorization from '../../../libraries/auth.lib.mjs';
import config from '../../../../../config/config.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import moment from 'moment';

class cmsController {


    /**
    * URL : api/admin/spa/cms/add-cms
    * DETAILS : user signup
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_signup: array}}
    **/
    async addCms(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            const reqParams = {
                label: params.label,
                markdown: params.markdown
            };
            let cmsDta = await CmsModel.insertCms(reqParams);

            if (cmsDta[0]) {
                response.error = cmsDta[0];
                return res.send(response);
            }
        
            let args = cmsDta[1];
            response.result = args;
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
    async getCMS(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req?.body || {};
        
        try {
            let reqData = {
                label: req.params.label
            };
            console.log(reqData);
            let pageData = await CmsModel.fetchCMS(reqData);
            if (!!pageData[0]) {
                response.error = pageData[0];
                return res.send(response);
            }
            let pageDta = pageData[1];

            response.result = pageDta;
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
    async getAllCMS(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req?.body || {};
        
        try {
            let reqData = { };
            console.log(reqData);
            let cmsData = await CmsModel.fetchAllCMS(reqData);
            if (!!cmsData[0]) {
                response.error = cmsData[0];
                return res.send(response);
            }
            let cmsDta = cmsData[1];

            response.result = cmsDta;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };


    async deleteCms(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req.body || {};
        try {
            let reqData = {
                id: req.params.cms_id
                // id: req.params.id
            };
    
            let deleteCms = await CmsModel.removeCms(reqData);
    
            if (deleteCms[0]) {
                response.error = deleteCms[0];
                return res.send(response);
            }
    
            let args = deleteCms[1];
            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };



}

export default new cmsController
