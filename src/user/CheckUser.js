module.exports = {
    checkUser, persistUser, persistUserScores, persistCourseStatus
};


const URL_DB2 = 'localhost';
const URL_DB1 = '91.134.136.204';

function checkUser(username, password, fn){

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

        //console.log('user : ' + username);
        //console.log('pw : ' + password);

        connection.query('SELECT * from users u WHERE u.username = \'' + username +'\' AND u.password = \'' + password + '\'', function(err,rows){
          if(err) {
              console.log("Erreur lors de la requete de check d'un utlisateur dans la base")
          }
          else{
              //console.log(rows);
             var user = {};
              if (rows.length > 0){
                  var row = rows[0];
                  user.connected = 'true';
                  user.coursestatus = row['course_status'];
                  user.score = row.score;
                  user.id = row.id;
                  user.scoreColorGame = row.scoreColorGame;
                  user.avgTimeColorGame = row.avgTimeColorGame;
                  user.scoreTradGame = row.scoreTradGame ;
                  user.avgTimeTradGame = row.avgTimeTradGame;
              }
              else {
                  user.connected = 'false';
              }

              connection.end();
              //console.log("fin connexion a la bdd");
              fn(user);
          }
        });
}

function persistUser(username, password, fn){

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

        //console.log('user : ' + username);
        //console.log('pw : ' + password);

        connection.query('SELECT * from users u WHERE u.username = \'' + username + '\'', function(err,rows){
          if(err) {
              console.log("Erreur lors de la requete de check d'un utlisateur dans la base pour la creation de compte")
          }
          else{
              //console.log(rows);
             var creation = {};
              if (rows.length > 0){
                  creation.success = 'false';
                  connection.end();
                  //console.log("fin connexion a la bdd");
                  fn(creation);
              }
              else {
                  var TABLE = 'users';
                  var query = 'INSERT INTO ' + TABLE +' (username, score, course_status, password) values ('+ '\'' + username + '\'' + ',' +  0 + ',' + 0 + ',' + '\'' +  password + '\'' + ')';
                  //console.log('query : ' + query);
                  connection.query(query,
                      function(err,info) {
                          if (err) {
                              console.log(err);
                              console.log("Erreur lors de la creation de compte")
                          }
                          else {
                              creation.success = 'true';
                              connection.end();
                              //console.log("fin connexion a la bdd");
                              fn(creation)
                          }
                      });
              }
          }
        });
}

function persistUserScores(id, scoreColorGame, avgTimeColorGame, scoreTradGame, avgTimeTradGame, fn){

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



      var TABLE = 'users';
      var query = 'UPDATE ' + TABLE +' SET scoreColorGame = ' + scoreColorGame
                                            + ', avgTimeColorGame = ' + avgTimeColorGame
                                            + ', scoreTradGame = ' + scoreTradGame
                                            + ', avgTimeTradGame = ' + avgTimeTradGame;
                                            + ' WHERE id = ' + id;
      //console.log('query : ' + query);

     var creation = {};
      connection.query(query,
          function(err,info) {
              if (err) {
                  console.log(err);
                  console.log("Erreur lors de l'update de user")
              }
              else {
                  //console.log('update ok');
                  creation.success = 'true';
                  connection.end();
                  fn(creation);
              }
          });
}

function persistCourseStatus(user, fn){

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

      var TABLE = 'users';
      var query = 'UPDATE ' + TABLE +' SET course_status = ' + user.coursestatus
                                            + ' WHERE id = ' + user.id;
      connection.query(query,
          function(err,info) {
              if (err) {
                  console.log(err);
                  console.log("Erreur lors de l'update de user")
              }
              else {
                  //console.log('update ok');
                  connection.end();
                  fn();
              }
          });
}