
module.exports = {
    submitRating, getRating, updateRating, countAvgRating
};
const URL_DB2 = 'localhost';
const URL_DB1 = '91.134.136.204';
var avgRate = 0;
function submitRating(ratingObject, fn){
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
            //console.log("[Rating] Connexion a la base de donnees ok..");
        } else {
            console.log("[Rating] Erreur lors de la connexion a la base de donnees");
        }
    });
    var query = 'INSERT INTO scores' +' (username, score, rating, date, course, validated) values ('+ '\'' + ratingObject.user + '\'' + ',' + '\'' +  ratingObject.score + '\'' +  ',' + '\'' +  ratingObject.rating + '\'' + ',' + '\'' + ratingObject.date + '\'' + ',' + '\'' +  ratingObject.course + '\'' + ',' + '\'' +  ratingObject.validated + '\'' + ')';
    //console.log(query);
    connection.query(query, function(err, success){
        if(err) {
            console.log("[Rating] Erreur lors de la requete de get des ratings ")
        }
        else{
            //console.log("[Rating] Connexion ok check validated ");
            connection.end();
            //console.log("[Rating] fin connexion a la bdd");
            fn(success);
        }
    });
}
function getRating(username, coursename, fn){
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
    //Get Average Rating
    var avgRating = 0;
    var numberOfRatings = 0;
    //console.log("SELECT * from scores WHERE scores.course = '" + coursename + "'");
    connection.query('SELECT * from scores WHERE scores.course = \'' + coursename + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de get all ratings of a course")
        }
        else{
            //console.log("get average rating of course : " + coursename);
            numberOfRatings = rows.length;
            var totalRating = 0;
            rows.forEach(function(row){
                totalRating += row.rating;
            });
            avgRating = totalRating / numberOfRatings;
            //console.log(avgRating);
        }
    });
    //Get UserRating
    //console.log("SELECT * from scores WHERE   scores.username= '" + username + "' and scores.course = '" + coursename + "'");
    connection.query('SELECT * from scores WHERE   scores.username= \'' + username + '\' and scores.course = \'' + coursename + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de get des ratings ")
        }
        else{
            //console.log("get rating collection : rows" + rows);
            //console.log("average rating : " + avgRating);
            //var scores = [];
            var rating = {};
            rating.numberOfRating = numberOfRatings;
            rating.avgRating = avgRating;
            rows.forEach(function(row){
                rating.username = row.username;
                rating.date = row.date;
                rating.score = row.score;
                rating.rating = row.rating;
                rating.validated = row.validated;
                rating.id = row.id;
                rating.course = row.course;
            });
            connection.end();
            //console.log(rating);
            //console.log("fin connexion a la bdd getRating");
            fn(rating);
        }
    });
}
function updateRating(ratingObject, fn){
    //console.log("La fonction updateRating commence!!!");
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
            //console.log("Erreur lors de la connexion a la base de donnees");
        }
    });
    connection.query('SELECT * from scores WHERE   scores.username= \'' + ratingObject.user + '\' and scores.course = \'' + ratingObject.course + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de get des ratings ")
        }
        else{
            //console.log("get rating collection : rows" + rows);
            if (rows.length > 0){
                //console.log('UPDATE scores SET scores.rating = \'' + ratingObject.rating + '\' , scores.date = \'' + ratingObject.date + '\' WHERE  scores.username= \'' + ratingObject.user + '\' and scores.course = \'' + ratingObject.course + '\'')
                connection.query('UPDATE scores SET scores.rating = \'' + ratingObject.rating + '\' , scores.date = \'' + ratingObject.date + '\' WHERE  scores.username= \'' + ratingObject.user + '\' and scores.course = \'' + ratingObject.course + '\'', function(err,rows){
                    if(err) {
                        console.log("Erreur lors de la requete de mise à jours le rating ")
                    }
                    else{
                        //console.log("fin connexion a la bdd: UPDATE, rating ");
                        //console.log(rating);
                    }
                    //fn(rows);
                    //console.log("La fonction updateRating finit !!!");
                });
            }
            else {
                var query = 'INSERT INTO scores' +' (username, score, rating, date, course, validated) values ('+ '\'' + ratingObject.user + '\'' + ',' + '\'' +  ratingObject.score + '\'' +  ',' + '\'' +  ratingObject.rating + '\'' + ',' + '\'' + ratingObject.date + '\'' + ',' + '\'' +  ratingObject.course + '\'' + ',' + '\'' +  ratingObject.validated + '\'' + ')';
                //console.log(query);
                connection.query(query, function(err, success){
                    if(err) {
                        console.log("Erreur lors de la requete de get des ratings ")

                    }
                    else{
                        //console.log("fin connexion a la bdd INSERT INTO");
                        //console.log(rating);
                    }
                    c//onsole.log("La fonction updateRating finit !!!");
                });
            }
            //Get Average Rating
            var avgRating = 0;
            var numberOfRatings = 0;
            var rating = {};
            //console.log("SELECT * from scores WHERE scores.course = '" + ratingObject.course + "'");
            connection.query('SELECT * from scores WHERE scores.course = \'' + ratingObject.course + '\'', function(err,rows){
                if(err) {
                    console.log("Erreur lors de la requete de get all ratings of a course")
                }
                else{
                    //console.log("get average rating of course : " + ratingObject.course);
                    numberOfRatings = rows.length;
                    var totalRating = 0;
                    rows.forEach(function(row){
                        totalRating += row.rating;
                    });
                    avgRating = totalRating / numberOfRatings;
                    //console.log(avgRating);
                    //console.log("average Rating" + avgRating);
                    rating.numberOfRating = numberOfRatings;
                    rating.avgRating = avgRating;
                    rating.username = ratingObject.user;
                    rating.date = ratingObject.date;
                    rating.score = ratingObject.score;
                    rating.rating = ratingObject.rating;
                    rating.validated = ratingObject.validated;
                    rating.course = ratingObject.course;
                    console.log(rating);
                    fn(rating);
                }
            });
            connection.end();
        }
    });
}

function countAvgRating(coursename, connection, fn)
{
    //console.log("SELECT * from scores WHERE scores.course = '" + coursename + "'");
    connection.query('SELECT * from scores WHERE scores.course = \'' + coursename + '\'', function(err,rows){
        if(err) {
            console.log("Erreur lors de la requete de get all ratings of a course")
        }
        else{
            //console.log("get rating collection : rows" + rows);
            var numberOfRatings = rows.length;
            var avgRating = 0;
            var totalRating = 0;
            rows.forEach(function(row){
                totalRating += row.rating;
            });
            avgRating = totalRating / numberOfRatings;
            //console.log(avgRating);
            //console.log("fin connexion a la bdd, countAvgRating");
            avgRate = avgRating;
            fn(avgRating);
        }
    });
}