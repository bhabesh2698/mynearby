'use strict';

//Load model
import CommonModel from './common.model.mjs';
//Load helper
import errorCodes from '../../../config/error.mjs'
import authorization from '../../libraries/auth.lib.mjs';
import config from '../../../config/config.mjs';
import uploadHelper from '../../helpers/upload.helper.mjs';

class CommonController {

/**
 * URL : api/common/program/programImage
 * DETAILS : User upload program picture
 * METHOD : PUT
 * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","oldUploadFile":"file"}}
 * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", upload_profile_picture: object}}
 **/
      async uploadCkImage(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let reqData = {
                id: params.program_id,
                oldUploadFile: req?.body?.oldUploadFile
            };
            console.log(reqData);
            // req.id = reqData.id;
            req.folderName = "program-ck-image";
            req.oldUploadFile = reqData.oldUploadFile;

            let uploadImage = await uploadHelper.uploadCkFile(req);

            if (!!uploadImage[0]) {
                response.error = uploadImage[0];
                return res.send(response);
            }
            /*  let uData = {
                 id: reqData?.id,
                 image: uploadImage[1]
             }; */
            /*  let updateProgramPic = await programModel.updateProgram(uData);
 
             if (updateProgramPic[0]) {
                 response.error = updateProgramPic[0];
                 return res.send(response);
             } */
            console.log("imagar:::", uploadImage[1]);
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

export default new CommonController
