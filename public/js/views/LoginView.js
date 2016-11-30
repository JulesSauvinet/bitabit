define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/form/loginForm.html',
    'text!../../templates/form/createAccountForm.html'
], function ($, _, Backbone, Bootstrap, LoginTemplate, CreateAccountTemplate) {

    var LoginView = Backbone.View.extend({
        el: $('#login-container'),
        events:
        {
        },
        initialize:
            function ()
            {
                this.$el.append(LoginTemplate);
                this.$el.append(CreateAccountTemplate);

                if (this.model.attributes.username){
                    $("#menuCreateAccount").remove();
                    $("#menuLogin").remove();

                    var user = this.model.attributes.username;

/*                    var logoutHTML = '<li><a id="menuLogout" href="#userLogout"><span class="glyphicon glyphicon-log-out"></span> Se déconnecter</a></li>';
                    var userHTML = '<li><a id="menuUser" href="#user"><span class="glyphicon glyphicon-user"></span> '+ user + '</a></li>';
                    $(".navbar-right").append($(userHTML));
                    $(".navbar-right").append($(logoutHTML));*/
                }
                this.render();
            },
        render:
            function()
            {
                this.$el.show();
                return this;
            },

        logIn: function(){

            /* Etablir la connexion */
            $("#alert-login").append($("<div id='alert-area'></div>"));
            if ($("#usernameLogin").val() == '') {
                this.throwAlert('alert-warning', 'Renseignez le champ pseudo','#alert-login');
                return false;
            }
            if ($("#passwordLogin").val() == '') {
                this.throwAlert('alert-warning', 'Renseignez le mot de passe','#alert-login');
                return false;
            }
            
            var password = $("#passwordLogin").val();
            var user = $("#usernameLogin").val();

            var userModel = {};
            var self = this;
            $.ajax({
                url: '/user/connect/' + user,
                data: {password : password},
                type: 'GET',
                datatype : 'json'
            }).then(
                function result(result) {
                    console.log(result);
                    
                    var connected = result.connected;
                    
                    if (connected == "true"){
                        console.log(result);
                        userModel.username = user;
                        userModel.score = result.score;
                        userModel.coursestatus = result.coursestatus;
                        
                        userModel.scoreColorGame =  result.scoreColorGame;
                        userModel.avgTimeColorGame = result.avgTimeColorGame;
                        userModel.scoreTradGame = result.scoreTradGame;
                        userModel.avgTimeTradGame = result.avgTimeTradGame;
                        userModel.id = result.id;

            
                        $("#passwordLogin").val('');
                        $("#usernameLogin").val('');
            
                        //Fermer Add Modal
                        $('#login').modal('hide');
                        
                        var msg = 'Ravi de vous revoir ' + '<strong>' + user +'</strong>';
                        self.throwAlert('alert-info', msg, '#alert-login');
                    }
                    else {
                        $("#passwordLogin").val('');
                        $("#usernameLogin").val('');
                        //Fermer Add Modal
                        $('#login').modal('hide');
                        $('#createAccount').modal('show');
                        var msg = '<strong>Creez un compte pour vous connecter!</strong>';
                        self.throwAlert('alert-info', msg,'#alert-create');
                    }
                },
                function err(result) {
                    console.log('Erreur sur la connexion a bitabit');
                    console.log(result);
                }
            ).done(function(){
                    self.model.attributes = userModel;
                    console.log(self.model.attributes);
                    $.ajax({
                        url: '/user/persistCo',
                        data: {user: userModel},
                        type: 'GET',
                        datatype : 'json'
                    }).then(function(result){
                            //console.log('success');
                            window.location.href = '#user';
                        },
                        function err(err) {
                            console.log('Erreur sur la persistence de user');
                            console.log(err);
                        }
                    );
                })
            ;
            
        },
        logOut:
            function()
            {
                var self = this;
                /* reset a la main */
                this.model.attributes.username=null;
                this.model.attributes.coursestatus=0;
                this.model.attributes.score=0;
                
                this.model.attributes.scoreColorGame = 0;
                this.model.attributes.avgTimeColorGame = 0;
                this.model.attributes.scoreTradGame = 0;
                this.model.attributes.avgTimeTradGame = 0;
                
                this.model.attributes.id = 0;
                $.ajax({
                        url: '/user/deconnect',
                        type: 'GET',
                        datatype : 'json'
                    }).then(function(result){
                            console.log('success deco');
                            $("#message-area").append($("<div id='alert-area'></div>"));

                            self.throwInfosAlert('alert-success', '<strong>Vous vous etes deconnecte</strong>', function(){
                                 window.location.href = '#logout';
                            });

                        },
                        function err(err) {
                            console.log('Erreur sur la deconnexion de user');
                            console.log(err);
                        }
                    );

            },
        
        createAccount:
            function()
            {
                /* Etablir la connexion */
                $("#alert-login").append($("<div id='alert-area'></div>"));
                if ($("#usernameCreate").val() == '') {
                    this.throwAlert('alert-warning', 'Renseignez un pseudo!.', '#alert-create');
                    return false;
                }
                else if ($("#passwordCreate").val() == '') {
                    this.throwAlert('alert-warning', 'Renseignez votre mot de passe!', '#alert-create');
                    return false;
                }
                else if ($("#passwordAgainCreate").val() == '') {
                    this.throwAlert('alert-warning', 'Veuillez répéter votre mot de passe!', '#alert-create');
                    return false;
                }
                else if ($("#passwordAgainCreate").val() != $("#passwordCreate").val()) {
                    this.throwAlert('alert-warning', 'Les deux mots de passe ne sont pas identiques!', '#alert-create');
                    return false;
                }
                else {
                    var password = $("#passwordCreate").val();
                    var user = $("#usernameCreate").val();

                    var self = this;
                    $.ajax({
                        url: '/user/create/' + user,
                        data: {password : password},
                        type: 'GET',
                        datatype : 'json'
                    }).then(
                        function result(result) {
                            console.log(result);
                            var success = result.success;

                            if (success == 'true'){
                                $("#passwordCreate").val('');
                                $("#usernameCreate").val('');
                                $("#passwordAgainCreate").val('');

                                $('#createAccount').modal('hide');
                                var msg = 'Vous vous etes bien créé un compte ' + '<strong>' + user +'</strong>';
                                self.throwAlert('alert-success', msg, '#alert-login');
                                $('#login').modal('show');
                            }
                            else {
                                $("#passwordCreate").val('');
                                $("#usernameCreate").val('');
                                $("#passwordAgainCreate").val('');
                                self.throwAlert('alert-warning', 'L\'utilisateur existe deja, choisissez un autre pseudo!', "#alert-create");
                                return false;
                            }
                        },
                        function err(result) {
                            console.log('Erreur sur la creation de compte ');
                            console.log(result);
                        }
                    );
                }
            },
        
        throwAlert:
            function (type, message, divAlert, fn)
            {
                $(divAlert).append($("<div class='alert alert-message text-center " + type + " fade in' data-alert><p> " + message + " </p></div>"));
                $(".alert-message").delay(2000).fadeOut("slow", function () { $(this).remove(); });
                if (fn)
                    fn();
            },

        throwInfosAlert:
            function (type, message, fn)
            {
                $('#convAlert').modal('show');  // do not allow using Converter
                $('#modal-id-infos').html($("<div class='alert alert-message text-center " + type + " fade in' data-alert><p> " + message + " </p></div>"));

                $(".alert-message").delay(1000).fadeOut("slow", function () {
                    $(this).remove();
                    $('#convAlert').modal('hide');
                    if (fn)
                        fn();
                });
            },
        
        remove:
            function()
            {
                this.$el.empty();
            },
        
        add:
            function()
            {
                this.$el.append(LoginTemplate);
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
    return LoginView;
});