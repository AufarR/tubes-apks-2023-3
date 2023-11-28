import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '5m', target: 500 }, // traffic ramp-up from 1 to 500 users over 5 minutes.
        { duration: '4h', target: 500 }, // stay at 500 users for 30 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
      ],
};

module.exports.default = () => {
    const baseUrl = 'http://localhost:'+__ENV.APP_PORT
    mainTest(baseUrl)
}
