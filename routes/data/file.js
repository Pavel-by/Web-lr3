let express = require('express');
let m = require("../../models");
let mustAuthenticated = require("../must-authenticated");
let router = express.Router();
let multer = require('multer');
let root = require('app-root-path');
let path = require('path');
let uuid = require('uuid');
let fs = require('fs');
let mongoose = require('mongoose');

let destinationPath = path.join(root.path, '/public/files');
let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, done) {
            if (!fs.existsSync(destinationPath))
                fs.mkdirSync(destinationPath, {recursive: true});

            done(null, destinationPath);
        },
        filename: function (req, file, done) {
            let ext = path.extname(file.originalname);
            done(null, uuid.v4() + ext);
        },
    })
});

router.get(
    '/file',
    function (req, res) {
        m.File.find({}, function (err, files) {
           if (err) {
               res.status(500);
               return res.send(err);
           }

           res.send(files);
        });
    }
);

router.get(
    '/file/:fileName',
    function (req, res) {
        m.File.findById(req.params.fileName, function (err, file) {
            if (err) {
                res.status(404);
                return res.send(err);
            }

            res.send(file);
        });
    }
);

router.put(
    '/file',
    mustAuthenticated.admin(),
    upload.single('file'),
    function (req, res) {
        if (!req.file) {
            res.status(400);
            return res.send('No files received');
        }

        let file = new m.File({
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname,
        });
        file.save(function(err) {
            if (err) {
                let filePath = path.join(destinationPath, file.filename);
                if (fs.existsSync(filePath))
                    fs.unlink(filePath);
                res.status(500);
                return res.send(err);
            }

            res.send(file);
        });
    }
);

router.delete(
    '/file/:id',
    mustAuthenticated.admin(),
    function (req, res) {
        m.File.findById(req.params.id, function (err, file) {
            if (err) {
                res.status(500);
                return res.send(err);
            }

            if (!file) {
                return res.status(404).end()
            }

            let filePath = path.join(destinationPath, file.filename);

            if (fs.existsSync(filePath))
                fs.unlink(filePath);

            file.remove();
            res.end();
        });
    }
);

module.exports = router;