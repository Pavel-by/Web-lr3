const pictureService = {
    CHANGED: 'changed',

    _pictures: null,
    _dispatcher: new Dispatcher(),

    refresh: async function() {
        try {
            let data = await $.getJSON('/data/picture');
            this._pictures = data.map((picture) => new Picture(picture));
            this._dispatcher.dispatch(this.CHANGED, this);
            return true;
        } catch (e) {
            return false;
        }
    },
    findAll: async function() {
        if (this._pictures == null)
            await this.refresh();

        return this._pictures;
    },
    findById: async function(id) {
        if (this._pictures == null)
            await this.refresh();

        return this._pictures?.find(p => p._id === id);
    },
    upload: async function (data) {
        try {
            await $.ajax({
                url: '/data/picture',
                contentType: "application/json",
                type: 'PUT',
                data: JSON.stringify(data),
            });
            await this.refresh();
            return true;
        } catch (e) {
            return false;
        }
    },
    update: async function (id, data) {
        try {
            await $.ajax({
                url: `/data/picture/${id}`,
                contentType: "application/json",
                type: 'PUT',
                data: JSON.stringify(data),
            });
            await this.refresh();
            return true;
        } catch (e) {
            return false;
        }
    },
    remove: async function (id) {
        try {
            await $.ajax({
                url: `/data/picture/${id}`,
                type: 'DELETE',
            });
            await this.refresh();
            return true;
        } catch (e) {
            return false;
        }
    },
    on: function (type, callback) {
        this._dispatcher.on(type, callback);
    }
};