define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'rating',
    'text!../../templates/courses/courseMain.html',
    'text!../../templates/courses/bindecTranslationCourse.html',
    'text!../../templates/courses/bindecLogicalCourse.html',
    'text!../../templates/courses/bindecSumSubCourse.html',
    'text!../../templates/courses/bindecMultDivCourse.html',
    'text!../../templates/courses/bindecTranslationExo.html',
    'text!../../templates/courses/hexdecTranslationCourse.html',
    'text!../../templates/courses/hexbinTranslationCourse.html'
], function ($, _, Backbone, Bootstrap, Rating, CourseTemplate, BinDecTemplate, BinLogicTemplate, BinSumSubTemplate, BinMultDivTemplate, BinGameTemplate,
             HexDecTemplate, HexBinTemplate) {
    var course;
    var CourseView = Backbone.View.extend({
        el: $('#base'),
        events: {
            /* Lancer le premier cours */
            "click #start-course-btn"       :       "startCourse",
            "click #submit-commentaire"     :       "submitCommentaire",
            /* Aller en haut de la page */
            "click #btn-bindec-up"          :       "topOfBinTransPage",
            "click #btn-binlog-up"          :       "topOfBinLogPage",
            "click #btn-binsumsub-up"       :       "topOfBinSumSubPage",
            "click #btn-binmultdiv-up"      :       "topOfBinMultDivPage",
            "click #btn-hexdec-up"          :       "topOfHexDecPage",
            "click #btn-hexbin-up"          :       "topOfHexBinPage",
            /* Aller a la page de cours précédente */
            "click #btn-binlog-back"        :       "goToBinTrans",
            "click #btn-binsumsub-back"     :       "goToBinLog",
            "click #btn-binmultdiv-back"    :       "goToBinSumSub",
            "click #btn-hexdec-back"        :       "goToBinMultDiv",
            "click #btn-hexbin-back"        :       "goToHexDec",
            /* Aller a la page de cours suivante */
            "click #btn-bindec-next"        :       "goToBinLog",
            "click #btn-binlog-next"        :       "goToBinSumSub",
            "click #btn-binsumsub-next"     :       "goToBinMultDiv",
            "click #btn-binmultdiv-next"    :       "goToHexDec",
            "click #btn-hexdec-next"        :       "goToHexBin",
            /* Retourner a la page d'accueil */
            "click #btn-home"               :       "goToHomePage",
            /* Afficher le jeu d'entrainement à la conversion binaire/décimal */
            "click #btn-bindec-game"        :       "displayBinGame",
            "click #btn-hexdec-game"        :       "displayHexGame",
            /* Aller à la page quiz */
            "click #btn-bindec-quiz"        :       "goToBinDecQuiz",
            "click #btn-binlog-quiz"        :       "goToBinLogQuiz",
            "click #btn-binsumsub-quiz"     :       "goToBinSumSubQuiz",
            "click #btn-binmultdiv-quiz"    :       "goToBinMultDivQuiz",
            "click #btn-hexdec-quiz"        :       "goToHexDecQuiz",
            "click #btn-hexbin-quiz"        :       "goToHexBinQuiz"
        },
        initialize: function (){
            this.$el.html(CourseTemplate);
            this.render();
            course = this;
        },
        render: function() {
            this.$el.show();
            $('#background-image').empty();
            $('.main-course-content').css('width', '0%');
            $('.start-course-container').css('width', '75%').show();
            $('#start-course-btn').show();
            $('.start-course-btn').show();
            return this;
        },
        remove: function(){
            this.$el.empty();
        },
        reset: function(){
            $('.main-course-content').css('width', '75%');
            $('.start-course-container').css('width', '0%').hide();
            $('#start-course-btn').hide();
            $('.start-course-btn').hide();
            $('#courseBinDec').empty();
            $('#courseHexDec').empty();
        },
        hide : function(){
            this.$el.hide();
        },
        hideAll : function(){
            $('#start-course-btn').hide();
            $('#courseBinDec').hide();
            $('#courseHexDec').hide();
        },
        show: function(){
            $('.main-course-content').css('width', '75%');
            $('.start-course-container').css('width', '0%');
            $('.start-course-container').hide();
            $('#start-course-btn').hide();
            $('.start-course-btn').hide();
            $('#background-image').empty();
            this.$el.show();
        },
        startCourse: function() {
            $('#start-course-btn').hide();
            window.location.href="#bindec";
            this.displayBinTranslation();
        },
        /* Aller en haut des pages des cours */
        topOfBinTransPage: function(){
            var url = window.location.href;
            window.location.href="#topBinDec";
            window.location.href = url;
        },
        topOfBinLogPage: function(){
            var url = window.location.href;
            window.location.href="#topBinLog";
            window.location.href = url;
        },
        topOfBinSumSubPage: function () {
            var url = window.location.href;
            window.location.href="#topBinSumSub";
            window.location.href = url;
        },
        topOfBinMultDivPage: function () {
            var url = window.location.href;
            window.location.href="#topBinMultDiv";
            window.location.href = url;
        },
        topOfHexDecPage: function () {
            var url = window.location.href;
            window.location.href="#topHexDec";
            window.location.href = url;
        },
        topOfHexBinPage: function () {
            var url = window.location.href;
            window.location.href="#topHexBin";
            window.location.href = url;
        },
        /* Aller au cours d'avant/d'après-> Migrer au router?*/
        goToBinTrans: function(){
            window.location.href = "#bindec";
            this.appendBinDecTemplate(BinDecTemplate);
        },
        goToBinLog: function(){
            window.location.href = "#binlog";
            this.appendBinDecTemplate(BinLogicTemplate);
        },
        goToBinSumSub: function(){
            window.location.href = "#binsumsub";
            this.appendBinDecTemplate(BinSumSubTemplate);
        },
        goToBinMultDiv: function(){
            window.location.href = "#binmultdiv";
            this.appendBinDecTemplate(BinMultDivTemplate);
        },
        goToHexDec: function(){
            window.location.href = "#hexdec";
            this.appendBinDecTemplate(HexDecTemplate);
        },
        goToHexBin: function(){
            window.location.href = "#hexbin";
            this.appendBinDecTemplate(HexBinTemplate);
        },
        goToHomePage: function(){
            window.location.href = "#home";
        },
        /* Aller à la page quiz */
        goToBinDecQuiz: function () {
            window.location.href="#bindecquiz";
        },
        goToBinLogQuiz: function () {
            window.location.href="#binlogquiz";
        },
        goToBinSumSubQuiz: function () {
            window.location.href="#binSumSubquiz";
        },
        goToBinMultDivQuiz: function () {
            window.location.href="#binMultDivquiz";
        },
        goToHexDecQuiz: function () {
            window.location.href="#hexdecquiz";
        },
        goToHexBinQuiz: function () {
            window.location.href="#hexbinquiz";
        },
        /* Afficher les cours en ajoutant les templates et supprimant l'ancien */
        displayBinGame: function(){
            this.appendBinDecTemplate(BinGameTemplate);
        },
        displayBinTranslation: function () {
            this.appendBinDecTemplate(BinDecTemplate);
        },
        displayBinLogical: function (){
            this.appendBinDecTemplate(BinLogicTemplate);
        },
        displayBinSumSub: function(){
            this.appendBinDecTemplate(BinSumSubTemplate);
        },
        displayBinMultDiv: function(){
            this.appendBinDecTemplate(BinMultDivTemplate);
        },
        displayHexTranslation: function () {
            this.appendHexDecTemplate(HexDecTemplate);
        },
        displayHexBinTranslation: function () {
            this.appendHexDecTemplate(HexBinTemplate);
        },
        /* Ajouter génériquement un template */
        appendBinDecTemplate: function(template){
            var compiledTemplate = _.template(template);
            this.reset();
            $('#courseBinDec').append(compiledTemplate);
            if (this.model.attributes.username){
                this.addRatingWidget();
            }
            var self = this;
            self.model.attributes.commentLimit = 10;
            $(document).on('click','.arrow',function(){
                self.model.attributes.commentLimit += 10;
                self.getComment();
            });
            if (this.model.attributes.username){
                $('#commentaires-list').css('margin-top','150px');
                $('#commentaire-edit').html("<div class=\"commentaire-edit-div\">" +
                    "<textarea id = \"commentaire-area\" class=\"form-control comment-edition\" placeholder=\"Message\"></textarea></div>"
                    +"<button id =\"submit-commentaire\" type=\"button\" class=\"btn btn-default submit-commentaire\">Envoyer</button>");
            }
            $.ajax({
                url: '/comment/all',
                type: 'GET',
                data : {course :  $(".transparent-course-name").attr('id')},
                datatype : 'json'
            }).then(
                function result(result){
                    self.model.attributes.commentLimit = 10;
                    self.displayComment(result);
                },
                function err(err){
                    console.log("Erreur sur l\'afficahge des comms");
                    console.log(err);
                }
            )
        },
        appendHexDecTemplate: function(template){
            var compiledTemplate = _.template(template);
            this.reset();
            //$('#courseHexDec').empty;
            $('#courseHexDec').append(compiledTemplate);
            if (this.model.attributes.username){
                this.addRatingWidget();
            }
            var self = this;
            self.model.attributes.commentLimit = 10;
            $(document).on('click','.arrow',function(){
                self.model.attributes.commentLimit += 10;
                self.displayComment();
                //console.log(self.model.attributes.commentLimit);
            });
            if (this.model.attributes.username){
                $('#commentaires-list').css('margin-top','150px');
                $('#commentaire-edit').html("<div class=\"commentaire-edit-div\">" +
                    "<textarea id = \"commentaire-area\" class=\"form-control comment-edition\" placeholder=\"Message\"></textarea></div>"
                    +"<button id =\"submit-commentaire\" type=\"button\" class=\"btn btn-default submit-commentaire\">Envoyer</button>");
            }
            this.getComment();
        },
        getComment: function(){
            var self = this;
            $.ajax({
                url: '/comment/all',
                data: {course :  $(".transparent-course-name").attr('id')},
                type: 'GET',
                datatype : 'json'
            }).then(
                function result(result){
                    if (!self.model.attributes.commentLimit){
                        self.model.attributes.commentLimit = 10;
                    }
                    self.displayComment(result);
                },
                function err(err){
                    console.log("Erreur sur l\'afficahge des comms");
                    console.log(err);
                }
            )
        },
        submitCommentaire : function () {
            var self = this;
            if (!$("#commentaire-area").val() ==''){
                var commentObject = {
                    user : this.model.attributes.username,
                    commentaire : $("#commentaire-area").val(),
                    course : $(".transparent-course-name").attr('id'),
                    date : (new Date()).toString()
                };
                $.ajax({
                    url: '/user/comment',
                    data: {commentaire : commentObject},
                    type: 'GET',
                    datatype : 'json'
                }).then(
                    function result(result){
                        //console.log(result);
                        self.displayComment(result);
                    },
                    function err(err){
                        console.log('Erreur sur la persistence de game');
                        console.log(err);
                    }
                )
            }
        },
        displayComment: function(result){
            var self = this;
            result.reverse();
            if (!this.model.attributes.commentLimit){
                this.model.attributes.commentLimit = 10;
            }
            var commentList = '';
            commentList += '<div class = "comment-zone">';
            commentList += '<ul class="">';
            for (var i = 0; i<this.model.attributes.commentLimit && i < result.length ; i++){
                ( function(j) {
                    var commentaire = result[j];
                    var date = Date.parse(commentaire.date);
                    var dateDay = date;
                    var dateDay = moment(dateDay).format('MM/DD/YYYY');

                    var dateHour = moment(date).format("hh:mm:ss");
                    commentList+= "<li class='list-group-item commentaire-list-itm'><div class ='commentaire-post'><div class = 'commentaire-header'>";
                    commentList += "<span class ='comment-author'>" + commentaire.username + "</span>" + "<span class ='comment-date'>" + "le " + dateDay + " a " + dateHour +  "</span></div>";
                    commentList+= "<div class = 'commentaire-content'>"+ commentaire.commentaire +"</div>";
                    var commentLikeId = 'commentlike-' + commentaire.id;
                    var commentDisLikeId = 'commentdislike-' + commentaire.id;
                    $("#commentdislike-"+ commentaire.id).off();
                    $("#commentlike-"+ commentaire.id).off();
                    $('#commentaires-list').children().off();
                    $('#commentlike-'+ commentaire.id).removeClass("likecomment");
                    $('#commentlike-'+ commentaire.id).removeClass("dislikecomment");
                    //console.log(commentaire.like);
                    self.model.attributes.clicked = false;
                    commentList+= "<div class = 'commentaire-likes'>"+ '<span id = \"' + commentLikeId + '\" class=\" comment-like-icon  glyphicon glyphicon-thumbs-up\"></span>' + commentaire.like + '<span id = \"' + commentDisLikeId + '\" class=" comment-dislike-icon glyphicon glyphicon-thumbs-down"></span>' + commentaire.dislike +"</div></div></li>";
                    $(document).on('click','#commentlike-'+ commentaire.id + ':not(.likecomment)',function(){
                        if (!self.model.attributes.clicked){
                            self.model.attributes.clicked = true;
                            //console.log('like com ' + commentaire.id);
                            $("#commentlike-"+ commentaire.id).off();
                            $("#commentaires-list").unbind();
                            $('#commentlike-'+ commentaire.id).addClass("likecomment");
                            $.ajax({
                                url: '/user/like',
                                data: {obj : {commentaire : commentaire.id, course : $(".transparent-course-name").attr('id')}},
                                type: 'GET',
                                datatype : 'json'
                            }).then(
                                function result(result){
                                    //console.log(result);
                                    self.displayComment(result);
                                },
                                function err(err){
                                    console.log('Erreur sur la persistence de game');
                                    console.log(err);
                                }
                            )
                        }
                    });
                    $(document).on('click','#commentdislike-'+ commentaire.id + ':not(.dislikecomment)',function(){
                        if (!self.model.attributes.clicked) {
                            self.model.attributes.clicked = true;
                            //console.log('dislike com ' + commentaire.id);
                            $("#commentdislike-" + commentaire.id).off();
                            $("#commentaires-list").unbind();
                            $('#commentlike-' + commentaire.id).addClass("dislikecomment");
                            $.ajax({
                                url: '/user/dislike',
                                data: {
                                    obj: {
                                        commentaire: commentaire.id,
                                        course: $(".transparent-course-name").attr('id')
                                    }
                                },
                                type: 'GET',
                                datatype: 'json'
                            }).then(
                                function result(result) {
                                    //console.log(result);
                                    self.displayComment(result);
                                },
                                function err(err) {
                                    console.log('Erreur sur la persistence de game');
                                    console.log(err);
                                }
                            )
                        }
                    });
                }) (i);
            }
            commentList += '</ul>';
            if (result.length > 10){
                commentList += '<span class="arrow"><span class = " arrow-comment-list glyphicon glyphicon glyphicon-arrow-down"></span></span></span>';
            }
            commentList+= '</div>';
            if (!this.model.attributes.username){
                $('#commentaires-list').css('margin-top','0px!important');
                $('#commentaire-edit').css('margin-bottom','0px!important');
            }
            else {
                $('#commentaires-list').css('margin-top','150px!important');
            }
            $('#commentaires-list').html(commentList);
        },
        /* Raccourcis d'affichage/ de cache des div containes des cours */
        hideBinDec: function(){
            $('#courseBinDec').hide();
        },
        hideHexDec: function() {
            $('#courseHexDec').hide();
        },
        viewBinDec: function(){
            $('#courseBinDec').show();
        },
        viewHexDec: function() {
            $('#courseHexDec').show();
        },
        addRatingWidget: function () {
            var ratingTotal = $('.total-rating');
            var ratingElement = document.querySelector('.c-rating');
            var userRating = 0;
            var scoreObject = {
                user : this.model.attributes.username,
                score : 0,
                rating : 0,
                course : $(".transparent-course-name").attr('id'),
                date : (new Date()).toString(),
                validated : 0};
            $.ajax({
                url: '/user/userRating',
                data: {rating : scoreObject},
                type: 'GET',
                datatype : 'json'
            }).then(
                function result(result) {
                    var avgRating = 0;
                    var numberOfRating = 0;
                    if(result != 0){
                        avgRating = result.avgRating.toFixed(1);
                        numberOfRating = result.numberOfRating;
                        userRating = parseInt(result.rating);
                    }
                    $('span.avgRating').text(avgRating);
                    $('span.totalRatings').text(numberOfRating);
                    var currentRating = 2.5;
                    var maxRating = 5;
                    // callback to run after setting the rating
                    var callback = function(rating) {
                        console.log(rating);
                        course.submitRating(rating, course);
                    };
                    // rating instance
                    var myRating = rating(ratingElement, userRating, maxRating, callback);
                },
                function err(err) {
                    console.log('Erreur sur la persistence de game');
                    console.log(err);
                }
            )
        },
        submitRating : function (_rating, currThis) {
            var self = this;
            var scoreObject = {
                user : this.model.attributes.username,
                score : 0,
                rating : _rating,
                course : $(".transparent-course-name").attr('id'),
                date : (new Date()).toString(),
                validated : 0
            };
            $.ajax({
                url: '/user/rating',
                data: {rating : scoreObject},
                type: 'GET',
                datatype : 'json'
            }).then(
                function result(result){
                    console.log(result);
                    var avgRating = 0;
                    var numberOfRating = 0;
                    if(result != 0){
                        avgRating = result.avgRating.toFixed(1);
                        numberOfRating = result.numberOfRating;
                    }
                    $('span.avgRating').text(avgRating);
                    $('span.totalRatings').text(numberOfRating);
                },
                function err(err){
                    console.log('Erreur sur la persistence de quiz');
                    console.log(err);
                }
            )
        }
    });
    return CourseView;
});