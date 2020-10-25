let express = require('express');
let m = require("../models");
let mustAuthenticated = require("./must-authenticated");
let router = express.Router();
let path = require('path');
let root = require('app-root-path');

router.get(
    '/',
    mustAuthenticated.user({failureRedirect: '/login'}),
    function (req, res) {
        res.sendFile(path.join(root.path, 'public/html/auction/main.html'));
    }
);

router.get(
    '/auction/edit',
    mustAuthenticated.admin(),
    function (req, res) {
        res.sendFile(path.join(root.path, 'public/html/auction/editAuction.html'));
    }
);

router.get(
    '/auction/lot/edit',
    mustAuthenticated.admin(),
    function (req, res) {
        res.sendFile(path.join(root.path, 'public/html/auction/editAuctionLots.html'));
    }
);

router.get(
    '/auction/picture/add',
    mustAuthenticated.admin(),
    function (req, res) {
        res.sendFile(path.join(root.path, 'public/html/auction/createPicture.html'));
    }
);

router.get(
    '/auction/picture/*/edit',
    mustAuthenticated.admin(),
    function (req, res) {
        res.sendFile(path.join(root.path, 'public/html/auction/editPicture.html'));

    }
);

module.exports = router;