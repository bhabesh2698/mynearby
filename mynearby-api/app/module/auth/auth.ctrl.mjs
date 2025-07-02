'use strict';

//Load model
import AuthModel from './auth.model.mjs';
//Load helper
import errorCodes from '../../../config/error.mjs'
import authorization from '../../libraries/auth.lib.mjs';
import config from '../../../config/config.mjs';
import sendgrid from './../../helpers/sendgrid.mjs';
import ajvvalidate from '../../helpers/ajvValidator/user/validator.mjs';
import uploadHelper from '../../helpers/upload.helper.mjs';
import Ajv from "ajv";
import moment from 'moment';
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
const error = ajvErrors(ajv /*, {singleError: true} */);

class authController {

    /**
    * URL : api/auth/login
    * DETAILS : user login
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"email":"string","password_hash":"string"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_logn: array}}
    **/
    async login(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let validUser = await ajv.compile(ajvvalidate.loginValidator(true));
            let validData = await validUser(params);
            if (!validData) {
                response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                return res.send(response);
            }

            const reqParams = {
                email: params.email,
                password_hash: params.password_hash,
                account_type: params.account_type
            };
            let loginUser = await AuthModel.loginUser(reqParams);
            if (loginUser[0]) {
                response.error = loginUser[0];
                return res.send(response);
            }
            let args = loginUser[1];

            const token = await authorization.signToken(args.id);
            args.token = token;

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
    * URL : api/auth/signup
    * DETAILS : user signup
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", user_signup: array}}
    **/
    async signup(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let validUser = await ajv.compile(ajvvalidate.signupValidator(true));
            let validData = await validUser(params);
            if (!validData) {
                response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                return res.send(response);
            }

            const reqParams = {
                first_name: params.first_name,
                last_name: params.last_name,
                email: params.email,
                password_hash: params.password_hash,
                phone: params.phone,
                account_type: params.account_type
            };

            let checkEmail = await AuthModel.checkEmail(reqParams);

            if (checkEmail[0]) {
                response.error = checkEmail[0];
                return res.send(response);
            }

            let signUpUser = await AuthModel.insertUser(reqParams);

            if (signUpUser[0]) {
                response.error = signUpUser[0];
                return res.send(response);
            }
            let signData = signUpUser[1];
            let reData = {
                id: signData
            }
            let userData = await AuthModel.fetchUser(reData);
            if (userData[0]) {
                response.error = userData[0];
                return res.send(response);
            }

            let args = userData[1];

            // if(!!args && !!args.account_type && args.account_type === 'teacher' && !!args.is_activated && args.is_activated === 'N'){
            //     response.error = 'Your profile is not approved yet!';
            //     return res.send(response);
            // }

            // const token = await authorization.signToken(args.id);
            // args.token = token;

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
    * URL : api/auth/validate-otp
    * DETAILS : user signup otp 
    * METHOD : POST
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"email":"string","otp":"string"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", signup_otp: array}}
    **/
    /*  async validateOtp(req, res) {
         let response = {
             jsonrpc: '2.0',
             result: null,
             status: false,
             error: null
         };
 
         try {
             let params = req.body || {};
             let validUser = await ajv.compile(ajvvalidate.otpValidator(true));
             let validData = await validUser(params);
             if (!validData) {
                 response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                 return res.send(response);
             }
 
             const reqParams = {
                 email: params.email,
                 otp: params.otp
             };
 
             let validOtp = await AuthModel.validateOtp(reqParams);
 
             if (validOtp[0]) {
                 response.error = validOtp[0];
                 return res.send(response);
             }
             
             let validuser = {
                 id: validOtp[1].id,
                 is_activated: "Y",
                 otp: null
             }
 
             let updateOtp = await AuthModel.updateUser(validuser);
             if (updateOtp[0]) {
                 response.error = updateOtp[0];
                 return res.send(response);
             }
 
             let reData = {
                 id: validOtp[1].id
             }
             let userData = await AuthModel.fetchUser(reData);
             if (userData[0]) {
                 response.error = userData[0];
                 return res.send(response);
             }
 
             let args = userData[1];
 
             const token = await authorization.signToken(args.id);
             args.token = token;
 
             response.result = args;
             response.status = true;
             return res.send(response);
         } catch (e) {
             console.log(e);
             response.error = { "message": errorCodes["-32500"] };
             return res.send(response)
         }
     }; */

    /**
 * URL : api/auth/edit-profile
 * DETAILS : user  edit profile
 * METHOD : PUT
 * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","first_name":"string","last_name":"string"}}
 * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", edit_profile: array}}
 **/
      async editProfile(req, res) {
         let response = {
             jsonrpc: '2.0',
             result: null,
             status: false,
             error: null
         };
         const params = req.body || {};
         // console.log("params::",params);
         let validUser = await ajv.compile(ajvvalidate.editProfileValidator(true));
             let validData = await validUser(params);
             if (!validData) {
                 response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                 return res.send(response);
             }
         try {
             let reqData = {
                 id: req?.user?.id,
                 first_name: params.first_name,
                 last_name: params.last_name,
                //  phone: params.phone,
                 updated_at: moment().utc().format("YYYY-MM-DD hh:mm:ss")
             };
 
             let profileData = await AuthModel.updateUser(reqData);
 
             if (!!profileData[0]) {
                 response.error = profileData[0];
                 return res.send(response);
             }
 
             let args = profileData[1];
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

    /* async getUserProfile(req, res) {
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
            let profileData = await AuthModel.viewProfile(reqData);
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
    }; */

    /**
    * URL : api/auth/change-password
    * DETAILS : user change password
    * METHOD : POST
    * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{id":"string",password_hash":"string","new_password":"string"}}
    * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", change_password: object}}
    **/
    async changePassword(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req?.body || {};
            let validUser = await ajv.compile(ajvvalidate.changePwdValidator(true));
            let validData = await validUser(params);
            if (!validData) {
                response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                return res.send(response);
            }
            const reqParams = {
                id: req?.user?.id,
                password_hash: params?.new_password,
                old_password: params?.old_password
            };

            let checkPwd = await AuthModel.checkPassword(reqParams);

            if (checkPwd[0]) {
                response.error = { message: "Password not matched!!!" };
                return res.send(response);
            }
            let pwdUpdate = await AuthModel.changePwd(reqParams);
            // console.log("pwdUpdate::", pwdUpdate);
            if (pwdUpdate[0]) {
                response.error = checkPwd[0];
                return res.send(response);
            }
            let args = pwdUpdate[1];

            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };

    async contactUs(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let params = req.body || {};
            let validUser = await ajv.compile(ajvvalidate.contactUsValidator(true));
            let validData = await validUser(params);
            if (!validData) {
                response.error = "Invalid: " + ajv.errorsText(validUser.errors);
                return res.send(response);
            }

            const reqParams = {
                // user_id: req?.user?.id,
                full_name: params.full_name,
                user_email: params.user_email,
                phone: params.phone,
                message: params.message
            };
            console.log("reqParams::", reqParams);

            let contactDta = await AuthModel.insertContactUs(reqParams);

            if (contactDta[0]) {
                response.error = contactDta[0];
                return res.send(response);
            }
           /*  const msg = {
                to: "pradip@softtechfire.com",
                subject: 'Contact Us',
                //Add two new variable subject,user_type
                body: `<strong>Name: ${reqParams.full_name} <br> Email: ${reqParams.user_email} <br> Phone: ${reqParams.phone} <br> Message: ${reqParams.message}</strong>`,
            };
            let sendEmail = await sendgrid.sendSimpleEmail(msg);
            if (!!sendEmail[0]) {
                response.error = sendEmail[0];
                return res.send(response);
            }
            console.log("sendEmail::", sendEmail[1]); */

            let args = contactDta[1];
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
  * URL : api/auth/profile-pic
  * DETAILS : User upload profile picture
  * METHOD : POST
  * REQ : {"jsonrpc":2,"ver":1,"platform":"web","params":{"id":"integer","oldUploadFile":"file"}}
  * RES : {"ver":"1.0","jsonrpc":"1.0","result":{"status": boolean, "message": "string", upload_profile_picture: object}}
  **/
     async uploadUserProfilePic(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };

        try {
            let reqData = {
                id: req?.user?.id,
                oldUploadFile: req?.body?.oldUploadFile
            };
            console.log(reqData);
            req.id = reqData.id;
            req.folderName = "user-image";
            req.oldUploadFile = reqData.oldUploadFile;

            let uploadIcon = await uploadHelper.uploadFile(req);

            if (!!uploadIcon[0]) {
                response.error = uploadIcon[0];
                return res.send(response);
            }
            let uData = {
                id: reqData?.id,
                image: uploadIcon[1]
            };
            let updateUserProPic = await AuthModel.updateUser(uData);

            if (updateUserProPic[0]) {
                response.error = updateUserProPic[0];
                return res.send(response);
            }

            //let args = updateSponsorData[1];
            response.result = updateUserProPic[1];
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

    async getUserProfile(req, res) {
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
            let profileData = await AuthModel.viewProfile(reqData);
            if (!!profileData[0]) {
                response.error = profileData[0];
                return res.send(response);
            }
            let profileList = profileData[1];

            // const token = await authorization.signToken(profileList.id);
            // profileList.token = token;

            response.result = profileList;
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
