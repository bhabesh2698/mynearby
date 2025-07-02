'use strict';

import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';

class galleryModel {
	/**
	  * Consumed By
	  *gallery/addGallery
	  **/
	async insertGallery(paramRequest) {
		try {
			let param = paramRequest || {};
			let result = await queryHelper(() => {
				return models.main.Gallery.create(param);
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
		*gallery/getList
		**/
	async fetchList(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.Gallery.findAll({
					attributes: [
						"id",
						"image",
						"tittle",
						"description",
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
	*gallery/editGallery
	*AND
	*gallery/activeGallery
	*AND
	*gallery/blogImage
	**/
	async updateGallery(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Gallery.update(param,
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
   *gallery/deleteGallery
   **/
	async removeGallery(paramRequest) {
		try {
			let param = paramRequest;
			let id = param.id;
			delete param.id;
			let result = await queryHelper(() => {
				return models.main.Gallery.destroy(
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

export default new galleryModel