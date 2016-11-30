define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'views/AsciiTable',
    'text!../../templates/game/game1.html'
], function ($, _, Backbone, Bootstrap, AsciiTable, GameTradTemplate) {

    var GameView = Backbone.View.extend({
        el: $('#game'),
        events: {
            "click #btn-check-answer" : "validateProposal",
            "click #btn-reload-game"  :  "generateNewGame"
        },
        initialize:
            function ()
            {
                this.asciiTableView = new AsciiTable({
                    title: 'Table ASCII',
                    asciiMin : this.model.game.attributes.asciiMin,
                    asciiMax : this.model.game.attributes.asciiMax
                });
                $('#ascii-table').append(this.asciiTableView.el);
                
                if (this.model.game)
                    this.model.game.reset();
                var self = this;

                var interval_id = window.setInterval("", 999); // Get a reference to the last

                for (var i = 1; i < interval_id; i++)
                    window.clearInterval(i);
                window.setInterval(function(){
                    //console.log('update timer');
                    self.model.game.attributes.time++;
                    $('#color-time-div').html(parseInt(self.model.game.attributes.time/60) + ' : ' + parseInt(self.model.game.attributes.time%60));
                }, 1000);
                
                this.render();
            },
        render:
            function ()
            {
                $("#main-title").hide();

               if ($("#game").html() == ''){
                    $("#game").html(GameTradTemplate);
                    $('#game').show();
                    this.asciiTableView.render();
                    this.generateGame();
                }
                else {
                    this.show();
                }
            },

        generateNewGame:
            function()
            {
                $('#game').empty();
                
                this.initialize();
            },

        generateGame :
            function ()
            {
                var wordsize =0;
                var self = this;
                var binaryArray = [];
                
                if (this.model.game.attributes.binaryWord.length ==0){
                    this.model.game.getWord().then(
                        function result(result) {
                            //console.log(result);
                            self.model.game.attributes.binaryWord = result;
                            wordsize = result.length;
                            //$( ".game-content" ).addClass("col-sm-2");
                            //console.log(result.length);
                            result.forEach(function(b){
                                var enigma = "<td class=\"game-cell space-col\"><kbd class = \"space-kbd\">"; //align=\"left\" valign=\"top\"
                                for (var i =0; i <b.length; i++){
                                    var idx = i+1;
                                    var class_name = "span-exponent-" + idx;
                                    enigma += "<span class = \"span-space\"><span class = \"span-exponent " + class_name +"\">" + "</span>" + b.charAt(i) + "</span>";
                                }
                                enigma += "</kbd></td>";
                                //console.log(enigma);
                                $(".word-to-solve").append(enigma);
                            });
                            for (var i = 0; i < wordsize; i++){
                                $(".user-proposal").append("<td class=\"space-col\">" + " <input class = \"input-condensed\" type=\"text\" name=\"proposal[]\" value=\"\" maxlength=\"1\"/>" + "</td>");
                            }
                            $( ".game-content" ).append('<hr>');
                        },
                        function err(result) {
                            console.log('Erreur sur la requete de mot ' + result);
                        }
                    ).done(
                        function (){
                            "use strict";
                            var gameModel = self.model.game;
                            $.ajax({
                                url: '/solver/persistGame',
                                data: {game : gameModel.attributes},
                                type: 'GET',
                                datatype : 'json'
                            })
                        }
                    );
                }
                else {
                    wordsize = this.model.game.attributes.binaryWord.length;
                    this.model.game.attributes.binaryWord.forEach(function(b){
                        var enigma = "<td class=\"game-cell space-col\"><kbd class = \"space-kbd\">";
                        for (var i =0; i <b.length; i++){
                            var idx = i+1;
                            var class_name = "span-exponent-" + idx;
                            enigma += "<span class = \"span-space\"><span class = \"span-exponent " + class_name +"\">" + "</span>" + b.charAt(i) + "</span>";
                        }
                        enigma += "</kbd></td>";
                        $(".word-to-solve").append(enigma);
                    });
                    for (var i = 0; i < wordsize; i++){
                        $(".user-proposal").append("<td class=\"space-col\">" + " <input class = \"input-condensed\" type=\"text\" name=\"proposal[]\" value=\"\" maxlength=\"1\"/>" + "</td>");
                    }
                    $( ".game-content" ).append('<hr>');
                }

            },

        show:
            function ()
            {
                if ($("#game").html() == ''){
                    this.initialize();
                }
                    
                $('#background-image').empty();
                $("#main-title").hide();
                $('#game').show();
            },

        hide:
            function () {
                $("#main-title").show();
                $('#game').hide();
            },

        validateProposal:
            function ()
            {
                var self = this;
                //console.log(this.model.game.attributes.binaryWord );
                var answer ='';
                $('input[name^="proposal"]').each(function() {
                    answer += $(this).val();
                });
                console.log(answer);
                $.ajax({
                    url: '/solver/check/' + answer,
                    data: {binaryWord : this.model.game.attributes.binaryWord},
                    type: 'GET',
                    datatype : 'json'
                }).then(
                    function result(result) {
                        var answ = answer;
                        //console.log(result);
                        var nberr = 0;
                        var cpt = 0;
                       $(".user-response").empty();
                        result.forEach(function(x){
                           if (x == false){
                               nberr++;
                               $('#game').show();
                               var inputname = "proposal"+"["+ cpt +"]";
                               $('input[name=inputname]').attr('readonly', 'readonly');
                               $('input[name=inputname]').val(answ.charAt(cpt));

                               $(".user-response").append("<td class=\"col-sm-4 text-center input-condensed\">" + "<img src=\"images/icon-wrong.png\" class=\"imgIconTiny\"/>" + "</td>" );
                           }
                           else {
                               $(".user-response").append("<td class=\"col-sm-4 text-center input-condensed\">" + "<img src=\"images/icon-right.png\" class=\"imgIconTiny\"/>" + "</td>" );
                           }
                            cpt++;
                        });
                        if (nberr == 0){
                            alert('Vous avez fait gagné, bravo!');
                            //console.log(self.model);
                            if (self.model.user.attributes.username) {
                                self.model.user.attributes.avgTimeTradGame =
                                    parseInt((self.model.user.attributes.avgTimeTradGame * self.model.user.attributes.scoreTradGame
                                            + self.model.game.attributes.time)/(self.model.user.attributes.scoreTradGame +1));
                                
                                console.log(self.model.user.attributes.avgTimeTradGame);
                                self.model.user.attributes.scoreTradGame++;
                                //console.log(self.model);
                                $.ajax({
                                    url: '/user/colorgame',
                                    data: {user: self.model.user.attributes},
                                    type: 'GET',
                                    datatype : 'json'
                                }).done(
                                    function result(){
                                        self.generateNewGame();
                                    }
                                );
                            }
                            else {
                                self.generateNewGame();
                            }
                        }
                        else {
                            self.model.game.attributes.nbVies--;

                                self.model.user.attributes.avgTimeTradGame =
                                    parseInt((self.model.user.attributes.avgTimeTradGame * self.model.user.attributes.scoreTradGame
                                            + self.model.game.attributes.time*2)/(self.model.user.attributes.scoreTradGame +1));


                                $.ajax({
                                    url: '/user/colorgame',
                                    data: {user: self.model.user.attributes},
                                    type: 'GET',
                                    datatype : 'json'
                                }).done(
                                    function result(){
                                        var interval_id = window.setInterval("", 999); // Get a reference to the last
                                                                        // interval +1
                                        for (var i = 1; i < interval_id; i++)
                                            window.clearInterval(i);

                                        if (self.model.game.attributes.nbVies == 0){
                                            alert('Vous avez perdu !');
                                            nberr=0;
                                            self.reset();
                                            self.generateNewGame();
                                        }
                                        else {
                                            alert('Vous avez fait ' + nberr + ' erreurs, il vous reste ' + self.model.game.attributes.nbVies + ' vies!');
                                        }
                                    }
                                );



                        }
                    },
                    function err(result) {
                        console.log('Erreur sur la requete de mot ');
                        console.log(result);
                    }
                );
            },

        reset:
            function () {
                this.model.game.reset();
                this.hide();
            }
    });
    return GameView;


});

