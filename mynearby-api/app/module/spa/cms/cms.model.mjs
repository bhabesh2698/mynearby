'use strict';

import models from '../../../../config/sequelize/index.mjs';
import errorHelper from '../../../helpers/error.helper.mjs';
import queryHelper from '../../../helpers/query.helper.mjs';

class SubscriberModel {
	/**
		* Consumed By
		*auth/login
		**/
	async fetchCMS(paramRequest) {
		try {
			let param = paramRequest;
			let query = `
				SELECT  
					CMS.label, 
					CMS.markdown
				FROM 
                    spa_cms CMS	
				WHERE 
                    CMS.label = '${param.label}'
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
				let rows = result[1]; {
					return [null, rows[0]];
				}
			}
		} catch (e) {
			errorHelper(e);
		}
	};

	async fetchGalleryImage(paramRequest) {
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


};

export default new SubscriberModel;