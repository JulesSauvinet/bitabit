require('strict-mode')(function (){
    "use strict";
    const express = require('express'),
        router = express.Router(),
        cu = require('../user/CheckUser'),
        gc = require('../user/GetComment'),
        gs = require('../user/GetScore'), //getScore
        gr = require('../user/GetRating'); //getRating


    /* sha1 le password */
    router.get('/connect/:user', function (req, res) {
        let password = req.query.password;
        let user = req.params.user;

        cu.checkUser(user, password, function(value){
            res.json(value);
        });
    });

    /* sha1 le password */
    router.get('/create/:user', function (req, res) {
        let password = req.query.password;
        let user = req.params.user;

        cu.persistUser(user, password, function(value){
            res.json(value);
        });
    });

    router.get('/deconnect', function (req, res) {
        req.session.user = undefined;
        req.session.game = undefined;
        res.json({success: 'true'});
    });

    router.get('/persistCo', function (req, res) {
        req.session.user = req.query.user;
        res.json({success: 'true'});
    });

    router.get('/colorgame', function (req, res) {
        req.session.user = req.query.user;
        var user = req.query.user;
        var scoreColorGame = user.scoreColorGame;
        var avgTimeColorGame = user.avgTimeColorGame;
        var scoreTradGame = user.scoreTradGame;
        var avgTimeTradGame = user.avgTimeTradGame;
        var id = user.id;

        //console.log(user.scoreColorGame);
        //console.log(user.avgTimeColorGame);
        //console.log(user.scoreTradGame);
        //console.log(user.avgTimeTradGame);
        cu.persistUserScores(id, scoreColorGame, avgTimeColorGame, scoreTradGame, avgTimeTradGame, function(value){
            res.json({success: 'true'});
        });

    });

    router.get('/comment', function (req, res) {
        var commentObject = req.query.commentaire;
        gc.submitAndGetComment(commentObject, function(comments){
            res.json(comments);
        });
    });

    router.get('/all', function (req, res) {
        var commentObject = req.query.course;
        gc.getComment(commentObject, function(comments){
            res.json(comments);
        });
    });

    router.get('/like', function (req, res) {
        var obj = req.query.obj;
        gc.likeComment(obj, function(comments){
            res.json(comments);
        });
    });

    router.get('/dislike', function (req, res) {
        var obj = req.query.obj;
        gc.disLikeComment(obj, function(comments){
            res.json(comments);
        });
    });

    router.get('/coursestatus', function (req, res) {
        var user = req.query.user;
        req.session.user = user;
        cu.persistCourseStatus(user, function(){
            //console.log('persist coursestatus ok');
            res.status(200).end();
        });
    });


    /* Score */
    //getScoreOneCourse
    router.get('/course', function (req, res) {
        var scoreObject = req.query.score;
        gs.getScore(scoreObject, function(user){
            res.json(user);
        });
    });

    //getScoreAllCourses
    router.get('/courses', function (req, res) {
        let user = req.query.user;
        gs.getScoresAllCourses(user, course, function(user){
            res.json(user);
        });
    });

    //checkValidated
    router.get('/:user/:course', function (req, res) {
        let user = req.query.user;
        let course = req.params.course;
        gs.checkValidated(user, course, function(validated){
            res.json(validated);
        });
    });


    /* Rating */
    router.get('/userRating', function (req, res) {
        var ratingObject = req.query.rating;
        gr.getRating(
            ratingObject.user,
            ratingObject.course,
            function(ratingObject){
                res.json(ratingObject);
            });
    });

    //update rating
    router.get('/rating', function (req, res) {
        var ratingObject = req.query.rating;
        gr.updateRating(ratingObject, function(ratingObject){
            res.json(ratingObject);
        });
    });


    module.exports = router;
});