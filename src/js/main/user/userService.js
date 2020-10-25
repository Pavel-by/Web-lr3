const userService = {
    CHANGED: 'changed',

    _dispatcher: new Dispatcher(),
    _users: null,

    findById: async function (id) {
        if (this._users === null)
            await this.refreshAll();

        return this._users?.find(user => user._id === id) || null;
    },
    findAll: async function () {
        if (this._users === null)
            await this.refreshAll();

        return this._users;
    },
    refreshAll: function () {
        return new Promise((resolve) => {
            $.getJSON('/data/user')
                .done((data) => {
                    this._users = data.map((json) => new User(json));
                    this._dispatcher.dispatch(this.CHANGED, this);
                    resolve(true);
                })
                .fail(() => {
                    resolve(false);
                });
        });
    },
    on: function(type, callback) {
        this._dispatcher.on(type, callback);
    },
    update: async function (user) {
        try {
            await $.ajax({
                url: `/data/user/${user._id}`,
                contentType: "application/json",
                type: 'PUT',
                data: JSON.stringify(user),
            });
            await this.refreshAll();
            return true;
        } catch (e) {
            return false;
        }
    }
};