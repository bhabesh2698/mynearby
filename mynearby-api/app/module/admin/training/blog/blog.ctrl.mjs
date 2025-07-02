'use strict';

//Load model
import blogModel from './blog.model.mjs';
import fs from 'fs';
import { promises as fsp } from 'fs';
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

class blogController {
    constructor() {
        self = this;
    }

    /**
        * URL : api/admin/blog/addBlog
        * DETAILS : user signup
        * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
        * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_signup: array}}
        **/
    async addBlog(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                category: params?.category,
                short_url: params?.short_url,
                tittle: params?.tittle,
                description: params?.description,
                long_description: params?.long_description
            };
           /*  const inputString = reqData.description;
            const first20Words = await self.extractFirst20Words(inputString);
            reqData.short_description = first20Words; */
            let blogDta = await blogModel.insertBlog(reqData);
            if (blogDta[0]) {
                response.error = blogDta[0];
                return res.send(response);
            }
            let args = blogDta[1];
            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };

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
            let listDta = await blogModel.fetchList(reqData);
            if (listDta[0]) {
                response.error = listDta[0];
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
* URL : api/admin/programs/edit-profile
* DETAILS : admin  edit program
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","name":"string","description":"string"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_program: array}}
**/
    async editBlog(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        const params = req.body || {};
        try {
            let reqData = {
                id: req.params.blog_id, 
                category: params.category,
                short_url: params?.short_url,
                tittle: params.tittle,
                description: params.description,
                long_description: params?.long_description,
                updated_at: moment().utc().format("YYYY-MM-DD hh:mm:ss")
            };
            /* const inputString = reqData.description;
            const first20Words = await self.extractFirst20Words(inputString);
            reqData.short_description = first20Words; */

            let uData = await blogModel.updateBlog(reqData);
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
* URL : api/admin/programs/edit-profile
* DETAILS : admin  edit program
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","name":"string","description":"string"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_program: array}}
**/

    async activeBlog(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        const params = req.body || {};
        try {
            let reqData = {
                id: req?.params?.blog_id,
                is_active: params?.is_active,
                updated_at: moment().utc().format("YYYY-MM-DD hh:mm:ss")
            };

            let uData = await blogModel.updateBlog(reqData);

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

    // async deleteFile(path) {
    //     try {
    //         if (fs.existsSync(path)) {
    //             fs.unlinkSync(path);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         return [null, error];
    //     }
    // }

    async deleteBlog(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req.body || {};
        try {
            let reqData = {
                id: req.params.blog_id,
                oldUploadFile: params.oldUploadFile
                // id: req.params.id
            };
            let path = reqData.oldUploadFile;
            let deleteFile = await uploadHelper.deleteFile(path);
            console.log("deleteFile::", deleteFile);

            // let deleteFolder = await uploadHelper.deleteFile(path);
            let deleteProgram = await blogModel.removeBlog(reqData);
            if (deleteProgram[0]) {
                response.error = deleteProgram[0];
                return res.send(response);
            }
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
 * URL : api/admin/blog/blogImage
 * DETAILS : User upload program picture
 * METHOD : PUT
 * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","oldUploadFile":"file"}}
 * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", upload_profile_picture: object}}
 **/


       async blogImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                id: req.params.blog_id,
                oldUploadFile: req?.body?.oldUploadFile
            };
            console.log(reqData);
            // req.id = reqData.id;
            req.folderName = "blog-image";
            req.oldUploadFile = reqData.oldUploadFile;
            req.id = reqData.id;

            let uploadImage = await uploadHelper.uploadFile(req);

            if (!!uploadImage[0]) {
                response.error = uploadImage[0];
                return res.send(response);
            }
            console.log("uploadImage::",uploadImage);
             let uData = {
                 id: reqData?.id,
                 image: uploadImage[1]
             };
             let updateBlogPic = await blogModel.updateBlog(uData);
 
             if (updateBlogPic[0]) {
                 response.error = updateBlogPic[0];
                 return res.send(response);
             }
            console.log("imagar:::", updateBlogPic[1]);
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

export default new blogController
