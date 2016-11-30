/**
 * Created by Nobinuti on 12/05/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
], function($, _, Backbone, Bootstrap) {

    var QuizModel = Backbone.Model.extend({
        defaults: function() {
            return {
                id: "empty",
                question : "empty",
                imgUrl : "empty",
                answer : "empty",
                solution : "empty"
            };
        }
    });
    return QuizModel;
});
