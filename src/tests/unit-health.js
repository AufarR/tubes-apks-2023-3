const http = require('k6/http');

// belum diatur sesuai jenis test
module.exports.options = {
    vus: 2,
    duration: '10s',
};

// belum diatur sesuai jenis test
module.exports.default = function () {
    http.get(`http://localhost:${__ENV.APP_PORT}/health`);
};
