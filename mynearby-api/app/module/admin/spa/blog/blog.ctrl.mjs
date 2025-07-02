'use strict';

//Load model
import blogModel from './blog.model.mjs';
import fs from 'fs';
//Load helper
import errorCodes from '../../../../../config/error.mjs';
import config from '../../../../../config/config.mjs';
import uploadHelper from '../../../../helpers/upload.helper.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import moment from 'moment';
let self;

class blogController {
    constructor() {
        self = this;
    }

    /**
        * URL : api/admin/spa/blog/addBlog
        * DETAILS : Admin add blog
        * METHOD : POST
        * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"category":"string","short_url":"string","tittle":"string","description":"string","long_description":"string"}}
        * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", admin_add_blog: object}}
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
    /**
    * URL : api/admin/spa/blog/blog-list
    * DETAILS : Admin get blog list
    * METHOD : GET
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", admin_get_blog_list: array}}
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
    * URL : api/admin/spa/blog/edit-blog
    * DETAILS : admin  edit blog
    * METHOD : PUT
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"blog_id":"integer","category":"string","short_url":"string","tittle":"string  "description":"string","long_description":"string"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_blog: object}}
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
* URL : api/admin/spa/blog/is-active/:blog_id
* DETAILS : admin  active/inactive blogs
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","is_active":"string"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", active/inactive_blog: object}}
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


    /**
    * URL : api/admin/spa/blog/delete-blog/:blog_id
    * DETAILS : admin delete blogs
    * METHOD : DELETE
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"blog_id":"integer"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", delete_blog: object}}
    **/
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
                id: req.params.blog_id
                // id: req.params.id
            };
            let path = 'public/spa-blog-image/' + reqData.id;
            // let deleteFile = await uploadHelper.deleteFile(path);
            // console.log("deleteFile::", deleteFile);

            let deleteProgram = await blogModel.removeBlog(reqData);
            if (deleteProgram[0]) {
                response.error = deleteProgram[0];
                return res.send(response);
            }
            let deleteBlogFolder = await uploadHelper.deleteFolderRecursive(path);
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
* URL : api/admin/spa/blog/delete-blog/:blog_id
* DETAILS : Admin upload blog picture
* METHOD : PUT
* REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"blog_id":"integer","oldUploadFile":"file"}}
* RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", upload_blog_picture: object}}
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
            req.folderName = "spa-blog-image";
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
            let updateBlogPic = await blogModel.updateBlog(uData);

            if (updateBlogPic[0]) {
                response.error = updateBlogPic[0];
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

export default new blogController
