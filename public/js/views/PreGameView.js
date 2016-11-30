define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/game/preGame1.html'
], function ($, _, Backbone, Bootstrap, PreGameTemplate) {

    var PreGameView = Backbone.View.extend({
        el: $('#alert-game'),
        events: {},
        initialize:
            function ()
            {
                this.$el.append(PreGameTemplate);
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
                this.$el.append(PreGameTemplate);
            },
        hide:
            function()
            {
                this.$el.hide();
            },
        show:
            function()
            {
                this.$el.show();
            }
    });
    return PreGameView;
});