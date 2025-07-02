
import config from './../../config/config.mjs';
import sgMail from '@sendgrid/mail';

export default {
    async sendSimpleEmail(req) {
        try {
            if (!!req.to) {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: req.to,
                    // from: '',
                    subject: req.subject,
                    html: req.body
                };
                // console.log(msg);
                // dev
                // staging
                // production

                if (config._env === 'prod' || config._env === 'staging') {
                    console.log("EMAIL SENT JKKKKKKKKKKKK",msg,process.env.SENDGRID_API_KEY);
                    return sgMail.send(msg)
                        .then(() => {
                            console.log("Then");
                            console.log('Email sent');
                            return [null, true];
                        })
                        .catch((error) => {
                            console.log("Catch");
                            console.error('email err: ', error)
                            return [null, true];
                        });
                } else {
                    return [null, true];
                }
            } else {
                return [null, true];
            }
        } catch (error) {
            console.log(error)
            return [null, error];
        }
    }
}