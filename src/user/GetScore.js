/**
 * Created by Nobinuti on 05/06/2016.
 */
module.exports = {
    submitScore, getScore, updateScore, checkValidated
};


const URL_DB2 = 'localhost';
const URL_DB1 = '91.134.136.204';

function checkValidated(username, course, fn){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : URL_DB1,
        port     :  3306,
        user     : 'root',
        password : 'bitabit69',
        database : 'bitabit'
    });

    connection.connect(function(err){
        if(!err) {
            //console.log("[checkValidated] Connexion a la base de donnees ok..");
        } else {
            console.log("[checkValidated] Erreur lors de la connexion a la base de donnees");
        }
    });

    connection.query('SELECT s.validated from scores s WHERE scores.username= \'' + username + 'and scores.course = \'' + course + '\'', function(err,isValidated){
        if(err) {
            console.log(" [checkValidated] Erreur lors de la requete de get des scores ")
        }
        else{
            //console.log("[checkValidated] Connexion ok check validated ");
            connection.end();
            //console.log("[checkValidated] Fin connexion a la bdd");
            fn(isValidated);
        }
    });

}

function submitScore(scoreObject, fn){

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : URL_DB1,
        port     :  3306,
        user     : 'root',
        password : 'bitabit69',
        database : 'bitabit'
    });

    connection.connect(function(err){
        if(!err) {
            //console.log("Connexion a la base de donnees ok..");
        } else {
            console.log("Erreur lors de la connexion a la base de donnees");
        }
    });

    var query = 'INSERT INTO scores' +' (username, score, date, course, validated) values ('+ '\'' + scoreObject.user + '\'' + ',' + '\'' +  scoreObject.score + '\'' +  ',' + '\'' + scoreObject.date + '\'' + ',' + '\'' +  scoreObject.course + '\'' + ',' + '\'' +  scoreObject.validated + '\'' + ')';
    console.log(query);
    connection.query(query, function(err, success){
        if(err) {
            console.log("Erreur lors de la requete de get des scores ")
        }
        else{
            //console.log("Connexion ok check validated ");
            connection.end();
            //console.log("fin connexion a la bdd");
            fn(success);
        }
    });

}

function getScore(username, fn){

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : URL_DB1,
        port     :  3306,
        user     : 'root',
        password : 'bitabit69',
        database : 'bitabit'
    });

    connection.connect(function(err){
        if(!err) {
            //console.log("Connexion a la base de donnees ok..");
        } else {
            console.log("Erreur lors de la connexion a la base de donnees");
        }
    });

    connection.query('SELECT * from scores s WHERE scores.username= \'' + username + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de get des scores ")
        }
        else{
            //console.log("get score collection : rows" + rows);
            /*
            var scores = [];
            rows.forEach(function(row){
                var score = {};
                score.id = row.id;
                score.username = row.username;
                score.date = row.date;
                score.course = row.course;
                score.score = row.score;
                score.validated = row.validated;
                scores.push(score);
            });
            connection.end();
            console.log("fin connexion a la bdd");
             */
            fn(scores);

        }
    });
}

function updateScore(scoreObject, fn){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : URL_DB1,
        port     :  3306,
        user     : 'root',
        password : 'bitabit69',
        database : 'bitabit'
    });

    connection.connect(function(err){
        if(!err) {
            //console.log("Connexion a la base de donnees ok..");
        } else {
            console.log("Erreur lors de la connexion a la base de donnees");
        }
    });

    connection.query('UPDATE scores SET scores.score = \'' + scoreObject.score + '\' , scores.date = \'' + scoreObject.date + '\' , scores.validated = \'' + scoreObject.validated + 'WHERE  scores.username= \'' + scoreObject.username + 'and scores.course = \'' + scoreObject.course + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de mise à jours le score ")
        }
        else{
            connection.end();
            //console.log("fin connexion a la bdd");
            fn(scores);
        }
    });

}