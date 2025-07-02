import fs from 'fs';
import { promises as fsp } from 'fs';
import objectHelper from './object.helper.mjs';
import config from './../../config/config.mjs';
import Path from 'path';

export default {
    // readFile: function (e) {
    async readFile(req) {
        try {
            let readfile = await fs.readFile(req.path, function (err, data) {
                fs.writeFile(req.newPath, data, function (err) {
                    if (err) {
                        return [err, null];
                    } else {
                        let data = req.fileName;
                        console.log(data);
                        return [null, data];
                    }
                });
            });
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    },

    async uploadFile(req) {
        try {
            let fileExt = '.png';
            let uploadFile = req.files && req.files.uploadFile ? req.files.uploadFile[0] : undefined;
            if (!uploadFile) {
                return ['Invalid request parameters!', null];
            }
            if (uploadFile.originalname) {
                const exnArr = uploadFile.originalname.split('.');
                fileExt = '.' + exnArr[1];
            }

            const dirname = "public/" + req.folderName + "/",
                newPath = dirname + req.id + "/" + uploadFile.filename + fileExt;

            if (!!req.oldUploadFile && !!fs.existsSync(dirname + req.id + '/' + req.oldUploadFile)) {
                objectHelper.deleteFile(dirname + req.id + '/' + req.oldUploadFile);
            }

            //make dir if not exists
            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname);
            }

            //make dir if not exists
            if (!fs.existsSync(dirname + req.id)) {
                fs.mkdirSync(dirname + req.id + '/');
            }
            let readfile = await fsp.readFile(uploadFile.path);

            let writefile = await fsp.writeFile(newPath, readfile);

            let data = uploadFile.filename + fileExt;
            return [null, data];

        } catch (error) {
            console.log(error)
            return [null, error];
        }
    },

    async uploadCkFile(req) {
        // console.log("requestttttttttttttttt::", req);
        try {
            let fileExt = '.png';
            let uploadFile = req.files && req.files.uploadFile ? req.files.uploadFile[0] : undefined;
            if (!uploadFile) {
                return ['Invalid request parameters!', null];
            }
            if (uploadFile.originalname) {
                const exnArr = uploadFile.originalname.split('.');
                fileExt = '.' + exnArr[1];
            }

            const dirname = "public/" + req.folderName + "/",
                newPath = dirname + uploadFile.filename + fileExt;
            const filePath = "public/"
            // console.log("filePath + req.body.oldUploadFile::",filePath + req.body.oldUploadFile);
            // if (!!req.oldUploadFile && !!fs.existsSync(dirname + req.oldUploadFile)) {
            if (!!req.oldUploadFile && !!fs.existsSync(filePath + req.body.oldUploadFile)){
                objectHelper.deleteFile(filePath + req.body.oldUploadFile);
                // objectHelper.deleteFile(dirname + req.oldUploadFile);
            }

            //make dir if not exists
            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname);
            }

            // //make dir if not exists
            // if (!fs.existsSync(dirname )) {
            //     fs.mkdirSync(dirname );
            // }
            let readfile = await fsp.readFile(uploadFile.path);

            let writefile = await fsp.writeFile(newPath, readfile);

            let data = {
                image: uploadFile.filename + fileExt,
                url: config.base_url + req.folderName + "/" + uploadFile.filename + fileExt,
                oldUploadFile: req.folderName + "/" + uploadFile.filename + fileExt
            }
            return [null, data];

        } catch (error) {
            console.log(error)
            return [null, error];
        }
    },

    async deleteFile(path) {
        console.log("path::",path);
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    },

    async deleteFolderRecursive(path) {
        console.log("deleteFolderRecursive path::",path);
        try {
            if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach((file, index) => {
                    const curPath = Path.join(path, file);
                    if (fs.lstatSync(curPath).isDirectory()) { // recurse
                        deleteFolderRecursive(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    }

};
