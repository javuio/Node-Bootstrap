//$(document).ready(function () {


$javuApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'/pages/dashboard/dashboardPage.html'
            ,controller:'/pages/dashboard/dashboardCtrl.js'
        })
        .otherwise({redirectTo:'/'});
});



/*
    require(['masterPageController', 'mainMenu', 'manifest','uiManager'], function (masterPageController, mainMenu, manifest,uiManager) {

        masterPageController.init();

        /// when moving from page to page make sure alerts, spinner and others are all reset
        manifest.dynamicLoader.callbacks.push(function(){uiManager.reset();});

        if (mainMenu)
            mainMenu.init({ pages: manifest.pages, dynamicLoader: manifest.dynamicLoader });

        uiManager.showBody();
        uiManager.hideSpinner();
    });
    */
//});
