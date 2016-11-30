/**
 * Created by Nobinuti on 26/05/2016.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/QuizModel',
    'views/QuizSubView',
    'text!../../templates/quiz/quizMain.html',
    'text!../../templates/quiz/bindecTranslationQuiz.html',
    'text!../../templates/quiz/bindeclogicalQuiz.html',
    'text!../../templates/quiz/bindecSumSubQuiz.html',
    'text!../../templates/quiz/bindecMultDivQuiz.html',
    'text!../../templates/quiz/hexdecTranslationQuiz.html',
    'text!../../templates/quiz/hexbinTranslationQuiz.html'
], function ($, _, Backbone, Bootstrap, QuizModel, QuizSubView, QuizTemplate, BinDecQuizTemplate, BinLogQuizTemplate, SumSubQuizTemplate,
             MultDivQuizTemplate, HexDecQuizTemplate, HexBinQuizTemplate) {

    var quiz;
    var QuizView = Backbone.View.extend({
        el: $('#quiz'),
        events: {
            /* Lancer le premier cours */
            "click #start-quiz-btn"       :       "startQuiz",
            "click #btn-quiz-next"       :       "next",
            "click #btn-back-cours"       :       "backToCourses",
            "mouseover #btn-back-cours"       :       "mouseoverBackToCourses",
            "mouseout #btn-back-cours"       :       "mouseoutBackToCourses"
        },
        initialize: function (){
            this.$el.html(QuizTemplate);
            this.render();
            quiz = this;
        },
        render: function() {
            this.$el.show();
            $('#background-image').empty();
            $('.main-quiz-content').css('width', '0%');
            return this;
        },
        hide : function(){
            this.$el.hide();
        },
        remove: function(){
            this.$el.empty();
        },
        show: function(){
            $('.main-quiz-content').css('width', '75%');
            $('.start-quiz-container').css('width', '0%');
            $('.start-quiz-container').hide();
            $('#start-quiz-btn').hide();
            $('.start-quiz-btn').hide();
            $('#background-image').empty();
            this.$el.show();
        },
        reset: function(){
            $('.main-quiz-content').css('width', '75%');
            $('.start-quiz-container').css('width', '0%');
            $('.start-quiz-container').hide();
            $('#start-quiz-btn').hide();
            $('.start-quiz-btn').hide();

            $('#quizQuestion').empty();
        },

        startQuiz: function() {
            $('.start-quiz-container').hide();
            window.location.href = "#bindecquiz";
        },

        /* Afficher les quiz en ajoutant les templates et supprimant l'ancien */
        /* Niveau 1*/
        displayBinDecQuiz: function () {
            this.appendQuizTemplate(BinDecQuizTemplate);
            this.load(1);
        },

        /* Niveau 2*/
        displayBinLogQuiz: function () {
            this.appendQuizTemplate(BinLogQuizTemplate);
            this.load(2);
        },

        /* Niveau 3*/
        displaySumSubQuiz: function () {
            this.appendQuizTemplate(SumSubQuizTemplate);
            this.load(3);
        },

        /* Niveau 4*/
        displayMultDivQuiz: function () {
            this.appendQuizTemplate(MultDivQuizTemplate);
            this.load(4);
        },

        /* Niveau 5*/
        displayHexDecQuiz: function () {
            this.appendQuizTemplate(HexDecQuizTemplate);
            this.load(5);
        },

        /* Niveau 6*/
        displayHexBinQuiz: function () {
            this.appendQuizTemplate(HexBinQuizTemplate);
            this.load(6);
        },



        /* Ajouter génériquement un template */
        appendQuizTemplate: function(template){
            var compiledTemplate = _.template(template);
            this.reset();
            $('#quizQuestion').append(compiledTemplate);
        },
        //this.load();
        load: function (niveau){
            var fSuccess = "loadSucc"+1;
            switch (niveau){
                case 1:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc1, this.loadFail);
                    break;
                case 2:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc2, this.loadFail);
                    break;
                case 3:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc3, this.loadFail);
                    break;
                case 4:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc4, this.loadFail);
                    break;
                case 5:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc5, this.loadFail);
                    break;
                case 6:
                    this.executeOpAsync('/quiz/quiz.xml', this.loadSucc6, this.loadFail);
                    break;
            }
        },
        executeOpAsync: function (fileName, successCallback, failCallback)
        {
            $.ajax({
                type: "GET",
                url: fileName,
                dataType: "xml",
                success: successCallback,
                error: failCallback
            });
        },

        loadSucc1: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();

            $(returnValue).find("part").each(function()
            {
                if($(this).attr("class") == 'bindec') {
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {

                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },
        loadSucc2: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();
            $(returnValue).find("part").each(function()
            {
                if($(this).attr("class") == 'logic'){
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {

                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            //var image = '<br><img src="' + $(this).find("img").text() + '">';
                            var image = '<br><span ALIGN="left" class="image"><img src="' + $(this).find("img").text() + '"></span>';
                            question.find("span.question").after(image);
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },
        loadSucc3: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();
            $(returnValue).find("part").each(function()
            {
                if($(this).attr("class") == 'SubSum'){
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {

                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },
        loadSucc4: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();
            $(returnValue).find("part").each(function()
            {
                if($(this).attr("class") == 'MultDiv'){
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {

                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },
        loadSucc5: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();
            $(returnValue).find("part").each(function()
            {
                if($(this).attr("class") == 'hexdec'){
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {

                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },
        loadSucc6: function (returnValue)
        {
            console.log(returnValue);
            $("#btn-quiz-next").show();
            $(returnValue).find("part").each(function()
            {
                console.log("Title: " + $(this).find("questions").attr("text"));
                if($(this).attr("class") == 'hexbin'){
                    var maxQuestions = 10;
                    var countNbrQues = 0;
                    var $subLevel = $(this).find("subLevel").each(function(sublvl) {
                        /* Fetch questions of each sublevel and take 2 of them*/
                        var $questions = quiz.shuffle($(this).find("question"));

                        /* filter the first maxQuestions and display their information */
                        var maxQuesSubLvl = 2;
                        $questions.filter(":lt(" + maxQuesSubLvl + ")").each(function (countQuest) {
                            countNbrQues = 2*(sublvl) + (countQuest+1);

                            var question = $("#questionQuiz-1").clone();
                            question.attr("id", "questionQuiz-" + countNbrQues);
                            question.attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;display:none;");
                            question.find("span.question").text($(this).attr("ask"));
                            var answer = question.find("span.answer");
                            var iAnswer = $(answer).length - 1;
                            var jResult = "";

                            $(this).find("answer").each(function () {
                                if ($(this).attr("check") == "true") {
                                    jResult = $(this).text();
                                }
                                var ans = '<input type="radio" name="question' + (countNbrQues + 1) + '" value="' + $(this).text() + '">' + " " + $(this).text() + '</input><br>';
                                $($(answer).get(iAnswer)).after(ans);

                                console.log("Answer: " + $(this).text());
                            });
                            question.attr("a", jResult);
                            var index = $('.rowData').length - 1;
                            $($('.rowData').get(index)).after(question);
                            countNbrQues++;
                        });
                    });
                }
            });
            $($('.rowData').get(0)).remove();
            $($('.rowData').get(0)).attr("style", "background-color: whitesmoke;border-radius:8px 0; border: 1px solid #9acfea; border-radius:4px!important; padding:10px;");
        },


        loadFail: function (){
            console.log('fail');
        },

        checkResult: function(){
            /*Variables for modal quiz*/
            var _answer, _solution, _score = 0;

            var answerVrai = $(".rowData:visible").attr("a");
            _solution = answerVrai;

            _answer = $(".rowData:visible").find("input[type=radio]:checked").val();
            console.log("_answer : " + _answer);


            var currScore = parseInt($("span.questionScore").text());
            if (_answer == answerVrai){
                console.log("Bravo");
                _solution = "Bravooo ! Vous avez bien répondu.";
                _score = 1;
            }else {
                console.log("Faux");
                _solution = "La bonne réponse est " + _solution + ".";
            }
            $("#btn-quiz-next").show();

            return {
                answer: _answer,
                solution: _solution,
                score : _score
            };
        },

        next: function(){
            /*Variables for modal quiz*/
            var finalScore = $("span.scoreFinal").text();
            var iScore = parseInt(finalScore);

            var check = this.checkResult();
            if(check.answer == undefined){
                this.throwInfosAlert('alert-info', '<strong>Vous n\'avez pas répondu à cette question.</strong>');
                return false;
            }

            iScore += check.score;
            $("span.scoreFinal").text(iScore);

            var totalQuestion = $(".rowData").length;
            $("div.messageVrai").hide();
            $("div.messageFaux").hide();
            var currQuestion = $(".rowData:visible");
            var questionText = $(".rowData:visible .question")[0].innerHTML;
            if($(".rowData:visible .image")[0] != undefined){
                questionText = $(".rowData:visible .question")[0].innerHTML + "<br>" + $(".rowData:visible .image")[0].innerHTML;
            }


            var currQuestionIndex = parseInt($(currQuestion).attr("id").split("questionQuiz-")[1]) + 1;

            $("span.questionNum").text(currQuestionIndex);
            $(currQuestion).closest('tr').next('tr').show();
            $(currQuestion).closest('tr').hide();
            $("#btn-quiz-next").show();

            var quest = new QuizModel();
            quest.id = currQuestionIndex - 1;
            quest.question = questionText;
            quest.answer = check.answer;
            quest.solution = check.solution;

            console.log("quest.id : " + quest.id);

            var quizSubView = new QuizSubView ({model: quest});
            //console.log(quizSubView.renderNext(quest.id, quest.question, quest.answer, quest.solution));

            /* Append to BilanQuiz*/
            if(check.score == 0){ //false quest
                $(".bilanQuiz").append(quizSubView.renderNextFalse(quest.id, quest.question, quest.answer, quest.solution).el);
            }else{
                $(".bilanQuiz").append(quizSubView.renderNextTrue(quest.id, quest.question, quest.answer, quest.solution).el);
            }


            if ((currQuestionIndex - 1) == totalQuestion){
                $("#btn-quiz-next").hide();
                $("div table").hide();
                $("div.messageFinal").find("span.scoreFinal").text (iScore +"/"+ totalQuestion);

                var tmp = iScore / totalQuestion;
                if(tmp >= 0.6){
                    this.submitScore(iScore, true);
                    $("div.messageFinal").append('<p>Vous avez validé ce cours.</p>');
                    $("div.messageFinal").css("background-color", "#b2fab2");
                }else {
                    this.submitScore(iScore, false);
                    $("div.messageFinal").append('<p>Vous n\'avez pas validé ce cours.</p>');
                    $("div.messageFinal").css("background-color", "#f51a28");
                }

                $("div.messageFinal").show();
                console.log("Message final");
                $("div.bilanQuiz").append('<div style="text-align: center;">' +
                    '<button type="button" class="btn btn-default" id="btn-back-cours"> ' +
                    '<img src="images/btn-icon-back-course.png" class="imgIcon" /> ' +
                    '</button> <div class="popup">' +
                    '<p>Revenir au cours</p>' +
                    '</div>' +
                    '</div>');

                $("div.bilanQuiz").show();

            }
        },

        backToCourses : function () {
            var url = window.location.href.split("#")[1];
            url = '#' + url;
            switch (url){
                case "#quiz":
                    window.location.href = "#course";
                    break;
                case "#bindecquiz":
                    window.location.href = "#bindec";
                    break;
                case "#binlogquiz":
                    window.location.href = "#binLog";
                    break;
                case "#binSumSubquiz":
                    window.location.href = "#binSumSub";
                    break;
                case "#binMultDivquiz":
                    window.location.href = "#binMultDiv";
                    break;
                case "#hexdecquiz":
                    window.location.href = "#hexdec";
                    break;
                case "#hexbinquiz":
                    window.location.href = "#hexbin";
                    break;
                default:
                    window.location.href = "#course";
                    break;
            }
        },

        getCourseName : function () {
            var url = window.location.href.split("#")[1];
            url = '#' + url;
            var coursName;
            switch (url){
                case "#bindecquiz":
                    coursName = "bindectrans";
                    break;
                case "#binlogquiz":
                    coursName = "bindeclog";
                    break;
                case "#binSumSubquiz":
                    coursName = "bindecss";
                    break;
                case "#binMultDivquiz":
                    coursName = "bindecmd";
                    break;
                case "#hexdecquiz":
                    coursName = "hexdectrans";
                    break;
                case "#hexbinquiz":
                    coursName = "hexbintrans";
                    break;
                default:
                    break;
            }
            return coursName;
        },

        mouseoverBackToCourses: function () {
            $(".popup").show();
        },

        mouseoutBackToCourses: function () {
            $(".popup").hide();
        },

        shuffle: function(o){
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        checkValidated: function(coursename){
            var self = this;
            var queryArg = {
                user : this.model.attributes.username,
                course : coursename
            };
            $.ajax({
                url: '/user/course',
                data: {course :  $(".transparent-course-name").attr('id')},
                type: 'GET',
                datatype : 'json'
            }).then(
                function result(result){
                    console.log("CheckValidated course : " + coursename + ". Result : " + result);
                    return result;
                },
                function err(err){
                    console.log("Erreur sur l\'affichage des scores");
                    console.log(err);
                }
            )
        },

        getIdxCourse : function () {
            var idname = this.getCourseName();
            switch(idname) {
                case "bindectrans":
                    return 0;
                    break;
                case "bindeclog":
                    return 1;
                    break;
                case "bindecmd":
                    return 3;
                    break;
                case "bindecss":
                    return 2;
                    break;
                case "hexdectrans":
                    return 4;
                    break;
                case "hexbintrans":
                    return 5;
                    break;
                default:
                   break;
            }

        },

        //TODO DEBUG
        submitScore : function (_score, _validated) {
            var self = this;
            if (_score > 5){
                var validate = true;
            }
            var courseStatus = this.model.attributes.coursestatus;
            var binaryCourseStatus = courseStatus.toString(2);

            while(binaryCourseStatus.length != 6){
                binaryCourseStatus = '0' + binaryCourseStatus;
            }

            var idxCourse = 5-this.getIdxCourse();

            if (validate){
                binaryCourseStatus = binaryCourseStatus.substr(0, idxCourse) + '1' + binaryCourseStatus.substr(idxCourse+1);
            }
            else {
                binaryCourseStatus = binaryCourseStatus.substr(0, idxCourse) + '0' + binaryCourseStatus.substr(idxCourse+1);
            }

            this.model.attributes.coursestatus = parseInt(binaryCourseStatus,2);

            console.log(this.model);
            
            var userModel = this.model.attributes;
            var coursename = self.getCourseName();
            $.ajax({
                url: '/user/coursestatus',
                data: {user : userModel},
                type: 'GET',                       
                datatype : 'json'
            }).done(
                /*function(){
                    var scoreObject = {
                        user : self.model.attributes.username,
                        score : _score,
                        course : coursename,
                        validated : _validated,
                        date : (new Date()).toString()
                    };
                    $.ajax({
                        url: '/user/score',
                        data: {score : scoreObject},
                        type: 'GET',                       // <---------- Why not a PUT ?
                        datatype : 'json'
                    }).then(
                        function result(result){
                            console.log(result);
                        },
                        function err(err){
                            console.log('Erreur sur la persistence de quiz');
                            console.log(err);
                        }
                    )
                }*/
            )
        },
        throwInfosAlert:
            function (type, message)
            {
                $('#convAlert').modal('show');  // do not allow using Converter
                $('#modal-id-infos').html($("<div class='alert alert-message text-center " + type + " fade in' data-alert><p> " + message + " </p></div>"));

                $(".alert-message").delay(1000).fadeOut("slow", function () {
                    $(this).remove();
                    $('#convAlert').modal('hide');
                });
            }
    });
    return QuizView;
});
