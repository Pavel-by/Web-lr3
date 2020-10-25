class Auction {
    constructor (other) {
        this.update(other);
    }

    update(other) {
        this._id = other._id || this._id;
        this.title = other.title || this.title;
        this.inputpause = other.inputpause || this.inputpause;
        this.selltimeout = other.selltimeout || this.selltimeout;
        this.pictures = other.pictures || this.pictures;

        if (typeof other.starttime === 'string')
            this.starttime = new Date(other.starttime);
        else
            this.starttime = other.starttime || this.starttime;

        if (typeof other.endtime === 'string')
            this.endtime = new Date(other.endtime);
        else
            this.endtime = other.endtime || this.endtime;
    }

    _id;
    title;
    selltimeout;
    inputpause;
    starttime;
    endtime;
    pictures;
}