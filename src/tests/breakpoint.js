import {mainTest} from './main.js'

module.exports.options = {
    vus: 1,
    duration: '30s'
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
