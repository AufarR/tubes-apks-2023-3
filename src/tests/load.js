import {mainTest} from './main.js'

module.exports.options = {
    iterations: 1
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
