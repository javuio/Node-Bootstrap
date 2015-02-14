
var userDAO = require('../../dao/users.js');

function createAPI(app) {
    var apiHandler = require('../apiHandler.js');
    var users = new apiHandler('/api/user');
    users.secure=false;
    users.validateData = function (req, res) {
        return req.body.username && req.body.password;
    };

    users.securityCheck = function (req, res) {
        return true;
    };



    users.post = function (req, res) {

        if (req.body.username && req.body.password) {
            userDAO.registerUser({
                username:req.body.username
                ,password: req.body.password
                ,roleName:null
            },null,function (err, user) {
                if (err)
                    if(err.sqlState == 45000)
                        res.send(409, "Username already exists");
                    else
                        res.send(500, err);
                else
                    res.json(user);
            });

        }
        else
            res.send(500, "Invalid parameters");

    };


    return users;
}
module.exports = createAPI;

