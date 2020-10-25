class Dispatcher {
    constructor () {
        this._listeners = {};
    }

    on (type, callback) {
        if (typeof callback !== 'function')
            return;

        if (this._listeners[type] === undefined)
            this._listeners[type] = [];

        this._listeners[type].push(callback);
    }

    dispatch (type, event) {
        if (this._listeners[type] === undefined)
            return;

        this._listeners[type].forEach((listener) => listener(event));
    }
}