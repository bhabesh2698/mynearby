'use strict';

import models from '../../../config/sequelize/index.mjs';
import errorHelper from './../../helpers/error.helper.mjs';
import queryHelper from './../../helpers/query.helper.mjs';

class authModel {

	/**
	* Consumed By
	*auth/login
	**/
	async loginUser(paramRequest) {
		try {
			let param = paramRequest;
			let query = `
				SELECT 
					U.id, 
					U.first_name, 
					U.last_name,
					U.email, 
					U.account_type	
				FROM 
					mt_users U	
				WHERE 
					U.email = '${param.email}'
				AND
					U.password_hash = sha2(concat(U.salt, '${param.password_hash}' ), 512)
				AND
					U.account_type = '${param.account_type}'
			`;

			let result = await queryHelper(() => {
				return models.main.sequelize.query(query, {
					type: models.main.sequelize.QueryTypes.SELECT,
					//replacements: replacement,
					raw: true
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				// console.log("rows[0]",rows[0].id);
				// console.log("rows[0]",rows.id);
				if (!!rows && !!rows[0] && 'id' in rows[0]) {
					delete rows.password;
					return [null, rows[0]];
				} else {
					return [{ message: 'Invalid email or password.' }, null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};


	/**
	* Consumed By
	* auth/signup
	**/
	async insertUser(paramRequest) {
		try {
			let param = paramRequest;
			let query = `insert into mt_users 
			(uuid,
			first_name, 
			last_name, 
			email, 
			salt,
			password_hash,
			phone,
			account_type)
			values 
			(uuid(),
			:first_name,
			:last_name,
			:email, 
			rand(), 
			sha2(concat(salt, :password_hash),512),
			:phone,
			:account_type)
			on duplicate key update salt = rand(), 
			 password_hash = sha2(concat(salt, :password_hash), 512)`;
			// '${param.native_language}'password_hash

			let replacement = {
				first_name: param.first_name,
				last_name: param.last_name,
				email: param.email,
				phone: param.phone,
				password_hash: param.password_hash,
				account_type: param.account_type
			}

			let result = await queryHelper(() => {
				return models.main.sequelize.query(query, {
					type: models.main.sequelize.QueryTypes.INSERT,
					replacements: replacement,
					raw: true
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				if (!!rows && !!rows[0]) {
					return [null, rows[0]];
				} else {
					return [{ message: 'We can\'t find an account with that email.' }, null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};


	/**
	* Consumed By
	*auth/signup
	**/
	async checkEmail(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.User.findOne({
					attributes: [
						"id",
						"first_name",
						"last_name",
						"email",
						"account_type"
					],
					where: {
						email: param.email
					},
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				if (!!rows && 'id' in rows) {
					return ['This email is already registered with us. Try different email.', null];
				} else {
					return [null, rows];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};



	/**
	* Consumed By
	*auth/signup
	*and
	*auth/validateOtp
	and
	*auth/editProfile
	**/
	async updateUser(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			console.log(paramRequest);
			let result = await queryHelper(() => {
				return models.main.User.update(param,
					{
						where: {
							id: id
						}
					});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				return [null, rows];
			}
		} catch (e) {
			errorHelper(e);
		}
	};


	/**
	* Consumed By
	*auth/signup
	*and
	*auth/validateOtp
	**/
	async fetchUser(paramRequest) {
		try {
			let param = paramRequest;

			let query = `
				SELECT 
					U.id, 
					U.first_name, 
					U.last_name,
					U.email, 
					U.account_type
				FROM 
					mt_users U	
				WHERE 
					U.id = '${param.id}'
			`;

			let result = await queryHelper(() => {
				return models.main.sequelize.query(query, {
					type: models.main.sequelize.QueryTypes.SELECT,
					//replacements: replacement,
					raw: true
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				if (!!rows && !!rows[0] && 'id' in rows[0]) {
					return [null, rows[0]];
				} else {
					return [{ message: 'User not found!' }, null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};



	/**
	* Consumed By
	*auth/validateOtp
	**/
	async validateOtp(paramRequest) {
		try {
			let param = paramRequest || {};

			let result = await queryHelper(() => {
				return models.main.User.findOne({
					attributes: [
						"id",
						"email"
					],
					where: {
						email: param.email,
						otp: param.otp
					},
				});
			}, errorHelper);
			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				if (!!rows && 'email' in rows) {
					return [null, rows];
				} else {
					return ['Invalid OTP!', null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};

	/**
	* Consumed By
	* auth/getUserProfile
	**/

	async viewProfile(paramRequest) {
		try {
			let param = paramRequest || {};

			let result = await queryHelper(() => {
				return models.main.User.findOne({
					attributes: [
						"id",
						"first_name",
						"last_name",
						"email",
						"phone",
						"account_type",
						"updated_at",
						"created_at",
					],
					where: {
						id: param.id
					}

				});
			}, errorHelper);
			// if (result) {
			if (result[0]) {
				return result;
			} else {
				// let rows = result;
				let rows = result[1];
				return [null, rows];
			}
		} catch (e) {
			errorHelper(e);
		}
	};

	/**
	* Consumed By
	* auth/changePassword
	**/
	async checkPassword(paramRequest) {
		try {
			let param = paramRequest || {};

			let query = `
				SELECT 
					U.id, 
					U.first_name, 
					U.last_name,
					U.email, 
					U.account_type
				FROM 
					mt_users U	
				WHERE 
					U.id = '${param.id}'
				AND
					U.password_hash = sha2(concat(U.salt, '${param.old_password}' ), 512)
			`;

			let result = await queryHelper(() => {
				return models.main.sequelize.query(query, {
					type: models.main.sequelize.QueryTypes.SELECT,
					//replacements: replacement,
					raw: true
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				// console.log(rows[0]);
				if (!!rows && !!rows[0] && 'id' in rows[0]) {
					return [null, rows[0]];
				} else {
					return [{ message: 'Invalid email or password.' }, null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};
	/**
		* Consumed By
		* auth/changePassword
		**/
	async changePwd(paramRequest) {
		try {
			let param = paramRequest || {};

			let query = `
				UPDATE 
					mt_users
				SET
					salt = rand(),
					password_hash = sha2(concat(salt, :pwd ), 512)
				WHERE 
					id = :id`;

			let replacement = {
				id: param.id,
				pwd: param.password_hash
			}
			let result = await queryHelper(() => {
				return models.main.sequelize.query(query, {
					type: models.main.sequelize.QueryTypes.UPDATE,
					replacements: replacement,
					raw: true
				});
			}, errorHelper);

			if (result[0]) {
				return result;
			} else {
				let rows = result[1];
				if (!!rows) {
					return [null, rows];
				} else {
					return [{ message: 'change failed' }, null];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};


      /**
  * Consumed By
  * clip-duets/addClipDuet
  **/
      async insertContactUs(paramRequest) {
        try {
            let param = paramRequest || {};
            let result = await queryHelper(() => {
                return models.main.Contact.create(param);
            }, errorHelper);

            if (result[0]) {
                return result;
            } else {
                let rows = result[1];
                return [null, rows];
            }

        } catch (e) {
            console.log(e);
            errorHelper(e);
        }
    };

}

export default new authModel