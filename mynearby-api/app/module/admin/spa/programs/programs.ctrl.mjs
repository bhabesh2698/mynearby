'use strict';

//Load model
import programModel from './programs.model.mjs';
import fs from 'fs';
//Load helper
import errorCodes from '../../../../../config/error.mjs';
import config from '../../../../../config/config.mjs';
import uploadHelper from '../../../../helpers/upload.helper.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import Ajv from "ajv";
import moment from 'moment';
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
const error = ajvErrors(ajv /*, {singleError: true} */);
let self;
class programController {
    constructor() {
        self = this;
    }

   /*  async extractFirst20Words(str) {

        // Split the string into an array of words
        // console.log("str1::", str);
        try {
            console.log(str);
            const words = str.split(/\s+/);

            // Select the first 20 words (or less if the string has fewer than 20 words)
            const first20Words = words.slice(0, 250);

            // Join the first 20 words back into a string
            const result = first20Words.join(' ');
            return result;
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    } */


    /**
        * URL : api/admin/spa/package/add-package
        * DETAILS : Admin add package
        * METHOD : POST
        * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"tittle":"string","description":"string","long_description":"string"}}
        * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", add_package: array}}
        **/
    async addProgram(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                tittle: params?.tittle,
                description: params?.description,
                long_description: params?.long_description
            };
           /*  const inputString = reqData.description;
            const first20Words = await self.extractFirst20Words(inputString);
            reqData.short_description = first20Words; */
            let programDta = await programModel.insertProgram(reqData);
            if (programDta[0]) {
                response.error = programDta[0];
                return res.send(response);
            }
            let args = programDta[1];
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
  * URL : api/admin/spa/package/package-list
  * DETAILS : Admin get package list
  * METHOD : GET
  * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
  * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", package_list: array}}
  **/
    async getList(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        try {
            let params = req.body || {};
            let reqData = {};
            let listDta = await programModel.fetchList(reqData);
            if (listDta[0]) {
                response.error = programDta[0];
                return res.send(response);
            }
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
    /**
* URL : api/admin/spa/package/edit-package/:package_id
* DETAILS : admin  edit package
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"package_id":"integer","tittle":"string","description":"string","long_description":"string"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_package: object}}
**/
    async editProgram(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        const params = req.body || {};
        try {
            let reqData = {
                id: req.params.package_id,
                tittle: params.tittle,
                description: params.description,
                long_description: params?.long_description,
                updated_at: moment().utc().format("YYYY-MM-DD hh:mm:ss")
            };
            /* const inputString = reqData.description;
            const first20Words = await self.extractFirst20Words(inputString);
            reqData.short_description = first20Words; */

            let uData = await programModel.updateProgram(reqData);
            if (!!uData[0]) {
                response.error = uData[0];
                return res.send(response);
            }

            let args = uData[1];
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
* URL : api/admin/spa/package/edit-profile
* DETAILS : admin  edit program
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","name":"string","description":"string"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_program: array}}
**/
    async activeProgram(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        const params = req.body || {};
        try {
            let reqData = {
                id: req?.params?.package_id,
                is_active: params?.is_active,
                updated_at: moment().utc().format("YYYY-MM-DD hh:mm:ss")
            };

            let uData = await programModel.updateProgram(reqData);

            if (!!uData[0]) {
                response.error = uData[0];
                return res.send(response);
            }

            let args = uData[1];
            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };

    async deleteFile(path) {
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    }

    async deleteProgram(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req.body || {};
        try {
            let reqData = {
                id: req.params.package_id,
                oldUploadFile: params.oldUploadFile
                // id: req.params.id
            };
            let path = 'public/spa-package-image/' + reqData.id;
            // let deleteFile = await uploadHelper.deleteFile(path);
            // console.log("deleteFile::", deleteFile);
            let deleteProgram = await programModel.removeProgram(reqData);
            if (deleteProgram[0]) {
                response.error = deleteProgram[0];
                return res.send(response);
            }
            let deleteFolder = await uploadHelper.deleteFolderRecursive(path);
            let args = deleteProgram[1];
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
 * URL : api/admin/spa/program/programImage
 * DETAILS : User upload program picture
 * METHOD : PUT
 * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","oldUploadFile":"file"}}
 * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", upload_profile_picture: object}}
 **/
       async programImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                id: req.params.package_id,
                oldUploadFile: req?.body?.oldUploadFile
            };
            console.log(reqData);
            // req.id = reqData.id;
            req.folderName = "spa-package-image";
            req.oldUploadFile = reqData.oldUploadFile;
            req.id = reqData.id;

            let uploadImage = await uploadHelper.uploadFile(req);

            if (!!uploadImage[0]) {
                response.error = uploadImage[0];
                return res.send(response);
            }
             let uData = {
                 id: reqData?.id,
                 image: uploadImage[1]
             };
             let updateProgramPic = await programModel.updateProgram(uData);
 
             if (updateProgramPic[0]) {
                 response.error = updateProgramPic[0];
                 return res.send(response);
             }
            let args = uploadImage[1];
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

export default new programController
