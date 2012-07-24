requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'underscore', 'crafty-min', 'sceneWelcome', 'scenePlaying' ], function(){
    Crafty.init( 640, 340 );
    Crafty.background('#0571a9');

    Crafty.scene( 'welcome' );
});


