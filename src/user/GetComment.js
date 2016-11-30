module.exports = {
    submitAndGetComment, getComment, likeComment, disLikeComment
};

const URL_DB2 = 'localhost';
const URL_DB1 = '91.134.136.204';

function submitAndGetComment(commentObject, fn){

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
    
        var query = 'INSERT INTO ' + 'commentaires' +' (username, commentaire, date, course) values ('+ '\'' + commentObject.user + '\'' + ',' + '\'' +  commentObject.commentaire + '\'' +  ',' + '\'' + commentObject.date + '\'' + ',' + '\'' +  commentObject.course + '\'' + ')';
        //console.log(query);
        connection.query(query,
              function(err,info) {
                  if (err) {
                      console.log(err);
                      console.log("Erreur lors de linsert de comm")
                  }
                  else {
                        connection.query('SELECT * from commentaires c WHERE c.course = \'' + commentObject.course + '\'', function(err,rows){
                          if(err) {
                              console.log("Erreur lors de la requete de get des ommentaires apres insert")
                          }
                          else{
                              //console.log(rows);
                             var comments = [];
                              rows.forEach(function(row){
                                 var comment = {};
                                 comment.username = row.username;
                                 comment.date = row.date;
                                 comment.commentaire = row.commentaire;
                                 comment.like = row.like;
                                 comment.dislike = row.dislike;
                                 comment.id = row.id;
                                 comments.push(comment);  
                              });
                              connection.end();
                              //console.log("fin connexion a la bdd");
                              fn(comments);
                          }
                        });
                  }
              });
}

function likeComment(obj, fn) {
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
        connection.query('UPDATE commentaires c SET c.like = c.like+1 WHERE c.id = ' + obj.commentaire, function(err,rows){
          if(err) {
              console.log("Erreur lors de la requete de get des ommentaires apres insert");
              console.log(err);
          }
         else {
                connection.query('SELECT * from commentaires c WHERE c.course = \'' + obj.course + '\'', function(err,rows){
                  if(err) {
                      console.log("Erreur lors de la requete de get des ommentaires apres insert")
                  }
                  else{
                      //console.log(rows);
                     var comments = [];
                      rows.forEach(function(row){
                         var comment = {};
                         comment.username = row.username;
                         comment.date = row.date;
                         comment.commentaire = row.commentaire;
                         comment.like = row.like;
                         comment.dislike = row.dislike;
                         comment.id = row.id;
                         comments.push(comment);  
                      });
                      connection.end();
                      //console.log("fin connexion a la bdd");
                      fn(comments);
                  }
                });
            }
        });

}


function disLikeComment(obj, fn) {
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


        connection.query('UPDATE commentaires c SET c.dislike = c.dislike+1 WHERE c.id =' + obj.commentaire, function(err,rows){
          if(err) {
             console.log("Erreur lors de la requete de get des ommentaires apres insert");
              console.log(err);
          }
         else {
                connection.query('SELECT * from commentaires c WHERE c.course = \'' + obj.course + '\'', function(err,rows){
                  if(err) {
                      console.log("Erreur lors de la requete de get des ommentaires apres insert")
                  }
                  else{
                      //console.log(rows);
                     var comments = [];
                      rows.forEach(function(row){
                         var comment = {};
                         comment.username = row.username;
                         comment.date = row.date;
                         comment.commentaire = row.commentaire;
                         comment.like = row.like;
                         comment.dislike = row.dislike;
                         comment.id = row.id;
                         comments.push(comment);  
                      });
                      connection.end();
                      //console.log("fin connexion a la bdd");
                      fn(comments);
                  }
                });
            }
        });
}

function getComment(course, fn){

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
    
        connection.query('SELECT * from commentaires c WHERE c.course = \'' + course + '\'', function(err,rows){
          if(err) {
              console.log("Erreur lors de la requete de get des ommentaires ")
          }
          else{
              //console.log(rows);
             var comments = [];
              rows.forEach(function(row){
                 var comment = {};
                 comment.username = row.username;
                 comment.date = row.date;
                 comment.commentaire = row.commentaire;
                  comment.like = row.like;
                  comment.dislike = row.dislike;
                  comment.id = row.id;
                 comments.push(comment);  
              });
              connection.end();
              //console.log("fin connexion a la bdd");
              fn(comments);
          }
        });
    
}