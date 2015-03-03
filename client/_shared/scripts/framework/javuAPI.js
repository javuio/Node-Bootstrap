$javuApp.factory('javuAPI', function () {
    return {
        apiTimeout: 30000
        , source: 'merchant'
        , _fullLogging: false
        , turnLoggingOn: function (value) {
            this._fullLogging = value;
        }
        , post: function (url, params) {
            return this.call('POST', url, params);
        }
        , put: function (url, params) {
            return this.call('PUT', url, params);
        }
        , get: function (url, params) {
            return this.call('GET', url, params);
        }
        , delete: function (url, params) {
            return this.call('DELETE', url, params);
        }
        , call: function (verb, url, params) {
            var deferred = $q.defer();

            if (typeof ( params ) == "function" && typeof(callback) == "undefined") {
                callback = params;
                params = null;
            }

            var currentUser = null;
            var header = null;
            if (this.authManager)
                currentUser = this.authManager.getCurrentUser();

            if (url.indexOf('/') != 0)
                url = '/' + url;

            if (url.indexOf('/api/') != 0)
                url = '/api' + url;

            if (currentUser) {
                //url += (url.indexOf('?') > 0 ? '&' : '?') + 'userToken=' + currentUser.userToken;
                header = {auth: currentUser.auth, userToken: currentUser.userToken};
            }

            var tmr = null;
            if (api._fullLogging && console.log)
                console.info(verb, url, JSON.stringify(params));

            var p = $.ajax({
                url: url,
                headers: header,
                type: verb,
                data: params,
                success: function (result) {
                    if (tmr) clearTimeout(tmr);
                    deferred.resolve(result);
                },
                error: function (e) {

                    if (e && (e.status == 401 || e.status == 403)) {
                        //auth or userToken are not valid .. kick Out the user
                        debugger;// !!! keep this debugger !!!
                        api.authManager.logout();
                    }
                    else {
                        if (e.responseJSON && e.responseJSON.code)
                            e.code = e.responseJSON.code;
                        else
                            e.code = e.status;

                        if (e.responseJSON && e.responseJSON.message)
                            e.message = e.responseJSON.message;
                        else
                            e.message = e.responseText;
                    }
                    if (console.error) console.error(e);
                    deferred.reject(e);
                }
            });

            tmr = setTimeout(function () {
                if (p) {
                    p.abort();
                    deferred.reject({code: 0, message: "timeout waiting for " + url});
                }
            }, api.apiTimeout);

            return deferred.promise;

        }

    };
    /*
    api.turnLoggingOn(document.URL.indexOf('localhost') >= 0);
    require(['authManager'], function (authManager) {
        api.authManager = authManager;
    });
    */
});


if (console.log) console.log("api loaded");