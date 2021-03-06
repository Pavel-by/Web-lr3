$(document).ready(function() {
    let update = async function () {
        let auction = await auctionService.auction();
        let users = await userService.findAll();
        let element = $('.auction-users');

        if (auction == null || users == null)
            return element.html(`<div class="uk-alert uk-alert-warning">Не удалось загрузить данные</div>`);

        users = users.filter(u => !u.isadmin);

        if (users.length === 0)
            return element.html(`<div class="uk-alert uk-alert-warning">Нет доступных пользователей</div>`);

        let html = "";

        users.forEach(user => {
            let checked = auction.users.includes(user._id) ? "checked" : "";
            html += `<li><label><input type="checkbox" class="uk-checkbox uk-margin-small-right" name="${user._id}" ${checked}>${user.name} | ${user.money}руб</label></li>`
        });

        html = `<ul class="uk-list uk-list-striped">${html}</ul>`;
        html += `<a class="uk-button uk-button-primary uk-margin" onclick="saveUsers()">Сохранить</a>`;
        element.html(html);
    };

    update();
    auctionService.on(auctionService.CHANGED, update);
    userService.on(userService.CHANGED, update);
});

async function saveUsers() {
    let element = $('.auction-users');
    let users = [];
    element.find('input[type="checkbox"]').each(function() {
        if (this.checked)
            users.push(this.name);
    });
    let auction = await auctionService.auction();
    auction.update({users: users});
    if (auctionService.save(auction))
        window.location = '/';
    else
        alert("Что-то пошло не так. Проверьте что-нибудь");
}