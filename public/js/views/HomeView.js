define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/main/home.html'
], function ($, _, Backbone, Bootstrap, HomeTemplate) {

    var HomeView = Backbone.View.extend({
        el: $('#home'),
        events: {
            "click #btn-course" : "redirectCourse"
        },
        initialize:
            function ()
            {
                $('#footer').hide();
                this.$el.html(HomeTemplate);
                this.render();
                for(var i=1; i<=8; i++) {
                    ( function(j) {
                        $("#link-course-" + j).hover(
                            function () {
                                $("#link-course-" + j).css("margin-left", "0px");
                                var src = "../images/book_open.png";
                                $("#link-image-course-" + j).attr("src", src);
                            },
                            function () {
                                $("#link-course-" + j).css("margin-left", "-35px");
                                var src = "../images/books_closed.png";
                                $("#link-image-course-" + j).attr("src", src);
                                
                            }
                        );
                    }) (i);
                }
                //Mise a jour de la couleur du titre
                ( function() {
                    $("#home-title").hover(
                                function () {
                                    var rColorRandom = parseInt((Math.random()*255.));
                                    var vColorRandom = parseInt((Math.random()*255.));
                                    var bColorRandom = parseInt((Math.random()*255.));
                                    $("#home-title").css("color", "rgb("+ rColorRandom + ","+ vColorRandom + ","+ bColorRandom + ")");
                                },
                                function () {
                                    $("#home-title").css("color", "white");
                                }
                            );
                }) ();

            },
        render:
            function()
            {
                this.$el.show();
                return this;
            },
        redirectCourse: function () {
            window.location.href = "#course";
        },
        remove:
            function()
            {
                this.$el.empty();
            },
        add:
            function()
            {
                this.$el.append(HomeTemplate);
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
    return HomeView;
});