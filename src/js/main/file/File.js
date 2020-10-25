class File {
    constructor(fields) {
        this.update(fields);
    }

    update(fields) {
        this._id = fields._id;
        this.originalname = fields.originalname;
        this.filename = fields.filename;
        this.mimetype = fields.mimetype;
    }

    _id;
    originalname;
    filename;
    mimetype;
}