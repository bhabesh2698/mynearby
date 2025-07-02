'use strict';

const commonConfig = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 50071,
    pagination: {
        numPerPage: 100,
        maxSize: 100
    },
    secret_key: '9c77OcL2-9933-78a7-8910-d3R55e27d42b',
    session: null,
    request: {
        limit: '20mb'
    }
};

export default commonConfig;