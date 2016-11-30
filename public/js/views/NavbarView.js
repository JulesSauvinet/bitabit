define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/main/navbar.html'
], function ($, _, Backbone, Bootstrap, NavbarTemplate) {
    
    var NavbarView = Backbone.View.extend({
        el: $('#navbar'),
        events: {},
        initialize:
            function (attributes)
            {

                this.$el.append(NavbarTemplate);
                this.render();
            },
        render:
            function()
            {
                if (this.model.attributes.username){
                    //Mettre a jour la nom d'utilisateur dans la nav bar
                    $("#menuLogin").remove();
                    $("#menuCreateAccount").remove();
                    $("#menuLogout").remove();
                    $("#menuUser").remove();
                    var logoutHTML = '<li><a id="menuLogout" href="#userLogout"><span class="glyphicon glyphicon-log-out"></span> Se déconnecter</a></li>';
                    var userHTML = '<li><a id="menuUser" href="#user"><span class="glyphicon glyphicon-user"></span> ' + this.model.attributes.username + '</a></li>';
                    $(".navbar-right").append($(userHTML));
                    $(".navbar-right").append($(logoutHTML));

                }
                else {
                    $("#menuLogin").remove();
                    $("#menuCreateAccount").remove();
                    $("#menuLogout").remove();
                    $("#menuUser").remove();
                    //$("#user-area").remove();
                    var loginHTML = '<li><a id="menuLogin" href="#userLogin" data-toggle="modal" data-target="#login"><span class="glyphicon glyphicon-log-in"></span> Se connecter</a></li>';
                    var createAccountHTML = '<li><a id="menuCreateAccount" href="#createAccount" data-toggle="modal" data-target="#createAccount"><span class="glyphicon glyphicon glyphicon-user"></span>  Créer un compte</a></li>';

                    $(".navbar-right").append($(createAccountHTML));
                    $(".navbar-right").append($(loginHTML));
                }
                return this;
            },
        show:
            function(){
               this.$el.show();
            }
    });
    return NavbarView;
});