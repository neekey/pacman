requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'crafty-min', 'map', 'wall', 'pacman' ], function(){
    Crafty.init( 640, 320 );
    Crafty.background('rgb(255,255,255)');

    Crafty.c("RandomPosition", {
        init: function() {
            this.attr({ x: Crafty.math.randomInt(50,350), y: Crafty.math.randomInt(50,300) });
        }
    });

    Crafty.sprite(32, "/images/pacman.png", {
            idle: [ 1, 0 ],
            left: [ 0, 0 ],
            up: [ 2, 0 ],
            right: [ 4, 0 ],
            down: [ 6, 0 ]
        });

    Crafty.e( '2D, Canvas, pacman, RandomPosition' ).attr({ x: 32, y: 32 });

    var mapGenerator = Crafty.e( 'MapGenerator' );

    Crafty.e( 'Wall' ).wall({
        map: mapGenerator.randomMap( 20, 10 ) 
    });

    var _map = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
            [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1 ],
            [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1 ],
            [ 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1 ],
            [ 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1 ],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
            [ 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        ];
});


