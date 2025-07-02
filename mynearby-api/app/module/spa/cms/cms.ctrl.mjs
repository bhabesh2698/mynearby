'use strict';

// CmsModel
import CmsModel from './cms.model.mjs';
import errorCodes from '../../../../config/error.mjs';
import moment from 'moment';

class CmsController {

    /**
   * URL : api/cms/active-list
   * DETAILS : Get active user list  by user
   * METHOD : POST
   * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
   * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", activeUser_list: array}}
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

    async getGalleryImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        try {
            let params = req.body || {};
            let reqData = {};
            let listDta = await CmsModel.fetchGalleryImage(reqData);
            if (listDta[0]) {
                response.error = listDta[0];
                return res.send(response);
            }
            console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
            let args = listDta[1];
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

export default new CmsController
