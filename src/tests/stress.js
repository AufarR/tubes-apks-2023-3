import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '5m', target: 2000 },
        { duration: '30m', target: 2000 },
        { duration: '5m', target: 0 },
    ],
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
