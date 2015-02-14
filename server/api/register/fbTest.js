var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/register/fb';

module.exports = {
    test: function (app) {
        
        apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);

        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "fb@javu.io",
                token: "b5107e2842f7214cd7f7402578",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 401);
        });
        
        /* tests need facebook valid tokens
        // duplicateUsername
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "fb@javu.io",
                token: "b5107e2842f7214cd7f7402578",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 400);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.body.code, "duplicateUsername");
        });
        
        var testRegistrationAccount = 'fb@mc' + new Date().getTime() + '.com'
        // success
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: 'fb@mc' + new Date().getTime() + '.com',
                token: "b5107e2842f7214cd7f7402578",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 200);
            chai.expect(res).to.be.json;
            chai.assert.isNotNull(res.body.auth);
            chai.assert.isNotNull(res.body.userToken);
        });*/
    }
}



