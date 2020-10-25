async function refreshNavUser() {
    let user = await authService.user();

    if (user !== null)
        $("#nav-user").html(`
            <a href="/user/${user._id}/edit"><span class="uk-margin-small-right" uk-icon="user"></span>${user.login}</a>
            <div class="uk-navbar-dropdown" uk-dropdown>
                <ul class="uk-nav uk-navbar-dropdown-nav">
                    <li class="uk-active"><a href="/logout">Выйти</a></li>
                </ul>
            </div>
        `);
}

authService.addEventListener(authService.LOGIN, refreshNavUser);
authService.user().then(refreshNavUser);