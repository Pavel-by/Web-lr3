$(document).ready(function() {
    let update = async function () {
        let auction = await auctionService.auction();
        let user = await authService.user();
        let pictures = await pictureService.findAll();
        let element = $('.auction-lots');

        if (auction == null || user == null || pictures == null)
            return element.html(`<div class="uk-alert uk-alert-warning">Не удалось загрузить данные</div>`);

        if (pictures.length === 0)
            return element.html(`<div class="uk-alert uk-alert-warning">Нет доступных картин</div>`);

        let html = "";

        pictures.forEach(picture => {
            let checked = auction.pictures.includes(picture._id) ? "checked" : "";
            html += `<li><label><input type="checkbox" class="uk-checkbox uk-margin-small-right" name="${picture._id}" ${checked}>${picture.title} </label></li>`
        });

        html = `<ul class="uk-list uk-list-striped">${html}</ul>`;
        html += `<a class="uk-button uk-button-primary uk-margin" onclick="savePictures()">Сохранить</a>`;
        element.html(html);
    };

    update();
    auctionService.on(auctionService.CHANGED, update);
    userService.on(userService.CHANGED, update);
});

async function savePictures() {
    let element = $('.auction-lots');
    let pictures = [];
    element.find('input[type="checkbox"]').each(function() {
        if (this.checked)
            pictures.push(this.name);
    });
    let auction = await auctionService.auction();
    auction.update({pictures: pictures});
    if (auctionService.save(auction))
        window.location = '/';
    else
        alert("Что-то пошло не так. Проверьте что-нибудь");
}