
define({
    init: function () {
        ///fix ui
        require(['uiManager'], function (uiManager) {
            uiManager.disableMenu().hideSidebar().hideSpinner().hideTopMenu().setPageTitle('Register');
        });

        ///if dev dont actually pay
        var url = window.location.origin.toLowerCase();
        var action = "https://www.paypal.com/cgi-bin/webscr";
        /*
        if (url.indexOf('localhost') >= 0 || url.indexof('127.0.0.1')) {
            action = "https://www.sandbox.paypal.com/cgi-bin/webscr";
            $('#hosted_button_id:first').val('WFL3GV5H3ZLT2');
        }
         */
        $('#frmRegistrationForm:first')[0].action =action;


        $('#btnRegister:first').click(function () {
            hideAlert();
            var email = $('#txtEmail:first').val();
            var $password = $('#txtPassword:first');
            var password = $password.val();
            var $passwordConfirmation = $('#txtConfirm:first');

            if (password.length < 6)
                $password[0].setCustomValidity("Password is too short must be at least 6 charecters");
            else
                $password[0].setCustomValidity('');

            if (password != $passwordConfirmation.val())
                $passwordConfirmation[0].setCustomValidity("Password doesn't match");                            
            else
                $passwordConfirmation[0].setCustomValidity('');



            if ($('#frmRegistrationForm:first')[0].checkValidity()) {

                api.post('/api/user'
                , { username: email, password: password }
                , function (err,user) {
                    if (err){
                        debugger;
                        if (err.status == 409)
                            showAlert('danger',err.message, $('#alert'));
                        return false;
                    }
                    else {
                        require(['authManager','masterPageController']   
                        , function (authManager, masterPageController) {

                            authManager.login(email
                               ,password
                               , function (err, result) {
                                    if (err) {
                                        showAlert('warning', err.message);
                                        return false;
                                    }
                                    else {
                                        $('#frmRegistrationForm:first')[0].submit();
                                    }
                               }
                               );
                        });
                    }

                }
                );
                return false;
            }
        });

    }
});
