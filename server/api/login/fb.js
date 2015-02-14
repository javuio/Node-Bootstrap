var cryptUtils = require('../../utils/cryptUtils.js');
var errorResponse = require('mError/errorResponse.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/login/fb', './login/fbTest.js');
    handler.secure = false;
    
    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email) && req.body.token;
    };
    
    
    handler.securityCheck = function (req, res) {
        return true;
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
                    users.getUser({ username: req.body.email, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
                        if (err || !user) {
                            errorResponse.sendNotFoundError(res, "Invalid email or password");
                        }
                        else if (user.deletedOn || !user.isActive) {
                            errorResponse.sendAuthorizationError(res, "account suspended", null);
                        }
                        else {
                            res.json({ auth: cryptUtils.encryptAccessToken(user.accessToken), userToken: user.userToken });
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