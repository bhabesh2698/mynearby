'use strict';
import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';

class blogModel {
	/**
	  * Consumed By
	  * clip-duets/addClipDuet
	  **/
	async insertBlog(paramRequest) {
		try {
			let param = paramRequest || {};
			let result = await queryHelper(() => {
				return models.main.Blog.create(param);
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
				return models.main.Blog.findAll({
					attributes: [
						"id",
						"category",
						"short_url",
						"tittle",
						"description",
						"long_description",
						"image",
						"is_active",
						"updated_at",
						"created_at"
					],
					order: [['id', 'DESC']]
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
	async updateBlog(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Blog.update(param,
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
	async removeBlog(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Blog.destroy(
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

export default new blogModel