$javuApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'/pages/templates/dashboard.html'
            ,controller:'dashboardCtrl'
        })
        .when('/login',{
            templateUrl:'/pages/templates/login.html'
            ,controller:'loginCtrl'
        })
        .when('/page1',{
            templateUrl:'/pages/templates/page1.html'
            //,controller:'page1Ctrl'
        })
        .when('/forgotPassword',{
            templateUrl:'/pages/templates/forgotPassword.html'
            ,controller:'forgotPasswordCtrl'
        })
        .when('/404',{
            templateUrl:'/pages/templates/404.html'
        })
        .otherwise({redirectTo:'/404'});
});

$javuApp.controller('menuCtrl',['$scope', function ($scope) {
    $scope.pages= [
        {title:'Dashboard', hash: '', className:''}
        ,{title:'Page 1', hash: 'page1', className:''}
    ];
}]);