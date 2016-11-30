define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone, Bootstrap) {

    var AppModel = Backbone.Model.extend({
        defaults: {
        },
        
        initialize: function(attributes) {
            this.attributes=attributes;
        },
        reset: function() {
            this.attributes= null;
        }
    });

    return {
        Model: AppModel
        //Collection: Users
    };

});