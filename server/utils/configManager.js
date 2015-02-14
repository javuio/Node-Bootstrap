/**
 * Config file is passed along here and is then given to all the modules that need it
 */

module.exports = function (config) {

    /// create logger to begin logging events and pass configuration to it
    require('mLogger/logger.js').init(config.logging);

    /// init and config email service
    if(config.smtp)
        require('mEmail/emails.js').init(config.smtp);

    /// pass keys to hash module
    require("mHash/hash.js").init(config.hash);

    /// set debug mode
    require('mError/errorResponse.js').setDebugMode(config.debugMode);



};