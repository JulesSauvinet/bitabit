define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/main/userAccount.html'
], function ($, _, Backbone, Bootstrap, UserTemplate) {

    var UserView = Backbone.View.extend({
        el: $('#user'),
        events: {},
        initialize:
            function ()
            {
                this.$el.html(UserTemplate);
                this.render();
            },
        render:
            function()
            {
                this.$el.show();
                return this;
            },
        remove:
            function()
            {
                this.$el.empty();
            },
        add:
            function()
            {
                this.$el.append(UserTemplate);
            },
        hide:
            function()
            {
                this.$el.hide();
            },
        show:
            function()
            {
                if (this.model.attributes.username) {
                    $('#background-image').empty();
                    $('#user-panel-infos').html('<h3>Compte de ' + this.model.attributes.username + '</h3>');
                    $('#username-infos').html('<span class = "user-infos-subtitle"> Pseudo : </span> ' + this.model.attributes.username);

                    $('#score-info').html('<span class = "user-infos-subtitle"> Classement : </span> ' +  'afficher le classement');

                    var coursestatus = this.model.attributes.coursestatus.toString(2);
                    while(coursestatus.length!=6){
                        coursestatus = '0' +coursestatus;
                    }

                    var courseprogress = '<div class ="inner-tab"> <span class = "user-infos-subtitle"> Progression des cours: </span></br>';
                    courseprogress += '<table class = " mini-inner-tab">';
                    courseprogress += '<tr>';
                    courseprogress += '<td>La codage binaire</td><td>Le binaire et la logique</td><td>L\'addition et la soustraction en binaire</td><td>La multiplication et la divison en binaire</td><td>Le codage hexadécimal</td><td>L\'hexadécimal et le binaire</td>';
                    courseprogress += '</tr>';
                    courseprogress += '<tr>';
                    for (var i = 0; i<6; i++){
                        if (coursestatus.charAt(coursestatus.length-1-i) == '0'){
                            courseprogress += '<td class ="red-content"><span class="glyphicon glyphicon-remove"></span></td>';
                        }
                        else {
                            courseprogress += '<td class ="green-content"><span class="glyphicon glyphicon-ok"></span></td>';
                        }
                    }

                    courseprogress += '</tr>';
                    courseprogress += '</table></div>';

                    $('#coursestatus-info').html(courseprogress);


                    var isS = this.model.attributes.scoreTradGame > 1? 's' : '';

                    var scoreAsciiInfo = '<span class = "user-infos-subtitle"> Score au jeu des mots : </span>' + this.model.attributes.scoreTradGame + ' mot' + isS + ' trouvé';

                    scoreAsciiInfo += isS;

                    scoreAsciiInfo+= ' en un temps moyen de ';

                    var secondTimeAscii = parseInt(this.model.attributes.avgTimeTradGame%60);
                    if (this.model.attributes.avgTimeTradGame > 60){
                        scoreAsciiInfo+= parseInt(this.model.attributes.avgTimeTradGame/60) + ' minute';
                        if ((parseInt(this.model.attributes.avgTimeTradGame/60)>1)){
                            scoreAsciiInfo+='s';
                        }
                        if (secondTimeAscii >0){
                            scoreAsciiInfo+= ' et ';
                        }
                    }
                    if (secondTimeAscii >= 0)
                        scoreAsciiInfo+= secondTimeAscii + ' seconde';
                    if (secondTimeAscii > 1)
                        scoreAsciiInfo= scoreAsciiInfo + 's';

                    $('#first-game-info').html(scoreAsciiInfo);

                    isS = this.model.attributes.scoreColorGame > 1? 's' : '';

                    var scoreColorInfo = '<span class = "user-infos-subtitle"> Score au jeu des couleurs : </span>' + this.model.attributes.scoreColorGame + ' couleur' + isS + ' trouvée';
                    scoreColorInfo += isS;

                    scoreColorInfo+= ' en un temps moyen de ';
                    var secondTimeColor = parseInt(this.model.attributes.avgTimeColorGame%60);
                    if (this.model.attributes.avgTimeColorGame > 60){
                        scoreColorInfo+= parseInt(this.model.attributes.avgTimeColorGame/60) + ' minute';
                        if ((parseInt(this.model.attributes.avgTimeColorGame/60)>1)){
                            scoreColorInfo+='s';
                        }
                        if (secondTimeColor >0){
                            scoreColorInfo+= ' et ';
                        }
                    }
                    if (secondTimeColor >= 0)
                        scoreColorInfo+= secondTimeColor + ' seconde';
                    if (secondTimeColor > 1)
                        scoreColorInfo= scoreColorInfo + 's';

                    $('#color-game-info').html(scoreColorInfo);


                }
                this.$el.show();
            }
    });
    return UserView;
});

