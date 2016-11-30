require('strict-mode')(function (){
    "use strict";


    const express = require('express'),
        router = express.Router(),
        wg = require('../solver/WordGenerater'),
        solv = require('../solver/Solver');

    router.get('/getWord/:difficulty', function (req, res) {
        "use strict";
        let difficulty = req.params.difficulty;

        wg.getRandomBinaryWord(difficulty, function(value){
            var resHere = res;
            res.json(value);
        });
    });


    router.get('/check/:userAnswer', function (req, res) {
        "use strict";
        let userAnswer = req.params.userAnswer;
        let binaryAnswer = req.query.binaryWord;

        solv.interpretSolution(userAnswer, binaryAnswer, function(check){
            res.json(check);
        });
    });

    router.get('/persistGame', function (req, res) {
        //console.log('persist game');
        req.session.game = req.query.game;
        res.json({success: 'true'});
    });


    module.exports = router;


})