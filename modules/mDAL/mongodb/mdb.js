var log = require('mLogger/logger.js');
var mongo = require('mongodb');

function mogcoClient(){
}

mogcoClient.prototype = {
    db: null //auto pools
    , config: null
    , init: function (config, callback) {
        var self = this;
        this.config = config;
        console.log('INIT DB');
        if (this.db) {
            callback(null, this.db);
            return;
        }
        mongo.MongoClient.connect(this.config.connectionString, function (err, db) {
            if (err) {
                log.error("cant connect to mongodb." + JSON.stringify(err));
                callback(err, null);
            }
            else {
                self.db = db;

                log.debug('mongodb Initialized');
                if (callback)
                    callback(null, self.db);
            }
        });
    }
    , getCollection: function (collection, callback) {
        var self = this;
        if (!this.db) {
            log.warn('mongodb not ready');
            
            this.init(this.config, function (err, db) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, self.db.collection(collection));
                }
            });
        }
        else {
            callback(null, this.db.collection(collection));
        }
    }
    , dropCollection: function (collection, callback) {
        var self = this;
        if (!this.db) {
            log.warn('mongodb not ready');
            
            this.init(this.config, function (err, db) {
                if (err) {
                    callback(err, null);
                }
                else {
                    self.db.dropCollection(collection, callback);
                }
            });
        }
        else {
            this.db.dropCollection(collection, callback);
        }
    }
    , convertToObjectID: function (id) {
        if (id.id)
            return id;
        else
            return new mongo.ObjectID.createFromHexString(id);
    }
};

module.exports = mogcoClient;