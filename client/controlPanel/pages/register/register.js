
define({
    init: function () {
        debugger;
        ///fix ui
        require(['uiManager'], function (uiManager) {
           debugger;
            uiManager.hideSidebar().hideTopMenu();
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
        var frm = $('#frmRegistrationForm:first')[0];
        frm.action =action;


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



            if (frm.checkValidity()) {

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
                        require(['authManager']
                        , function (authManager) {

                            authManager.login(email
                               ,password
                               , function (err, result) {
                                    if (err) {
                                        require(['uiManager'],function (uiManager){
                                            uiManager.showAlert('warning', err.message);
                                        });
                                        return false;
                                    }
                                    else {
                                        frm.submit();
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
