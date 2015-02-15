define('profileControl', []
    , function () {
        var profileControl = {
            setUser: function (user) {
                if (user) {
                    $('#currentUserName:first').text(user.firstName);

                    $('#profileLogout:first').click(
                       function () {
                           require(['authManager'], function (authManager) {
                               authManager.logout();
                           });
                           return false;
                       }
                    );

                }
                else {
                    $('ddlUserProfile').hide();
                }

            }
            , clear: function () {
                this.setUser(null);
            }
        };
        return profileControl;
    }
);