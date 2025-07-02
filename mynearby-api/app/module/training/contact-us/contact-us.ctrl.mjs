'use strict';

// CmsModel
import ContactUsModel from './contact-us.model.mjs';
import errorCodes from '../../../../config/error.mjs';
import ajvvalidate from '../../../helpers/ajvValidator/user/validator.mjs';
import Ajv from "ajv";
import moment from 'moment';
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
const error = ajvErrors(ajv /*, {singleError: true} */);
class ContactUsController {

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

            let contactDta = await ContactUsModel.insertContactUs(reqParams);

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

}

export default new ContactUsController
