var cryptUtils = require('../../utils/cryptUtils.js');
var errorResponse = require('mError/errorResponse.js');
var logger = require('mLogger/logger.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/register/fb', './register/fbTest.js');
    
    handler.secure = false;
    
    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.token && req.body.devicePlatform && req.body.deviceToken;
    }
    
    
    handler.securityCheck = function (req, res) {
        return true;
    }
    
    var login = function (req, res, existingUser) {
        // Login user
        users.getUser({ username: req.body.email, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
            if (err) {
                return errorResponse.sendAuthenticationError(res, "unable to login user", err);
            }
            else if (user.deletedOn || !user.isActive || (user.isActive[0] == 0)) {
                errorResponse.sendAuthorizationError(res, "account suspended", null);
            }
            else {
                res.json({ auth: cryptUtils.encryptAccessToken(user.accessToken), userToken: user.userToken, existingUser: existingUser });
            }
        });
    };

    
    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {
            var fbapi = require('facebook-api');
            var client = fbapi.user(req.body.token);
            client.me.info(function (err, info) {
                if (err) {
                    res.send(401);
                }
                else if (!info.email) {
                    errorResponse.sendCustomInnerCode(res, 'insufficientAccess', 'Email not accessible');
                }
                else if (info.email.toLowerCase() != req.body.email.toLowerCase()) {
                    errorResponse.sendCustomInnerCode(res, 'mistamatchToken', 'Email does not match token account email');
                }
                else {
                    req.body.password = cryptUtils.hashFbPassword(info.id);
                    req.body.roleName = 'CustomerRole';
                    users.registerUser(req.body, "fb", function (err, data) {
                        if (err) {
                            if (err.errorCode) {
                                switch (err.errorCode) {
                                    case 'duplicateUsername':
                                        if (req.body.loginIfExists) {
                                            login(req, res, true);
                                        }
                                        else {
                                            errorResponse.sendCustomInnerCode(res, err.errorCode, 'Username already exists');
                                        }
                                        break;
                                    default:
                                        res.send(400, ({ message: err.errorCode, code: err.errorCode })); // will throw back to the service consumer any db custom error code
                                        break;
                                }
                            }
                            else {
                                handler.handleGenericError(req, res, err);
                            }
                        }
                        else {
                            logger.log("event", "facebook user registered", { event: "userRegistered", username: req.body.email, type: "facebook" });
                            login(req, res, false);
                        }
                    });
                }
            });
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    
    return handler;
}
module.exports = createAPI;