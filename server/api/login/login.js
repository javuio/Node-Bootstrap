
var users = require(  '../../dao/users.js');
function createAPI( app ) {
    var apiHandler = require( '../apiHandler.js' );

    var login = new apiHandler('/api/login/', ''); // TODO: Disabled login test until new login is implemented

    login.validateData = function(req,res){
        return req.headers.username && req.headers.password ;
     };
    
     login.securityCheck= function(req,res){
        return true;
     };
    
    login.get = login.post = function (req, res) {
        
        if (req.headers.username && req.headers.password) {            
            users.getUser(req.headers.username, req.headers.password, function (err, user) {
                if (err)
                    res.send(401, "Invalid Username and Password");
                else if (user) 
                    res.json(user);                
                else
                    res.send(500, "Invalid parameters");
            });
            
        }
        else
            res.send( 500,"Invalid parameters" );
        
    };

    

    return login;
}
module.exports = createAPI;

