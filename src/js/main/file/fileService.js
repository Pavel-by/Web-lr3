const fileService = {
    CHANGED: "changed",

    _files: null,
    _dispatcher: new Dispatcher(),

    refresh: async function () {
        try {
            this._files = await $.getJSON('/data/file');
            this._dispatcher.dispatch(this.CHANGED, this);
            return true;
        } catch (e) {
            return false;
        }
    },
    findById: async function (id) {
        let files = await this.findAll();
        return files?.find((file) => file._id === id);
    },
    findAll: async function () {
        if (this._files == null)
            await this.refresh();

        return this._files;
    },
    upload: async function (data) {
        try {
            await $.ajax({
                url: "/data/file",
                contentType: false,
                processData: false,
                data: data,
                type: "PUT",
                dataType: "json",
            });
            await this.refresh();
            return true;
        } catch (e) {
            return false;
        }
    },
    remove: async function (id) {
        try {
            await $.delete(`/data/file/${id}`);
            await this.refresh();
            return true;
        } catch (e) {
            return false;
        }
    },
    on: function (type, callback) {
        this._dispatcher.on(type, callback);
    },
};