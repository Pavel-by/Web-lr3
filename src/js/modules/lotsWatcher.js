$(document).ready(function() {
    let refresh = async function() {
        let element = $('.lots-watcher-block');
        let auction = await auctionService.auction();
        let user = await authService.user();

        let html = "";

        if (auction == null || user == null)
            html = `<div class='uk-alert uk-alert-warning'>Не удалось загрузить список лотов аукциона</div>`;
        else if (auction.pictures.length === 0)
            html = `<div class='uk-alert uk-alert-primary'>Список лотов пуст</div>`;
        else {
            for (let i = 0; i < auction.pictures.length; i++) {
                let pictureId = auction.pictures[i];
                let picture = await pictureService.findById(pictureId);
                let title = picture != null ? picture.title : pictureId;
                let filename = picture?.filename || "";
                html += `<li><img width="50" src="/public/files/${filename}"><span class="uk-margin-small-left">${title}</span></li>`;
            }

            html = `<ul class="uk-list uk-list-striped">${html}</ul>`;
        }

        if (user?.isadmin === true)
            html += `<a class='uk-button uk-button-default' href="/auction/lot/edit">Редактировать</a>`;

        element.html(html);
    };

    refresh();
    pictureService.on(pictureService.CHANGED, refresh);
    auctionService.on(auctionService.UPDATE, refresh);
});