var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/login/fb';

module.exports = {
    test: function (app) {
        
        apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);

        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "fb@javu.io",
                token: "b5107e2842f7214cd7f7402578"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 401);
        });
             
        /* other tests need facebook valid tokens */
    }
}



