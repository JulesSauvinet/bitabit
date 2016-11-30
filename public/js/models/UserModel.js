define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone, Bootstrap) {

    var UserModel = Backbone.Model.extend({
        defaults: {
            username : null,
            score : 0,
            coursestatus : 0,
            scoreColorGame : 0,
            avgTimeColorGame :0,
            scoreTradGame : 0,
            avgTimeTradGame : 0,
            id : 0
        },
        initialize: function(attributes) {
            if (attributes){
                this.attributes = attributes;
            }
        },
        reset: function() {
            this.attributes.username = null;
            this.attributes.score    = 0;
            this.attributes.scoreColorGame = 0;
            this.attributes.avgTimeColorGame = 0;
            this.attributes.scoreTradGame = 0;
            this.attributes.avgTimeTradGame = 0;
            this.id = 0;
            return this;
        }
    });

    return {
        Model: UserModel
        //Collection: Users
    };

});