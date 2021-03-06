let editor = {
    _user: null,

    user: async function() {
        if (this._user == null)
            this._user = await userService.findById(getCurrentId());

        return this._user;
    }
};

function getCurrentId() {
    let arr = window.location.toString().split('/');
    return arr[arr.length - 2];
}

async function save() {
    let user = await editor.user();
    user.update({
        money: $('input[name="money"]').val(),
        isparticipant: $('input[name="isparticipant"]').is(':checked'),
    });
    if (await userService.update(user))
        window.location = "/";
    else
        alert("Не удалось обновить данные");
}

async function refreshFields() {
    let user = await editor.user();

    if (!user)
        return alert('Не удалось загрузить данные о пользователе');

    $('#user-login').html(user.login);
    $('input[name="name"]').val(user.name);
    $('input[name="money"]').val(user.money).prop('disabled', user.isadmin);
    $('input[name="isparticipant"]').prop('checked', user.isparticipant).prop('disabled', user.isadmin);
}

$(document).ready(function() {
    refreshFields();

    $('#save-user').click(function() {
        save();
    })
});