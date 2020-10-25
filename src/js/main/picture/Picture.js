class Picture {
    constructor(other) {
        this.update(other);
    }

    update(other) {
        if (!other)
            return;

        this._id = other._id || this._id;
        this.title = other.title || this.title;
        this.description = other.description || this.description;
        this.author = other.author || this.author;
        this.filename = other.filename || this.filename;

        if (this.price != null)
            this.price.update(other.price || {});
        else
            this.price = new PicturePrice(other.price);
    }

    _id;
    title;
    description;
    author;
    filename;
    price;
}

class PicturePrice {
    constructor (other) {
        this.update(other);
    }

    update(other) {
        if (other == null)
            return;

        this.start = other.start;
        this.minstep = other.minstep;
        this.maxstep = other.maxstep;

        if (typeof this.start === 'string')
            this.start = parseFloat(this.start);

        if (typeof this.minstep === 'string')
            this.minstep = parseFloat(this.minstep);

        if (typeof this.maxstep === 'string')
            this.maxstep = parseFloat(this.maxstep);
    }

    start;
    minstep;
    maxstep;
}