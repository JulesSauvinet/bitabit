define(['jquery', 'underscore', 'backbone', 'bootstrap'], function($, _, Backbone, Bootstrap) {

    var UserModel = Backbone.Model.extend({
        defaults: {
            commentlimit : 0,
            curRating : 2.5
        },
        initialize: function(attributes) {
            if (attributes){
                this.attributes = attributes;
            }
        },
        reset: function() {
            this.attributes.commentlimit = 10
        }
    });

    return {
        Model: UserModel
        //Collection: Users
    };

});
