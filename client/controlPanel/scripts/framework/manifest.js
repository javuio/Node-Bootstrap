define(['dynamicContentLoader', 'uiManager'], function (dynamicContentLoader, uiManager) {
    var manifest = {

        dynamicLoader: null

        , pages: {
            register: { pageUrl: '/pages/register/register.html' }
            , login: { externalPage: true, pageTitle: 'Login', pageUrl: '/pages/login/login.html' }
            , forgetPassword: { pageTitle: 'Forget Password', pageUrl: '/pages/forgetPassword/forgetPassword.html' }
            , resetPassword: { pageTitle: 'Reset Password', pageUrl: '/resetPassword.html'}
            , dashboard: { mainMenuLabel: 'Dashboard', pageTitle: 'Dashboard', className: 'mnuDashboard', menuId: 'menuDashboard', pageUrl: '/pages/dashboard/dashboard.html'}
            , settings: { mainMenuLabel: 'Settings', pageTitle: 'Settings', className: 'mnuSettings', menuId: 'menuSettings', pageUrl: '/pages/settings/settings.html'}
            , profile: { pageTitle: 'profile', pageUrl: '/pages/profile/profile.html'}
            ,'404':{ pageTitle: 'Page not Found', pageUrl: '/pages/404/404.html'}
        }
        , load: function (configName, segments) {
            if(configName == '')
                configName='dashboard';

            if(typeof(this.pages[configName])== 'undefined'){
                console.log('configName "' + configName + '" was not found redirecting to 404');
                configName="404";

            }
            this.dynamicLoader.loadContentObj(this.pages[configName], segments);

        }
    };

    manifest.dynamicLoader = new dynamicContentLoader('dynamicContentContainer', manifest.pages);

    for (var config in manifest.pages)
        if (manifest.pages[config].pageUrl)
            manifest.pages[config].pageName = config;

    return manifest;
});