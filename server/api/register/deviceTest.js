var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/register/device';

module.exports = {
    test: function (app) {

        apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);

        // badPassword
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                id: (Math.random() * 10000000000).toString(),
                type: "android"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 200);
        });
    }
}



