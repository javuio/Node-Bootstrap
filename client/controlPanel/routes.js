$javuApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'/pages/dashboard/dashboardPage.html'
            ,controller:'dashboardCtrl'
        })
        .when('/login',{
            templateUrl:'/pages/login/loginPage.html'
            ,controller:'loginCtrl'
        })
        .when('/page1',{
            templateUrl:'/pages/page1/page1Page.html'
            //,controller:'page1Ctrl'
        })
        .when('/forgotPassword',{
            templateUrl:'/pages/forgotPassword/forgotPasswordPage.html'
            ,controller:'forgotPasswordCtrl'
        })
        .when('/404',{
            templateUrl:'/pages/404/404Page.html'
        })
        .otherwise({redirectTo:'/404'});
});

$javuApp.controller('menuCtrl',['$scope', function ($scope) {
    $scope.pages= [
        {title:'Dashboard', hash: '', className:''}
        ,{title:'Page 1', hash: 'page1', className:''}
    ];
}]);