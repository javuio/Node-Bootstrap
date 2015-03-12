var path = require('path');
var fs = require('fs');
var uglify = require("uglify-js");


var util ={
    minifyFolder: function (path, minifySubFldrs) {

        var files = fs.readdirSync(path);
        var jsFiles = [];
        var subFolders = new Array();
        for (var i =0 ; i< files.length ; i++) {
            var file=files[i];
            if (file.indexOf('.js') > 1)
                jsFiles.push(path + "/" + file);
            else if (file.indexOf('.') == -1 )
                subFolders.push(path + file);

        }

        if(jsFiles.length > 0) {
            var filePath = path + '/all.min.js';
            var uglified = uglify.minify(
                jsFiles
                ,{outSourceMap: filePath + ".map"
            });

            fs.writeFile(filePath, uglified.code, function (err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Script generated and saved:", filePath);
                }
            });
        }

        if(minifySubFldrs && subFolders.length > 0)
            subFolders.forEach(function(folder) {
                util.minifyFolder(folder, minifySubFldrs);
            });
    }
    ,minifyFolders: function (foldersConfig) {
        foldersConfig.forEach(function(f){
            util.minifyFolder(f.path, f.minifySubFolder);
        });
    }
};
module.exports = util;