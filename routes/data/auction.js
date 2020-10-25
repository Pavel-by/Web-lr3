let express = require('express');
let m = require("../../models");
let mustAuthenticated = require("../must-authenticated");
let router = express.Router();
let root = require('app-root-path');
let path = require('path');

router.get('/auction', mustAuthenticated.user(), function (req, res) {
    m.Auction.findOne({}, function (err, auction) {
        if (err || auction == null)
            return res.sendStatus(500);

        return res.send(auction);
    })
});

router.put('/auction', mustAuthenticated.admin(), function (req, res) {
   let auction = new m.Auction(req.body);
   let err = auction.validateSync();

   if (err)
       return res.sendStatus(400);

   m.Auction.findOne({}, function(err, prev) {
       let callback = function(err, auction) {
           if (err)
               return res.sendStatus(500);

           return res.send(auction);
       };

       if (prev != null) {
           m.Auction.updateOne({_id: prev._id}, auction, callback);
       } else {
           (new m.Auction(req.body)).save();
       }
   })
});

module.exports = router;