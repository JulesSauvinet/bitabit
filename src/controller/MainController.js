require('strict-mode')(function (){
    "use strict";

    const express = require('express'),
        router = express.Router();


    router.get('/init', function (req, res) {
        var user;
        //console.log(req.session);
        var game;
        var colorgame;
        if (typeof(req.session.user) == 'undefined') {
            user = {};
        }
        else {
            user = req.session.user;
        }
        if (typeof(req.session.game) == 'undefined') {
            game= {};
        }
        else {
            game = req.session.game;
        }
        if (typeof(req.session.colorgame) == 'undefined') {
            colorgame= {};
        }
        else {
            colorgame = req.session.game;
        }
        var model = {
            user: req.session.user,
            game : req.session.game,
            colorgame : req.session.colorgame
        };
        res.json(model);
    });

    module.exports = router;
});


