'use strict';

import models from '../../../../config/sequelize/index.mjs';
import errorHelper from '../../../helpers/error.helper.mjs';
import queryHelper from '../../../helpers/query.helper.mjs';

class programModel {

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
                    where: {
                        is_active: "Y"
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
        *program/getProgramDetails
        **/
    async fetchProgramDetails(paramRequest) {
        try {
            let param = paramRequest;

            let result = await queryHelper(() => {
                return models.main.Program.findOne({
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
                    where: {
                        is_active: "Y",
                        id: param.id
                    }
                });
            }, errorHelper);
            if (result[0]) {
                return result;
            } else {
                console.log(result,"fgfgfgfgf");
                let rows = result[1];
                return [null, rows];
            }
        } catch (e) {
            errorHelper(e);
        }
    };

}

export default new programModel