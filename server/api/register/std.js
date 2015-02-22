var cryptUtils = require('../../utils/cryptUtils.js');
var errorResponse = require('../errorResponse.js');
var logger = require('../../utils//logger.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/register/std', './register/stdTest.js');
    
    handler.requiresAuthentication = false;

    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.password && req.body.devicePlatform && req.body.deviceToken;
    };


    handler.securityCheck = function (req, res) {
        return true;
    };


    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {
            if (!validator.isValidPassword(req.body.password)) {
                errorResponse.sendCustomInnerCode(res, 'badPassword', 'Password does not meet requirements');
            }
            else {
                req.body.password = cryptUtils.hashStdPassword(req.body.password);
                req.body.roleName = 'CustomerRole';
                users.registerUser(req.body, "std", function (err, data) {
                    if (err) {
                        if (err.errorCode) {
                            switch (err.errorCode) {
                                case 'duplicateUsername':
                                    errorResponse.sendCustomInnerCode(res, err.errorCode, 'Username already exists');
                                    break;
                            }
                        }
                        else {
                            handler.handleGenericError(req, res, err);
                        }
                    }
                    else {
                        // Login user
                        users.getUser({ username: req.body.email, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
                            if (err || !user) {
                                return errorResponse.sendAuthenticationError(res, "unable to login user", err);
                            }
                            else if (user.deletedOn || !user.isActive || (user.isActive[0] == 0)) {
                                errorResponse.sendAuthorizationError(res, "account suspended", null);
                            }
                            else {
                                logger.log("event", "standard user registered", { event: "userRegistered",  username: req.body.email, type: "standrad" });
                                res.json({ auth: cryptUtils.encryptAccessToken(user.accessToken), userToken: user.userToken });
                            }
                        });
                    }
                });
            }
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };

    return handler;
}
module.exports = createAPI;