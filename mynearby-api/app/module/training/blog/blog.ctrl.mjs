'use strict';

//Load model
import blogModel from './blog.model.mjs';
//Load helper
import errorCodes from '../../../../config/error.mjs';
import moment from 'moment';
class blogController {

    async getList(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        try {
            let params = req.body || {};
            let reqData = {
                search_key: params.search_key,
                category: params.category
            };
            let listDta = await blogModel.fetchBlogList(reqData);
            if (listDta[0]) {
                response.error = listDta[0];
                return res.send(response);
            }
            let categoryList = await blogModel.fetchCategoryList(reqData);
            if (categoryList[0]) {
                response.error = categoryList[0];
                return res.send(response);
            }
            let recData = {
                recent: 1
            }
            let recentPostList = await blogModel.fetchBlogList(recData);
            if (recentPostList[0]) {
                response.error = recentPostList[0];
                return res.send(response);
            }
            
            let finalResult = {
                blogList: listDta[1],
                categoryList: categoryList[1],
                recentPostList: recentPostList[1],
            }
            let args = finalResult;
            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };
}

export default new blogController
