'use strict';

import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';

class blogModel {
	/**
	  * Consumed By
	  *blog/addBlog
	  **/
	async insertBlog(paramRequest) {
		try {
			let param = paramRequest || {};
			let result = await queryHelper(() => {
				return models.main.SpaBlog.create(param);
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
		*blog/getList
		**/
	async fetchList(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.SpaBlog.findAll({
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
	*blog/editBlog
	*AND
	*blog/activeBlog
	*AND
	*blog/blogImage
	**/
	async updateBlog(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.SpaBlog.update(param,
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
   *blog/deleteBlog
   **/
	async removeBlog(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.SpaBlog.destroy(
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