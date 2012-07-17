requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'crafty-min', 'pacman' ], function(){
    Crafty.init(600, 300);
    Crafty.background('rgb(127,127,127)');

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

    Crafty.e( '2D, Canvas, pacman, RandomPosition' );
});


