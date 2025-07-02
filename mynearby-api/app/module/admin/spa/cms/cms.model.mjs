'use strict';

// import cmsModel from "../../cms/cms.model.mjs";

import models from '../../../../../config/sequelize/index.mjs';
import errorHelper from '../../../../helpers/error.helper.mjs';
import queryHelper from '../../../../helpers/query.helper.mjs';
class cmsModel {

	/**
* Consumed By
* scripted-dialogue/addScriptdialogue
**/
	async insertCms(paramRequest) {
		try {
			let param = paramRequest || {};
			// console.log("param",param);
			// let conArr = Array.from(param);
			// console.log("conArr", conArr, Array.isArray(conArr));
			let data = [];
			data.push(param);
			let result = await queryHelper(() => {
				return models.main.SpaCms.bulkCreate(data, {
					updateOnDuplicate: ["markdown"]
				});
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
	*auth/login
	**/
	async fetchCMS(paramRequest) {
		try {
			let param = paramRequest;
			let query = `
				SELECT  
					CMS.label, 
					CMS.markdown,
					CMS.updated_at, 
					CMS.created_at	
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


	/**
	* Consumed By
	*course/getUserCourseList
	**/
	async fetchAllCMS(paramRequest) {
		try {
			let param = paramRequest;

			let result = await queryHelper(() => {
				return models.main.SpaCms.findAll({
					attributes: [
						"id",
						"label",
						"markdown",
						"updated_at",
						"created_at"
					]
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
	async removeCms(paramRequest) {
		try {
			let param = paramRequest;
			console.log("param::", param);
			let result = await queryHelper(() => {
				return models.main.SpaCms.destroy(
					{
						where: {
							id: param.id
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

export default new cmsModel
