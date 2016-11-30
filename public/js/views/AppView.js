define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'MasterGameView',
    'views/SecondGameView',
    'views/NavbarView',
    'views/FooterView',
    'views/AboutUsView',
    'views/HomeView',
    'views/LoginView',
    'views/ConversionView',
    'views/PreGameView',
    'views/UserView',
    'views/CourseView',
    'views/QuizView',
    'models/GameModel',
    'models/GameColorModel',
    'models/UserModel',
    'models/AppModel'
], function ($, _, Backbone, Bootstrap, GameView, GameColorView, NavbarView, FooterView, AboutUsView, HomeView, LoginView,
                                        ConvView, PreGameView, UserView, CourseView, QuizView, 
                                        GameModel, GameColorModel, UserModel, AppModel) {

    var AppView = Backbone.View.extend({
        className: 'appView',
        el: $("body"),
        events: {
            "click #easy-game-btn" : "easyGame",
            "click #avg-game-btn" : "avgGame",
            "click #hard-game-btn" : "hardGame",
            "click #btn-second-game" : "redirectColorGame",
            "click #login-btn" : "login",
            "click #create-account-btn" : "createAccount"
        },
        initialize: function(){
            this.model = new AppModel.Model();
            this.render();
        },
        
        render: 
            function(fn)
            {
                var url_before = window.location.href;
                var self = this;
                $.ajax({
                    url: '/app/init',
                    type: 'GET',
                    datatype: 'json'
                }).then(
                    function result(result) {
                        console.log(result);
                        if (_.isEmpty(result.user)){
                            self.model.user = new UserModel.Model();
                        }
                        else {
                            self.model.user = new UserModel.Model(result.user);
                        }
                        if (!(_.isEmpty(result.game))){
                            self.model.game = new GameModel.Model(result.game);
                        }
                        
                        if (!(_.isEmpty(result.colorgame))){
                            self.model.colorgame = new GameColorModel.Model(result.colorgame);
                        }
                        
                        self.children = {
                            navbarView: new NavbarView({model: self.model.user}),
                            footerView: new FooterView(),
                            aboutUsView: new AboutUsView(),
                            convView: new ConvView(),
                            loginView: new LoginView({model: self.model.user}),
                            preGameView: new PreGameView(),
                            homeView: new HomeView({model: self.model.user}),
                            userView: new UserView({model: self.model.user}),
                            courseView: new CourseView({model: self.model.user}),
                            quizView: new QuizView({model: self.model.user})
                        };
                        var redirect;
                        if ((url_before.split('#').length<2) || (url_before.indexOf('#home') != -1)){
                            redirect='#home';
                        }
                        else {
                            redirect = '#'+url_before.split('#')[1];
                        }
                        self.hide();
                        window.location.href = redirect;
                        if (redirect == '#aboutUs'){
                            self.viewAboutUs();
                        }
                        else if (redirect == '#user'){
                            self.viewUser();
                        }
                        else if (redirect == '#game'){
                            self.viewGame();
                        }
                        else if (redirect == '#course'){
                            self.viewCourse();
                        }
                        else if (redirect == '#quiz'){
                            self.viewQuiz();
                        }
                        else if (redirect == '#home'){
                            self.viewHome();
                        }
                        else if (redirect == '#bindec'){
                            self.children.courseView.displayBinTranslation();
                        }
                        if (fn)
                            fn();
                        return self;
                    },
                    function err(err) {
                        console.log('Erreur sur la connexion au serveur pour l\'initialisaton');
                        console.log(err);
                    }
                );
            },

        redirectHome: 
            function ()
            {
                window.location.href = "#home";
            },
        
        viewHome: 
            function ()
            {
                if (this.children) {
                    console.log("homesweethome");
                    this.hide();
                    this.updateModel();

                    if (this.children) {
                        this.children.homeView.show();
                    }
                    else {
                        $('#home').show();
                    }
                    this.children.navbarView.render();
                }
            },
        updateModel:
            function ()
            {

                this.children.homeView.model = this.children.loginView.model;
                this.children.courseView.model = this.children.loginView.model;
                this.children.quizView.model = this.children.loginView.model;
                this.children.userView.model= this.children.loginView.model;
                this.children.navbarView.model= this.children.loginView.model;
                
                if (this.children.gameView){
                    this.children.gameView.model.user = this.children.loginView.model;
                }

                if (this.children.gameColorView){
                    this.children.homeView.model.user = this.children.loginView.model;
                }
                
            },

        viewCourse: 
            function() 
            {
                if (this.children) {
                    this.hide();
                    this.children.courseView.show();
                }
            },
        
        viewHomeCourse: 
            function() 
            {
                if (this.children) {
                    this.hide();
                    this.children.courseView.initialize();
                }
            },

        viewQuiz:
            function()
            {
                if (this.children) {
                    this.hide();
                    this.children.quizView.show();
                }
            },
        
        viewHomeQuiz: 
            function() 
            {
                if (this.children) {
                    this.hide();
                    this.children.quizView.initialize();
                }
            },

        viewAboutUs: 
            function () 
            {
                if (this.children) {
                    this.hide();
                    this.children.footerView.show();
                    $('#background-image').empty();
                    this.children.aboutUsView.show();
                    $('#aboutUs').show();
                }
            },
        
        viewUserLogout: 
            function()
            {
                if (this.children) {
                    this.children.loginView.logOut();
                }
            },

        logOut:
            function(){
                this.updateModel();
                this.children.navbarView.render();
                this.redirectHome();
            },
        
        viewUser:  
            function() 
            {
                if (this.children) {
                    this.hide();
                    this.updateModel();
                    //if (!this.children.userView.model.username)
                        //this.children.userView.model = this.children.loginView.model;
                    this.children.userView.show();
                    this.children.navbarView.render();
                }
            },

        easyGame :
            function()
            {
                this.viewGame('easy');
                this.redirectGame();
            },

        avgGame :
            function()
            {
                this.viewGame('avg');
                this.redirectGame();
            },

        hardGame :
            function()
            {
                this.viewGame('hard');
                this.redirectGame();
            },

        redirectGame :
            function()
            {
                window.location.href = "#game";
            },
        
        redirectColorGame :
            function()
            {
                window.location.href = "#colorgame";
            },
        
        viewGame: 
            function(difficulty)
            {
                if (this.children) {

                    this.hide();
                    if (!difficulty) {
                        difficulty = 'easy';
                    }
                    if (this.children.gameView){
                        this.children.gameView.show();
                    }
                    else {
                        if (!this.model.game){
                            this.model.game = new GameModel.Model();
                            this.model.game.attributes.difficulty = difficulty;
                            this.children.gameView = new GameView({model: this.model});
                        }
                        else {
                            this.children.gameView = new GameView({model: this.model});
                        }

                        $('#game').append(this.children.gameView.el);
                    }
                }
            },
        
        viewColorGame: 
            function()
            {
                if (this.children) {
                    this.hide();
                    if (!this.children.gameColorView) {
                        if (!this.model.colorgame){
                            this.model.colorgame = new GameColorModel.Model();
                            this.children.gameColorView = new GameColorView({model: this.model});
                        }
                        else {
                            this.children.gameColorView = new GameColorView({model: this.model});
                        }

                        $('#game2').append(this.children.gameColorView.el);
                    }
                    else {
                        this.children.gameColorView.show();
                    }
                }
            },
        
        login :
            function()
            {
                this.children.loginView.logIn();
            },
        
        createAccount :
            function()
            {
                this.children.loginView.createAccount();
            },
        
        hide: 
            function()
            {
                if (this.children) {
                    if (this.children.gameView)
                        this.children.gameView.hide();

                    if (this.children.gameColorView)
                        this.children.gameColorView.hide();
                    
                    this.children.homeView.hide();
                    this.children.userView.hide();
                    this.children.courseView.hide();
                    this.children.quizView.hide();

                    $('#base').hide();
                    $('#quiz').hide();
                    $('#aboutUs').hide();
                    $('#footer').hide();

                    $('#gameAlert').modal('hide');
                    $('#login').modal('hide');
                }
            }
    });

    return AppView;

});
