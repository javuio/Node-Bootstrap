var crypto = require("crypto");

function hash() {
    this.hashConfigKey = null;
}

hash.prototype = {
    init: function (config) {
        this.hashConfigKey = config.hashConfigKey;
        if (!this.hashConfigKey) {
            throw new Error('cannot read hash configuration');
        }
    },
    
    hashString: function (data) {
        if(typeof(data) == undefined) data='';
        if (!this.hashConfigKey) {
            throw new Error('cannot read hash configuration');
        }
        return crypto.createHmac("md5", this.hashConfigKey )
        .update(data)
        .digest("hex");
    }
};

module.exports = new hash();