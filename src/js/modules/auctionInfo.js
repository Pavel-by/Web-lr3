$(document).ready(function() {
    auctionService.auction().then(refreshAuctionInfo);
    auctionService.on(auctionService.UPDATE, refreshAuctionInfo);

    async function refreshAuctionInfo () {
        let auction = await auctionService.auction();
        let user = await authService.user();
        let block = $('.auction-info-block');

        if (auction === null)
            return block.html(`<div uk-alert class="uk-alert-warning">Не удалось загрузить данные об аукционе</div>`);

        let html = "";
        let makeItem = (name, value) => {
            return `
            <div class="uk-margin">
                <label class="uk-form-label">${name}</label>
                <label class="uk-form-controls">${value}</label>
            </div>
            `;
        };

        html += makeItem("Название", auction.title);
        html += makeItem("Задержка перед продажей", (auction.selltimeout / 1000) + "с");
        html += makeItem("Время на осмотр лота", (auction.inputpause / 1000) + "с");
        html += makeItem("Дата старта", auction.starttime.toLocaleString());
        html += makeItem("Дата окончания", auction.endtime.toLocaleString());

        if (user?.isadmin === true)
            html += `<div class='uk-margin'><a type="button" class="uk-button uk-button-default" href="/auction/edit">Редактировать</a></div>`;

        block.html(html);
    }
});