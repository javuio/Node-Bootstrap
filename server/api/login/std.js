var cryptUtils =  require('../../utils/cryptUtils.js');
var errorResponse = require('mError/errorResponse.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/login/std', './login/stdTest.js');
    handler.secure = false;
    
    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.password;
    };

    handler.securityCheck = function (req, res) {
        return true;
    };

    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {

            users.getUser( { username: req.body.email, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
                if (err || !user) {
                    errorResponse.sendNotFoundError(res, "Invalid username or password");
                }
                else if (user.deletedOn || !user.isActive) {
                    errorResponse.sendAuthorizationError(res, "account suspended", null);
                }
                else {
                    user.auth = cryptUtils.encryptAccessToken(user.accessToken);
                    delete user.accessToken;

                    res.json(user);
                }
            });
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    
    return handler;
}
module.exports = createAPI;