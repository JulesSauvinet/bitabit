var express = require('express');
var http = require('http');
var app = module.exports = express();
var bodyparser = require('body-parser');
var session = require('cookie-session');



//Pour la partie coté serveur//
//app.server = http.createServer(app);
app.listen('3000');
//app.listen('8080','91.134.136.204');
//app.listen('8080');
//app.listen('3000','91.134.136.204');


app.use(bodyparser.json());
app.use('/', express.static(__dirname + '/public'));

/* On utilise les sessions */
app.use(session({secret: 'bitabittopsecret'}));

var maincontroller =  require('./src/controller/MainController');
app.use('/app', maincontroller);

var solvercontroller =  require('./src/controller/SolverController');
app.use('/solver', solvercontroller);

var usercontroller =  require('./src/controller/UserController');
app.use('/user', usercontroller);
app.use('/comment', usercontroller);
app.use('/score', usercontroller);
app.use('/rating', usercontroller);




app.get('/css/:file', function (req, res) {
    res.sendFile(__dirname + '/public/css/' + req.params.file);
});

app.get('/bootstrap/css/:file', function(req, res){
    res.sendFile(__dirname + '/public/bower_components/bootstrap/dist/css/' + req.params.file);
});

app.get('/bootstrap/fonts/:file', function(req, res){
    res.sendFile(__dirname + '/public/bower_components/bootstrap/fonts/' + req.params.file);
});

app.get('/libs/:folder/:file', function (req, res) {
    res.sendFile(__dirname + '/public/js/libs/' +  req.params.folder + '/' +  req.params.file);
});

app.get('/js/:file', function (req, res) {
    res.sendFile(__dirname + '/public/js/' +  req.params.file);
});

app.get('/js/:folder/:file', function (req, res) {
    res.sendFile(__dirname+ '/public/js/' +  req.params.folder  + '/' +  req.params.file);
});

app.get('/templates/:file', function(req, res){
    res.sendFile(__dirname + '/public/templates/' + req.params.file);
});

app.get('/images/:file', function(req, res){
    res.sendFile(__dirname + '/public/images/' + req.params.file);
});

app.get('/quizImg/:file', function(req, res){
    res.sendFile(__dirname + '/data/quiz-img/' + req.params.file);
});

app.get('/quiz/:file', function(req, res){
    res.sendFile(__dirname + '/data/quiz/' + req.params.file);
});