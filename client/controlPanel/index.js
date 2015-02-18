$(document).ready(function () {
    if (console.log) console.log("document ready");

    require(['masterPageController', 'mainMenu', 'manifest','uiManager'], function (masterPageController, mainMenu, manifest,uiManager) {

        var navigateToCurrentHash = function(){
            var newHash = window.location.hash.substring(1);
            newHash= newHash.replace('/','');
            if (newHash.length == 0 ){
                newHash = 'dashboard';
                console.log('default route to dashboard');
            }
            masterPageController.load(newHash);
        };

        var loginHandler = function(user){
            navigateToCurrentHash();
        };


        masterPageController.init({ loginHandler: loginHandler });
        navigateToCurrentHash();

        if (mainMenu)
            mainMenu.init({ pages: manifest.pages, dynamicLoader: manifest.dynamicLoader });

        uiManager.showBody();
        uiManager.hideSpinner();
    });
});

if (console.log) console.log("index.js loaded");