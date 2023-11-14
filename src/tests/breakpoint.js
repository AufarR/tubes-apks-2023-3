const http = require('k6/http');
const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const port = process.env.APP_PORT || 5000;

// belum diatur sesuai jenis test
module.exports.options = {
    vus: 10,
    duration: '30s',
};

// belum diatur sesuai jenis test
module.exports.default = function () {
    http.get('http://localhost:'+port+'/api/users');
};
