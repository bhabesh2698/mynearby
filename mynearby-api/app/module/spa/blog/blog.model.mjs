'use strict';

import models from '../../../../config/sequelize/index.mjs';
import errorHelper from '../../../helpers/error.helper.mjs';
import queryHelper from '../../../helpers/query.helper.mjs';

class blogModel {

    /**
        * Consumed By
        *course/getUserCourseList
        **/
    async fetchList(paramRequest) {
        try {
            let param = paramRequest;

            let result = await queryHelper(() => {
                return models.main.SpaBlog.findAll({
                    attributes: [
                        "id",
                        "category",
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

    async fetchBlogList(paramRequest) {
        try {
            let param = paramRequest;
            let query = `
            SELECT
                B.id,
                B.category,
                B.tittle,
                B.description,
                B.long_description,
                B.image,
                B.short_url,
                B.is_active,
                B.updated_at,
                B.created_at
            FROM
                spa_blog B
			WHERE 
                B.is_active = 'Y'`;

            if (!!param.category) {
                query += ` AND
                        B.category = '${param.category}'
                    `;
            }

            if (!!param.search_key) {
                query += ` AND
                    (B.tittle LIKE '%${param.search_key}%')
                `;
            }
            query += ` ORDER BY B.id DESC`;

            if (!!param.recent === 1) {
                query += ` LIMIT 10`;
            }
            // query += ` AND
            //         (B.tittle LIKE '%${param.search_key}%'
            //         OR B.category LIKE '%${param.search_key}%'
            //         OR B.description LIKE '%${param.search_key}%')
            //     `;

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
                    return [null, rows];
                }
            }
        } catch (e) {
            errorHelper(e);
        }
    };

    async fetchCategoryList(paramRequest) {
        try {
            let param = paramRequest;
            let query = `
            SELECT
                B.category
            FROM
                spa_blog B
			WHERE 
                B.is_active = 'Y'
            AND 
                B.category IS NOT NULL
            GROUP BY B.category`;

            // query += ` AND
            //         (B.tittle LIKE '%${param.search_key}%'
            //         OR B.category LIKE '%${param.search_key}%'
            //         OR B.description LIKE '%${param.search_key}%')
            //     `;

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
                    return [null, rows];
                }
            }
        } catch (e) {
            errorHelper(e);
        }
    };

}

export default new blogModel