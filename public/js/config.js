/**
 * Created by Nobinuti on 23/04/2016.
 */

// Filename: config.js

// Require.js : configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    baseUrl: '/js/',
    paths: {
        jquery: '../../bower_components/jquery/dist/jquery.min',
        jquery_ui: '../../js/libs/jquery-ui/jquery-ui',
        underscore: '../../bower_components/underscore/underscore',
        backbone: '../../bower_components/backbone/backbone',
        bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.min',
        kiwi : '../libs/kiwi/kiwi',
        text: '../../bower_components/text/text',   // text.js for taking templates html
        rating: '../libs/rating/rating',
        Router: 'router/Router',
        MasterGameView: 'views/FirstGameView',
        MasterView :'views/AppView'
        /*Collections:'collections',
        Views:'views'*/
    }

});

var app = app || {};


require([
    // Load our app module and pass it to our definition function
    'app'
], function(App){
    app= App.initialize();
});
