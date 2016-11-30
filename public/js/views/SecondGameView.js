

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'views/AsciiTable',
    'text!../../templates/game/game2.html'
], function ($, _, Backbone, Bootstrap, AsciiTable, GameTemplate) {

    var GameColorView = Backbone.View.extend({
        el: $('#game2'),
        events: {
            "click #btn-check-answer" : "validateProposal"
        },
        initialize:
            function ()
            {
                var interval_id = window.setInterval("", 999); // Get a reference to the last
                var self = this;
                for (var i = 1; i < interval_id; i++)
                    window.clearInterval(i);
                window.setInterval(function(){
                    //console.log('update timer');
                    self.model.colorgame.attributes.time++;
                    $('#color-time-div').html(parseInt(self.model.colorgame.attributes.time/60) + ' : ' + parseInt(self.model.colorgame.attributes.time%60));
                }, 1000);

                this.render();
            },
        render:
            function ()
            {
                $("#main-title").hide();
/*
                $('#game').append('<div id ="bg"></div>');*/

                $('#background-image').empty();/*
                $('#bg').css('background-color','steelblue');
                 $('#bg').css('background-image', 'linear-gradient( white, rgba(255,255,255,0)');
                 $('#bg').css('transition', 'background-color 1s');*/

                if (this.model.colorgame)
                    this.model.colorgame.reset();

                if ($("#game2").html() == ''){
                    $("#game2").html(GameTemplate);
                    $('#game2').show();
                    this.generateGame();
                }
                else {
                    this.show();
                }
            },
        generateNewGame :
            function(){
                if (this.model.colorgame)
                    this.model.colorgame.reset();
                
                $("#game2").html(GameTemplate);
                    $('#game2').show();
                    this.generateGame();
            },

        generateGame :
            function ()
            {
                var rColorRandom = parseInt((Math.random()*255.));
                var vColorRandom = parseInt((Math.random()*255.));
                var bColorRandom = parseInt((Math.random()*255.));
                $("#game-main-color-rdm").css("background-color", "rgb("+ rColorRandom + ","+ vColorRandom + ","+ bColorRandom + ")");
                $(".game-blue-color").css("background-color", "rgb("+ 0 + ","+ 0+ ","+ bColorRandom + ")");
                $(".game-green-color").css("background-color", "rgb("+ 0 + ","+ vColorRandom + ","+ 0 + ")");
                $(".game-red-color").css("background-color", "rgb("+ rColorRandom + ","+ 0 + ","+ 0 + ")");
                $("#game-main-color-user").css("background-color", "rgb("+ 255 + ","+ 255 + ","+ 255 + ")");

                var bluecol = '<span>' + bColorRandom + '</span>';
                var redcol = '<span>' + rColorRandom + '</span>';
                var greencol = '<span>' + vColorRandom + '</span>';
                
                $(".game-blue-color-val").append(bluecol);
                $(".game-red-color-val").append(redcol);
                $(".game-green-color-val").append(greencol);

                var rColorHexa = rColorRandom.toString(16);
                if (rColorHexa.length == 1){
                    rColorHexa= 0+rColorHexa;
                }
                var vColorHexa = vColorRandom.toString(16);
                if (vColorHexa.length == 1){
                    vColorHexa= 0+vColorHexa;
                }
                var bColorHexa = bColorRandom.toString(16);
                if (bColorHexa.length == 1){
                    bColorHexa= 0+bColorHexa;
                }
                var hexacol =  '#' + rColorHexa+vColorHexa+bColorHexa;
                var self = this;


                ( function() {
                    $(".user-answer-color-help").hover(
                            
                        );
                }) ();

                ( function(hexacol, self) {

                    $("#color-answer").change(function() {
                        //console.log("answer a change!");
                        //console.log(hexacol);
                      var answerColor = $("#color-answer").val().toLowerCase();
                        if (answerColor.length == 7){
                            if(answerColor.charAt(0) == "#"){
                                $("#game-main-color-user").css("background-color", answerColor);
                                if (hexacol == answerColor){
                                    alert('vous avez trouvé la bonne couleur, bravo!');

                                    if (self.model.user.attributes.username) {
                                        self.model.user.attributes.avgTimeColorGame = parseInt(
                                            (self.model.user.attributes.avgTimeColorGame * self.model.user.attributes.scoreColorGame
                                         + self.model.colorgame.attributes.time)/(self.model.user.attributes.scoreColorGame +1));
                                        self.model.user.attributes.scoreColorGame++;
                                        $.ajax({
                                            url: '/user/colorgame',
                                            data: {user: self.model.user.attributes},
                                            type: 'GET',
                                            datatype : 'json'
                                        }).then(
                                            function result(){
                                                self.generateNewGame();
                                            },
                                            function err(err){
                                                console.log('Erreur sur la persistence de colorgame');
                                                console.log(err);
                                            }
                                        );
                                    }
                                    else {
                                        self.generateNewGame();
                                    }

                                }
                            }
                        }
                    });

                }) (hexacol, self);
                
            },

        show:
            function ()
            {
                if ($("#game2").html() == '')
                    this.initialize();
                
                $('#background-image').empty();
                $("#main-title").hide();
                $('#game2').show();
            },

        hide:
            function () {
                var interval_id = window.setInterval("", 999); // Get a reference to the last
                                                // interval +1
                for (var i = 1; i < interval_id; i++)
                    window.clearInterval(i);

                $("#main-title").show();
                $('#game2').empty();/*
                $('#game').remove('#bg');*//*
                $('#background-image').css('background-color','ghostwhite');*/
            },

        validateProposal:
            function ()
            {
            },

        reset:
            function () {
                console.log('reset');
                this.model.reset();
                this.hide();
            }
    });
    return GameColorView;


});

