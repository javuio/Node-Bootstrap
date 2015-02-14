
var userDAO = require('../../dao/users.js');

function createAPI(app) {
    var apiHandler = require('../apiHandler.js');
    var users = new apiHandler('/api/user');

    users.validateData = function (req, res) {
        return req.headers.username && req.headers.password;
    };

    users.securityCheck = function (req, res) {
        return true;
    };

    users.get = function (req, res) {

        if (req.headers.username && req.headers.password) {
            userDAO.getUser(req.headers.username, req.headers.password, function (err, user) {
                if (err)
                    res.send(401, "Invalid Username and Password");
                else if (user)
                    res.json(user);
                else
                    res.send(500, "Invalid parameters");
            });

        }
        else
            res.send(500, "Invalid parameters");

    };

    return users;
}
module.exports = createAPI;

