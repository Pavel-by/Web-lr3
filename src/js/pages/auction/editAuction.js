const editor = {
    _auction: null,

    auction: async function () {
        if (this._auction === null)
            this._auction = await auctionService.auction();

        return this._auction;
    },
    setSettings: function (settings) {
        if (this._auction != null)
            this._auction.update(settings);
    },
    addUser: function (user) {
        if (this._auction?.includes(user) === false)
            this._auction.users.push(user);
    },
    removeUser: function (user) {
        if (this._auction?.includes(user) === true)
            this._auction.users = this._auction.filter(u => u !== user);
    },
    save: async function() {
        return await auctionService.save(this._auction);
    }
};

async function fillSettings(auction) {
    let convertDate = date => {
        let tmp = new Date(date);
        tmp.setMinutes(tmp.getMinutes() - tmp.getTimezoneOffset());
        return tmp.toISOString().slice(0,16);
    };
    let form = $('#auction-form');
    form.find('input[name="title"]').val(auction.title);
    form.find('input[name="selltimeout"]').val(auction.selltimeout / 1000);
    form.find('input[name="inputpause"]').val(auction.inputpause / 1000);
    form.find('input[name="starttime"]').val(convertDate(auction.starttime));
    form.find('input[name="endtime"]').val(convertDate(auction.endtime));
}

async function saveSettings() {
    let form = $('#auction-form');
    editor.setSettings({
        title: form.find('input[name="title"]').val(),
        selltimeout: form.find('input[name="selltimeout"]').val() * 1000,
        inputpause: form.find('input[name="inputpause"]').val() * 1000,
        starttime: form.find('input[name="starttime"]').val(),
        endtime: form.find('input[name="endtime"]').val(),
    });
    if (!await editor.save())
        alert('Не удалось сохранить настройки. Проверьте правильность заполнения полей');
    else
        window.location = '/';
}

$(document).ready(async function () {
    let saveButton = $('#save-auction');
    saveButton.click(function (e) {
        e.preventDefault();
        saveSettings();
    });
    try {
        let auction = await editor.auction();
        await fillSettings(auction);
    } catch (e) {
        console.log(e);
        alert('Не удалось прочитать настройки');
    }
});