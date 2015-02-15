
define('masterPageController', ['manifest', 'authManager','profileControl'], function (manifest, authManager,profileControl) {

    function masterPageController(manifest) {
        this.subPagesManifest = manifest;
    }

    masterPageController.prototype = {
        init: function (options) {
            if (!options) options = {};

            var t = this;
            /// override the login and logout handlers in auth manager
            authManager.logoutHandler = function () {
                profileControl.setUser(null);
                if (options.logoutHandler) {
                    options.logoutHandler(function () {
                        return t._logOutHandler();
                    });
                }
                else
                    return t._logOutHandler();
            };
            authManager.loginHandler = function (user) {
                profileControl.setUser(user);
                if (options.loginHandler) {
                    options.loginHandler(user, function () {
                        return t._loginHandler(user);
                    });
                }
                else
                    return t._loginHandler(user);
            };

            authManager.attemptAutoLogin();

            /// set the main dynamic controller container
            this.$dynamicContentContainer = $('#dynamicContentContainer:first');

/*
            /// check if user is logged in if so great if not go through log out process
            if (authManager.isUserLoggedIn()) {
                authManager.loginHandler(authManager.getCurrentUser());
            }
            else {
                this._logOutHandler();
            }
*/

            /// if a hash tag is already passed, use it
            this.load(window.location.hash.substring(1).replace("/",""));



            /// handle any access denied api reply with a kickout to login
            api.accessDeniedHandle = this._logOutHandler;
        }
        /// loads a page config. basically a hop for the dcl
        , load: function (configName, segments) {
            this.subPagesManifest.load(configName, segments);
        }
        , _logOutHandler: function () {
            /// load the login page
            this.load('login');
            /// clear the profile control in the top right side of the page
            require(['profileControl'], function (profileControl) {
                profileControl.clear();
            });
        }
        , _loginHandler: function (user) {

            /// when logged in figure out where to take the user
            var segments = window.location.hash.substring(1).split('/');
            var hash = segments[0];
            segments = segments.splice(1);

            if (hash && this.subPagesManifest.pages[hash])
                this.load(hash, segments.join("/"));
            else
                this.load('dashboard');
debugger;
            require(['profileControl'], function (profileControl) {
                debugger;
                profileControl.setUser(user);
            });
        }
        , kickOutIfNotLoggedIn: function () {
            if (!authManager.isUserLoggedIn()) {
                this.load('login');
                return true;
            }
            else
                return false;
        }
        ,getParameterByName:function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };

    return new masterPageController(manifest);
});