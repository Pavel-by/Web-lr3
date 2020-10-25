$(document).ready(function() {
    let update = async function () {
        let element = $('.auction-users');
        let user = await authService.user();

        if (user?.isadmin !== true) {
            element.html("");
            return;
        }

        let users = (await userService.findAll())?.filter(user => user.isadmin === false);

        let html = "";
        if (users == null)
            html = `<div class='uk-alert uk-alert-warning'>Не удалось загрузить список участников аукциона</div>`;
        if (users === 0)
            html = `<div class='uk-alert uk-alert-primary'>Список пользователей пуст</div>`;
        else {
            users.forEach(user => {
                let checked = user.isparticipant ? "checked" : "";

                html += `<li>
                    <input type="checkbox" ${checked} disabled>
                    <span class="uk-margin-small-left">${user.name}</span>
                    <a href="/user/${user._id}/edit" uk-icon="pencil" class="uk-margin-small-left"></a>
                </li>`;
            });

            html = `<ul class="uk-list uk-list-striped">${html}</ul>`;
        }

        element.html(`<h3>Пользователи</h3>${html}`);
    };

    update();
    userService.on(userService.CHANGED, update);
    authService.addEventListener(authService.LOGIN, update);
});