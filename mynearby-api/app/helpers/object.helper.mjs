'use strict';

import moment from 'moment';
// import sentry from '@sentry/node';
import fs from 'fs';

export default {
    captureException: function (e) {
        // if (typeof e === 'string') {
        //     sentry.captureMessage(e);
        // } else {
        //     sentry.captureException(e);
        // }
    },
    now: function (timestamp) {
        try {
            timestamp = timestamp || false;
            if (timestamp)
                return moment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            //return moment.utc().format('YYYY-MM-DD HH:mm:ss');
            else
                return moment.utc().unix();
        } catch (e) {
            console.log(e);
        }
    },
    escapeString: function (val) {
        val = val || '';
        val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
            switch (s) {
                case "\0":
                    return "\\0";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\b":
                    return "\\b";
                case "\t":
                    return "\\t";
                case "\x1a":
                    return "\\Z";
                case "'":
                    return "''";
                case '"':
                    return '""';
                default:
                    return "\\" + s;
            }
        });

        return val;
    },
    round: function (num) {
        return +(Math.round(num + "e+2") + "e-2");
    },
    unique: function (arr, prop) {
        return arr.map(function (e) { return e[prop]; }).filter(function (e, i, a) {
            return i === a.indexOf(e);
        });
    },
    isNull: function (array) {
        return array.join().replace(/,/g, '').length === 0;
    },
    sortByKey: function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },
    deleteFile: function (path) {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    }
};