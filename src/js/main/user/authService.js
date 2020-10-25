const authService = {
    LOGIN: "login",
    LOGOUT: "logout",

    _userId: null,
    _synchronized: false,
    _listeners: {},

    _dispatch: function (type, event) {
        let listeners = this._listeners[type];

        if (!listeners)
            return;


        listeners.forEach((listener) => listener(this));
    },

    _synchronizeIfNeed: async function () {
        if (!this._synchronized)
            await this._synchronize();
    },
    _synchronize: async function () {
        try {
            let user = await $.getJSON('/data/user/me');
            this._userId = user._id;
        } catch (e) {
            this._userId = null;
        } finally {
            this._synchronized = true;
        }
    },

    login: async function (data) {
        try {
            let user = await $.post('/login', data);
            this._userId = user._id;
            this._dispatch(this.LOGIN, this);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    register: async function (data) {
        try {
            let user = await $.post('/register', data);
            this._userId = user._id;
            this._dispatch(this.LOGIN, this);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    logout: async function () {
        try {
            await $.post('/logout');
            this._userId = null;
            this._dispatch(this.LOGOUT, this);
            return true;
        } catch (e) {
            return false;
        }
    },

    userId: async function () {
        if (this._userId != null)
            return this._userId;

        try {
            await this._synchronize();
            return this._userId;
        } catch (e) {
            return null;
        }
    },
    user: async function () {
        let userId = await this.userId();

        return userId !== null ? userService.findById(userId) : null;
    },
    isLoggedIn: async function () {
        return await this.userId() != null;
    },
    addEventListener: function (type, listener) {
        if (typeof listener !== 'function')
            return;

        if (!this._listeners[type])
            this._listeners[type] = [];

        this._listeners[type].push(listener);
    },
};