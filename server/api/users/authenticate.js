var apiHandler = require( '../apiHandler.js' );
function createAPI( app ) {
    var auth = new apiHandler( '/users/auth','' );

    /// this will catch any api that passes this param , auth then pass it along
    app.param( 'apiKey',
        function ( req, res, next ) {
            if ( req.params.apiKey == "132" )
                next( req, res );
        });

    /// this will catch any api that passes this param , auth then pass it along
    app.param( 'userToken',
        function ( req, res, next ) {
            if ( req.params.userToken == "123" )
                next( req, res );
        });


    return auth;
}
module.exports = createAPI;