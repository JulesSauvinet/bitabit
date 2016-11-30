/**
 * Created by Nobinuti on 06/05/2016.
 */
// Filename: Router.js
define([
    'jquery',
    'jquery_ui',
    'underscore',
    'backbone',
    'views/AppView'
    //'models/*'
], function($, jUI, _, Backbone, AppView){
    var Router = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'default',
            'home': 'home',
            'course' : 'course',
            'quiz' : 'quiz',
            'aboutUs' : 'aboutUs',
            'user' : 'user',
            'userLogout' : 'userLogout',
            'game' : 'game',
            'colorgame' : 'colorgame',
            'logout' : 'logout',

            /*Partie Cours*/
            'showcourse' : 'showCourse',
            'bindec' : 'bindec',
            'binlog' : 'binlog',
            'binSumSub' : 'binsumsub',
            'binMultDiv' : 'binmultdiv',
            'bingame' : 'bingame',
            'hexdec' : 'hexdec',
            'hexbin' : 'hexbin',

            /*Partie Quiz*/
            'showquiz' : 'showQuiz',
            'bindecquiz' : 'bindecQuiz',
            'binlogquiz' : 'binlogQuiz',
            'binSumSubquiz' : 'binsumsubQuiz',
            'binMultDivquiz' : 'binmultdivQuiz',
            'hexdecquiz' : 'hexdecQuiz',
            'hexbinquiz' : 'hexbinQuiz'
        },

        initialize: function(){
            this.App = new AppView();
        },
        default: function(){
            window.location = "#home";
        },
        home: function(){
            this.App.viewHome();
        },
        course: function(){
            this.App.viewHomeCourse();
        },

        quiz: function(){
            this.App.viewHomeQuiz();
        },

        aboutUs: function(){
            this.App.viewAboutUs();
        },

        user: function(){
            this.App.viewUser();
        },

        userLogout: function(){
            this.App.viewUserLogout();
        },
        
        logout: function(){
            this.App.logOut();
        },

        game: function(){
            // do something here
            this.App.viewGame();
        },

        colorgame: function(){
            // do something here
            this.App.viewColorGame();
        },
        
        /*Partie Cours*/
        showCourse : function(){
            this.App.viewCourse();
            var destination = window.location.href.split('?')[1];
            window.location = '#' + destination;
        },
        
        bindec: function(){
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayBinTranslation();
            }
        },
        
        binlog: function(){
            // do something here
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayBinLogical();
            }
            //this.App.children.courseView.displayBinLogical();
        },

        binsumsub: function(){
            // do something here
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayBinSumSub();
            }
        },

        binmultdiv: function(){
            // do something here
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayBinMultDiv();
            }
        },

        bingame: function(){
            // do something here
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayBinGame();
            }
        },
        
        hexdec: function(){
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayHexTranslation();
            }
        },

        hexbin: function(){
            this.App.viewCourse();
            if (this.App.children) {
                this.App.children.courseView.displayHexBinTranslation();
            }
        },

        //--------------------

        /*Partie Quiz*/
        showQuiz : function(){
            this.App.viewQuiz();
            var destination = window.location.href.split('?')[1];
            var url = '#' + destination;
            window.location = url;
        },

        bindecQuiz: function(){
            this.App.viewQuiz();
            this.App.children.quizView.displayBinDecQuiz();
        },

        binlogQuiz: function(){
            // do something here
            this.App.viewQuiz();
            this.App.children.quizView.displayBinLogQuiz();
        },

        binsumsubQuiz: function(){
            // do something here
            this.App.viewQuiz();
            this.App.children.quizView.displaySumSubQuiz();
        },

        binmultdivQuiz: function(){
            // do something here
            this.App.viewQuiz();
            this.App.children.quizView.displayMultDivQuiz();
        },

        hexdecQuiz: function(){
            this.App.viewQuiz();
            this.App.children.quizView.displayHexDecQuiz();
        },

        hexbinQuiz: function(){
            this.App.viewQuiz();
            this.App.children.quizView.displayHexBinQuiz();
        }

        //---------------------
        
    });

    var initialize = function(){
        var router = new Router;
        //_.bindAll(this, 'home', 'bindec', 'hexdec', 'cryptMsgGame', 'aboutUs');

        Backbone.history.start();
        return router;
    };

    return {
        initialize: initialize
    };
});
