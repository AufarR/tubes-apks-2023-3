import http from 'k6/http';
import { check } from 'k6';

module.exports.options = {
    iterations: 1
};

module.exports.default = function () {
    let res = http.get(`http://localhost:5001/health`);
    check(res, {
        'API server health is OK': (r) => r.json()["API Server"] === "OK"
    })
};
