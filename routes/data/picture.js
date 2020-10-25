let express = require('express');
let m = require("../../models");
let mustAuthenticated = require("../must-authenticated");
let router = express.Router();
let root = require('app-root-path');
let path = require('path');

router.get('/picture', mustAuthenticated.user(), function (req, res) {
   m.Picture.find({}, function (err, pictures) {
       if (err)
           return res.sendStatus(500);

       return res.send(pictures);
   })
});

router.put('/picture', mustAuthenticated.admin(), function (req, res) {
   let picture = new m.Picture(req.body);
   picture.save(function (err) {
      if (err) {
          res.status(400);
          return res.send(err);
      }

      return res.send(picture);
   });
});

router.put('/picture/:pictureId', mustAuthenticated.admin(), function (req, res) {
    m.Picture.updateOne({_id: req.params.pictureId}, req.body, function (err, picture) {
       if (err) {
           res.status(400);
           return res.send(err);
       }

       return res.send(picture);
    });
});

router.delete('/picture/:pictureId', mustAuthenticated.admin(), function (req, res) {
   m.Picture.deleteOne({_id: req.params.pictureId}, function (err) {
        if (err) {
            res.status(400);
            return res.send(err);
        }

        return res.sendStatus(200);
   });
});

module.exports = router;