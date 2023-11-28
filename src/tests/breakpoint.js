import {mainTest} from './main.js'

module.exports.options = {
    vus: 25000,
    duration: '2h'
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
