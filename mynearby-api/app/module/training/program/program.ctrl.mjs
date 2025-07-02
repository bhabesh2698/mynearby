'use strict';

//Load model
import programModel from './program.model.mjs';
//Load helper
import errorCodes from '../../../../config/error.mjs';
import moment from 'moment';
class programController {

    async getList(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        try {
            let params = req.body || {};
            let reqData = {};
            let listDta = await programModel.fetchList(reqData);
            if (listDta[0]) {
                response.error = programDta[0];
                return res.send(response);
            }
            let args = listDta[1];
            response.result = args;
            response.status = true;
            return res.send(response);
        } catch (e) {
            console.log(e);
            response.error = { "message": errorCodes["-32500"] };
            return res.send(response)
        }
    };
    // getProgramDetails 
    async getProgramDetails(req, res) {
        let response = {
            jsonrpc: '2.0',
            result: null,
            status: false,
            error: null
        };
        try {
            let params = req.body || {};
            let reqData = {
                id: req.params.program_id
            };
            let listDta = await programModel.fetchProgramDetails(reqData);
            if (listDta[0]) {
                response.error = programDta[0];
                return res.send(response);
            }
            let args = listDta[1];
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

export default new programController
