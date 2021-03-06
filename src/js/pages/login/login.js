$("#login-form").submit(function (e) {
    e.preventDefault();
    authService.login($(this).serialize()).then((result) => {
        if (result)
            window.location = '/';
        else
            $(this).find('.error').html('Неверный логин или пароль').removeClass('uk-hidden')
    });
});

$("#register-form").submit(function (e) {
    e.preventDefault();
    authService.register($(this).serialize()).then((result) => {
        if (result)
            window.location = '/';
        else
            $(this).find('.error').html('Неверно заполнены поля').removeClass('uk-hidden')
    });
});