define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/main/footer.html'
], function ($, _, Backbone, Bootstrap, FooterTemplate) {
    
    var FooterView = Backbone.View.extend({
        el: $('#footer'),
        events: {},
        initialize:
            function ()
            {
                this.$el.append(FooterTemplate);
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
                this.$el.append(FooterTemplate);
            },
        hide:
            function()
            {
                this.$el.hide();
            },
        show:
            function()
            {
                $('#background-image').append('<img src="images/matrix_7.jpg" id="bg" alt="">');
                this.$el.show();
            }
    });
    return FooterView;
});