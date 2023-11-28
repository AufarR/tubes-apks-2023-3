import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '2m', target: 5000 },
        { duration: '1m', target: 0 },
    ],
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
