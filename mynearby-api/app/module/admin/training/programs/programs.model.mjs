'use strict';

import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';

class programModel {
	/**
	  * Consumed By
	  * clip-duets/addClipDuet
	  **/
	async insertProgram(paramRequest) {
		try {
			let param = paramRequest || {};
			let result = await queryHelper(() => {
				return models.main.Program.create(param);
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

	/**
		* Consumed By
		*course/getUserCourseList
		**/
	async fetchList(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.Program.findAll({
					attributes: [
						"id",
						"tittle",
						"description",
						"long_description",
						"image",
						"is_active",
						"updated_at",
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


	/**
	* Consumed By
	*auth/signup
	*and
	*auth/validateOtp
	and
	*programs/editProgram
	**/
	async updateProgram(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Program.update(param,
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
   *course/getUserCourseList
   **/
	async removeProgram(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Program.destroy(
					{
						where: {
							id: id
						}
					}
				);
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

export default new programModel