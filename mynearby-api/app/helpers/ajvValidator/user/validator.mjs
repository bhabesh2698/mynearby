export default {
    //User Login Validator
    loginValidator: function (value) {
        value = {
            type: "object",
            properties: {
                email: { type: "string", "minLength": 1, pattern: "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]|[à-ú]|[À-Ú]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" },
                password_hash: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" },
                account_type: { type: "string" }
            },
            required: ["email", "password_hash","account_type"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },

    otpValidator: function (value) {
        value = {
            type: "object",
            properties: {
                email: { type: "string", "minLength": 1, pattern: "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" },
                otp: { type: "number" }
            },
            required: ["email", "otp"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },

    signupValidator: function (value) {
        value = {
            type: "object",
            properties: {
                first_name: { type: "string", "minLength": 2 },
                last_name: { type: "string", "minLength": 2 },
                email: { type: "string", "minLength": 1, pattern: "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]|[à-ú]|[À-Ú]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" },
                password_hash: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" },
                phone: { type: "string" },
                account_type: { type: "string" }
            },
            required: ["first_name", "last_name", "email", "password_hash", "account_type", "phone"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },

    editProfileValidator: function (value) {
        value = {
            type: "object",
            properties: {
                // id: { type: "number" },
                first_name: { type: "string", "minLength": 2 },
                last_name: { type: "string", "minLength": 2 }
                // phone: { type: "string" }
            },
            required: ["first_name", "last_name"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },
    changePwdValidator: function (value) {
        value = {
            type: "object",
            properties: {
                // uuid: { type: "string" },
                new_password: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" },
                old_password: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" }
            },
            required: ["new_password", "old_password"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value
    },

    contactUsValidator: function (value) {
        value = {
            type: "object",
            properties: {
                full_name: { type: "string", "minLength": 2 },
                // user_last_name: { type: "string", "minLength": 2 },
                user_email: { type: "string", "minLength": 1, pattern: "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]|[à-ú]|[À-Ú]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" },
                password_hash: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" },
                phone: { type: "string" },
                message: { type: "string" }
            },
            required: ["full_name", "user_email", "phone","message"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },
};