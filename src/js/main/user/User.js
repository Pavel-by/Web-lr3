class User {
    constructor(fields) {
        if (!fields)
            return;

        this.update(fields);
    }

    update(other) {
        if (!other)
            return;

        this._id = other._id || this._id;
        this.name = other.name || this.name;
        this.login = other.login || this.login;
        this.password = other.password || this.password;
        this.money = utils.toNumber(other.money, this.money);
        this.isadmin = utils.toBoolean(other.isadmin, this.isadmin);
        this.isparticipant = utils.toBoolean(other.isparticipant, this.isparticipant);
    }

    _id;
    name;
    login;
    password;
    money;
    isadmin;
    isparticipant;
}