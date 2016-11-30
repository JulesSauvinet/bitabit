define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone, Bootstrap) {

    var GameColorModel = Backbone.Model.extend({
        defaults: {
            nbVies : 3,
            time :0
        },
        initialize: function(attributes, options) {
            if (attributes){
                this.attributes = attributes;
            }
        },
        validate: function() {
        },
        reset: function() {
            this.attributes.time = 0;
            this.attributes.nbVies = 3;
        }
    });
    
    return {
        Model: GameColorModel
        //Collection: Todos
    };

});