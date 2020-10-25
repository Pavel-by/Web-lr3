let express = require('express');
let m = require("../../models");
let mustAuthenticated = require("../must-authenticated");
let router = express.Router();

router.get('/user', mustAuthenticated.user(), function (req, res) {
    m.User.find({}, function (err, users) {
        if (err) {
            res.status(500);
            return res.send(err);
        }

        return res.send(users);
    });
});

router.get('/user/me', mustAuthenticated.user(), function (req, res) {
    res.send(req.user);
});

router.get('/user/:userId', mustAuthenticated.user(), function (req, res) {
    m.User.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(400);
            return res.send(err);
        }

        return res.send(user);
    })
});

router.put(
    '/user/:userId',
    mustAuthenticated.user(),
    function (req, res, next) {
        if (req.params.userId !== req.user._id.toString() && !req.user.isadmin) {
            return res.sendStatus(403);
        }

        m.User.updateOne(
            {_id: req.params.userId},
            {
                name: req.body.name,
                password: req.body.password,
                money: req.body.money,
                isparticipant: req.body.isparticipant,
            },
            function (err, result) {
                if (err || !result.n) {
                    res.status(500);
                    return res.send(err);
                }

                res.end();
            }
        );
    }
);

router.delete('/user/:userId', mustAuthenticated.user(), function (req, res) {
    if (!req.user.isadmin && req.user._id.toString() !== req.params.userId) {
        return res.sendStatus(403);
    }

    m.User.deleteOne({_id: req.params.userId}, function (err) {
        if (err) {
            res.status(500);
            return res.send(err);
        }

        res.end();
    });
});

module.exports = router;

