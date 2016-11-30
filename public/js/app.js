/**
 * Created by Nobinuti on 06/05/2016.
 */

/*
 * This is main modules of our application
 * Point d'entrée de l'application
 * */
var app = app || {};

// Filename: app.js
define([
    'jquery',
    'jquery_ui', //jUI
    'underscore',
    'backbone',
    'Router' // Request Router.js
], function($, jUI, _, Backbone, Router){
    
    var initialize = function(){
        // Pass in our Router module and call it's initialize function
            app.router = Router.initialize();
        return this;
    };

    return {
        initialize: initialize
    };


});