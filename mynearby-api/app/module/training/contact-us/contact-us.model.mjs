'use strict';

import models from '../../../../config/sequelize/index.mjs';
import errorHelper from '../../../helpers/error.helper.mjs';
import queryHelper from '../../../helpers/query.helper.mjs';

class ContactUsModel {
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



};

export default new ContactUsModel;