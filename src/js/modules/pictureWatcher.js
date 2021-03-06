$(document).ready(function () {
    let refresh = async () => {
        let elements = $('.picture-watcher-block');
        let pictures = await pictureService.findAll();
        let user = await authService.user();

        elements.html("");

        if (pictures === null || user == null)
            elements.html(`<div uk-alert class="uk-alert-warning">Не удалось загрузить данные</div>`);
        else if (pictures.length === 0) {
            elements.html(`<div uk-alert class="uk-alert-primary">Нет картин</div>`);
        } else {
            let html = "";
            pictures.forEach(picture => {
                let titleSuffix = "";

                if (user?.isadmin === true)
                    titleSuffix = `
                        <a href="/auction/picture/${picture._id}/edit" class="uk-margin-small-left" uk-icon="pencil"></a>
                    `;

                html += `
                <div class="uk-card uk-card-default uk-margin uk-grid-collapse" uk-grid>
                    <div class="uk-background-cover uk-width-1-3" 
                        style="background-image: url(/public/files/${picture.filename});">
                    </div>
                    <div class="uk-width-2-3">
                        <div class="uk-card-body">
                            <div class="uk-card-badge">
                                <span class="uk-label">${picture.author}</span>
                                <span class="uk-label uk-label-warning">${picture.price.start}руб</span>
                            </div>
                            <h3 class="uk-card-title">${picture.title}${titleSuffix}</h3>
                            <p>${picture.description}</p>
                        </div>
                    </div>
                </div>
                `;
            });

            if (user?.isadmin === true)
                html += `<a class="uk-button uk-button-default" href="/auction/picture/add">Добавить картину</a>`

            elements.html(`<div>${html}</div>`);
        }
    };

    pictureService.on(pictureService.CHANGED, refresh);
    pictureService.findAll().then(refresh);
    authService.addEventListener(authService.LOGIN, refresh);
});