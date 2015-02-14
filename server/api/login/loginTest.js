var chai = require( 'chai' )
    , chaiHttp = require( 'chai-http' );
chai.use( chaiHttp );

module.exports = {
    test: function ( app ) {
        // test successful login
        chai.request(app)
        .post('/api/login')
        .req(function (req) {
            req.set('username', 'CPUser@javu.io');
            req.set('password', '123456');
          }            
        )
        .res(function (res){            
            chai.assert.equal(res.status, 200);
            chai.expect(res).to.be.json;
            
            }
        );


        //test unsuccessful login
        chai.request(app)
        .post('/api/login')
        .req(function (req) {
            req.set('username', 'XXX@javu.io');
            req.set('password', 'xxx');
          }            
        )
        .res(function (res){            
            chai.assert.equal(res.status, 401);                        
            }
         );


        //test missing param
        chai.request(app)
        .post('/api/login')
        .req(function (req) {
            req.set('username', 'CPUser@javu.io');
          }            
        )
        .res(function (res){            
            chai.assert.equal(res.status, 500);                        
            }
         )
    }
}



