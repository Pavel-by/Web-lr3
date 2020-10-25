let express = require('express');
let m = require("../models");
let mustAuthenticated = require("./must-authenticated");
let router = express.Router();
let path = require('path');
let root = require('app-root-path');

router.get(
    '/user/:userId/edit',
    mustAuthenticated.user(),
    function (req, res) {
        if (req.params.userId !== req.user._id.toString() && !req.user.isadmin)
            return res.sendStatus(403);

        res.sendFile(path.join(root.path, 'public/html/user/editUser.html'));
    }
);

module.exports = router;