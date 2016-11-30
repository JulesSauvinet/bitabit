/**
 * Created by Nobinuti on 03/06/2016.
 */
define([
    // These are path alias that we configured in our bootstrap
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/quiz/questionsTemplateTrue.html',
    'text!../../templates/quiz/questionsTemplateFalse.html'
], function($, _, Backbone, Bootstrap, QuestionsTemplateTrue, QuestionsTemplateFalse){
    var QuizSubView = Backbone.View.extend({
        templateTrue: _.template(QuestionsTemplateTrue),
        templateFalse: _.template(QuestionsTemplateFalse),
        events: {
            "click .delete" : "destroyQuizQuest"
        },

        initialize: function(){
        },

        destroyQuizQuest: function(){
            this.model.destroy();
        },

        remove: function(){
            this.$el.remove();
        },

        renderNextTrue: function (_id, _question, _answer, _solution) {
            this.$el.html(this.templateTrue({id : _id, question : _question, answer: _answer, solution : _solution}));
            return this;
        },

        renderNextFalse: function (_id, _question, _answer, _solution) {
            this.$el.html(this.templateFalse({id : _id, question : _question, answer: _answer, solution : _solution}));
            return this;
        },

        render: function() {
            //this.$el.html("");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }


    });
    return QuizSubView;
});
