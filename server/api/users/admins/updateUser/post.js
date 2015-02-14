var cryptUtils = require( '../../../../utils/cryptUtils.js' );
var errorResponse = require( 'mError/errorResponse.js' );
var apiHandler = require( '../../../apiHandler.js' );
var users = require( '../../../../dao/users.js' );

function createAPI( app ) {
    var handler = new apiHandler( '/api/users/admins/updateUser/', './users/admins/updateUser/postTest.js' );
    handler.requiresPermission = 'AdminPortal';
    handler.validateData = function ( req, res ) {
        if ( req.body.email && req.body.firstName && req.body.lastName )
            return true;
    }

    handler.securityCheck = function ( req, res ) {
        return true;
    }
    handler.post = function ( req, res ) {
        if ( handler.validateData( req, res ) ) {

            users.getUserByUsername( req.body.email, function ( err, user ) {
                if ( err ) {
                    return errorResponse.sendAuthenticationError( res, "error while retive user", err );
                }
                else if ( user == null ) {
                    errorResponse.sendAuthorizationError( res, "user not found", null );
                }
                else {
                    users.updateUser( user.userToken, req.body.firstName, req.body.lastName, user.address, user.city, user.state, user.zip, user.isActive, user.userId, function ( err, updateCredentialsUser ) {
                        if ( err ) {
                            errorResponse.sendNotFoundError( res, "" );
                        }
                        else {
                            if ( req.body.password && req.body.password.length > 0 ) {

                                users.resetPassword( user.userId, user.userToken, req.body.password, function ( err, data ) {
                                    if ( err ) {
                                        errorResponse.sendNotFoundError( res, "" );
                                    }
                                    else {
                                        res.send( 200 ); //success
                                    }
                                });
                            }
                            else {
                                res.send( 200 ); //success
                            }
                        }
                    });
                }
            });

        }
        else
            errorResponse.sendValidationError( res, "Invalid Parameters" );
    };

    return handler;
}
module.exports = createAPI;