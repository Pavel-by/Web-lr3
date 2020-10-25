const auctionService = {
    UPDATE: 'update',

    _dispatcher: new Dispatcher(),
    _data: null,

    refresh: async function() {
        try {
            let rawData = await $.getJSON('/data/auction');
            this._data = new Auction(rawData);
            this._dispatcher.dispatch('update', this);
            return true;
        } catch (e) {
            return false;
        }
    },
    auction: async function () {
        if (this._data == null)
            await this.refresh();

        return this._data;
    },
    on: function(type, callback) {
        this._dispatcher.on(type, callback);
    },
    save: async function (auction) {
        try {
            let data = JSON.stringify(auction);
            await $.ajax({
                url: '/data/auction',
                contentType: "application/json",
                type: 'PUT',
                data: data,
            });
            await this.refresh();
            return true;
        } catch (e) {
            console.log(e);
            return false;

        }
    }
};