'use strict';

import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';

class ContactUsModel {

	/**
	* Consumed By
	* auth/getUserProfile
	**/

	async userList(paramRequest) {
		try {
			let param = paramRequest || {};

			let result = await queryHelper(() => {
				return models.main.User.findAll({
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
						account_type: "U"
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
	*contact-us/getContactUsList
	**/
	async fetchContactUserList(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.SpaContact.findAll({
					attributes: [
						"id",
						"full_name",
						"user_email",
						"message",
						"phone",
						"created_at"
					],
					order: [["id", "DESC"]]
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
}

export default new ContactUsModel