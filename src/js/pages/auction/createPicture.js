const editor = {
    _picture: new Picture(),

    picture: async function() {
        return this._picture;
    },

    selectFilename: async function (filename) {
        this._picture?.update({filename: filename});
        redrawFiles();
    }
};

async function redrawFiles() {
    let picture = await editor.picture();
    let files = await fileService.findAll();
    let element = $('.file-watcher-block');

    if (picture == null || files == null)
        return element.html(`<div class="uk-alert uk-alert-warning">Не удалось загрузить файлы</div>`);

    if (files.length === 0)
        return element.html(`<div class="uk-alert">Нет файлов</div>`)

    let html = "";

    files.forEach(file => {
        let selected = file.filename === picture.filename ? "uk-active" : "";
        html += `<li class="${selected}">
            <input type="hidden" name="${file.filename}">
            <a href="#" onclick="editor.selectFilename('${file.filename}')">
                <img src="/public/files/${file.filename}" width="100" alt="">
            </a>
        </li>`;
    });

    html = `<ul class="uk-thumbnav" uk-margin>${html}</ul>`;
    element.html(html);
}

async function save() {
    let picture = await editor.picture();

    picture.update({
        title: $('input[name="title"]').val(),
        description: $('input[name="description"]').val(),
        author: $('input[name="author"]').val(),
        price: {
            start: $('input[name="price-start"]').val(),
            minstep: $('input[name="price-minstep"]').val(),
            maxstep: $('input[name="price-maxstep"]').val(),
        }
    });

    if (await pictureService.upload(picture))
        window.location = '/';
    else
        alert('Не удалось сохранить данные');
}

$(document).ready(function () {
    redrawFiles();
    fileService.on(fileService.CHANGED, redrawFiles);
    pictureService.on(pictureService.CHANGED, redrawFiles);

    $('#upload-image-button').click(function(e) {
        e.preventDefault();
        let input = $('input[name="file"]')[0];

        if (input.files.length === 0)
            return alert('Выберите файл для загрузки');

        let file = input.files[0];
        let data = new FormData();
        data.append('file', file);

        fileService.upload(data);
    });

    $('input[name="file"]').change(function(e) {
        $('#upload-file-name').html(this.files.length > 0 ? this.files[0].name : "Файл не выбран");
    });

    $('#save-picture').click(function(e) {
        save();
    });
});