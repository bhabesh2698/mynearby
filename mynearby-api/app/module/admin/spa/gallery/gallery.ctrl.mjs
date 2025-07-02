'use strict';

//Load model
import galleryModel from './gallery.model.mjs';
import fs from 'fs';
//Load helper
import errorCodes from '../../../../../config/error.mjs';
import config from '../../../../../config/config.mjs';
import uploadHelper from '../../../../helpers/upload.helper.mjs';
// import sendgrid from './../../helpers/sendgrid.mjs';
import moment from 'moment';
let self;

class galleryController {
    constructor() {
        self = this;
    }

    /**
    * URL : api/admin/spa/gallery/image-list
    * DETAILS : Admin get image list
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
            let listDta = await galleryModel.fetchList(reqData);
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

    /**
        * URL : api/admin/spa/gallery/addBlog
        * DETAILS : Admin add gallery
        * METHOD : POST
        * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"category":"string","short_url":"string","tittle":"string","description":"string","long_description":"string"}}
        * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", admin_add_blog: object}}
        **/
    async addImage(req, res) {
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
                description: params?.description
            };

            let imgDta = await galleryModel.insertGallery(reqData);
            if (imgDta[0]) {
                response.error = imgDta[0];
                return res.send(response);
            }
            console.log("ASfsdf:", imgDta[1]);

            req.folderName = "gallery-image";
            req.id = imgDta[1].id;

            let uploadImage = await uploadHelper.uploadFile(req);
            if (!!uploadImage[0]) {
                response.error = uploadImage[0];
                return res.send(response);
            }

            let uData = {
                id: imgDta[1].id,
                image: uploadImage[1]
            };
            let updateImage = await galleryModel.updateGallery(uData);
            if (updateImage[0]) {
                response.error = updateImage[0];
                return res.send(response);
            }

            let args = updateImage[1];
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
    async editImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        const params = req.body || {};
        try {
            let reqData = {
                id: req.params.image_id,
                tittle: params.tittle,
                description: params.description
            };
            /* const inputString = reqData.description;
            const first20Words = await self.extractFirst20Words(inputString);
            reqData.short_description = first20Words; */

            let uData = await galleryModel.updateGallery(reqData);
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
    * URL : api/admin/spa/blog/delete-blog/:blog_id
    * DETAILS : admin delete blogs
    * METHOD : DELETE
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"blog_id":"integer"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", delete_blog: object}}
    **/
    async deleteimage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        let params = req.body || {};
        try {
            let reqData = {
                id: req.params.image_id
                // id: req.params.id
            };
            let path = 'public/gallery-image/' + reqData.id;
            console.log(path);
            
            // let deleteFile = await uploadHelper.deleteFile(path);
            // console.log("deleteFile::", deleteFile);

            let deleteProgram = await galleryModel.removeGallery(reqData);
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

    async updateImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                id: req.params.image_id,
                oldUploadFile: req?.body?.oldUploadFile
            };
            console.log(reqData);
            // req.id = reqData.id;
            req.folderName = "gallery-image";
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
            let updateBlogPic = await galleryModel.updateGallery(uData);

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

export default new galleryController
