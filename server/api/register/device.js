var cryptUtils = require('../../utils/cryptUtils.js');
var errorResponse = require('mError/errorResponse.js');
var logger = require('mLogger/logger.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/register/device', './register/deviceTest.js');
    
    handler.secure = false;

    handler.validateData = function (req, res) {
        return req.body && req.body.id && req.body.type;
    }


    handler.securityCheck = function (req, res) {
        return true;
    }


    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {
            logger.log("event", "new device registered", { event: "deviceRegistered", deviceId: req.body.id, deviceType: req.body.type });
            res.send(200);
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };

    return handler;
}
module.exports = createAPI;