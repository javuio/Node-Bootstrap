//var hash = require('mHash/hash.js');
//var config = require('../config.js');
var passport = require('passport');
var tokenStrategy = require('passport-token').Strategy;
var cryptUtils = require('./cryptUtils.js');
var users = require('../dao/users.js');

module.exports=
 {
    createTokenStrategy: function () {
        return new tokenStrategy({ usernameHeader: 'userToken', tokenHeader: 'auth' },
            function (userToken, accessToken, done) {
                var decryptedAccesstoken = undefined;
                try {
                    decryptedAccesstoken = cryptUtils.decryptAccessToken(accessToken);
                }
                catch (ex) {
                    return done(null, false);
                }
                users.getUser({ userToken: userToken, accessToken: decryptedAccesstoken }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            });
    }
};

