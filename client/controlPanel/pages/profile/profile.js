
define({
    init: function () {
        require(['uiManager', 'bootstrapValidator'], function (uiManager) {
            uiManager.hideSpinner();

            $('#changePasswordForm').bootstrapValidator({
                // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                live: 'disabled',
                fields: {
                    txtOldPassword: {
                        validators: {
                            notEmpty: {
                                message: 'required '
                            }
                        }
                    },
                    txtNewPassword: {
                        validators: {
                            notEmpty: {
                                message: 'required'
                            }, stringLength: {
                                min: 6,
                                message: 'Use at least 6 characters'
                            }
                        }
                    },
                    txtConfirmPassword: {
                        validators: {
                            notEmpty: {
                                message: 'required'
                            },
                            identical: {
                                field: 'txtNewPassword',
                                message: 'The confirm password should be the same as password '
                            }
                        }
                    }
                }
            });


            $("#input").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $('#btnChangePassword:first').trigger("click");
                }
            });


            $('#btnChangePassword:first').click(function () {
                $("#changePasswordForm").data('bootstrapValidator').resetForm();
                if ($('#changePasswordForm').data('bootstrapValidator').validate().isValid()) {
                    uiManager.showSpinner();
                    api.post('api/users/changePassword', {
                        currentPassword: $("#txtOldPassword").val(),
                        newPassword: $("#txtNewPassword").val()
                    }, function (err, result) {
                        uiManager.hideSpinner();
                        if (err)
                            showAlert('warning', err.message);
                        else {
                            showAlert('success', 'Operation done successfully');

                            require(['authManager'], function (authManager) {
                                authManager.setCurrentUser(result);
                            });
                        }
                    });

                }
            });
        });
    }
});
