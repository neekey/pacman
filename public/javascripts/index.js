requirejs.config({
    baseUrl: '/javascripts/'
});

requirejs( [ 'underscore', 'crafty-min', 'map', 'wall', 'monster', 'bean', 'pacman' ], function(){
    Crafty.init( 640, 320 );
    Crafty.background('#0571a9');

    Crafty.audio.add({
        bgMusic: [
            "/audios/bg.mp3",
            "/audios/bg.ogg"
        ]
    });

    Crafty.c("RandomPosition", {
        init: function() {
            this.attr({ x: Crafty.math.randomInt(50,350), y: Crafty.math.randomInt(50,300) });
        }
    });

    Crafty.sprite(32, "/images/pacman-copy.png", {
        idle: [ 1, 0 ],
        left: [ 0, 0 ],
        up: [ 2, 0 ],
        right: [ 4, 0 ],
        down: [ 6, 0 ]
    });

    Crafty.sprite(15, "/images/bean.png", {
        bean: [ 0, 0 ]
    });

    Crafty.sprite(32, "/images/wall.png", {
        wall: [ 0, 0 ]
    });


    var mapGenerator = Crafty.e( 'MapGenerator' );
    var mapArray = mapGenerator.randomMap( 20, 10 );
    var pacman;
    var monster;

    Crafty.e( 'Wall' ).wall({
        map: mapArray 
    });

    _.each( mapArray, function( rows, row ){

        _.each( rows, function( ifWall, col ){

            if( ifWall === 0 ){

                if( pacman !== undefined && monster === undefined ){

                    monster = Crafty.e( '2D, Canvas, Monster, RandomPosition' ).attr({ x: col * 32, y: row * 32, z: 100 });
                }

                if( pacman === undefined ){

                    pacman = Crafty.e( '2D, Canvas, Pacman, RandomPosition' ).attr({ x: col * 32, y: row * 32 });
                }

                
                else {

                    // 画一颗豆子
                    Crafty.e( 'Bean' ).bean( col * 32 + 10, row * 32 + 10 );  
                }
            }
        })
    });

    Crafty.audio.play( 'bgMusic', -1, 0.1 );



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


